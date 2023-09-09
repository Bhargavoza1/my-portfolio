import Image from 'next/image'
import React from "react";
import localFont from "next/font/local";
const myfont = localFont({src:"../../components/fonts/ron-ron-regular-400.ttf"})



export default function Home() {
  return (
  <div className=' min-h-[65vh] myimg:min-h-[80vh] pt-0   md:container md:mx-auto myimg:flex content-center   items-center justify-evenly grid     place-items-center '>

    <div className=' min-w-[400px]  place-items-center  ' style={{ borderRadius: '20%', overflow: 'hidden', width: '400px', height: '400px' , position:'relative'}}>
      <Image
          src="/Bhargav.jpg"
          layout='fill'
          objectFit='cover'
          alt="Picture of the author"
      />
    </div>


    <div className=' px-5 myimg:px-10 pt-10 myimg:pt-0 text-justify   grid  place-items-center   [word-spacing:5px] tracking-widest' style=  {myfont.style}> I am computer engineer from india asdas asd asd  .
    </div>

  </div>
  )
}
