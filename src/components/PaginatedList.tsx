'use client'

import { useState } from 'react'
import { ListBlogsItem, ListProjectsItem } from "./ListItem"

const ITEMS_PER_PAGE = 1

type Props = {
    posts: Meta[]
    type: 'blog' | 'project'
}

export default function PaginatedList({ posts, type }: Props) {
    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentPosts = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const goTo = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // show limited page numbers on mobile: prev 1 current 1 next 1
    const getPageNumbers = () => {
        if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
        if (currentPage <= 3) return [1, 2, 3, 4, '...', totalPages]
        if (currentPage >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
    }

    return (
        <section className="mt-16">
            <ul className="w-full list-none">
                {currentPosts.map(post =>
                    type === 'blog'
                        ? <ListBlogsItem key={post.id} post={post} />
                        : <ListProjectsItem key={post.id} post={post} />
                )}
            </ul>

            {totalPages > 1 && (
                <div className="mt-10 mb-6 flex flex-col items-center gap-3">
                    <p className="text-gray-500 text-sm">
                        Page <span className="text-white font-semibold">{currentPage}</span> of <span className="text-white font-semibold">{totalPages}</span>
                    </p>

                    <div className="flex items-center gap-1 flex-wrap justify-center">
                        {/* Prev */}
                        <button
                            onClick={() => goTo(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="h-9 px-3 rounded-lg bg-gray-800 text-white text-sm font-medium
                                       hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed
                                       transition-colors border border-gray-700"
                        >
                            ← <span className="hidden sm:inline">Prev</span>
                        </button>

                        {/* Page numbers */}
                        {getPageNumbers().map((page, i) =>
                            page === '...'
                                ? (
                                    <span key={`dots-${i}`} className="h-9 w-9 flex items-center justify-center text-gray-500 text-sm">
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={page}
                                        onClick={() => goTo(page as number)}
                                        className={`h-9 w-9 rounded-lg text-sm font-semibold transition-colors border
                                            ${currentPage === page
                                            ? 'bg-MyRed text-white border-MyRed'
                                            : 'bg-gray-800 text-white border-gray-700 hover:bg-gray-700'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                )
                        )}

                        {/* Next */}
                        <button
                            onClick={() => goTo(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="h-9 px-3 rounded-lg bg-gray-800 text-white text-sm font-medium
                                       hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed
                                       transition-colors border border-gray-700"
                        >
                            <span className="hidden sm:inline">Next</span> →
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}