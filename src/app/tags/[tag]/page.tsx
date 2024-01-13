import {getBlogPostsMeta, getProjectPostsMeta} from "@/lib/posts"
import {ListBlogsItem, ListProjectsItem} from "@/components/ListItem";
import Link from "next/link"
import Pagination from "@/components/pagination";
import React from "react";


type Props = {
    params: {
        tag: string
    }
}
const perPage: number = 10
export async function generateStaticParams() {
    const posts = await getBlogPostsMeta(undefined, false) //deduped!
    const posts2 = await getProjectPostsMeta(undefined, false) //deduped!


    if (!posts || !posts2) return []

    const tags = new Set([posts.posts.map(post => post.tags).flat(), posts2.posts.map(post2 => post2.tags).flat()].flat())


    return Array.from(tags).map((tag) => ({tag}))
}

export function generateMetadata({params: {tag}}: Props) {

    return {
        title: `Posts about ${tag}`
    }
}


// @ts-ignore
export default async function TagPostList({searchParams, params: {tag}}: { searchParams: any; params: Props }) {
    const posts = await getBlogPostsMeta(undefined, false) //deduped!
    const posts2 = await getProjectPostsMeta(undefined, false) //deduped!

    if (!posts || !posts2) return <p className="mt-10 text-center">Sorry, no posts available.</p>

    const tagPosts = [posts.posts.filter(post => post.tags.includes(tag)), posts2.posts.filter(post2 => post2.tags.includes(tag))].flat()

    let defaultPage ;
    if (!searchParams.page) {
        // Set the default page to 1
        defaultPage = 1;
    }
    const page = parseInt(searchParams.page || defaultPage);

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;

    const totalPages =     Math.ceil(tagPosts.length / perPage);



    tagPosts.sort((a, b) => a.date < b.date ? 1 : -1)
    const paginatedContents = tagPosts.slice(startIndex, endIndex)

    if (!tagPosts.length) {
        return (
            <div className="text-center">
                <p className="mt-10">Sorry, no posts for that keyword.</p>
                <Link href="/">Back to Home</Link>
            </div>
        )
    }


    const pagename: string = `tags/${tag}`;
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
                    {paginatedContents.map(post => (
                        post.tags.includes('blog') ?
                            <ListBlogsItem key={post.id} post={post}/> :
                            <ListProjectsItem key={post.id} post={post}/>
                    ))}
                </ul>
            </section>

            <Pagination pageName={pagename}  totalPages={totalPages} page={page} searchParams={searchParams.page}/>
        </div>
    )
}