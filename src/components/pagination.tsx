import Link from "next/link";

const Pagination = ({pageName, totalPages, page, searchParams}: {
    pageName: string,
    totalPages: number,
    page: number,
    searchParams: number
}) => {


    return (
        <>
            {totalPages > 1 && (
                <nav className="flex justify-center text-MyBlue pb-6 pt-6">
                    <ul className="list-style-none flex">
                        {/* Add the back button */}
                        {page > 1 && (
                            <li>
                                <Link href={`/${pageName}?page=${page - 1}`}>
                                    <div
                                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm  transition-all duration-300 "
                                        aria-label="Previous"
                                    >
                                        <span aria-hidden="true">&laquo;</span>
                                    </div>
                                </Link>
                            </li>
                        )}

                        {page > 2 && (
                            <li>
                                <Link href={`/${pageName}?page=1`}>
                                    <div
                                        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm  `}
                                    >
                                        1
                                    </div>
                                </Link>
                            </li>
                        )}

                        {page > 3 && (
                            <li>
                                <div
                                    className={`relative block rounded bg-transparent px-3 py-1.5 text-sm  `}
                                >
                                    ...
                                </div>
                            </li>
                        )}

                        {page > 1 && (
                            <li>
                                <Link href={`/${pageName}?page=${page - 1}`}>
                                    <div
                                        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm  `}
                                    >
                                        {page - 1}
                                    </div>
                                </Link>
                            </li>
                        )}

                        <li>
                            <div
                                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${page === searchParams ? 'text-MyRed' : ' text-MyRed  '}`}
                            >
                                {page}
                            </div>
                        </li>

                        {page < totalPages && (
                            <li>
                                <Link href={`/${pageName}?page=${page + 1}`}>
                                    <div
                                        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm  `}
                                    >
                                        {page + 1}
                                    </div>
                                </Link>
                            </li>
                        )}

                        {page < totalPages - 2 && (
                            <li>
                                <div
                                    className={`relative block rounded bg-transparent px-3 py-1.5 text-sm  `}
                                >
                                    ...
                                </div>
                            </li>
                        )}

                        {page < totalPages - 1 && (
                            <li>
                                <Link href={`/${pageName}?page=${totalPages}`}>
                                    <div
                                        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm   transition-all duration-300   `}
                                    >
                                        {totalPages}
                                    </div>
                                </Link>
                            </li>
                        )}

                        {page < totalPages || !searchParams ? (
                            <li>
                                <Link href={`/${pageName}?page=${page + 1}`}>
                                    <div
                                        className="relative block rounded bg-transparent px-3 py-1.5 text-sm  transition-all duration-300 "
                                        aria-label="Next"
                                    >
                                        <span aria-hidden="true">&raquo;</span>
                                    </div>
                                </Link>
                            </li>
                        ) : null}
                    </ul>
                </nav>
            )}
        </>
    );
};

export default Pagination;