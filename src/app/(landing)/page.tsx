import Image from 'next/image'
import React from "react";
import localFont from "next/font/local";
const myfont = localFont({src:"../../components/fonts/ron-ron-regular-400.ttf"})



export default function Home() {
  return (
  <div className='  lg:pt-20 3xl:pt-40 md:container md:mx-auto myimg:flex content-center   items-center justify-center grid   place-items-center '>

    <div className='place-items-center container' style={{width: '400px', height: '400px', position: 'relative'}}>
      <Image
          src="/Bhargav.jpg"
          layout='fill'
          alt="Picture of the author"
      />
    </div>


    <div className=' text-justify  px-5 grid  place-items-center   [word-spacing:5px] tracking-widest' style=  {myfont.style}> I am computer engineer from india asdas asd.
    </div>

  </div>
  )
}
