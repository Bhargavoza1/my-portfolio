"use client"
import Image from "next/image"
import Link from "next/link"
import {useState} from "react"
import getFormattedDate, {getIsoDate, getYear} from "@/lib/getFormattedDate"
import {entries, isRobotics} from "@/content/entries"

function TagLine({tags}: { tags: string[] }) {
    return <p className="font-mono text-[12px] text-accent">{tags.filter(t => t !== "project" && t !== "blog").map(t => `#${t}`).join(" ")}</p>
}

function Thumb({src, className}: { src: string, className: string }) {
    return (
        <div className={`relative shrink-0 overflow-hidden rounded-[4px] border border-rule bg-[#efefe8] ${className}`}>
            {src && <Image src={src} alt="" fill sizes="(min-width: 640px) 200px, 100vw" className="object-cover"/>}
        </div>
    )
}

export function Row({post, href}: { post: Meta, href: string }) {
    return (
        <li>
            <Link href={href} className="card group flex flex-col gap-3 p-3 hover:border-ink sm:flex-row sm:items-center sm:gap-4">
                {/* phones: full-width cover like the blog list; bigger screens: small thumbnail */}
                <Thumb src={post.image} className="h-[150px] w-full sm:h-[64px] sm:w-[104px]"/>
                <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] text-faint">{getFormattedDate(post.date)}</p>
                    <h3 className="text-[15px] font-semibold leading-snug">{post.title}</h3>
                    <p className="mt-0.5 line-clamp-2 text-[13px] leading-5 text-muted">{post.description}</p>
                    <div className="mt-1"><TagLine tags={post.tags}/></div>
                </div>
                <span className="hidden px-2 text-faint group-hover:text-ink sm:inline">→</span>
            </Link>
        </li>
    )
}

