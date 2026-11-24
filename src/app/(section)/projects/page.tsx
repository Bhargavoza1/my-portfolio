import React from 'react'
import type { Metadata } from 'next'
import { getProjectPostsMeta } from '@/lib/posts'
import { ProjectIndex } from '@/components/PostLists'
import { Page } from '@/components/notebook'

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Robotics simulation, reinforcement learning and engine projects by Bhargav Oza.',
}

export default async function Projects() {
    const posts = await getProjectPostsMeta()
    return (
        <main>
            <section className="grid-paper border-b border-rule">
                <Page className="py-12 md:py-16">
                    <p className="label">Index of entries</p>
                    <h1 className="mt-2 text-[40px] font-bold tracking-tight md:text-[48px]">Projects</h1>
                    <p className="mt-3 max-w-[560px] text-[16px] leading-7 text-muted">
                        Robotics simulation, reinforcement learning and engine projects. The newest work is listed first.
                    </p>
                </Page>
            </section>
            <Page className="pb-16 pt-2">
                {posts ? <ProjectIndex posts={posts} /> : <p className="mt-10 text-muted">Sorry, no entries available.</p>}
            </Page>
        </main>
    )
}
