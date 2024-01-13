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
   // console.log(posts?.totalPages)
    const totalpage = posts?.totalPages
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
            <nav aria-label="Page navigation example">
                <ul className="list-style-none flex">
                    {Array.from({length: totalpage}, (_, i) => i + 1).map((page) => (
                        <li key={page}>
                            <Link href={`/blogs?page=${page}`}>
                                <div
                                    className={`relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white ${page === parseInt(searchParams.page) ? 'bg-neutral-100 dark:bg-neutral-700' : ''}`}
                                >
                                    {page}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>


        </div>

    );
}

