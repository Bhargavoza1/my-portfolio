'use client'

import { useState } from 'react'
import { ListBlogsItem } from "./ListItem"

const ITEMS_PER_PAGE = 1

type Props = {
    posts: Meta[]
}

export default function PaginatedBlogPosts({ posts }: Props) {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentPosts = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const goTo = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <section className="mt-16">
            <ul className="w-full list-none">
                {currentPosts.map(post => (
                    <ListBlogsItem key={post.id} post={post} />
                ))}
            </ul>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10 mb-6 flex-wrap">
                    <button
                        onClick={() => goTo(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        ← Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => goTo(page)}
                            className={`px-4 py-2 rounded font-semibold transition-colors ${
                                currentPage === page
                                    ? 'bg-MyRed text-white'
                                    : 'bg-gray-800 text-white hover:bg-gray-700'
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => goTo(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        Next →
                    </button>
                </div>
            )}

            <p className="text-center text-gray-500 text-sm mb-4">
                Page {currentPage} of {totalPages}
            </p>
        </section>
    )
}