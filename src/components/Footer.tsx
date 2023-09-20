"use client"
import Link from "next/link";

import { Github, Linkedin, Youtube , Instagram} from "lucide-react";



const Footer = () => {
    return (

                <div  className='  grid myimg:flex  content-center   items-center  justify-end navcenter:justify-evenly       place-items-center  sticky bottom-0 ' >
                    <div className="hidden  myimg:px-32 pt-[40px] pb-[10px]   md:flex md:w-full ">
                        <Link href='https://www.linkedin.com/in/bhargav-oza-549072100/' className='lg:mr-6 sm:mr-3.5'><Linkedin  className='h-7 w-7 myimg:h-10 myimg:w-10 '  /></Link>
                        <Link href='https://github.com/Bhargavoza1' className='lg:mx-6 sm:mx-3.5'><Github   className='h-7 w-7 myimg:h-10 myimg:w-10 '   /></Link>
                        <Link href='https://www.youtube.com/channel/UCMbi7404LA6itxNfG08Cr7w' className='lg:mx-6 sm:mx-3.5 ' ><Youtube  className='h-7 w-7 myimg:h-10 myimg:w-10 '    /></Link>
                        <Link href='https://www.instagram.com/troniq_777/' className='lg:ml-6 sm:ml-3.5'><Instagram className='h-7 w-7 myimg:h-10 myimg:w-10 '    /></Link>

                    </div>

                </div>

    );
};

export default Footer;