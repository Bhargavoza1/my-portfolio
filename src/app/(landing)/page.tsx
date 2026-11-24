import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import type { Metadata } from 'next'
import ReplayViewer from '@/components/replay/ReplayViewer'
import { Clip, EntryBar, Fig, Page, Rows, SectionHead, Tags } from '@/components/notebook'

export const metadata: Metadata = {
    description:
        'Robotics simulation and reinforcement learning engineer. Crucible, my own GPU physics engine in CUDA C++ and Vulkan, and humanoid imitation learning in MuJoCo MJX and JAX.',
}

const EMAIL = 'ozabhargav41@gmail.com'
const H1_CASE_STUDY = '/projects/h1-deepmimic-silent-failures'
const H1_PAPER = 'https://doi.org/10.5281/zenodo.23150476'
const H1_PDF = '/papers/Oza_2026_Silent_Failures_DeepMimic_H1.pdf'
const H1_CODE = 'https://github.com/Bhargavoza1/h1-imitation-learning'
const GITHUB = 'https://github.com/Bhargavoza1'

const stats: [string, string][] = [
    ['4,096', 'parallel envs, ~8,800 steps/s on one RTX 4070 Ti'],
    ['22', 'silent failures documented in the H1 paper'],
    ['92%', 'cube stacking from 64×64 camera images'],
    ['8× H100', '1B model pretraining'],
]

// "Other entries" cards with their clips. id = anchor, so bhargavoza.com/#skinned-mesh still works.
const otherEntries: { id: string; title: string; text: string; href: string; hrefLabel: string; clips: { src: string; label: string }[]; ratio: string; tags: string[] }[] = [
    {
        id: 'skinned-mesh',
        title: 'Skinned-mesh locomotion and climbing',
        text: 'RL for locomotion and climbing of a skinned-mesh character in Unity ML-Agents. Freelance.',
        href: 'https://x.com/Troniq_/status/2041858132591440148',
        hrefLabel: 'Watch on X',
        clips: [{ src: '/projects/skinned-mesh/climb', label: 'Skinned-mesh character climbing' }],
        ratio: '1100 / 612',
        tags: ['Unity ML-Agents', 'C#', 'RL'],
    },
    {
        id: 'ksim',
        title: 'Humanoid get-up with TQC in K-Sim',
        text: '20-DoF humanoid gets up and stands, TQC in JAX, ~24 h on one RTX 4070 Ti. Balance after standing still in progress.',
        href: 'https://github.com/Bhargavoza1/ksim-tqc-humanoidstanding',
        hrefLabel: 'Code on GitHub',
        clips: [
            { src: '/projects/ksim/1', label: 'Attempt 1' },
            { src: '/projects/ksim/2', label: 'Attempt 2' },
            { src: '/projects/ksim/3', label: 'Attempt 3' },
        ],
        ratio: '640 / 440',
        tags: ['TQC', 'JAX', 'K-Sim'],
    },
]

const checklist = [
    'Every reference pose is reachable by the action space and joint limits.',
    'Check the coordinate frame of every reward and observation term.',
    'For every exp(−α · error) term, α × typical error is of order one.',
    'The reset state is physically consistent.',
    'Evaluate in the same simulation model as training.',
    'Log every reward term, and look at the robot, not only the curve.',
]

const toolbox: [string, string][] = [
    ['Simulation', 'MuJoCo / MJX, Isaac Sim, Isaac Lab, Unity ML-Agents, Unreal Engine 4/5, ROS 1 / ROS 2'],
    ['Reinforcement learning', 'PPO, SAC, TQC, GAIL / AIRL, reward shaping, domain randomization, GRPO'],
    ['Engines and graphics', 'CUDA C++, Vulkan, rigid body dynamics, collision detection, OpenGL, DirectX 12'],
    ['Languages and ML', 'Python, C++, C#, JAX, PyTorch, Stable Baselines3, Hugging Face'],
    ['Hardware', 'Jetson, Raspberry Pi, LiDAR / sonar, Arduino'],
]

function Ext({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
    return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}</a>
}

