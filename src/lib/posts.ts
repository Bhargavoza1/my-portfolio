import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import Video from '@/components/Video'
import CustomImage from '@/components/CustomImage'
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
// @ts-ignore
import * as katexcss from 'katex/dist/katex.css'


type Filetree = {
    "tree": [
        {
            "path": string,
        }
    ]
}

export async function getBlogPostByName(fileName: string): Promise<BlogPost | undefined> {
    const res = await fetch(`https://raw.githubusercontent.com/Bhargavoza1/blogs/main/${fileName}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        } 
    })

    if (!res.ok) return undefined

    const rawMDX = await res.text()

    if (rawMDX === '404: Not Found') return undefined


    const { frontmatter, content } = await compileMDX<{ title: string,image:string, description:string, date: string, tags: string[] }>({
        source: rawMDX,
        components: {
            Video,
            CustomImage,
            katexcss,
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    // @ts-ignore
                    rehypeHighlight,
                    rehypeSlug,
                    // @ts-ignore
                    rehypeKatex,
                    [rehypeAutolinkHeadings, {
                        behavior: 'wrap'
                    }],
                ],
                remarkPlugins: [remarkMath],
            },
        }
    })

    const id = fileName.replace(/\.mdx$/, '')
    const blogPostObj: BlogPost = { meta: { id, title: frontmatter.title,image :frontmatter.image, description: frontmatter.description , date: frontmatter.date, tags: frontmatter.tags }, content }

    return blogPostObj
}

export async function getBlogPostsMeta(): Promise<Meta[] | undefined> {
    const res = await fetch('https://api.github.com/repos/Bhargavoza1/blogs/git/trees/main?recursive=1', {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        },  next: { revalidate: 1}
    })

    if (!res.ok) return undefined

    const repoFiletree: Filetree = await res.json()

    const filesArray = repoFiletree.tree.map(obj => obj.path).filter(path => path.endsWith('.mdx'))

    const posts: Meta[] = []

//Considering my algo for pagination will start from here
//   console.log(filesArray.length)

    for (const file of filesArray) {
        const post = await getBlogPostByName(file)
        if (post) {
            const { meta } = post
            posts.push(meta)
        }
    }

    return posts.sort((a, b) => a.date < b.date ? 1 : -1)
}



export async function getProjectPostByName(fileName: string): Promise<BlogPost | undefined> {
    const res = await fetch(`https://raw.githubusercontent.com/Bhargavoza1/projects/main/${fileName}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        },  next: { revalidate: 1}
    })

    if (!res.ok) return undefined

    const rawMDX = await res.text()

    if (rawMDX === '404: Not Found') return undefined


    const { frontmatter, content } = await compileMDX<{ title: string,image:string , description: string , date: string, tags: string[] }>({
        source: rawMDX,
        components: {
            Video,
            CustomImage,
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    // @ts-ignore
                    rehypeHighlight,
                    rehypeSlug,
                    // @ts-ignore
                    rehypeKatex,
                    [rehypeAutolinkHeadings, {
                        behavior: 'wrap'
                    }],
                ],
                remarkPlugins: [remarkMath],
            },
        }
    })

    const id = fileName.replace(/\.mdx$/, '')

    const blogPostObj: BlogPost = { meta: { id, title: frontmatter.title,image:frontmatter.image , description: frontmatter.description , date: frontmatter.date, tags: frontmatter.tags }, content }

    return blogPostObj
}

export async function getProjectPostsMeta(): Promise<Meta[] | undefined> {
    const res = await fetch('https://api.github.com/repos/Bhargavoza1/projects/git/trees/main?recursive=1', {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        },  next: { revalidate: 1}
    })

    if (!res.ok) return undefined

    const repoFiletree: Filetree = await res.json()

    const filesArray = repoFiletree.tree.map(obj => obj.path).filter(path => path.endsWith('.mdx'))

    const posts: Meta[] = []

    for (const file of filesArray) {
        const post = await getProjectPostByName(file)

        if (post) {
            const { meta } = post
            posts.push(meta)
        }
    }

    return posts.sort((a, b) => a.date < b.date ? 1 : -1)
}