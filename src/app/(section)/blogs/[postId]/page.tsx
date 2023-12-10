import getFormattedDate from "@/lib/getFormattedDate"
import {  getBlogPostByName , getBlogPostsMeta} from "@/lib/posts"
import { notFound } from "next/navigation"
import Link from "next/link"
import 'highlight.js/styles/github-dark.css'
import styles from "@/app/(section)/about/page.module.css";

export const revalidate = 10

type Props = {
    params: {
        postId: string
    }
}

export async function generateStaticParams() {
    const posts = await getBlogPostsMeta() //deduped!

    if (!posts) return []

    return posts.map((post) => ({
        postId: post.id
    }))
}

export async function generateMetadata({ params: { postId } }: Props) {

    const post = await getBlogPostByName(`${postId}.mdx`) //deduped!

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: post.meta.title,
        description: post.meta.description,
    }
}

export default async function Post({ params: { postId } }: Props) {

    const post = await getBlogPostByName(`${postId}.mdx`) //deduped!

    if (!post) notFound()

    const { meta, content } = post

    const pubDate = getFormattedDate(meta.date)

    const tags = meta.tags.map((tag, i) => (
        <Link className='text-gray-400 md:text-lg text-sm' key={i} href={`/tags/${tag}`}>#{tag}</Link>
    ))

    return (
        <main className='mt-24 md:mt-40 px-4 md:px-6 prose  prose-invert prose-xl prose-slate dark:prose-invert mx-auto'>
            <h2 className={`  text-5xl   mt-4 mb-1 `}>{meta.title}</h2>
            <p className= {`${styles.thickline3} mt-0 text-sm  `}>
                {pubDate}
            </p>
            <article  >
                {content}
            </article>
            <section>
                <h3 className='text-gray-400'>Related:</h3>
                <div className="  flex flex-row gap-2">
                    {tags}
                </div>
            </section>
            <p className="  mb-10">
                <Link className='text-MyRed' href="/blogs">← Back</Link>
            </p>
        </main>
    )
}