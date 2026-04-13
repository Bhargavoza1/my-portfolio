import { getBlogPostsMeta } from "@/lib/posts"
import PaginatedList from "./PaginatedList"

export default async function BlogPosts() {
    const posts = await getBlogPostsMeta()
    if (!posts) return <p className="mt-10 text-center">Sorry, no posts available.</p>
    return <PaginatedList posts={posts} type="blog" />
}