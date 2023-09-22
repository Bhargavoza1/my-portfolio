import React from 'react';
import SocialMedia from "@/components/SocialMedia";
import Image from 'next/image'
function About( ):React.JSX.Element {
    return (

        <div id="about" className="flex flex-col justify-center  ">
            <div className="mt-10  max-w-full flex justify-center px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8  ">
                <div className="h-64 w-64 lg:h-72 lg:w-72  relative ">
                <Image
                    className='shadow rounded-full max-w-full h-auto align-middle border-[#1b96f3] border-8'
                    src="/Bhargav.jpg"
                    layout="fill" // required
                    alt="Picture of the author"
                />
            </div>
            </div>

            <div className="  flex justify-center ">
                <div className="relative z-10 pb-8   sm:pb-16 md:pb-20  lg:w-full lg:pb-28 xl:pb-32">




                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h2 className="my-6 text-2xl tracking-tight font-extrabold   sm:text-3xl md:text-4xl">
                                About me
                            </h2>

                            <p>
                                Donec porttitor, enim ut dapibus lobortis, lectus sem tincidunt dui, eget ornare lectus
                                ex non
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