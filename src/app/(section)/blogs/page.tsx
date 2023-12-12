import React from 'react';
import BlogPosts from "@/components/BlogPosts";
import styles from "@/app/(section)/about/page.module.css";

import Link from "next/link";

export const revalidate = 10

import type {Metadata} from 'next'

export const metadata: Metadata = {
    title: "Bhargav's Blogs",
    description: 'hey you can check here what i am exploring next ',
}

function About(): React.JSX.Element {
    return (
        <div className='mt-24 md:mt-40 px-4 md:px-6  max-w-[1700px] mx-auto    pt-4 md:pb-4 sm:px-6  lg:px-8'>


            <div
                className='     space-y-10   text-xl        place-content-around      '>

                <div className='md:min-w-[300px]'>
                    <h1 className={` ${styles.thickline} mt-8 my-3 text-5xl  tracking-tight font-extrabold   sm:text-5xl md:text-6xl  `}>
                        Blogs
                    </h1>

                </div>
                <div className='  '>
                    <div className='text-lg md:text-2xl text-gray-400  '>Technology, thoughts and
                        stories.
                    </div>
                </div>
                <BlogPosts/>
            </div>

        </div>


    );
}

export default About;