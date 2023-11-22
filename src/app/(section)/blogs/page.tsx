import React from 'react';
import BlogPosts from "@/components/BlogPosts";
import styles from "@/app/(section)/about/page.module.css";

import Link from "next/link";

export const revalidate = 10
function About( ):React.JSX.Element {
    return (
        <div className='mt-20 md:mt-32'>
            <div   className='        '>

                <div className='max-w-[1700px] mx-auto  px-1 pt-4 md:pb-4 sm:px-6  lg:px-8'>
                    <div
                        className="  lg:px-20   space-y-10  place-items-center  justify-center content-center  lg:text-left">


                        <div
                            className='     space-y-10 pl-3 text-xl  lg:px-40     place-content-around      '>

                            <div className='md:min-w-[300px]'>
                                <h1 className={` ${styles.thickline} mt-8 my-3 text-5xl  tracking-tight font-extrabold   sm:text-5xl md:text-6xl  `}>
                                    Blog
                                </h1>

                            </div>
                            <div className='  '>
                                <div className='text-lg md:text-2xl text-gray-400' >Technology thoughts and stories.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BlogPosts />

        </div>

    );
}

export default About;