// Small building blocks of the lab-notebook design, shared by all pages.
import React from "react"

export function Page({children, className = ""}: { children: React.ReactNode, className?: string }) {
    return <div className={`mx-auto w-full max-w-page px-5 md:px-8 ${className}`}>{children}</div>
}

// "01  Selected work ............ Each entry lists the result and the limits."
export function SectionHead({n, title, note}: { n: string, title: string, note?: string }) {
    return (
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-ink pb-3">
            <h2 className="flex items-baseline gap-4 text-[26px] font-semibold tracking-tight text-ink md:text-[30px]">
                <span className="font-mono text-[12px] font-normal text-faint">{n}</span>{title}
            </h2>
            {note && <p className="hidden text-[13px] text-muted md:block">{note}</p>}
        </div>
    )
}

export function Fig({n, children}: { n: number | string, children: React.ReactNode }) {
    return <p className="mt-2 font-mono text-[11px] leading-5 text-faint">Fig. {n} — {children}</p>
}

// GOAL / BUILT / RESULT / LIMITS rows
export function Rows({rows}: { rows: [string, React.ReactNode][] }) {
    return (
        <dl className="divide-y divide-rule border-y border-rule">
            {rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[110px_1fr] gap-4 py-2.5 text-[14px] leading-6">
                    <dt className={`label pt-[3px] ${k === "LIMITS" ? "!text-limit" : ""}`}>{k}</dt>
                    <dd className="text-ink">{v}</dd>
                </div>
            ))}
        </dl>
    )
}

export function EntryBar({left, status}: { left: string, status: string }) {
    return (
        <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
            <span className="label">{left}</span>
            <span className={`font-mono text-[11px] ${status === "latest" ? "text-accent" : "text-faint"}`}>{status}</span>
        </div>
    )
}

// fit="contain" shows the whole frame (no cropping); "cover" fills the box
export function Clip({src, label, className = "", fit = "cover"}: { src: string, label: string, className?: string, fit?: "cover" | "contain" }) {
    return (
        <video className={`block h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} ${className}`} poster={`${src}-poster.jpg`}
               autoPlay loop muted playsInline preload="metadata" aria-label={label}>
            <source src={`${src}.webm`} type="video/webm"/>
            <source src={`${src}.mp4`} type="video/mp4"/>
        </video>
    )
}

export function Tags({items}: { items: string[] }) {
    return <p className="font-mono text-[12px] text-accent">{items.join(" · ")}</p>
}
