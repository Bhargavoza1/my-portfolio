import { getIsoDate } from "@/lib/getFormattedDate"
import { getBlogPostByName, getBlogPostsMeta } from "@/lib/posts"
import { notFound } from "next/navigation"
import Link from "next/link"
import React from "react"
import { ArticleBody, Contents } from "@/components/Article"
import { Page } from "@/components/notebook"

type Props = { params: Promise<{ postId: string }> }

export async function generateStaticParams() {
    const posts = await getBlogPostsMeta()
    if (!posts) return []
    return posts.map(post => ({ postId: post.id }))
}

export async function generateMetadata(props: Props) {
    const { postId } = await props.params
    const post = await getBlogPostByName(`${decodeURIComponent(postId)}.mdx`)
    if (!post) return { title: 'Post Not Found' }
    return { title: post.meta.title, description: post.meta.description }
}

export default async function Note(props: Props) {
    const { postId } = await props.params
    const id = decodeURIComponent(postId)
    const post = await getBlogPostByName(`${id}.mdx`)
    if (!post) notFound()

    const { meta, content, headings } = post
    const more = ((await getBlogPostsMeta()) ?? []).filter(p => p.id !== id).slice(0, 2)
    const tags = meta.tags.filter(t => t !== 'blog')

    return (
        <main>
            <section className="grid-paper border-b border-rule">
                <Page className="py-10 md:py-14">
                    <div className="max-w-[760px] lg:ml-[240px]">
                        <Link href="/blogs" className="link text-[14px]">← All notes</Link>
                        <p className="label mt-6">Note · {getIsoDate(meta.date)} · ~{meta.minutes} min read</p>
                        <h1 className="mt-2 text-[32px] font-bold leading-[1.12] tracking-tight md:text-[42px]">{meta.title}</h1>
                        <p className="mt-4 text-[16px] leading-7 text-muted">{meta.description}</p>
                        <div className="mt-3 flex flex-wrap gap-x-3">
                            {tags.map(t => <Link key={t} href={`/tags/${t}`} className="tag hover:underline">#{t}</Link>)}
                        </div>
                    </div>
                </Page>
            </section>

            <Page className="grid gap-10 py-12 lg:grid-cols-[200px_minmax(0,760px)]">
                <Contents headings={headings} />
                <div>
                    <ArticleBody>{content}</ArticleBody>
                    <div className="mt-12 flex items-center gap-3 border-t border-rule pt-5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-mono text-[12px] text-white">BO</div>
                        <div>
                            <p className="text-[14px] font-semibold">Bhargav Oza</p>
                            <p className="text-[13px] text-muted">Robotics simulation and RL engineer</p>
                        </div>
                    </div>
                </div>
            </Page>

            {more.length > 0 && (
                <Page className="pb-16">
                    <p className="label mb-3">More notes</p>
                    <div className="grid gap-3 md:grid-cols-2">
                        {more.map(p => (
                            <Link key={p.id} href={`/blogs/${p.id}`} className="card p-4 hover:border-ink">
                                <p className="font-mono text-[11px] text-faint">{getIsoDate(p.date)}</p>
                                <p className="mt-1 text-[15px] font-semibold">{p.title}</p>
                            </Link>
                        ))}
                    </div>
                </Page>
            )}
        </main>
    )
}
