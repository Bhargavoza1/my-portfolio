import React from 'react';
import BlogPosts from "@/components/BlogPosts";
import Pagination from "@/components/pagination";
import styles from "@/app/(section)/about/page.module.css";

import Link from "next/link";



import type {Metadata} from 'next'
import {getBlogPostsMeta, getProjectPostsMeta} from "@/lib/posts";

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
             <Pagination pageName='blogs' totalPages={totalPages} page={page} searchParams={searchParams.page}/>



        </div>

    );
}

