#!/usr/bin/env python3
"""Record a real H1 DeepMimic rollout for the website's 3D replay viewer.

Runs the trained policy in MuJoCo exactly as visualize_imitation.py does (same
physics settings, observation, PD control, reset rule), headless, and writes
public/rollouts/<name>.json:

  meshes   the H1 visual meshes (vertices in the mesh frame, triangles)
  bodies   per body: its visual geoms (mesh index, pose in the body frame, color)
  frames   per frame and body: world position and quaternion (w x y z), robot
  ghost    the same for the mocap reference (kinematics only)
  error    per frame and body: distance robot joint anchor - reference anchor (m)
  hud      per frame: time, falls so far, forward speed of the pelvis

Usage (in the h1-imitation-learning repo's Python env, CPU is fine):
  python tools/export_h1_rollout.py --h1_repo ~/h1-imitation-learning \
      --ckpt checkpoints_imitation/h1_imitation_upd0600.pkl --seconds 20 \
      --out public/rollouts/h1_walk.json
"""
import argparse
import base64
import json
import os
import sys

import numpy as np


def b64(a, dtype):
    return base64.b64encode(np.ascontiguousarray(a, dtype=dtype).tobytes()).decode()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--h1_repo', required=True)
    ap.add_argument('--ckpt', required=True, help='path inside the h1 repo, or absolute')
    ap.add_argument('--seconds', type=float, default=20.0)
    ap.add_argument('--start', type=int, default=10)
    ap.add_argument('--out', required=True)
    ap.add_argument('--keep', type=float, default=0.25,
                    help='fraction of mesh triangles kept (pip install fast-simplification); 1 = all')
    a = ap.parse_args()

    repo = os.path.abspath(os.path.expanduser(a.h1_repo))
    sys.path.insert(0, repo)
    os.chdir(repo)
    import mujoco
    import visualize_imitation as V  # the repo's own replay code: same obs, PD, resets

    m = mujoco.MjModel.from_xml_path(V.SCENE_XML)
    m = V.fix_model_for_mjx(m)
    m.opt.timestep = 0.005
    m.opt.integrator = mujoco.mjtIntegrator.mjINT_IMPLICITFAST
    m.opt.iterations = 4
    m.opt.ls_iterations = 8
    d = mujoco.MjData(m)
    g = mujoco.MjData(m)

    mocap = V.load_and_resample_mocap(V.get_default_mocap_path())
    mocap = {k: (np.asarray(v) if hasattr(v, 'shape') else v) for k, v in mocap.items()}
    n_ref = mocap['n_frames']
    policy, _, _ = V.load_policy(a.ckpt)
    jids = V.joint_ids_19(m)

    # bodies: skip the world (0); the root is followed by the camera
    bodies = list(range(1, m.nbody))
    bindex = {b: i for i, b in enumerate(bodies)}
    # each of the 19 joints colors the body it moves (its child body)
    joint_body = [int(m.jnt_bodyid[j]) for j in jids]

    # visual geoms: meshes without collision (the H1's "visual" class)
    meshes, mesh_of = [], {}
    geoms = [[] for _ in bodies]
    for gi in range(m.ngeom):
        b = int(m.geom_bodyid[gi])
        if b == 0 or m.geom_type[gi] != mujoco.mjtGeom.mjGEOM_MESH:
            continue
        if m.geom_contype[gi] != 0 or m.geom_conaffinity[gi] != 0:
            continue
        mid = int(m.geom_dataid[gi])
        if mid not in mesh_of:
            va, vn = m.mesh_vertadr[mid], m.mesh_vertnum[mid]
            fa, fn = m.mesh_faceadr[mid], m.mesh_facenum[mid]
            mesh_of[mid] = len(meshes)
            verts, faces = m.mesh_vert[va:va + vn], m.mesh_face[fa:fa + fn]
            if a.keep < 1.0 and fn > 200:
                import fast_simplification
                verts, faces = fast_simplification.simplify(verts.astype(np.float32), faces.astype(np.int64),
                                                            target_reduction=1.0 - a.keep)
            # half floats for the vertices (sub-mm at the H1's link size), 16-bit indices
            meshes.append({'positions': b64(verts, np.float16), 'indices': b64(faces, np.uint16),
                           'format': 'f16/u16'})
            assert len(verts) < 65536
        rgba = m.geom_rgba[gi]
        if m.geom_matid[gi] >= 0:
            rgba = m.mat_rgba[m.geom_matid[gi]]
        geoms[bindex[b]].append({'mesh': mesh_of[mid], 'pos': m.geom_pos[gi].round(6).tolist(),
                                 'quat': m.geom_quat[gi].round(6).tolist(),
                                 'color': [round(float(c), 3) for c in rgba[:3]]})

    fps = int(round(1.0 / (m.opt.timestep * V.DECIMATION)))  # one frame per policy step (50 Hz)
    n = int(a.seconds * fps)
    nb = len(bodies)
    frames = np.zeros((n, nb, 7), np.float32)
    ghost = np.zeros((n, nb, 7), np.float32)
    err = np.zeros((n, nb), np.float32)
    t_hud = np.zeros(n, np.float32)
    falls_hud = np.zeros(n, np.float32)
    speed = np.zeros(n, np.float32)

    start = max(a.start, V.START_MARGIN)
    robot_frame = ghost_frame = start
    V.spawn_at_frame(m, d, mocap, robot_frame)
    last = np.zeros(V.ACT_DIM)
    action = np.zeros(V.ACT_DIM)
    falls, t_ep = 0, 0.0
    root = bodies[0]
    for f in range(n):
        if V.is_fallen(d) or V.tracking_error(d, mocap, robot_frame) > V.TRACKING_ERROR_TERMINATE \
                or robot_frame >= n_ref - 1:
            falls += int(V.is_fallen(d))
            robot_frame = ghost_frame = start
            V.spawn_at_frame(m, d, mocap, robot_frame)
            last[:] = 0.0
            t_ep = 0.0
        obs = V.get_obs(d, mocap, robot_frame, last)
        action = np.array(policy(obs))
        last = action
        robot_frame += 1
        ghost_frame = min(ghost_frame + 1, n_ref - 1)
        for _ in range(V.DECIMATION):
            V.apply_pd_control(d, action)
            mujoco.mj_step(m, d)
        mujoco.mj_kinematics(m, d)
        V.set_ghost_pose(m, g, V.get_ref_frame(mocap, ghost_frame))
        t_ep += 1.0 / fps
        for i, b in enumerate(bodies):
            frames[f, i, :3], frames[f, i, 3:] = d.xpos[b], d.xquat[b]
            ghost[f, i, :3], ghost[f, i, 3:] = g.xpos[b], g.xquat[b]
        dist = np.linalg.norm(V.joint_anchors(d, jids) - V.joint_anchors(g, jids), axis=1)
        for k, b in enumerate(joint_body):
            err[f, bindex[b]] = max(err[f, bindex[b]], dist[k])
        err[f, bindex[root]] = float(np.linalg.norm(d.xpos[root] - g.xpos[root]))
        t_hud[f], falls_hud[f] = t_ep, falls
        speed[f] = float(d.qvel[0])  # world +x: the reference walks along +x
        if f % fps == 0:
            print(f'  {f / fps:5.1f} s  x {d.qpos[0]:6.2f} m  speed {speed[f]:5.2f} m/s  falls {falls}')

    out = {
        'version': 1,
        'title': 'Unitree H1 · DeepMimic policy vs reference',
        'source': f'MuJoCo {mujoco.__version__}, checkpoint {os.path.basename(a.ckpt)}, real rollout',
        'fps': fps, 'nframes': n, 'up': 'z', 'follow': 0,
        'meshes': meshes,
        'bodies': [{'name': mujoco.mj_id2name(m, mujoco.mjtObj.mjOBJ_BODY, b), 'geoms': geoms[i]}
                   for i, b in enumerate(bodies)],
        'frames': b64(frames, np.float32), 'ghost': b64(ghost, np.float32),
        'error': b64(err, np.float32), 'error_red': 0.3,
        'hud': {'t': b64(t_hud, np.float32), 'falls': b64(falls_hud, np.float32), 'speed': b64(speed, np.float32)},
    }
    out_path = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', a.out)) \
        if not os.path.isabs(a.out) else a.out
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, 'w') as fh:
        json.dump(out, fh, separators=(',', ':'))
    print(f'wrote {out_path}: {n} frames, {nb} bodies, {len(meshes)} meshes, '
          f'{os.path.getsize(out_path) / 1e6:.1f} MB, {falls} falls')


if __name__ == '__main__':
    main()
