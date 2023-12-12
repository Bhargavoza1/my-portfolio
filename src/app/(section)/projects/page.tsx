import React from 'react';
import ProjectPosts from "@/components/ProjectPosts";
import styles from "@/app/(section)/about/page.module.css";
import SocialMedia from "@/components/SocialMedia";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Bhargav's Projects",
    description: 'hey you can check here what I have built so far',
}

export const revalidate = 10
function About( ):React.JSX.Element {
    return (
        <div className=' mt-24 md:mt-40 px-4 md:px-6  max-w-[1700px] mx-auto    pt-4 md:pb-4 sm:px-6  lg:px-8   '>





                        <div
                            className='     space-y-10   text-xl       place-content-around      '>

                            <div className='md:min-w-[300px]'>
                                <h1 className={` ${styles.thickline} mt-8 my-3 text-5xl  tracking-tight font-extrabold   sm:text-5xl md:text-6xl  `}>
                                    Projects
                                </h1>

                            </div>
                            <div className='  '>
                                <div className='text-lg md:text-2xl text-gray-400' >My main motive for making this website is to showcase my projects.
                                </div>
                            </div>
                            <ProjectPosts/>
                        </div>
                    </div>

    );
}

export default About;