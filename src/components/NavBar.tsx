"use client"
import Link from "next/link";
import {usePathname } from "next/navigation";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";

import localFont from "next/font/local";
const myfont = localFont({src:"./fonts/cyber.bold-book.ttf"})

const MyLink = (a:{href:string, title:string , className:string })=>{
    const router:string = usePathname();
    return(
        <Link href={a.href} className={`${a.className} relative group md:text-xl  lg:text-3xl `} style=  {myfont.style} >
            {a.title}

            <span className={`h-[2px] inline-block  w-0 bg-[#ffd646] absolute -bottom-0.5 left-[50%] translate-x-[-50%]
                group-hover:w-full transition-all ease duration-300  ${router === a.href ? 'w-full' : 'w-0'} `} >
                &nbsp;
            </span>
        </Link>
    )
}

function NavBar() {
    return (

        <header className=' flex items-center justify-between  '>
           <div></div>

           <div>
                <nav  className="hidden  px-32 py-10   md:flex md:w-full        ">
                    <MyLink href="/" title="Home" className='lg:mr-6 sm:mr-3'/>
                    <MyLink href="/about" title="About" className='lg:mx-6 sm:mx-3'/>
                    <MyLink href="/projects" title="Projects" className='lg:mx-6 sm:mx-3 '/>
                    <MyLink href="/blogs" title="Blogs" className='lg:mx-6 sm:mx-4'/>
                    <MyLink href="/hireme" title="Hire&nbsp;Me" className='lg:ml-6 sm:ml-3'/>
                </nav>
            </div>

            <div className=' py-6 px-5 md:hidden '>
                <Button variant="ghost" size="icon" className="md:hidden ">
                <Menu />
                </Button>
            </div>

{/* use this block here to add resume download button
            <div className='hidden md:flex py-6 px-5'>
                <Button   size="icon" className=" ">
                    <Menu />
                </Button>
            </div>
*/}

        </header>


    );
}

export default NavBar;