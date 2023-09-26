"use client"
import Link from "next/link";

import { Github, Linkedin, Youtube , Instagram , } from "lucide-react";



const SocialMedia = () => {
    return (
        <footer>
                <div  className='  flex  content-center   items-center  justify-end navcenter:justify-evenly       place-items-center   ' >
                    <div className="  pb-[20px] items-center  flex  w-full ">
                        <Link href='https://www.linkedin.com/in/bhargav-oza-549072100/' className='lg:mr-6  mr-3.5'><Linkedin  className='h-7 w-7 myimg:h-10 myimg:w-10 '  color={'#1b96f3'} /></Link>
                        <Link href='https://github.com/Bhargavoza1' className='lg:mx-6  mx-3.5'><Github   className='h-7 w-7 myimg:h-10 myimg:w-10 '  color={'#1b96f3'} /></Link>
                        <Link href='https://www.youtube.com/channel/UCMbi7404LA6itxNfG08Cr7w' className='lg:mx-6  mx-3.5 ' ><Youtube  className='h-7 w-7 myimg:h-10 myimg:w-10 '  color={'#1b96f3'}  /></Link>
                        <Link href='https://www.instagram.com/troniq_777/' className='lg:ml-6  ml-3.5'><Instagram className='h-7 w-7 myimg:h-10 myimg:w-10 '  color={'#1b96f3'}  /></Link>
                    </div>
                </div>
        </footer>
    );
};

export default SocialMedia;