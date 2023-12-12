import React from 'react';
import ProjectPosts from "@/components/ProjectPosts";
import styles from "@/app/(section)/about/page.module.css";
import SocialMedia from "@/components/SocialMedia";
import type {Metadata} from 'next'

export const metadata: Metadata = {
    title: "Bhargav's Projects",
    description: 'hey you can check here what I have built so far',
}

export const revalidate = 10

function About(): React.JSX.Element {
    return (
        <div className=' mt-14 md:mt-24 px-4 md:px-6  max-w-[1700px] mx-auto    pt-4 md:pb-4 sm:px-6  lg:px-8   '>
            <div className='md:min-w-[300px]'>
                <h1 className={` ${styles.thickline} mt-8 my-3 text-5xl  tracking-tight font-extrabold   sm:text-5xl md:text-6xl  `}>
                    Projects
                </h1>
            </div>
            <div className=' pt-2 '>
                <div className='text-lg md:text-2xl text-gray-400'>My main motive for making this website is to showcase
                    my projects.
                </div>
            </div>
            <ProjectPosts/>
        </div>
    );
}

export default About;