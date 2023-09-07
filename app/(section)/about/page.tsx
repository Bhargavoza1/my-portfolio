import React from 'react';
import localFont from "next/font/local";
const myfont = localFont({src:"../../../components/fonts/ron-ron-regular-400.ttf"})
function About( ):React.JSX.Element {
    return (
        <div className='absolute [word-spacing:5px] tracking-widest' style=  {myfont.style}>  I am computer engineer from india.
        </div>
    );
}

export default About;