import React from 'react';
import ProjectPosts from "@/components/ProjectPosts";
import SectionTitle from "@/components/sections/SectionTitle";

export const revalidate = 10
function About( ):React.JSX.Element {
    return (
        <div className=' '>
 
           <ProjectPosts/>
        </div>
    );
}

export default About;