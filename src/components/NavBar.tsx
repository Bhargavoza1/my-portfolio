"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import localFont from "next/font/local";

const myfont = localFont({src: "./fonts/cyber.bold-book.ttf"})
//const myfont = localFont({src:"./fonts/OTF/Satoshi-Black.otf"})
const MyLink = ({href, title, className, spanclass = ' '}: {
    href: string,
    title: string,
    className: string,
    spanclass: string
}) => {
    const router: string = usePathname();
    return (
        <Link href={href} className={`${className}  relative group md:text-2xl  lg:text-3xl `} style={myfont.style}>
            {title}

            <span className={`${spanclass} h-[2px] inline-block  w-0 bg-[#ffd646] absolute -bottom-0.5 left-[50%] translate-x-[-50%]
                group-hover:w-full transition-all ease duration-300  ${router === href ? 'w-full' : 'w-0'} `}>
                &nbsp;
            </span>
        </Link>
    )
}

function NavBar() {
    return (

        <header
            className=' grid myimg:flex  content-center   items-center  justify-end navcenter:justify-evenly       place-items-center  '>


            <div>
                <nav className="hidden  myimg:px-32 py-[40px]   md:flex md:w-full        ">
                    <MyLink href="/" title="Home" className='lg:mr-6 sm:mr-3.5' spanclass=' '/>
                    <MyLink href="/about" title="About" className='lg:mx-6 sm:mx-3.5' spanclass=' '/>
                    <MyLink href="/projects" title="Projects" className='lg:mx-6 sm:mx-3.5 ' spanclass=' '/>
                    <MyLink href="/blogs" title="Blogs" className='lg:mx-6 sm:mx-3.5' spanclass=' '/>
                    <MyLink href="/hireme" title="Hire&nbsp;Me" className='lg:ml-6 sm:ml-3.5' spanclass=' '/>
                </nav>
            </div>

            <div className=' py-6 px-5 md:hidden  '>
                <Sheet>
                    <SheetTrigger className='md:hidden'>

                        <Menu/>

                    </SheetTrigger>
                    <SheetContent side='right'
                                  className='bg-[#ffd646]  p-0 border-0  data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right'>
                        <div className='bg-[#1b96f3]     h-full text-black p-0'>
                            <div className='   flex min-h-[80vh] items-center '>
                                <nav className="grid   w-[10px]  space-y-10    ">
                                    <MyLink href="/" title="Home" className='text-3xl  w-fit pl-1'
                                            spanclass='left-[0] translate-x-[0]'/>
                                    <MyLink href="/about" title="About" className='text-3xl w-fit pl-1'
                                            spanclass='left-[0] translate-x-[0]'/>
                                    <MyLink href="/projects" title="Projects" className='text-3xl w-fit pl-1'
                                            spanclass='left-[0] translate-x-[0]'/>
                                    <MyLink href="/blogs" title="Blogs" className='text-3xl w-fit pl-1'
                                            spanclass='left-[0] translate-x-[0]'/>
                                    <MyLink href="/hireme" title="Hire&nbsp;Me" className='text-3xl w-fit pl-1'
                                            spanclass='left-[0] translate-x-[0]'/>
                                </nav>
                            </div>

                        </div>
                    </SheetContent>
                </Sheet>
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