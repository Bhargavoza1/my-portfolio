"use client"
import Link from "next/link";

import { Github, Linkedin, Youtube, Mail } from "lucide-react";

function SocialMedia({MyColor = '#58cee3'}: {MyColor: string}) {
    const icon = 'h-7 w-7 md:h-8 md:w-8'
    return (
        <div className='flex items-center gap-6'>
            <Link href='https://github.com/Bhargavoza1' aria-label='GitHub'><Github className={icon} color={MyColor}/></Link>
            <Link href='https://www.linkedin.com/in/bhargav-oza-549072100/' aria-label='LinkedIn'><Linkedin className={icon} color={MyColor}/></Link>
            <Link href='https://www.youtube.com/channel/UCMbi7404LA6itxNfG08Cr7w' aria-label='YouTube'><Youtube className={icon} color={MyColor}/></Link>
            <Link href='mailto:ozabhargav41@gmail.com' aria-label='Email'><Mail className={icon} color={MyColor}/></Link>
        </div>
    );
}

export default SocialMedia;
