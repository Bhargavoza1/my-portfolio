import Image from 'next/image'

import React from "react";
import localFont from "next/font/local";

import dynamic from 'next/dynamic'
import SocialMedia from "@/components/SocialMedia";
import styles from "@/app/(section)/about/page.module.css";
import ScrollToTopButton from "@/components/BacktoTop";
import Link from "next/link";

const Typewriter = dynamic(() => import('../../components/Typewriter'), {ssr: false})

//const myfont = localFont({src: "../../components/fonts/ron-ron-regular-400.ttf"})

const myfont = localFont({src: "../../components/fonts/OTF/Satoshi-Bold.otf"})

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Bhargav',
    description: 'I am a computer engineer from India',
}


export default function Home() {

    return (

        //
        // <div className="flex flex-col h-screen">
        //
        //     <header className="h-10 bg-red-500">Header</header>
        //     <div className="flex-grow place-content-center bg-green-500">
        //         <h1>Content</h1>
        //         <div className="grid h-full place-items-center justify-center">
        //
        //             <div className="grid gap-6 md:grid-cols-2 content-center">
        //                 <div className="h-[200px] w-[300px] bg-yellow-500 flex flex-col items-center">
        //                     Item 1
        //                 </div>
        //                 <div className="h-[200px]  w-[300px] bg-yellow-500 flex flex-col items-center">
        //                     Item 2
        //                 </div>
        //                 <div className="h-[200px]  w-[300px] bg-yellow-500 flex flex-col items-center">
        //                     Item 3
        //                 </div>
        //                 <div className="h-[200px]  w-[300px] bg-yellow-500 flex flex-col items-center">
        //                     Item 4
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //
        //     <footer className=" w-full  h-10 bg-blue-500">Footer</footer>
        // </div>


        <div>


            {/* landing page*/}
            <div id='home'
                 className=' flex flex-col max-h-[100vh] myimg:max-h-[100vh]'>

                <div className='  grid h-screen myimg:pt-[140px] place-items-center justify-center'>
                    <div className='  px-5 2xl:px-[300px]  pt-[60px] landscape:pt-[20px]  myimg:pt-0     grid   '>
                        <h1 className='  text-xl lg:text-4xl md:text-3xl pb-4 md:pb-5 mylandscape:pb-1 '
                            style={myfont.style}>
                            I AM&nbsp;
                            <Typewriter textclass='text-MyRed' cursorclass='bg-MyRed'
                                        text="BHARGAV OZA,COMPUTER ENGINEER,HARDCORE PROGRAMMER,HARDCORE GAMER,EXPLORER"
                                        writeDelay={120} readDelay={1000} eraseDelay={70}/>
                        </h1>
                        <p className='  max-w-[1100px] text-lg   lg:text-2xl  md:text-xl text-gray-300 pb-12 md:pb-14 mylandscape:pb-5'
                           style={myfont.style}>I convert code into
                            innovation and bring virtual world into existence. </p>


                        <SocialMedia MyColor={'#58cee3'}/>
                        <Link href='#about'>
                            <div
                                className={`${styles.box} flex justify-center mt-[50px]  myimg:mb-[80px] mylandscape:mt-0`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                    </div>

                </div>


            </div>


            {/* about*/}
            <div id='about'
                 className='   xl:flex xl:flex-row grid grid-cols-1  py-36   w-[100%]   place-items-center bg-gray-900  justify-center content-center   '>
                {/* image*/}
                <div className='grid '>
                    <div
                        className="     max-w-full flex justify-center    sm:px-6    lg:px-8  pb-7 ">
                        <div className="  h-[300px]  w-[300px] 2xl:h-[500px] 2xl:w-[500px] relative  ">
                            <Image
                                className='shadow   max-w-full h-auto align-middle border-[#1b96f3] z-10'
                                src="/Bhargav.jpg"
                                fill={true}// required
                                alt="Picture of the author"
                            />
                            <div
                                className={`${styles.imageva}  shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]  shadow-gray-950   h-[300px]  w-[300px] 2xl:h-[500px] 2xl:w-[500px]  top-8  left-8 2xl:top-12 2xl:left-12 `}></div>
                        </div>

                    </div>


                </div>
                {/* text*/}

                <div className="  flex justify-start    ">
                    <div className="relative z-10  mt-14   lg:w-full  ">


                        <main
                            className="   mx-auto max-w-7xl px-4   sm:px-6     lg:px-8       ">
                            {/* about*/}
                            <div className=" lg:pl-20  space-y-6 lg:text-left">

                                <h1 className={` ${styles.thickline} my-3 text-5xl tracking-tight font-extrabold   sm:text-5xl md:text-6xl  `}>
                                    About&nbsp;me
                                </h1>
                                <h2 className='list-disc pt-3 pb-3   md:flex grid justify-start font-extrabold '>
                                    <div className='flex  '><span
                                        className='text-xl md:pr-6 pr-3 flex text-MyBlue'>•</span>
                                        <div className='text-MyRed text-xl'> GAME
                                            DEVELOPER
                                        </div>
                                    </div>
                                    <div className='flex'><span
                                        className='text-xl md:px-6 pr-3 flex text-MyBlue'>•</span>
                                        <div className='text-MyRed text-xl'>ML/DL ENGINEER
                                        </div>
                                    </div>
                                    <div className='flex'><span
                                        className='text-xl  md:px-6 pr-3 flex text-MyBlue'>•</span>
                                        <div className='text-MyRed text-xl'>BACK END DEVELOPER
                                        </div>
                                    </div>
                                </h2>
                                <p className='pb-3 text-gray-400 text-xl  '>
                                    Hi, I am Bhargav Oza. I am a computer engineer from India(“<span
                                    className='font-extrabold text-white'>&nbsp;भारत&nbsp;</span>”). As a computer nerd,
                                    I
                                    am always in front of my computer. Building, Designing, Innovating something,
                                    Contributing to open source, Sometimes playing with robots(IoT), Or Playing video
                                    games
                                    with or without my discord gang.</p>
                                <p className='pb-3 text-gray-400 text-xl'>
                                    I&apos;m a very curious person, who&apos;s passionate about coding, our cosmos, and
                                    quantum
                                    computing. I always learning new technology and try to keep up to date.</p>
                                <p className='pb-3 text-gray-400 text-xl'>
                                    I love listening to synth waves, chill waves, and ambient music. In my free time, I
                                    watch anime or read manga.</p>
                                <p className='pb-3 text-gray-400 text-xl'>
                                    you can say I have an immense hunger for KNOWLEDGE(Which has its own two sides).</p>


                                <div className={` ${styles.hr} w-28 bg-MyRed`}></div>
                            </div>


                            <div className='z-50'>



                            </div>
                        </main>
                    </div>
                </div>
            </div>


            {/*skills */}
            <div  className=' mx-auto max-w-[1900px] px-4 py-28  sm:px-6     lg:px-8   '>
                <div
                    className="  lg:pl-20    space-y-10  place-items-center  justify-center content-center  lg:text-left">

                    <h1 className={` ${styles.thickline2} mt-8 my-3 text-5xl tracking-tight font-extrabold   sm:text-5xl md:text-6xl  `}>
                        Skills
                    </h1>
                    <p className='pb-3 text-gray-400 text-xl '>
                        In the past decade, I have pulled lots of technical skills(only technical skills).
                    </p>
                    <ul className="  pr-40 md:pr-0  grid  grid-cols-1 md:grid-cols-3 skillspacing:grid-cols-5  text-xl text-gray-400   list-disc list-inside align-top  ">
                        <li className='mb-5 text-MyBlue mr-5 '>Programming&nbsp;Languages
                            <ol className="text-gray-400 pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                <li>C++</li>
                                <li>C#</li>
                                <li>Python</li>
                                <li>Javascript</li>
                                <li>Typescript</li>
                            </ol>
                        </li>
                        <li className='mb-5 text-MyBlue mr-5'>
                            Game&nbsp;development
                            <ol className="text-gray-400  pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                <li>Unreal engine 4-5</li>
                                <li>Unity</li>
                                <li>Blender(basic)</li>
                                <li>Maya(basic)</li>
                                <li>Photoshop(basic)</li>
                            </ol>
                        </li>
                        <li className='mb-5 text-MyBlue mr-5'>
                            Game&nbsp;Engine&nbsp;Development
                            <ul className="text-gray-400 pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                <li>Directx 12</li>
                                <li>OpenGL</li>
                            </ul>
                        </li>
                        <li className='mb-5 text-MyBlue mr-5'>
                            ML/DL
                            <ul className="text-gray-400 pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                <li>Pytorch</li>
                                <li>Tensorflow</li>
                                <li>Numpy</li>
                            </ul>
                        </li>
                        <li className='mb-5 text-MyBlue mr-5'>
                            Data&nbsp;Engineering
                            <ul className="text-gray-400 pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                <li>Apache Spark</li>
                                <li>Airflow</li>
                                <li>Kafka</li>
                            </ul>
                        </li>
                        <li className='mb-5 text-MyBlue mr-5'>
                            DevOps
                            <ul className="text-gray-400 pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                <li>Docker</li>
                                <li>Kubernetes</li>
                                <li>Kafka</li>
                            </ul>
                        </li>

                        <li className='mb-5 text-MyBlue mr-5'>
                            Robotics
                            <ul className="text-gray-400 pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                <li>ROS 1-2</li>
                                <li>Raspberry Pi</li>
                                <li>Jetson nano</li>
                                <li>Arduino</li>
                            </ul>
                        </li>
                        <li className='mb-5 text-MyBlue mr-5'>
                            Database
                            <ul className="text-gray-400 pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                <li>MongoDB</li>
                                <li>Redis</li>
                                <li>PostgreSQL</li>
                            </ul>
                        </li>
                        <li className='mb-5 text-MyBlue mr-5'>
                            WebDev
                            <ul className="text-gray-400 pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                <li>React</li>
                                <li>React Redux</li>
                                <li>Next.js</li>
                                <li>Node.js</li>
                                <li>Flask</li>
                                <li>FastApi</li>
                            </ul>
                        </li>
                    </ul>

                    <div className={` ${styles.hr} w-28 bg-MyRed`}></div>
                </div>
            </div>

            {/* contact*/}
            <div id='contact' className='   bg-gray-900     '>

                <div className='max-w-[1900px] mx-auto  px-4 pt-4 md:pb-4 sm:px-6  lg:px-8'>
                    <div
                        className="  lg:px-20   space-y-10  place-items-center  justify-center content-center  lg:text-left">


                        <div
                            className='md:flex    space-y-10 pl-3 text-xl  lg:px-40     place-content-around      '>

                            <div className='md:min-w-[300px]'>
                                <h1 className={` ${styles.thickline} mt-8 my-3 text-5xl  tracking-tight font-extrabold   sm:text-5xl md:text-6xl  `}>
                                    Contact
                                </h1>

                            </div>
                            <div className='text-gray-400'>
                                <div className='pb-3'>ozabhargav41@gmail.com</div>
                                <div className='pb-8'>+91 7567592803</div>
                                <SocialMedia MyColor={'#d43256'}/>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
