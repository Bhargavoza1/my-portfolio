import React from 'react';
import BlogPosts from "@/components/BlogPosts";
import styles from "@/app/(section)/about/page.module.css";

import Link from "next/link";



import type {Metadata} from 'next'
import {getBlogPostsMeta} from "@/lib/posts";

export const metadata: Metadata = {
    title: "Bhargav's Blogs",
    description: 'hey you can check here what i am exploring next ',
}

export default async function page({searchParams}:{searchParams:any}): Promise<React.JSX.Element> {
    const posts = await getBlogPostsMeta(  searchParams.page )
    const totalPages = posts?.totalPages ?? 1;
    let defaultPage ;
    if (!searchParams.page) {
        // Set the default page to 1
        defaultPage = 1;
    }
    const page = parseInt(searchParams.page || defaultPage);


    return (
        <div className='mt-14 md:mt-24 px-4 md:px-6  max-w-[1700px] mx-auto    pt-4 md:pb-4 sm:px-6  lg:px-8'>

            <div className='md:min-w-[300px]'>
                <h1 className={` ${styles.thickline} mt-8 my-3 text-5xl  tracking-tight font-extrabold   sm:text-5xl md:text-6xl  `}>
                    Blogs
                </h1>
            </div>
            <div className=' pt-2  '>
                <div className='text-lg md:text-2xl text-gray-400  '>Technology, thoughts and
                    stories.
                </div>
            </div>
            <BlogPosts posts={posts} />


            {/* Add the pagination navigation */}
            {totalPages > 1 && (
                <nav className='flex justify-center text-MyBlue pb-6 pt-6' >
                    <ul className="list-style-none flex">
                        {/* Add the back button */}
                        {page > 1 && (
                            <li>
                                <Link href={`/blogs?page=${page - 1}`}>
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
                                <Link href={`/blogs?page=1`}>
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
                                <Link href={`/blogs?page=${page - 1}`}>
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
                                className={`relative block rounded bg-transparent px-3 py-1.5 text-sm ${page === parseInt(searchParams.page) ? 'text-MyRed' : ' text-MyRed  '}`}
                            >
                                {page}
                            </div>
                        </li>
                        {page < totalPages && (
                            <li>
                                <Link href={`/blogs?page=${page + 1}`}>
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
                                <Link href={`/blogs?page=${totalPages}`}>
                                    <div
                                        className={`relative block rounded bg-transparent px-3 py-1.5 text-sm   transition-all duration-300   `}
                                    >
                                        {totalPages}
                                    </div>
                                </Link>
                            </li>
                        )}


                        {page < totalPages|| !searchParams.page ? (
                            <li>
                                <Link href={`/blogs?page=${page + 1}`}>
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


        </div>

    );
}

