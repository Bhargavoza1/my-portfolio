import Image from 'next/image'
import React from "react";
import localFont from "next/font/local";
const myfont = localFont({src:"../../components/fonts/ron-ron-regular-400.ttf"})

//const myfont = localFont({src:"../../components/fonts/OTF/Satoshi-Bold.otf"})

import {  } from 'next/font/google'

export default function Home() {
  return (

  <div className=' min-h-[65vh] myimg:min-h-[80vh] pt-0   md:container md:mx-auto myimg:flex content-center   items-center justify-center grid     place-items-center '>

    <div className=' myimg:ml-[5%]  min-w-[400px]  place-items-center  ' style={{ borderRadius: '50%', overflow: 'hidden', width: '400px', height: '400px' , position:'relative'}}>
      <Image
          src="/Bhargav.jpg"
          layout='fill'
          objectFit='cover'
          alt="Picture of the author"
      />
    </div>


    <div className='myimg:ml-[10%] px-5 myimg:px-10  pt-[60px] myimg:pt-0 text-justify   grid  place-items-center '   >
      <h1 className='  text-center text-3xl md:text-4xl   ' style=  {myfont.style}>Hello, My Name is <span className='text-[#085bb9] ' >Bhargav Oza.</span></h1>
    </div>

  </div>
  )
}
