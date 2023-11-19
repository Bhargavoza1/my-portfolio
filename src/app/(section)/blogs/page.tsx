import React from 'react';
import BlogPosts from "@/components/BlogPosts";

export const revalidate = 10
function About( ):React.JSX.Element {
    return (
        <div className='{}'>
            <BlogPosts />
        </div>

    );
}

export default About;