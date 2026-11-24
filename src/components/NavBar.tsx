"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Menu} from "lucide-react";
import {Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/sheet"

// Top bar of every page (lab-notebook design): name + mono subtitle on the left,
// the sections and a dark Contact button on the right. On phones the sections
// open in a drawer that slides in from the left (like the old site's menu).
const links = [
    {href: "/projects", label: "Projects", match: "/projects", n: "01"},
    {href: "/blogs", label: "Blogs", match: "/blogs", n: "02"},
    {href: "/#research", label: "Research", match: "#research", n: "03"},
    {href: "/#about", label: "About", match: "#about", n: "04"},
]

export default function NavBar() {
    const path = usePathname()
    const active = (m: string) => m.startsWith("/") && path.startsWith(m)

    return (
        <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur">
            <nav className="mx-auto flex h-14 max-w-page items-center justify-between px-5 md:px-8">
                <Link href="/" className="flex items-baseline gap-2.5">
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

                <Sheet>
                    <SheetTrigger aria-label="Open menu"
                                  className="flex items-center gap-2 rounded-[4px] border border-ink px-3 py-1.5 font-mono text-[12px] text-ink md:hidden">
                        <Menu className="h-4 w-4"/> menu
                    </SheetTrigger>
                    <SheetContent side="left" overlayclass="bg-ink/40 backdrop-blur-[2px]"
                                  className="grid-paper flex w-[82%] max-w-[340px] flex-col border-r border-rule p-0">
                        <SheetTitle className="sr-only">Menu</SheetTitle>
                        <SheetDescription className="sr-only">Site navigation</SheetDescription>
                        <div className="border-b border-rule px-6 py-5">
                            <p className="text-[16px] font-semibold text-ink">Bhargav Oza</p>
                            <p className="font-mono text-[11px] text-faint">robotics sim · RL</p>
                        </div>
                        <div className="flex-1 px-6 pt-4">
                            <SheetClose asChild>
                                <Link href="/" className={`flex items-baseline gap-4 border-b border-rule py-4 text-[20px] ${path === "/" ? "font-semibold text-ink" : "text-ink"}`}>
                                    <span className="font-mono text-[11px] text-faint">00</span>Home
                                </Link>
                            </SheetClose>
                            {links.map(l => (
                                <SheetClose asChild key={l.href}>
                                    <Link href={l.href}
                                          className={`flex items-baseline gap-4 border-b border-rule py-4 text-[20px] text-ink ${active(l.match) ? "font-semibold" : ""}`}>
                                        <span className="font-mono text-[11px] text-faint">{l.n}</span>{l.label}
                                    </Link>
                                </SheetClose>
                            ))}
                        </div>
                        <div className="px-6 pb-8">
                            <SheetClose asChild>
                                <Link href="/#contact" className="btn-dark w-full">Contact</Link>
                            </SheetClose>
                            <p className="mt-4 font-mono text-[11px] text-faint">ozabhargav41@gmail.com</p>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </header>
    )
}