function BigCard({post}: { post: Meta }) {
    const e = entries[post.id]
    return (
        <Link href={`/projects/${post.id}`} className="card group grid overflow-hidden hover:border-ink md:grid-cols-[1.25fr_1fr]">
            <div className="relative min-h-[220px] bg-screen">
                {post.image && <Image src={post.image} alt="" fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover"/>}
            </div>
            <div className="p-5 md:p-6">
                <p className="label">{e ? `Entry ${e.entry} · ` : ""}{getFormattedDate(post.date)}{e ? ` · ${e.status}` : ""}</p>
                <h3 className="mt-2 text-[20px] font-semibold leading-tight">{post.title}</h3>
                <p className="mt-3 text-[14px] leading-6 text-muted">{post.description}</p>
                <div className="mt-3"><TagLine tags={post.tags}/></div>
                <p className="link mt-4 text-[14px]">Read the entry →</p>
            </div>
        </Link>
    )
}

export const PER_PAGE = 10

function usePage(total: number) {
    const [page, setPage] = useState(1)
    const pages = Math.max(1, Math.ceil(total / PER_PAGE))
    const cur = Math.min(page, pages)
    const go = (p: number) => {
        setPage(p)
        window.scrollTo({top: 0, behavior: "smooth"})
    }
    return {page: cur, pages, go, setPage, from: (cur - 1) * PER_PAGE, to: cur * PER_PAGE}
}

// "← prev · 1 2 3 · next →", shown only when there is more than one page
function Pager({count, noun, page, pages, go}: { count: number, noun: string, page: number, pages: number, go: (p: number) => void }) {
    const btn = "rounded-[4px] border px-3 py-1.5 font-mono text-[12px] disabled:cursor-not-allowed disabled:opacity-30"
    return (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[11px] text-faint">{count} {noun} · page {page} of {pages}</p>
            {pages > 1 && (
                <nav className="flex flex-wrap items-center gap-1.5" aria-label="Pages">
                    <button className={`${btn} border-rule bg-card text-ink hover:border-ink`} disabled={page === 1} onClick={() => go(page - 1)}>← prev</button>
                    {Array.from({length: pages}, (_, i) => i + 1).map(p => (
                        <button key={p} onClick={() => go(p)} aria-current={p === page ? "page" : undefined}
                                className={`${btn} ${p === page ? "border-ink bg-ink text-white" : "border-rule bg-card text-ink hover:border-ink"}`}>{p}</button>
                    ))}
                    <button className={`${btn} border-rule bg-card text-ink hover:border-ink`} disabled={page === pages} onClick={() => go(page + 1)}>next →</button>
                </nav>
            )}
        </div>
    )
}

const FILTERS = ["All", "Robotics and RL", "Deep learning and LLM"] as const

export function ProjectIndex({posts}: { posts: Meta[] }) {
    const [filter, setFilter] = useState<typeof FILTERS[number]>("All")
    const robo = posts.filter(p => isRobotics(p.tags))
    const other = posts.filter(p => !isRobotics(p.tags))
    const showRobo = filter !== "Deep learning and LLM", showOther = filter !== "Robotics and RL"
    // robotics entries first, then the rest; the page takes a slice of that order
    const list = [...(showRobo ? robo : []), ...(showOther ? other : [])]
    const pg = usePage(list.length)
    const slice = list.slice(pg.from, pg.to)
    const pageRobo = slice.filter(p => isRobotics(p.tags)), pageOther = slice.filter(p => !isRobotics(p.tags))
    const years = (ps: Meta[]) => Array.from(new Set(ps.map(p => getYear(p.date)))).sort().reverse().join("–")

    return (
        <>
            <div className="mt-6 flex flex-wrap gap-2">
                {FILTERS.map(f => (
                    <button key={f} onClick={() => { setFilter(f); pg.setPage(1) }}
                            className={`rounded-[4px] border px-3 py-1.5 font-mono text-[12px] ${filter === f ? "border-ink bg-ink text-white" : "border-rule bg-card text-ink hover:border-ink"}`}>
                        {f}
                    </button>
                ))}
            </div>

            {pageRobo.length > 0 && (
                <section className="mt-12">
                    <p className="label mb-3">Robotics and RL · {years(robo)}</p>
                    <div className="space-y-4">{pageRobo.map(p => <BigCard key={p.id} post={p}/>)}</div>
                </section>
            )}
            {pageOther.length > 0 && (
                <section className="mt-12">
                    <p className="label mb-3">Deep learning, CUDA and LLM · {years(other)}</p>
                    <ul className="space-y-3">{pageOther.map(p => <Row key={p.id} post={p} href={`/projects/${p.id}`}/>)}</ul>
                </section>
            )}
            <Pager count={list.length} noun="entries" page={pg.page} pages={pg.pages} go={pg.go}/>
        </>
    )
}

export function NotesList({posts}: { posts: Meta[] }) {
    const pg = usePage(posts.length)
    return (
        <>
        <ul className="divide-y divide-rule border-y border-rule">
            {posts.slice(pg.from, pg.to).map(p => (
                <li key={p.id}>
                    <Link href={`/blogs/${p.id}`} className="group grid items-center gap-2 py-5 md:grid-cols-[130px_1fr_auto] md:gap-6">
                        <Thumb src={p.image} className="h-[150px] w-full md:hidden"/>
                        <span className="font-mono text-[12px] text-faint">{getIsoDate(p.date)}</span>
                        <div className="min-w-0">
                            <h3 className="text-[17px] font-semibold group-hover:text-accent">{p.title}</h3>
                            <p className="mt-1 text-[14px] leading-6 text-muted">{p.description}</p>
                            <div className="mt-1"><TagLine tags={p.tags}/></div>
                        </div>
                        <div className="hidden items-center gap-5 md:flex">
                            <Thumb src={p.image} className="h-[60px] w-[96px]"/>
                            <span className="text-faint group-hover:text-ink">→</span>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
        <Pager count={posts.length} noun="posts" page={pg.page} pages={pg.pages} go={pg.go}/>
        </>
    )
}
