import Image from 'next/image'
import React from "react";
import localFont from "next/font/local";
const myfont = localFont({src:"../../components/fonts/ron-ron-regular-400.ttf"})



export default function Home() {
  return (
  <div className='  lg:pt-20 3xl:pt-40 md:container md:mx-auto myimg:flex content-center   items-center justify-center grid   place-items-center '>

    <div className='  place-items-center container' style={{ borderRadius: '20%', overflow: 'hidden', width: '400px', height: '400px' , position:'relative'}}>
      <Image
          src="/Bhargav.jpg"
          layout='fill'
          alt="Picture of the author"
      />
    </div>


    <div className='  w-[50%] text-justify  px-10 grid  place-items-center   [word-spacing:5px] tracking-widest' style=  {myfont.style}> I am computer engineer from india.
    </div>

  </div>
  )
}
