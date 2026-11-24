'use client' // Error components must be Client components

import { useEffect } from 'react'
import Link from 'next/link'
import { Page } from '@/components/notebook'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => { console.error(error) }, [error])
    return (
        <Page className="py-24">
            <p className="label">Error</p>
            <p className="mt-2 text-[18px]">Something went wrong.</p>
            <div className="mt-4 flex gap-3">
                <button className="btn-dark" onClick={() => reset()}>Try again</button>
                <Link href="/" className="btn-light">Home</Link>
            </div>
        </Page>
    )
}
