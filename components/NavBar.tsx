"use client"
import Link from "next/link";
import {usePathname } from "next/navigation";

const MyLink = (a:{href:string, title:string , className:string })=>{
    const router:string = usePathname();
    return(
        <Link href={a.href} className={`${a.className} relative group `} >
            {a.title}

            <span className={`h-[1px] inline-block  w-0 bg-black absolute -bottom-0.5 left-[50%] translate-x-[-50%]
                group-hover:w-full transition-all ease duration-300  ${router === a.href ? 'w-full' : 'w-0'} `} >
                &nbsp;
            </span>
        </Link>
    )
}

function NavBar() {
    return (
        <div>
        <header className='w-full px-32 py-8 font-medium  flex items-center justify-between '>
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