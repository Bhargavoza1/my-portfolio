"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Menu, Github, Linkedin, Youtube, Instagram, Hash} from "lucide-react";
import {Sheet, SheetClose, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import localFont from "next/font/local";
import {useEffect, useState} from "react";


//const myfont = localFont({src: "./fonts/cyber.bold-book.ttf"})
const myfont = localFont({src: "./fonts/OTF/Satoshi-Bold.otf"})




const MyLink = ({href, title, className, spanclass = ' '}: {
    href: string,
    title: string,
    className: string,
    spanclass: string
}) => {
    const router: string = usePathname();
    return (
        <Link href={href} className={`${className}  relative group md:text-1xl  lg:text-2xl `} style={myfont.style}>
            {title}

            <span className={`${spanclass} h-[2px] inline-block  w-0 bg-MyRed absolute -bottom-1
                group-hover:w-full transition-all ease duration-300  ${router === href ? 'w-full' : 'w-0'} `}>
                &nbsp;
            </span>
        </Link>
    )
}

const ChildComp: React.FC = () => <div className="flex  h-screen">
    <div className="flex justify-center w-1/4  items-end mb-20">
        <div className="flex flex-col space-y-8 items-center">
            <Link href='https://www.linkedin.com/in/bhargav-oza-549072100/'><Linkedin color='#1a1a1f'/></Link>
            <Link href='https://github.com/Bhargavoza1'><Github color='#1a1a1f'/></Link>
            <Link href='https://www.youtube.com/channel/UCMbi7404LA6itxNfG08Cr7w'><Youtube color='#1a1a1f'/></Link>
            <Link href='https://www.instagram.com/troniq_777/'><Instagram color='#1a1a1f'/></Link>
        </div>

    </div>
</div>

function NavBar() {

    const router: string = usePathname();


    const [top, setTop] = useState(true);

    useEffect(() => {
        const scrollHandler = () => {
            window.scrollY > 10 ? setTop(false) : setTop(true)
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);

    return (

        <header
            className={`  bg-[#091f39]  left-0 top-0 right-0 z-20 flex fixed w-full  content-center   items-center   justify-between   
                 place-items-center ${!top && `  shadow-[0_2px_5px_0px_rgba(0,0,0,0.5)] `}`}>

<div className='mx-auto max-w-[1800px]      flex  w-full  content-center   items-center   justify-between    ' >
            <div className='  2xl:flex belowmd:flex   px-5 lg:px-14 belowmd:px-5'><Link href='/'> <Hash
                className=' w-12 h-12  belowmd:w-8 belowmd:h-8' color='#d43256'/></Link></div>
            <div>
                <nav className="hidden  myimg:px-5 py-[25px] mylandscape:py-[15px]   md:flex md:w-full        ">
                    <MyLink href="/" title="HOME" className=' mr-8 '
                            spanclass=' left-[50%] translate-x-[-50%]'/>
                    {/*<MyLink href="/#about" title="ABOUT" className=' mx-8  '
                            spanclass='left-[50%] translate-x-[-50%] '/>*/}
                    <MyLink href="/projects" title="PROJECTS" className=' mx-8   '
                            spanclass='left-[50%] translate-x-[-50%] '/>
                    <MyLink href="/blogs" title="BLOGS" className=' mx-8  '
                            spanclass='left-[50%] translate-x-[-50%] '/>
                    {/*<MyLink href="/#contact" title="CONTACT" className=' ml-8  '
                            spanclass=' left-[50%] translate-x-[-50%]'/>*/}
                </nav>
            </div>

            <div className=' py-3 px-5 md:hidden  '>
                <Sheet>
                    <SheetTrigger className='md:hidden'>

                        <Menu/>

                    </SheetTrigger>
                    <SheetContent side='right'
                                  className='  p-0 border-0  data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right'
                                  overlayclass='bg-MyRed' overlaychild={<ChildComp/>}>

                        <div className='bg-MyBlue     h-full text-[#1a1a1f] p-0'>
                            <div className='   flex pt-[70px] items-center '>

                                <nav className="grid   w-[10px]  space-y-10    ">
                                    <SheetClose asChild>

                                        <Link href="/" className={`  text-4xl  w-fit pl-1 relative group md:text-3xl  lg:text-4xl `} style={myfont.style}>
                                            HOME

                                            <span className={`left-[0] translate-x-[0] h-[2px] inline-block  w-0 bg-MyRed absolute -bottom-1
                                            group-hover:w-full transition-all ease duration-300  ${router === "/" ? 'w-full' : 'w-0'} `}>
                                            &nbsp;
                                            </span>
                                        </Link>
                                    </SheetClose>

                                    {/*<SheetClose asChild>

                                        <Link href="/#about" className={`  text-4xl  w-fit pl-1 relative group md:text-3xl  lg:text-4xl `} style={myfont.style}>
                                            ABOUT

                                            <span className={`left-[0] translate-x-[0] h-[2px] inline-block  w-0 bg-MyRed absolute -bottom-1
                                            group-hover:w-full transition-all ease duration-300  ${router === "/about" ? 'w-full' : 'w-0'} `}>
                                            &nbsp;
                                            </span>
                                        </Link>
                                    </SheetClose>*/}

                                    <SheetClose asChild>

                                        <Link href="/projects" className={`  text-4xl  w-fit pl-1 relative group md:text-3xl  lg:text-4xl `} style={myfont.style}>
                                            PROJECTS

                                            <span className={`left-[0] translate-x-[0] h-[2px] inline-block  w-0 bg-MyRed absolute -bottom-1
                                            group-hover:w-full transition-all ease duration-300  ${router === "/projects" ? 'w-full' : 'w-0'} `}>
                                            &nbsp;
                                            </span>
                                        </Link>
                                    </SheetClose>


                                    <SheetClose asChild>

                                        <Link href="/blogs" className={`  text-4xl  w-fit pl-1 relative group md:text-3xl  lg:text-4xl `} style={myfont.style}>
                                            BLOGS

                                            <span className={`left-[0] translate-x-[0] h-[2px] inline-block  w-0 bg-MyRed absolute -bottom-1
                                            group-hover:w-full transition-all ease duration-300  ${router === "/blogs" ? 'w-full' : 'w-0'} `}>
                                            &nbsp;
                                            </span>
                                        </Link>
                                    </SheetClose>


                                    {/*<SheetClose asChild>

                                        <Link href="/#contact" className={`  text-4xl  w-fit pl-1 relative group md:text-3xl  lg:text-4xl `} style={myfont.style}>
                                            CONTACT

                                            <span className={`left-[0] translate-x-[0] h-[2px] inline-block  w-0 bg-MyRed absolute -bottom-1
                                            group-hover:w-full transition-all ease duration-300  ${router === "/hireme" ? 'w-full' : 'w-0'} `}>
                                            &nbsp;
                                            </span>
                                        </Link>
                                    </SheetClose>*/}



                                </nav>

                            </div>

                        </div>
                    </SheetContent>
                </Sheet>
            </div>
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