"use client"
// three.js replay of a real recorded rollout (written by tools/export_h1_rollout.py).
// Robot = body poses per frame. Ghost = the reference motion (green, see-through).
// Heatmap = robot bodies colored green -> red by their distance to the reference.
import * as THREE from "three"
import {Canvas, useFrame, useThree} from "@react-three/fiber"
import {OrbitControls} from "@react-three/drei"
import {useEffect, useMemo, useRef} from "react"
import type {OrbitControls as OrbitImpl} from "three-stdlib"

export type Rollout = {
    fps: number
    nframes: number
    follow: number
    error_red: number
    meshes: { positions: string, indices: string }[]
    bodies: { name: string, geoms: { mesh: number, pos: number[], quat: number[], color: number[] }[] }[]
    frames: Float32Array   // [N][nbody][7]
    ghost: Float32Array    // [N][nbody][7]
    error: Float32Array    // [N][nbody]
    hud: { t: Float32Array, falls: Float32Array, speed: Float32Array }
}

export type ViewState = {
    frame: number          // float frame index, written by the player
    ghost: boolean
    heat: boolean
    follow: boolean        // side camera that follows the pelvis
}

function f16ToF32(h: Uint16Array) {
    const out = new Float32Array(h.length)
    for (let i = 0; i < h.length; i++) {
        const x = h[i], s = (x & 0x8000) ? -1 : 1, e = (x >> 10) & 0x1f, f = x & 0x3ff
        out[i] = e === 0 ? s * 2 ** -14 * (f / 1024) : e === 31 ? (f ? NaN : s * Infinity) : s * 2 ** (e - 15) * (1 + f / 1024)
    }
    return out
}

export function b64bytes(s: string) {
    const bin = atob(s), u = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i)
    return u.buffer
}

const GREEN = new THREE.Color("#2fb67c"), RED = new THREE.Color("#d8453b")

function Bodies({r, view, isGhost}: { r: Rollout, view: React.MutableRefObject<ViewState>, isGhost: boolean }) {
    const geos = useMemo(() => r.meshes.map(m => {
        const g = new THREE.BufferGeometry()
        g.setAttribute("position", new THREE.BufferAttribute(f16ToF32(new Uint16Array(b64bytes(m.positions))), 3))
        g.setIndex(new THREE.BufferAttribute(new Uint16Array(b64bytes(m.indices)), 1))
        g.computeVertexNormals()
        return g
    }), [r])
    const groups = useRef<(THREE.Group | null)[]>([])
    // one material per body so the heatmap can color each body
    const mats = useMemo(() => r.bodies.map(b => isGhost
        ? new THREE.MeshStandardMaterial({color: "#35c486", transparent: true, opacity: 0.28, depthWrite: false})
        : new THREE.MeshStandardMaterial({roughness: 0.55, metalness: 0.1})
    ), [r, isGhost])
    // MJCF colors are near black; lift them so the robot reads on the dark background
    const base = useMemo(() => r.bodies.map(b => new THREE.Color(...(b.geoms[0]?.color ?? [0.3, 0.3, 0.3]) as [number, number, number]).lerp(new THREE.Color("#c3c7cf"), 0.6)), [r])
    const nb = r.bodies.length

    useFrame(() => {
        const v = view.current, src = isGhost ? r.ghost : r.frames
        const f = Math.min(r.nframes - 1, Math.max(0, Math.floor(v.frame)))
        for (let i = 0; i < nb; i++) {
            const g = groups.current[i]
            if (!g) continue
            g.visible = isGhost ? v.ghost : true
            const o = (f * nb + i) * 7
            g.position.set(src[o], src[o + 1], src[o + 2])
            g.quaternion.set(src[o + 4], src[o + 5], src[o + 6], src[o + 3])  // file is w x y z
            if (!isGhost) {
                const m = mats[i]
                if (v.heat) m.color.copy(GREEN).lerp(RED, Math.min(1, r.error[f * nb + i] / r.error_red))
                else m.color.copy(base[i])
            }
        }
    })

    return <>{r.bodies.map((b, i) => (
        <group key={i} ref={el => { groups.current[i] = el }}>
            {b.geoms.map((gm, j) => (
                <mesh key={j} geometry={geos[gm.mesh]} material={mats[i]} castShadow={!isGhost}
                      position={gm.pos as [number, number, number]}
                      quaternion={new THREE.Quaternion(gm.quat[1], gm.quat[2], gm.quat[3], gm.quat[0])}/>
            ))}
        </group>
    ))}</>
}

// Free orbit: the target follows the pelvis so the robot stays in view.
// Follow cam: fixed side view next to the pelvis.
function CameraRig({r, view, controls}: { r: Rollout, view: React.MutableRefObject<ViewState>, controls: React.RefObject<OrbitImpl | null> }) {
    const {camera} = useThree()
    const last = useRef<THREE.Vector3 | null>(null)
    useFrame(() => {
        const f = Math.min(r.nframes - 1, Math.max(0, Math.floor(view.current.frame)))
        const o = (f * r.bodies.length + r.follow) * 7
        const p = new THREE.Vector3(r.frames[o], r.frames[o + 1], 0.9)
        const c = controls.current
        if (view.current.follow) {
            camera.position.set(p.x + 0.6, p.y - 3.4, 1.25)
            if (c) c.target.copy(p)
            camera.lookAt(p)
        } else if (c) {
            if (!last.current) {   // first frame: start beside the robot
                last.current = p.clone()
                camera.position.set(p.x + 2.3, p.y - 3.0, 1.5)
            }
            const d = p.clone().sub(last.current)
            if (d.length() < 2) camera.position.add(d)   // no jump when the episode resets
            c.target.copy(p)
            c.update()
        }
        last.current = p
    })
    return null
}

export default function ReplayScene({r, view}: { r: Rollout, view: React.MutableRefObject<ViewState> }) {
    const controls = useRef<OrbitImpl | null>(null)
    useEffect(() => { THREE.Object3D.DEFAULT_UP.set(0, 0, 1) }, [])
    return (
        <Canvas shadows="basic" dpr={[1, 2]} camera={{position: [2.6, -3.2, 1.6], fov: 40, near: 0.05, far: 200, up: [0, 0, 1]}}
                gl={{antialias: true}} onCreated={({scene}) => { scene.background = new THREE.Color("#1b1e24") }}>
            <hemisphereLight args={["#ffffff", "#40444c", 1.1]}/>
            <directionalLight position={[3, -4, 6]} intensity={1.6} castShadow
                              shadow-mapSize={[1024, 1024]} shadow-camera-left={-4} shadow-camera-right={4}
                              shadow-camera-top={4} shadow-camera-bottom={-4}/>
            {/* MuJoCo is z-up: the grid helper is y-up, so turn it flat */}
            <gridHelper args={[200, 200, "#3a3f48", "#2a2e35"]} rotation={[Math.PI / 2, 0, 0]} position={[50, 0, 0]}/>
            <mesh receiveShadow position={[50, 0, -0.001]}>
                <planeGeometry args={[200, 200]}/>
                <shadowMaterial opacity={0.35}/>
            </mesh>
            <Bodies r={r} view={view} isGhost={false}/>
            <Bodies r={r} view={view} isGhost={true}/>
            <CameraRig r={r} view={view} controls={controls}/>
            <OrbitControls ref={controls} enablePan={false} minDistance={1.2} maxDistance={12} maxPolarAngle={Math.PI * 0.49}/>
        </Canvas>
    )
}
