import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import localFont from 'next/font/local'
import type { Metadata } from 'next'

import SocialMedia from '@/components/SocialMedia'
import styles from '@/app/(section)/about/page.module.css'

const myfont = localFont({ src: '../../components/fonts/OTF/Satoshi-Bold.otf' })

export const metadata: Metadata = {
    description:
        'Robotics simulation and reinforcement learning engineer. Humanoid imitation learning in MuJoCo MJX and JAX, GPU physics engines in CUDA C++.',
}

const EMAIL = 'ozabhargav41@gmail.com'
const H1_CASE_STUDY = '/projects/h1-deepmimic-silent-failures'
const H1_PAPER = 'https://doi.org/10.5281/zenodo.23150476'
const H1_PDF = '/papers/Oza_2026_Silent_Failures_DeepMimic_H1.pdf'
const H1_CODE = 'https://github.com/Bhargavoza1/h1-imitation-learning'

const btnPrimary =
    'inline-block rounded-md bg-MyRed px-5 py-3 text-base md:text-lg text-white hover:opacity-90 transition-opacity'
const btnGhost =
    'inline-block rounded-md border border-gray-600 px-5 py-3 text-base md:text-lg text-gray-200 hover:border-MyBlue hover:text-MyBlue transition-colors'

function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
    return (
        <div className="mb-10">
            <h2 className="inline-block border-b-[6px] border-MyBlue pb-1 text-4xl md:text-5xl font-extrabold tracking-tight">
                {children}
            </h2>
            {sub && <p className="mt-4 max-w-3xl text-lg md:text-xl text-gray-400">{sub}</p>}
        </div>
    )
}

function Chip({ children }: { children: React.ReactNode }) {
    return (
        <span className="rounded-full border border-gray-700 px-3 py-1 text-sm text-gray-300">
            {children}
        </span>
    )
}

const otherProjects = [
    {
        status: 'Open source / bounty work',
        title: 'Humanoid standing with TQC in K-Sim',
        text: 'Trained a humanoid to stand using TQC in the K-Sim simulator, as an open-source contribution and bounty work for K-Scale.',
        tags: ['TQC', 'Humanoid', 'K-Sim'],
    },
    {
        status: 'Freelance',
        title: 'Skinned-mesh locomotion and climbing',
        text: 'Reinforcement learning for locomotion and climbing of a skinned-mesh character, built with Unity ML-Agents.',
        tags: ['Unity ML-Agents', 'C#', 'RL'],
    },
    {
        status: 'In progress',
        title: 'GPU physics engine from scratch',
        text: 'A physics engine in CUDA C++ with a Vulkan renderer. The goal is parallel environments for RL training of any robot, through articulated body dynamics.',
        tags: ['CUDA C++', 'Vulkan', 'Rigid body dynamics'],
    },
]

const whatIDo = [
    {
        title: 'Simulation and RL for robots',
        text: 'Humanoid imitation and locomotion in MuJoCo MJX, Isaac Sim and Unity. Reward design, curriculum and, above all, finding out why a policy that looks fine on paper does the wrong thing.',
    },
    {
        title: 'Physics and rendering engines',
        text: 'Rigid body dynamics, collision detection and rendering written from scratch in CUDA C++ and Vulkan, so that I understand what sits under the simulator.',
    },
    {
        title: 'Training at scale',
        text: 'Pretrained a 1B-parameter model on 8 H100 GPUs and fine-tuned a 15B model with GRPO on 8 A6000 GPUs. Day to day I train on a single RTX 4070 Ti with JAX.',
    },
    {
        title: 'On real robots',
        text: 'ROS navigation and sensor fusion on Jetson-based robots. My RL work so far is in simulation, and I want to take it to hardware.',
    },
]

const skills: { group: string; items: string[] }[] = [
    {
        group: 'Simulation',
        items: ['MuJoCo / MJX', 'Isaac Sim', 'Isaac Lab', 'Unity ML-Agents', 'Unreal Engine 4/5', 'ROS 1 / ROS 2'],
    },
    {
        group: 'Reinforcement learning',
        items: ['PPO', 'SAC', 'TQC', 'GAIL / AIRL', 'Reward shaping', 'Domain randomization', 'GRPO'],
    },
    {
        group: 'Engines and graphics',
        items: ['CUDA C++', 'Vulkan', 'Rigid body dynamics', 'Collision detection', 'OpenGL', 'DirectX 12'],
    },
    {
        group: 'Languages and ML',
        items: ['Python', 'C++', 'CUDA C++', 'C#', 'JAX', 'PyTorch', 'Stable Baselines3', 'Hugging Face'],
    },
    {
        group: 'Hardware',
        items: ['Jetson', 'Raspberry Pi', 'LiDAR / sonar', 'Arduino'],
    },
]

