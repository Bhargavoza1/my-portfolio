import React from 'react'
import type { Metadata } from 'next'
import { getBlogPostsMeta } from '@/lib/posts'
import { NotesList } from '@/components/PostLists'
import { Page } from '@/components/notebook'

export const metadata: Metadata = {
    title: 'Notes',
    description: 'Notes by Bhargav Oza: technology, thoughts and stories.',
}

export default async function Notes() {
    const posts = await getBlogPostsMeta()
    return (
        <main>
            <section className="grid-paper border-b border-rule">
                <Page className="py-12 md:py-16">
                    <p className="label">Notes</p>
                    <h1 className="mt-2 text-[40px] font-bold tracking-tight md:text-[48px]">Blog</h1>
                    <p className="mt-3 text-[16px] leading-7 text-muted">Technology, thoughts and stories.</p>
                    {posts && <p className="mt-4 font-mono text-[11px] text-faint">{posts.length} notes · newest first · page 1 of 1</p>}
                </Page>
            </section>
            <Page className="py-10">
                {posts ? <NotesList posts={posts} /> : <p className="text-muted">Sorry, no notes available.</p>}
            </Page>
        </main>
    )
}
