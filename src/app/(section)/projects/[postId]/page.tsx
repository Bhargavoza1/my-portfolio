import getFormattedDate from "@/lib/getFormattedDate"
import { getProjectPostByName, getProjectPostsMeta } from "@/lib/posts"
import { notFound } from "next/navigation"
import Link from "next/link"
import React from "react"
import { entries } from "@/content/entries"
import { ArticleBody, Contents, TagLinks } from "@/components/Article"
import { Fig, Page } from "@/components/notebook"
import ReplayViewer from "@/components/replay/ReplayViewer"

type Props = { params: Promise<{ postId: string }> }

export async function generateStaticParams() {
    const posts = await getProjectPostsMeta()
    if (!posts) return []
    return posts.map(post => ({ postId: post.id }))
}

export async function generateMetadata(props: Props) {
    const { postId } = await props.params
    const post = await getProjectPostByName(`${postId}.mdx`)
    if (!post) return { title: 'Post Not Found' }
    return { title: post.meta.title, description: post.meta.description }
}

export default async function Post(props: Props) {
    const { postId } = await props.params
    const post = await getProjectPostByName(`${postId}.mdx`)
    if (!post) notFound()

    const { meta, content, headings } = post
    const e = entries[postId]
    const rows: [string, string][] = [['DATE', getFormattedDate(meta.date)], ...(e?.meta ?? [])]

    return (
        <main>
            <section className="grid-paper border-b border-rule">
                <Page className="py-10 md:py-14">
                    <Link href="/projects" className="link text-[14px]">← All projects</Link>
                    <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                        <div>
                            <p className="label">{e ? `Entry ${e.entry} · ${e.kind}` : "Project"}</p>
                            <h1 className="mt-2 text-[32px] font-bold leading-[1.12] tracking-tight md:text-[42px]">{meta.title}</h1>
                            <p className="mt-4 max-w-[600px] text-[16px] leading-7 text-muted">{meta.description}</p>
                            {e?.links && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {e.links.map((l, i) => {
                                        const ext = l.href.startsWith('http') || l.href.endsWith('.pdf')
                                        return <a key={l.href} href={l.href} className={i === 0 ? 'btn-dark' : 'btn-light'}
                                                  {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{l.label}</a>
                                    })}
                                </div>
                            )}
                        </div>
                        <dl className="card self-start divide-y divide-rule text-[14px]">
                            {rows.map(([k, v]) => (
                                <div key={k} className="grid grid-cols-[100px_1fr] gap-3 px-4 py-2.5">
                                    <dt className={`label pt-[3px] ${k === 'SCOPE' ? '!text-limit' : ''}`}>{k}</dt>
                                    <dd>{v}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </Page>
            </section>

            {e?.replay && (
                <Page className="pt-10">
                    <ReplayViewer src={e.replay.src} label={e.replay.label} fallbackVideo={e.replay.video}
                                  poster={e.replay.poster} height="h-[380px] md:h-[520px]" />
                    <Fig n={1}>{e.replay.caption}</Fig>
                </Page>
            )}

            <Page className="grid gap-10 py-12 lg:grid-cols-[200px_minmax(0,760px)]">
                <Contents headings={headings} />
                <div>
                    <ArticleBody>{content}</ArticleBody>
                    <TagLinks tags={meta.tags} />
                    <div className="mt-10 flex items-end justify-between border-t border-rule pt-5">
                        <div>
                            <p className="label">← Back</p>
                            <Link href="/projects" className="link text-[14px]">All projects</Link>
                        </div>
                        <div className="text-right">
                            <p className="label">Questions about this work?</p>
                            <a href="mailto:ozabhargav41@gmail.com" className="link text-[14px]">Email me →</a>
                        </div>
                    </div>
                </div>
            </Page>
        </main>
    )
}