export default function Home() {
    return (
        <div>
            {/* hero */}
            <section id="home" className="min-h-screen flex items-center pt-28 pb-16">
                <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-MyBlue text-base md:text-lg tracking-widest uppercase mb-4" style={myfont.style}>
                            Robotics simulation and RL engineer
                        </p>
                        <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight" style={myfont.style}>
                            I train humanoid robots <span className="text-MyRed">in simulation</span>
                            <span className="text-gray-300"> and build the engines they train in.</span>
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-400">
                            Hi, I am Bhargav Oza. I work with MuJoCo MJX, JAX and CUDA C++. My latest work is a
                            from-scratch DeepMimic pipeline for the Unitree H1 humanoid, and a paper on the bugs that
                            the reward curve did not show.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link href={H1_CASE_STUDY} className={btnPrimary}>
                                See the H1 project
                            </Link>
                            <Link href="/#projects" className={btnGhost}>
                                All selected work
                            </Link>
                            <a href={`mailto:${EMAIL}`} className={btnGhost}>
                                Email me
                            </a>
                        </div>
                        <div className="mt-8">
                            <SocialMedia MyColor="#58cee3" />
                        </div>
                    </div>

                    <Link href={H1_CASE_STUDY} className="block group">
                        <div className="relative w-full aspect-[1500/1112] overflow-hidden rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
                            <Image
                                src="/projects/h1/hero.jpg"
                                alt="Unitree H1 humanoid (black) walking next to its reference motion (transparent green) in MuJoCo"
                                fill
                                priority
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                        <p className="mt-3 text-sm md:text-base text-gray-400">
                            Trained policy (black) next to the reference motion (green) in MuJoCo.
                        </p>
                    </Link>
                </div>
            </section>

            {/* selected work */}
            <section id="projects" className="scroll-mt-24 bg-gray-900 py-20">
                <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
                    <SectionTitle sub="A few things I built, with the results and the limits.">
                        Selected work
                    </SectionTitle>

                    {/* featured: H1 */}
                    <article className="grid lg:grid-cols-5 gap-8 rounded-lg border border-gray-700 p-5 md:p-8">
                        <Link href={H1_CASE_STUDY} className="lg:col-span-2 block">
                            <div className="relative w-full aspect-[1500/1112] overflow-hidden rounded-md">
                                <Image
                                    src="/projects/h1/hero.jpg"
                                    alt="Unitree H1 policy tracking a reference walking motion"
                                    fill
                                    sizes="(min-width: 1024px) 40vw, 100vw"
                                    className="object-cover"
                                />
                            </div>
                        </Link>
                        <div className="lg:col-span-3">
                            <p className="text-MyYellow text-sm tracking-widest uppercase mb-2">
                                Featured. Research preprint, Oct 2026
                            </p>
                            <h3 className="text-2xl md:text-4xl font-extrabold" style={myfont.style}>
                                Unitree H1 DeepMimic: silent failures in motion imitation
                            </h3>
                            <p className="mt-4 text-lg text-gray-300">
                                I reimplemented DeepMimic from scratch for the full 19-DOF Unitree H1 in MuJoCo MJX
                                and JAX. Training ran and the reward went up, but the robot still did the wrong thing.
                                The paper catalogues 22 such failures and a per-joint diagnostic that found them.
                            </p>
                            <ul className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-base md:text-lg text-gray-300 list-disc list-inside">
                                <li>Walks a 14.7 minute reference clip with no falls</li>
                                <li>Walking speed 0.74 to 1.26 m/s from one action-scale fix</li>
                                <li>4,096 parallel environments at about 8,800 steps/s on one RTX 4070 Ti</li>
                                <li>Plain DeepMimic reward is enough once the bugs are fixed</li>
                            </ul>
                            <div className="mt-5 flex flex-wrap gap-2">
                                <Chip>MuJoCo MJX</Chip>
                                <Chip>JAX</Chip>
                                <Chip>PPO</Chip>
                                <Chip>Imitation learning</Chip>
                                <Chip>Simulation only</Chip>
                            </div>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link href={H1_CASE_STUDY} className={btnPrimary}>
                                    Read the case study
                                </Link>
                                <a href={H1_PAPER} className={btnGhost} target="_blank" rel="noopener noreferrer">
                                    Paper (Zenodo)
                                </a>
                                <a href={H1_CODE} className={btnGhost} target="_blank" rel="noopener noreferrer">
                                    Code
                                </a>
                            </div>
                        </div>
                    </article>

                    {/* other projects */}
                    <div className="mt-8 grid md:grid-cols-3 gap-6">
                        {otherProjects.map(p => (
                            <article key={p.title} className="rounded-lg border border-gray-700 p-6 flex flex-col">
                                <p className="text-MyBlue text-xs md:text-sm tracking-widest uppercase mb-2">{p.status}</p>
                                <h3 className="text-xl md:text-2xl font-extrabold" style={myfont.style}>
                                    {p.title}
                                </h3>
                                <p className="mt-3 text-base md:text-lg text-gray-400 flex-grow">{p.text}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {p.tags.map(t => (
                                        <Chip key={t}>{t}</Chip>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link href="/projects" className={btnGhost}>
                            All projects
                        </Link>
                        <a
                            href="https://github.com/Bhargavoza1"
                            className={btnGhost}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            More on GitHub
                        </a>
                    </div>
                </div>
            </section>

            {/* what I do */}
            <section id="what-i-do" className="scroll-mt-24 py-20">
                <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
                    <SectionTitle>What I do</SectionTitle>
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                        {whatIDo.map(w => (
                            <div key={w.title}>
                                <h3 className="text-xl md:text-2xl font-extrabold text-MyBlue" style={myfont.style}>
                                    {w.title}
                                </h3>
                                <p className="mt-2 text-base md:text-lg text-gray-400">{w.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* skills */}
            <section id="skills" className="scroll-mt-24 bg-gray-900 py-20">
                <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
                    <SectionTitle>Skills</SectionTitle>
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-8">
                        {skills.map(s => (
                            <div key={s.group}>
                                <h3 className="text-lg md:text-xl text-MyRed mb-3" style={myfont.style}>
                                    {s.group}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {s.items.map(i => (
                                        <Chip key={i}>{i}</Chip>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-8 text-base text-gray-500">
                        Also: multi-GPU training, Docker, Azure / AWS.
                    </p>
                </div>
            </section>

            {/* research */}
            <section id="research" className="scroll-mt-24 py-20">
                <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
                    <SectionTitle>Research</SectionTitle>
                    <div className="max-w-4xl">
                        <h3 className="text-2xl md:text-3xl font-extrabold" style={myfont.style}>
                            What the Reward Curve Didn’t Show: Silent Failures in DeepMimic-Style Imitation on the
                            Unitree H1
                        </h3>
                        <p className="mt-2 text-base text-gray-500">
                            Bhargav Oza. Preprint on Zenodo, October 2026. A case study, not a new method.
                        </p>
                        <p className="mt-4 text-lg text-gray-400">
                            Symptoms that look like reward-design problems in motion imitation are often action-space
                            or data-pipeline bugs, and the aggregate reward cannot tell the two apart. The paper lists
                            the failures with the evidence that exposed each one, and gives a checklist to run before
                            tuning any reward.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <a href={H1_PAPER} className={btnPrimary} target="_blank" rel="noopener noreferrer">
                                Read on Zenodo
                            </a>
                            <a href={H1_PDF} className={btnGhost} target="_blank" rel="noopener noreferrer">
                                Download PDF
                            </a>
                            <Link href={H1_CASE_STUDY} className={btnGhost}>
                                Project summary
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* about */}
            <section id="about" className="scroll-mt-24 bg-gray-900 py-20">
                <div className="mx-auto max-w-[1500px] px-5 sm:px-8 grid md:grid-cols-3 gap-12 items-center">
                    <div className="flex justify-center">
                        <div className="relative h-[260px] w-[260px] md:h-[320px] md:w-[320px]">
                            <Image
                                className="z-10 shadow object-cover"
                                src="/Bhargav.jpg"
                                fill
                                sizes="320px"
                                alt="Bhargav Oza"
                            />
                            <div
                                className={`${styles.imageva} h-full w-full top-5 left-5 shadow-[4px_8px_8px_rgba(0,0,0,0.38)] shadow-gray-950`}
                            ></div>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <SectionTitle>About</SectionTitle>
                        <p className="text-lg md:text-xl text-gray-400">
                            I am a computer engineer from India (“<span className="font-extrabold text-white">भारत</span>
                            ”), with a B.Tech in Computer Engineering from Marwadi Education, Rajkot. I like building
                            simulators and teaching robots to move in them, and I have been doing it long enough to
                            know that most of the work is finding out what is quietly wrong.
                        </p>
                        <p className="mt-4 text-lg md:text-xl text-gray-400">
                            Outside work I listen to synthwave and ambient music, watch anime, read manga and play
                            video games.
                        </p>
                    </div>
                </div>
            </section>

            {/* contact */}
            <section id="contact" className="scroll-mt-24 py-20">
                <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
                    <SectionTitle sub="I am looking for robotics simulation, reinforcement learning and physical AI roles. The best way to reach me is email.">
                        Contact
                    </SectionTitle>
                    <a
                        href={`mailto:${EMAIL}`}
                        className="text-2xl md:text-4xl font-extrabold text-MyRed hover:underline break-all"
                        style={myfont.style}
                    >
                        {EMAIL}
                    </a>
                    <div className="mt-8">
                        <SocialMedia MyColor="#d43256" />
                    </div>
                </div>
            </section>
        </div>
    )
}