export default function Home() {
    return (
        <main>
            {/* hero */}
            <section className="grid-paper border-b border-rule">
                <Page className="grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1fr_1.1fr]">
                    <div>
                        <p className="mb-6 inline-flex items-center gap-2 rounded-[3px] border border-rule bg-card px-2.5 py-1 font-mono text-[11px] text-muted">
                            <span className="h-1.5 w-1.5 rounded-full bg-live" />
                            Open to robotics simulation, RL and physical AI roles
                        </p>
                        <h1 className="text-[40px] font-bold leading-[1.08] tracking-tight text-ink md:text-[54px]">
                            I build simulators and teach robots to move in them.
                        </h1>
                        <p className="mt-6 max-w-[540px] text-[16px] leading-7 text-muted">
                            I am Bhargav Oza, a robotics simulation and RL engineer from India. I work with MuJoCo MJX,
                            JAX and CUDA C++. My latest work is Crucible, my own GPU physics engine. Before that, a
                            from-scratch DeepMimic pipeline for the Unitree H1, and a paper on the bugs the reward curve
                            did not show.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link href="/#work" className="btn-dark">See my work</Link>
                            <Ext href={H1_PAPER} className="btn-light">Read the paper</Ext>
                            <Ext href={GITHUB} className="btn-light">GitHub</Ext>
                        </div>
                    </div>
                    <div>
                        <ReplayViewer src="/rollouts/h1_walk.json" label="replay · h1_walk · ckpt 1600"
                                      fallbackVideo="/projects/h1/walk" poster="/projects/h1/walk-poster.jpg" />
                        <Fig n={1}>
                            Real rollout recorded in MuJoCo: the H1 policy (checkpoint 1600) and the reference motion
                            (green ghost). Drag to orbit.
                        </Fig>
                    </div>
                </Page>
            </section>

            {/* stats */}
            <Page className="-mt-px py-8">
                <div className="grid grid-cols-2 divide-rule rounded-[6px] border border-rule bg-card md:grid-cols-4 md:divide-x">
                    {stats.map(([n, t]) => (
                        <div key={n} className="border-rule p-5 [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0">
                            <div className="font-mono text-[24px] text-ink">{n}</div>
                            <div className="mt-1 text-[13px] leading-5 text-muted">{t}</div>
                        </div>
                    ))}
                </div>
            </Page>

            {/* 01 selected work */}
            <section id="work" className="scroll-mt-20 py-12">
                <Page>
                    <SectionHead n="01" title="Selected work" note="Each entry lists the result and the limits." />

                    {/* Crucible */}
                    <article id="crucible" className="card scroll-mt-20 overflow-hidden">
                        <EntryBar left="Entry 002 · Nov 2026 · own engine" status="latest" />
                        <div className="grid lg:grid-cols-2">
                            <div className="border-rule p-4 lg:border-r">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="overflow-hidden rounded-[4px] bg-screen" style={{ aspectRatio: "16 / 9" }}><Clip src="/projects/crucible/stack" label="Two-arm cube stacking" fit="contain" /></div>
                                    <div className="overflow-hidden rounded-[4px] bg-screen" style={{ aspectRatio: "16 / 9" }}><Clip src="/projects/crucible/g1-rough" label="Unitree G1 on rough terrain" fit="contain" /></div>
                                </div>
                                <Fig n={2}>Left: two arms stack cubes from cameras. Right: G1 on rough terrain.</Fig>
                            </div>
                            <div className="p-5 md:p-6">
                                <h3 className="mb-4 text-[22px] font-semibold leading-tight">Crucible: my own GPU physics engine for robot learning</h3>
                                <Rows rows={[
                                    ['GOAL', 'Understand what sits under the simulator by writing it myself.'],
                                    ['BUILT', 'Physics, renderer and RL stack from scratch in CUDA C++ and Vulkan. Up to 2,048 parallel robots with contacts on one GPU.'],
                                    ['RESULT', 'Cube stacking from 64×64 cameras, 92% on new starts. G1 walks and steers on rough terrain.'],
                                    ['LIMITS', 'Simulation only. Not tested on hardware yet.'],
                                ]} />
                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                    <Tags items={['CUDA C++', 'Vulkan', 'PPO', 'imitation learning']} />
                                    <Link href="/projects/crucible" className="link text-[14px]">Read the entry →</Link>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* H1 */}
                    <article id="h1" className="card mt-6 scroll-mt-20 overflow-hidden">
                        <EntryBar left="Entry 001 · Oct 2026 · research preprint" status="complete" />
                        <div className="grid lg:grid-cols-2">
                            <div className="border-rule p-4 lg:border-r">
                                <Link href={H1_CASE_STUDY} className="block overflow-hidden rounded-[4px] bg-screen" style={{ aspectRatio: '620 / 376' }}>
                                    <Clip src="/projects/h1/walk" label="Unitree H1 policy tracking a reference walking motion" />
                                </Link>
                                <Fig n={3}>Unitree H1 policy (solid) tracking the reference walk (green ghost) in MuJoCo.</Fig>
                            </div>
                            <div className="p-5 md:p-6">
                                <h3 className="text-[22px] font-semibold leading-tight">Unitree H1 DeepMimic: silent failures in motion imitation</h3>
                                <p className="mb-4 mt-3 text-[14px] leading-6 text-muted">
                                    DeepMimic from scratch for the full 19-DOF Unitree H1 in MuJoCo MJX and JAX. Training
                                    ran and the reward went up, but the robot still did the wrong thing. The paper
                                    catalogues 22 such failures and the per-joint diagnostic that found them.
                                </p>
                                <Rows rows={[
                                    ['LONGEST CLIP', '14.7 min, no falls'],
                                    ['ONE FIX', 'action scale: 0.74 → 1.26 m/s'],
                                    ['LIMITS', 'Simulation only, one robot, one clip'],
                                ]} />
                                <div className="mt-5 flex flex-wrap gap-2">
                                    <Link href={H1_CASE_STUDY} className="btn-dark">Read the entry</Link>
                                    <Ext href={H1_PAPER} className="btn-light">Paper</Ext>
                                    <Ext href={H1_CODE} className="btn-light">Code</Ext>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* other entries */}
                    <p className="label mb-3 mt-10">Other entries</p>
                    <div className="grid gap-4 md:grid-cols-2">
                        {otherEntries.map((e, k) => (
                            <article key={e.id} id={e.id} className="card flex scroll-mt-20 flex-col p-4">
                                <div className={`grid gap-2 ${e.clips.length > 1 ? 'grid-cols-3' : 'grid-cols-1'}`}>
                                    {e.clips.map(c => (
                                        <div key={c.src}>
                                            <div className="overflow-hidden rounded-[4px] bg-screen" style={{ aspectRatio: e.ratio }}>
                                                <Clip src={c.src} label={`${e.title}, ${c.label}`} />
                                            </div>
                                            {e.clips.length > 1 && <p className="mt-1 text-center font-mono text-[10px] text-faint">{c.label}</p>}
                                        </div>
                                    ))}
                                </div>
                                <Fig n={k + 4}>{e.clips.length > 1 ? 'Three get-up attempts in K-Sim.' : 'The skinned-mesh character climbing in Unity.'}</Fig>
                                <h3 className="mt-3 text-[17px] font-semibold leading-snug">{e.title}</h3>
                                <p className="mt-1 flex-grow text-[14px] leading-6 text-muted">{e.text}</p>
                                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                                    <Tags items={e.tags} />
                                    <Ext href={e.href} className="link text-[14px]">{e.hrefLabel} →</Ext>
                                </div>
                            </article>
                        ))}
                    </div>
                    <Link href="/projects" className="link mt-5 inline-block text-[14px]">All projects →</Link>
                </Page>
            </section>

            {/* 02 research */}
            <section id="research" className="scroll-mt-20 py-12">
                <Page>
                    <SectionHead n="02" title="Research" />
                    <div className="grid gap-8 lg:grid-cols-2">
                        <div>
                            <p className="label">Preprint · Zenodo · Oct 2026 · DOI 10.5281/zenodo.23150476</p>
                            <h3 className="mt-3 text-[22px] font-semibold leading-tight">
                                What the Reward Curve Didn’t Show: Silent Failures in DeepMimic-Style Imitation on the Unitree H1
                            </h3>
                            <p className="mt-2 text-[14px] text-muted">Bhargav Oza · a case study, not a new method</p>
                            <p className="mt-4 text-[15px] leading-7 text-ink">
                                Symptoms that look like reward-design problems in motion imitation are often action-space
                                or data-pipeline bugs, and the aggregate reward cannot tell the two apart. The paper lists
                                the failures, the evidence that exposed each one, and a checklist to run before tuning any
                                reward.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                <Ext href={H1_PAPER} className="btn-dark">Read on Zenodo</Ext>
                                <Ext href={H1_PDF} className="btn-light">Download PDF</Ext>
                            </div>
                        </div>
                        <div className="rounded-[6px] border border-rule bg-[#efefe8] p-5">
                            <p className="label mb-3">From the paper · check before tuning any reward</p>
                            <ol className="list-decimal space-y-2 pl-5 text-[14px] leading-6 marker:font-mono marker:text-faint">
                                {checklist.map(c => <li key={c}>{c}</li>)}
                            </ol>
                        </div>
                    </div>
                </Page>
            </section>

            {/* 03 toolbox */}
            <section id="toolbox" className="scroll-mt-20 py-12">
                <Page>
                    <SectionHead n="03" title="Toolbox" />
                    <dl className="divide-y divide-rule border-b border-rule">
                        {toolbox.map(([k, v]) => (
                            <div key={k} className="grid gap-1 py-3 md:grid-cols-[240px_1fr] md:gap-6">
                                <dt className="label pt-[3px]">{k}</dt>
                                <dd className="text-[14px] leading-6">{v}</dd>
                            </div>
                        ))}
                    </dl>
                    <p className="mt-4 text-[13px] text-muted">
                        Also: pretrained a 1B model on 8 H100 GPUs, fine-tuned a 15B model with GRPO on 8 A6000 GPUs,
                        and ROS navigation and sensor fusion on Jetson robots.
                    </p>
                </Page>
            </section>

            {/* 04 about */}
            <section id="about" className="scroll-mt-20 py-12">
                <Page>
                    <SectionHead n="04" title="About" />
                    <div className="grid gap-8 md:grid-cols-[280px_1fr]">
                        <figure className="mx-auto w-full max-w-[280px] md:mx-0">
                            <div className="relative w-full overflow-hidden rounded-[6px] border border-rule" style={{ aspectRatio: "1 / 1" }}>
                                <Image src="/Bhargav.jpg" alt="Bhargav Oza" fill sizes="280px" className="object-cover" />
                            </div>
                            <figcaption className="mt-2 text-center font-mono text-[11px] text-faint md:text-left">Rajkot, India</figcaption>
                        </figure>
                        <div className="max-w-[640px] space-y-4 text-[15px] leading-7">
                            <p>
                                I am a computer engineer from India (“भारत”), with a B.Tech in Computer Engineering from
                                Marwadi Education, Rajkot. I started in game development, where I learned physics engines,
                                game engines and renderers. That led me to robotics simulation and reinforcement learning.
                            </p>
                            <p>
                                I like building simulators and teaching robots to move in them. Most of the work is
                                finding out what is quietly wrong.
                            </p>
                            <div className="grid grid-cols-[120px_1fr] gap-4 border-t border-rule pt-3 text-[14px]">
                                <span className="label pt-[3px]">Off the clock</span>
                                <span>Synthwave and ambient music, anime, manga and video games.</span>
                            </div>
                        </div>
                    </div>
                </Page>
            </section>

            {/* contact */}
            <section id="contact" className="grid-paper scroll-mt-20 border-t border-rule py-16">
                <Page>
                    <h2 className="max-w-[640px] text-[30px] font-semibold leading-tight tracking-tight md:text-[36px]">
                        Hiring for robotics simulation, RL or physical AI? I’d like to hear about it.
                    </h2>
                    <p className="mt-3 text-[15px] text-muted">The best way to reach me is email.</p>
                    <a href={`mailto:${EMAIL}`} className="btn-dark mt-6 font-mono">{EMAIL}</a>
                    <div className="mt-6 flex gap-6 text-[14px]">
                        <Ext href={GITHUB} className="link">GitHub</Ext>
                        <Ext href={H1_PAPER} className="link">Zenodo</Ext>
                        <Link href="/" className="link">bhargavoza.com</Link>
                    </div>
                </Page>
            </section>
        </main>
    )
}
