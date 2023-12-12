import { getProjectPostsMeta} from "@/lib/posts"
import {  ListProjectsItem} from "./ListItem"

export default async function ProjectPosts() {
    const posts = await getProjectPostsMeta()
    if (!posts) {
        return <p className="mt-10 text-center">Sorry, no posts available.</p>
    }

    return (
        <section className="  mt-16    ">

            <ul className="w-full list-none     ">
                {posts.map(post => (
                    <ListProjectsItem  key={post.id} post={post} />

                ))}
            </ul>
        </section>
    )
}