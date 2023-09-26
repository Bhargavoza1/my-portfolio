import React from 'react';
import SocialMedia from "@/components/SocialMedia";
import Image from 'next/image'
import styles from "./page.module.css";

function About(): React.JSX.Element {
    return (


        <div
            className='  xl:flex xl:flex-row grid grid-cols-1   md:pt-20  w-[100%]     justify-center lg:h-[75vh]  '>
            {/* image*/}
            <div
                className="  mt-10  max-w-full flex justify-center   sm:mt-12 sm:px-6 md:mt-16 lg:mt-20   lg:px-8  pb-7 ">
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
                        <div className=" lg:pl-20  space-y-6 lg:text-left">

                            <h1 className={` ${styles.thickline} my-3 text-5xl tracking-tight font-extrabold   sm:text-5xl md:text-6xl  `}>
                                About&nbsp;me
                            </h1>
                            <h2 className='list-disc pt-3 pb-3   md:flex grid justify-start font-extrabold '>
                                <div className='flex '><span className=' md:pr-6 pr-3 flex text-MyBlue'>•</span>
                                    <div className='text-MyRed'> GAME
                                        DEVELOPER
                                    </div>
                                </div>
                                <div className='flex'><span className=' md:px-6 pr-3 flex text-MyBlue'>•</span>
                                    <div className='text-MyRed'>ML/DL ENGINEER
                                    </div>
                                </div>
                                <div className='flex'><span className='  md:px-6 pr-3 flex text-MyBlue'>•</span>
                                    <div className='text-MyRed'>BACK END DEVELOPER
                                    </div>
                                </div>
                            </h2>
                            <p className='pb-3 text-gray-400 '>
                                Hi, I am Bhargav Oza. I am a computer engineer from India(“<span
                                className='font-extrabold text-white'>&nbsp;भारत&nbsp;</span>”). As a computer nerd, I
                                am always in front of my computer. Building, Designing, Innovating something,
                                Contributing to open source, Sometimes playing with robots(IoT), Or Playing video games
                                with or without my discord gang.</p>
                            <p className='pb-3 text-gray-400 '>
                                I'm a very curious person, who's passionate about coding, our cosmos, and quantum
                                computing. I always learning new technology and try to keep up to date.</p>
                            <p className='pb-3 text-gray-400 '>
                                I love listening to synth waves, chill waves, and ambient music. In my free time, I watch anime or read manga.</p>
                                <p className='pb-3 text-gray-400 '>
                                    you can say I have an immense hunger for KNOWLEDGE(Which has its own two sides).</p>



                            <div className={` ${styles.hr} w-28 bg-MyRed`}></div>
                        </div>
                        {/* skills*/}
                        <div className="  lg:pl-20  space-y-6  lg:text-left">

                            <h1 className={` ${styles.thickline} mt-8 my-3 text-5xl tracking-tight font-extrabold   sm:text-5xl md:text-6xl  `}>
                                Skills
                            </h1>
                            <p className='pb-3 text-gray-400 '>
                                In the past decade, I have pulled lots of technical skills(only technical skills).
                               </p>
                            <ul className="   grid  grid-cols-1 md:grid-cols-2 skillspacing:grid-cols-3  text-xl text-gray-400  list-disc list-inside align-top  ">
                                <li className='mb-5 text-MyBlue' >Programming&nbsp;Languages
                                    <ol className="text-gray-400 pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                        <li>C++</li>
                                        <li>C#</li>
                                        <li>Python</li>
                                        <li>javascript</li>
                                        <li>typescript</li>
                                    </ol>
                                </li>
                                <li className='mb-5 text-MyBlue' >
                                    Game&nbsp;development
                                    <ol className="text-gray-400  pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                        <li>Unreal engine 5</li>
                                        <li>Unity</li>
                                        <li>Blender(basic)</li>
                                        <li>Maya(basic)</li>
                                        <li>Photoshop(basic)</li>
                                    </ol>
                                </li>
                                <li className='mb-5 text-MyBlue'>
                                    Game&nbsp;Engine&nbsp;Development
                                    <ul className="text-gray-400 pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                        <li>Directx 12</li>
                                        <li>OpenGL</li>
                                    </ul>
                                </li>
                                <li className='mb-5 text-MyBlue'>
                                   ML/DL
                                    <ul className="text-gray-400 pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                        <li>Pytorch</li>
                                        <li>Tensorflow</li>
                                        <li>Numpy</li>
                                    </ul>
                                </li>
                                <li className='mb-5 text-MyBlue'>
                                    Data&nbsp;Engineering
                                    <ul className="text-gray-400 pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                        <li>Apache Spark</li>
                                        <li>Airflow</li>
                                        <li>Kafka</li>
                                    </ul>
                                </li>
                                <li className='mb-5 text-MyBlue'>
                                    DevOps
                                    <ul className="text-gray-400 pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                        <li>Docker</li>
                                        <li>Kubernetes</li>
                                        <li>Kafka</li>
                                    </ul>
                                </li>
                                <li className='mb-5 text-MyBlue'>
                                    WebDev
                                    <ul className="text-gray-400 pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                        <li>React</li>
                                        <li>React Redux</li>
                                        <li>Next.js</li>
                                        <li>Node.js</li>
                                        <li>flask</li>
                                        <li>FastApi</li>
                                    </ul>
                                </li>
                                <li className='mb-5 text-MyBlue'>
                                    Robotics
                                    <ul className="text-gray-400 pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                        <li>ROS1-2</li>
                                        <li>Raspberry Pi</li>
                                        <li>Jetson nano</li>
                                        <li>Arduino</li>
                                    </ul>
                                </li>
                                <li className='mb-5 text-MyBlue'>
                                    Database
                                    <ul className="text-gray-400 pl-8 mt-2 space-y-1 text-lg list-decimal list-inside">
                                        <li>MongoDB</li>
                                        <li>Redis</li>
                                        <li>PostgreSQL</li>
                                    </ul>
                                </li>

                            </ul>

                            <div className={` ${styles.hr} w-28 bg-MyRed`}></div>
                        </div>
                        {/* skills*/}
                        <div className="  lg:pl-20  pb-10 space-y-6 lg:text-left">

                            <h1 className={` ${styles.thickline} mt-8 my-3 text-5xl tracking-tight font-extrabold   sm:text-5xl md:text-6xl  `}>
                                Bucket&nbsp;list
                            </h1>
                            <p className='pb-3 text-gray-400'>
                                Here are things I want to learn or achieve.
                            </p>
                            <ul className='list-disc text-lg pl-5 grid-cols-1  text-gray-400 grid '>
                                <li>I have to gain weight, so I can ride my dream bike(ADV).</li>
                                <li>I want to learn snowboarding</li>
                                <li>I want to learn water surfing</li>
                                <li>I want to learn quantum physics and quantum mechanics(i have 0.0% of knowledge of it)</li>

                            </ul>
                             <div className={` ${styles.hr} w-28 bg-MyRed `}></div>
                        </div>

                    </main>
                </div>
            </div>
        </div>


    );
}

export default About;