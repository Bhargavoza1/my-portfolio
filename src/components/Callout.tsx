import React from "react"

// MDX: <Callout label="Example">text</Callout>
export default function Callout({label = "Note", children}: { label?: string, children: React.ReactNode }) {
    return (
        <div className="not-prose my-6 rounded-[6px] border border-rule border-l-[3px] border-l-accent bg-card px-5 py-4 text-[15px] leading-7">
            <p className="label mb-1">{label}</p>
            <div className="[&>p]:m-0">{children}</div>
        </div>
    )
}
