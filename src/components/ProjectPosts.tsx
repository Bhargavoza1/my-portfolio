import { getProjectPostsMeta } from "@/lib/posts"
import PaginatedProjectPosts from "./PaginatedProjectPosts"

export default async function ProjectPosts() {
    const posts = await getProjectPostsMeta()

    if (!posts) {
        return <p className="mt-10 text-center">Sorry, no posts available.</p>
    }

    return <PaginatedProjectPosts posts={posts} />
}