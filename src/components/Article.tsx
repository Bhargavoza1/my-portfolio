import Link from "next/link"
import React from "react"

// Left "CONTENTS" sidebar with § numbers that match the h2 counters in globals.css
export function Contents({headings}: { headings: Heading[] }) {
    const h2 = headings.filter(h => h.depth === 2)
    if (!h2.length) return null
    return (
        <nav className="sticky top-20 hidden self-start lg:block">
            <p className="label mb-3">Contents</p>
            <ol className="space-y-2 text-[13px] leading-5">
                {h2.map((h, i) => (
                    <li key={h.id}>
                        <a href={`#${h.id}`} className="flex gap-2 text-muted hover:text-ink">
                            <span className="font-mono text-faint">§{i + 1}</span>{h.text}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export function ArticleBody({children}: { children: React.ReactNode }) {
    return (
        <article className="notebook-article prose prose-notebook max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-[22px] prose-h3:text-[17px] prose-p:text-[16px] prose-p:leading-[1.75] prose-li:text-[16px] prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-[#ececE5] prose-code:px-1 prose-code:py-0.5 prose-code:font-normal prose-pre:border prose-pre:border-rule prose-pre:bg-card prose-img:mx-auto">
            {children}
        </article>
    )
}

export function TagLinks({tags}: { tags: string[] }) {
    const t = tags.filter(x => x !== "project" && x !== "blog")
    if (!t.length) return null
    return (
        <div className="mt-12 border-t border-rule pt-4">
            <p className="label mb-2">Tags</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
                {t.map(x => <Link key={x} href={`/tags/${x}`} className="tag hover:underline">#{x}</Link>)}
            </div>
        </div>
    )
}
