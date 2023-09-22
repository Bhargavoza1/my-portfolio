import React from 'react';
import SocialMedia from "@/components/SocialMedia";
import Image from 'next/image'
import styles from "./page.module.css";
function About( ):React.JSX.Element {
    return (


            <div className='  xl:flex xl:flex-row grid grid-cols-1     w-[100%]  items-center  justify-center lg:h-[75vh]  '>
                <div className="mt-10  max-w-full flex justify-center   sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8  pb-7 ">
                    <div className="  h-[300px]  w-[300px] 2xl:h-[500px] 2xl:w-[500px] relative  ">
                        <Image
                            className='shadow   max-w-full h-auto align-middle border-[#1b96f3] z-10'
                            src="/Bhargav.jpg"
                            layout="fill" // required
                            alt="Picture of the author"
                        />
                        <div className={`${styles.imageva}     h-[300px]  w-[300px] 2xl:h-[500px] 2xl:w-[500px] top-12 left-12 `}></div>
                    </div>
                </div>

                <div className="  flex justify-start    ">
                    <div className="relative z-10 pb-8   sm:pb-16 md:pb-20   lg:w-full lg:pb-28 xl:pb-32">




                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:pl-20 lg:text-left">
                            <h2 className={` ${styles.thickline} my-6 text-2xl tracking-tight font-extrabold   sm:text-3xl md:text-4xl  `}>
                                About me
                            </h2>

                            <p>
                                Donec porttitor, enim ut dapibus lobortis, lectus sem tincidunt dui, eget ornare lectus
                                ex non
                                libero. Nam rhoncus diam ultrices porttitor laoreet. Ut mollis fermentum ex, vel viverra
                                lorem
                                libero. Nam rhoncus diam ultrices porttitor laoreet. Ut mollis fermentum ex, vel viverra
                                lorem
                                libero. Nam rhoncus diam ultrices porttitor laoreet. Ut mollis fermentum ex, vel viverra
                                lorem
                            </p>
                        </div>
                    </main>
                </div>
                </div>
            </div>

    );
}

export default About;