import Image from 'next/image'

import React from "react";
import localFont from "next/font/local";

import dynamic from 'next/dynamic'
import SocialMedia from "@/components/SocialMedia";

const Typewriter = dynamic(() => import('../../components/Typewriter'), {ssr: false})

//const myfont = localFont({src: "../../components/fonts/ron-ron-regular-400.ttf"})

const myfont = localFont({src:"../../components/fonts/OTF/Satoshi-Bold.otf"})


export default function Home() {

    return (

        <div
            className=' min-h-[65vh] myimg:min-h-[80vh]  pt-0   md:container md:mx-auto myimg:flex content-center   items-center justify-center grid     place-items-center  '>

            {/*    <div className='  myimg:ml-[5%]  min-w-[400px]  place-items-center  ' style={{ borderRadius: '50%', overflow: 'hidden', width: '400px', height: '400px' , position:'relative'}}>
      <Image
          src="/Bhargav.jpg"
          layout='fill'
          objectFit='cover'
          alt="Picture of the author"
      />
    </div>


    <div className='myimg:ml-[10%] px-5 myimg:px-10  pt-[60px] myimg:pt-0 text-justify   grid   space-y-10 '   >
      <h1 className='  text-center md:text-left text-3xl md:text-5xl   ' style=  {myfont.style}>Hello, My name is <span className='text-MyBlue ' >Bhargav Oza.</span></h1>
      <h1 className='   text-2xl md:text-4xl   ' style=  {myfont.style}>Hello, I am <span className='text-MyBlue ' >Bhargav Oza as d asd asd asd .</span></h1>
    </div>*/}


            <div className='  px-5 2xl:px-[300px]  pt-[60px] landscape:pt-[20px]  myimg:pt-0     grid   '>
                <h1 className='  text-xl lg:text-4xl md:text-3xl pb-4 md:pb-5' style={myfont.style}>
                    I AM&nbsp;
                    <Typewriter textclass='text-MyRed' cursorclass='bg-MyRed'
                                text="BHARGAV OZA,COMPUTER ENGINEER,HARDCORE PROGRAMMER,HARDCORE GAMER,EXPLORER"
                                writeDelay={120} readDelay={1000} eraseDelay={70}/>
                </h1>
                <p className='  max-w-[1100px] text-lg   lg:text-2xl  md:text-xl text-gray-300 pb-12 md:pb-14' style={myfont.style}>I convert code into
                    innovation and bring virtual world into existence. </p>


              <SocialMedia/>
            </div>



        </div>
    )
}
