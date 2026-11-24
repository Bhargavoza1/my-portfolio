import { getBlogPostsMeta, getProjectPostsMeta } from "@/lib/posts"
import { Row } from "@/components/PostLists"
import { Page } from "@/components/notebook"
import Link from "next/link"

type Props = { params: Promise<{ tag: string }> }

export async function generateStaticParams() {
    const posts = await getBlogPostsMeta()
    const posts2 = await getProjectPostsMeta()
    if (!posts || !posts2) return []
    const tags = new Set([...posts, ...posts2].flatMap(p => p.tags))
    return Array.from(tags).map(tag => ({ tag }))
}

export async function generateMetadata(props: Props) {
    const { tag } = await props.params
    return { title: `Posts about ${decodeURIComponent(tag)}` }
}

export default async function TagPostList(props: Props) {
    const tag = decodeURIComponent((await props.params).tag)
    const blogs = (await getBlogPostsMeta()) ?? []
    const projects = (await getProjectPostsMeta()) ?? []
    const items = [
        ...projects.filter(p => p.tags.includes(tag)).map(p => ({ p, href: `/projects/${p.id}` })),
        ...blogs.filter(p => p.tags.includes(tag)).map(p => ({ p, href: `/blogs/${p.id}` })),
    ]

    return (
        <main>
            <section className="grid-paper border-b border-rule">
                <Page className="py-12">
                    <p className="label">Tag</p>
                    <h1 className="mt-2 font-mono text-[32px] text-accent">#{tag}</h1>
                    <p className="mt-2 font-mono text-[11px] text-faint">{items.length} projects and blogs</p>
                </Page>
            </section>
            <Page className="py-10">
                {items.length ? (
                    <ul className="space-y-3">{items.map(({ p, href }) => <Row key={href} post={p} href={href} />)}</ul>
                ) : (
                    <p className="text-muted">Sorry, nothing for that tag. <Link href="/" className="link">Back to home</Link></p>
                )}
            </Page>
        </main>
    )
}
