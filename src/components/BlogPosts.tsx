import { getBlogPostsMeta } from "@/lib/posts"
import {ListBlogsItem} from "./ListItem"
import React from "react";

export default async function BlogPosts() {
    const posts = await getBlogPostsMeta()
    if (!posts) {
        return <p className="mt-10 text-center">Sorry, no posts available.</p>
    }

    return (
        <section className=" mt-16    ">

            <ul className="w-full list-none         ">
                {posts.posts.map(post => (
                    <ListBlogsItem key={post.id} post={post} />
                ))}
            </ul>
        </section>
    )
}