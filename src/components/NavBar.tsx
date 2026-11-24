"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";

// Top bar of every page (lab-notebook design): name + mono subtitle on the left,
// the sections and a dark Contact button on the right.
const links = [
    {href: "/projects", label: "Projects", match: "/projects"},
    {href: "/#research", label: "Research", match: "#research"},
    {href: "/blogs", label: "Notes", match: "/blogs"},
    {href: "/#about", label: "About", match: "#about"},
]

export default function NavBar() {
    const path = usePathname()
    const [open, setOpen] = useState(false)
    const active = (m: string) => m.startsWith("/") && path.startsWith(m)

    return (
        <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur">
            <nav className="mx-auto flex h-14 max-w-page items-center justify-between px-5 md:px-8">
                <Link href="/" className="flex items-baseline gap-2.5" onClick={() => setOpen(false)}>
                    <span className="text-[15px] font-semibold text-ink">Bhargav Oza</span>
                    <span className="hidden font-mono text-[11px] text-faint sm:inline">robotics sim · RL</span>
                </Link>
                <div className="hidden items-center gap-7 md:flex">
                    {links.map(l => (
                        <Link key={l.href} href={l.href}
                              className={`text-[14px] text-ink hover:text-accent ${active(l.match) ? "underline decoration-2 underline-offset-[6px]" : ""}`}>
                            {l.label}
                        </Link>
                    ))}
                    <Link href="/#contact" className="btn-dark !py-2">Contact</Link>
                </div>
                <button className="font-mono text-[12px] text-ink md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
                    {open ? "close" : "menu"}
                </button>
            </nav>
            {open && (
                <div className="border-t border-rule bg-paper px-5 pb-4 md:hidden">
                    {links.map(l => (
                        <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                              className="block border-b border-rule py-3 text-[15px] text-ink">{l.label}</Link>
                    ))}
                    <Link href="/#contact" onClick={() => setOpen(false)} className="btn-dark mt-4 w-full">Contact</Link>
                </div>
            )}
        </header>
    )
}
