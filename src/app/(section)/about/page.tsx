import React from 'react';
import SocialMedia from "@/components/SocialMedia";
import Image from 'next/image'
import styles from "./page.module.css";

function About(): React.JSX.Element {
    return (


        <div
            className='  xl:flex xl:flex-row grid grid-cols-1   md:pt-20  w-[100%]     justify-center lg:h-[75vh]  '>
            {/* image*/}
            <div className="  mt-10  max-w-full flex justify-center   sm:mt-12 sm:px-6 md:mt-16 lg:mt-20   lg:px-8  pb-7 ">
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
                        className="  mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8   2xl:mt-28    ">
                        {/* about*/}
                        <div className="sm:text-center lg:pl-20  lg:text-left">

                            <h1 className={` ${styles.thickline} my-3 text-5xl tracking-tight font-extrabold   sm:text-5xl md:text-6xl  `}>
                                About&nbsp;me
                            </h1>
                            <h2 className='list-disc pt-3 pb-3   md:flex grid justify-start font-extrabold '>
                                <div className='flex '><span className=' md:pr-6 pr-3 flex'>•</span>
                                    <div className='text-[#ffd646]'> GAME
                                        DEVELOPER
                                    </div>
                                </div>
                                <div className='flex'><span className=' md:px-6 pr-3 flex'>•</span>
                                    <div className='text-[#ffd646]'>ML/DL ENGINEER
                                    </div>
                                </div>
                                <div className='flex'><span className='  md:px-6 pr-3 flex'>•</span>
                                    <div className='text-[#ffd646]'>BACK END DEVELOPER
                                    </div>
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
                            <p className='pb-3 '>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a type specimen book. It has
                                survived not only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>

                            <div className={` ${styles.hr} w-28 bg-[#ffd646]`}></div>
                        </div>
                        {/* skills*/}
                        <div className="sm:text-center lg:pl-20  lg:text-left">

                            <h1 className={` ${styles.thickline} mt-8 my-3 text-5xl tracking-tight font-extrabold   sm:text-5xl md:text-6xl  `}>
                                Skills
                            </h1>
                            <p className='pb-3 '>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a type specimen book. It has
                                survived not only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>

                            <div className={` ${styles.hr} w-28 bg-[#ffd646]`}></div>
                        </div>

                    </main>
                </div>
            </div>
        </div>


    );
}

export default About;