import Link from "next/link"
import { Page } from "@/components/notebook"

export default function NotFound() {
    return (
        <Page className="py-24">
            <p className="label">404</p>
            <p className="mt-2 text-[18px]">Sorry, this entry does not exist.</p>
            <Link href="/" className="link mt-4 inline-block text-[14px]">← Back to home</Link>
        </Page>
    )
}
