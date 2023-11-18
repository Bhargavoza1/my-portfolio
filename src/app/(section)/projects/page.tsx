import React from 'react';
import ProjectPosts from "@/components/ProjectPosts";

export const revalidate = 10
function About( ):React.JSX.Element {
    return (
        <div className='px-4 md:px-6 prose prose-xl prose-slate dark:prose-invert mx-auto'>blogs
           <ProjectPosts/>
        </div>

    );
}

export default About;