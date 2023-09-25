import React from 'react';
import SocialMedia from "@/components/SocialMedia";
import Image from 'next/image'
import styles from "./page.module.css";

function About(): React.JSX.Element {
    return (


        <div
            className='  xl:flex xl:flex-row grid grid-cols-1     w-[100%]  items-center  justify-center lg:h-[75vh]  '>
            {/* image*/}
            <div className="mt-10  max-w-full flex justify-center   sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8  pb-7 ">
                <div className="  h-[300px]  w-[300px] 2xl:h-[500px] 2xl:w-[500px] relative  ">
                    <Image
                        className='shadow   max-w-full h-auto align-middle border-[#1b96f3] z-10'
                        src="/Bhargav.jpg"
                        layout="fill" // required
                        alt="Picture of the author"
                    />
                    <div
                        className={`${styles.imageva}     h-[300px]  w-[300px] 2xl:h-[500px] 2xl:w-[500px] top-12 left-12 `}></div>
                </div>
            </div>
            {/* text*/}
            <div className="  flex justify-start    ">
                <div className="relative z-10     lg:w-full  ">


                    <main
                        className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-48 2xl:mt-28">
                        {/* about*/}
                        <div className="sm:text-center lg:pl-20  lg:text-left">

                            <h1 className={` ${styles.thickline} my-3 text-5xl tracking-tight font-extrabold   sm:text-5xl md:text-6xl  `}>
                                About me
                            </h1>
                            <h2 className='list-disc pt-3 pb-3   md:flex grid justify-start font-extrabold '>
                                <div className='flex'><span className='text-[#ffd646] md:pr-6 pr-3 flex'>•</span>GAME
                                    DEVELOPER
                                </div>
                                <div className='flex'><span className='text-[#ffd646] md:px-6 pr-3 flex'>•</span>ML/DL ENGINEER
                                </div>
                                <div className='flex'><span className='text-[#ffd646] md:px-6 pr-3 flex'>•</span>BACK END DEVELOPER
                                </div>
                            </h2>
                            <p className='pb-3 '>
                                I have 5+ years of experience in the game development field. I am specialized
                                and have hands-on experience with unity, unreal engine 4/5, shader programming.
                                And less than one year of experience in machine learning, deep learning, NLP,
                                computer vision, reinforcement learning.
                            </p>
                            <div className={` ${styles.hr} w-28 bg-[#ffd646]`}></div>
                        </div>
                        {/* skills*/}
                        <div className="sm:text-center lg:pl-20  lg:text-left">

                            <h1 className={` ${styles.thickline} mt-8 my-3 text-5xl tracking-tight font-extrabold   sm:text-5xl md:text-6xl  `}>
                               Skills
                            </h1>

               
                            <div className={` ${styles.hr} w-28 bg-[#ffd646]`}></div>
                        </div>

                    </main>
                </div>
            </div>
        </div>


    );
}

export default About;