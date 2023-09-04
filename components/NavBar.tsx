"use client"
import Link from "next/link";

import {usePathname } from "next/navigation";

const MyLink = ({href, title , className=""})=>{
    const router = usePathname();

    return(
        <Link href={href} className={`${className} relative group`}>
            {title}
            <span className={`h-[1px] inline-block  w-0 bg-black absolute left-0 -bottom-0.5
                group-hover:w-full transition-all ease duration-300  ${router === href ? 'w-full' : 'w-0'} `} >
                &nbsp;
            </span>
        </Link>
    )
}

function NavBar( ) {
    return (
        <div>
        <header className='w-full px-32 py-8 font-medium  flex items-center justify-between'>
           <nav >
               <MyLink href="/" title="Home" className='mr-4'/>
               <MyLink href="/about" title="About" className='mx-4'/>
               <MyLink href="/projects" title="Projects" className='mx-4'/>
               <MyLink href="/blogs" title="Blogs" className='mx-4'/>
               <MyLink href="/hireme" title="Hire Me" className='ml-4'/>
           </nav>
        </header>

        </div>
    );
}

export default NavBar;