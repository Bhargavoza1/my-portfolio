// Extra data for project entries that the MDX frontmatter does not carry:
// the entry number, status, the meta table on the right of the entry page,
// buttons and an optional 3D replay. Key = MDX file name without .mdx.
export type EntryInfo = {
    entry: string
    kind: string                       // "own engine", "research preprint"
    status: string                     // "latest", "complete"
    meta: [string, string][]           // DATE row is added from the frontmatter
    links?: { label: string, href: string }[]
    replay?: { src: string, label: string, video?: string, poster?: string, caption: string }
}

export const entries: Record<string, EntryInfo> = {
    'crucible': {
        entry: '002',
        kind: 'own engine',
        status: 'latest',
        meta: [
            ['STATUS', 'Ongoing'],
            ['ROBOTS', 'Two robot arms, Unitree G1'],
            ['STACK', 'CUDA C++, Vulkan, PPO, imitation learning'],
            ['COMPUTE', 'Up to 2,048 envs, 1× RTX 4070 Ti'],
            ['SCOPE', 'Simulation only. Not tested on hardware yet'],
        ],
        links: [{ label: 'Demo clips', href: '/#crucible' }],
    },
    'h1-deepmimic-silent-failures': {
        entry: '001',
        kind: 'research preprint',
        status: 'complete',
        meta: [
            ['STATUS', 'Complete · preprint published'],
            ['ROBOT', 'Unitree H1, 19 DOF (10 leg, 1 torso, 8 arm)'],
            ['STACK', 'MuJoCo MJX, JAX, PPO'],
            ['COMPUTE', '4,096 envs, ~8,800 steps/s, 1× RTX 4070 Ti'],
            ['SCOPE', 'Case study. Simulation only, one robot, one clip'],
        ],
        links: [
            { label: 'Paper on Zenodo', href: 'https://doi.org/10.5281/zenodo.23150476' },
            { label: 'Download PDF', href: '/papers/Oza_2026_Silent_Failures_DeepMimic_H1.pdf' },
            { label: 'Code on GitHub', href: 'https://github.com/Bhargavoza1/h1-imitation-learning' },
        ],
        replay: {
            src: '/rollouts/h1_walk.json',
            label: 'debug view · policy vs reference · ckpt 1600',
            video: '/projects/h1/walk',
            poster: '/projects/h1/walk-poster.jpg',
            caption: 'Real rollout recorded in MuJoCo: trained policy (solid) and reference motion (green ghost). Turn on the heatmap to color each body by its distance to the reference.',
        },
    },
}

export const isRobotics = (tags: string[]) => tags.includes('robotics')
