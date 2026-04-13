import { getBlogPostsMeta } from "@/lib/posts"
import PaginatedBlogPosts from "./PaginatedBlogPosts"
import React from "react";

export default async function BlogPosts() {
    const posts = await getBlogPostsMeta()

    if (!posts) {
        return <p className="mt-10 text-center">Sorry, no posts available.</p>
    }

    return <PaginatedBlogPosts posts={posts} />
}