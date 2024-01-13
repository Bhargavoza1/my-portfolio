import { getBlogPostsMeta, getProjectPostsMeta  } from "@/lib/posts"
import {ListBlogsItem, ListProjectsItem} from "@/components/ListItem";
import Link from "next/link"


type Props = {
    params: {
        tag: string
    }
}

export async function generateStaticParams() {
    const posts = await getBlogPostsMeta() //deduped!
    const posts2 = await getProjectPostsMeta() //deduped!


    if (!posts || !posts2) return []

    const tags = new Set([posts.map(post => post.tags).flat(), posts2.map(post2 => post2.tags).flat()].flat())


    return Array.from(tags).map((tag) => ({ tag }))
}

export function generateMetadata({ params: { tag } }: Props) {

    return {
        title: `Posts about ${tag}`
    }
}

export default async function TagPostList({ params: { tag } }: Props) {
    const posts = await getBlogPostsMeta() //deduped!
    const posts2 = await getProjectPostsMeta() //deduped!
    console.log(posts)
    if (!posts || !posts2) return <p className="mt-10 text-center">Sorry, no posts available.</p>

    const tagPosts = [posts.filter(post => post.tags.includes(tag)),posts2.filter(post2 => post2.tags.includes(tag))].flat()

    if (!tagPosts.length) {
        return (
            <div className="text-center">
                <p className="mt-10">Sorry, no posts for that keyword.</p>
                <Link href="/">Back to Home</Link>
            </div>
        )
    }


    //
    // tagPosts.map(post => (
    //     post.tags.includes('project') ?
    //         console.log(post.tags) : console.log('none')
    //
    // ))

    return (
        <div className='mt-24 md:mt-40 px-4 md:px-6  max-w-[1700px] mx-auto    pt-4 md:pb-4 sm:px-6  lg:px-8 '>
            <h2 className="text-3xl mt-4 mb-0">All Projects or Blogs related to: #{tag}</h2>
            <section className="mt-6    ">
                <ul className="w-full list-none p-0">
                    {tagPosts.map(post => (
                        post.tags.includes('blog') ?
                            <ListBlogsItem key={post.id} post={post} /> :
                            <ListProjectsItem key={post.id} post={post} />
                    ))}
                </ul>
            </section>
        </div>
    )
}