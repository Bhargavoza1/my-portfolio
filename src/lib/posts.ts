import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import GithubSlugger from 'github-slugger'
import { promises as fs } from 'fs'
import path from 'path'
import Video from '@/components/Video'
import CustomImage from '@/components/CustomImage'
import Callout from '@/components/Callout'
import ReplayViewer from '@/components/replay/ReplayViewer'
import 'highlight.js/styles/github.css'
import 'katex/dist/katex.min.css'

// Posts live in two GitHub repos: Bhargavoza1/blogs (shown as "Notes") and
// Bhargavoza1/projects. For offline preview, set LOCAL_CONTENT_DIR to a folder that
// holds clones of both (LOCAL_CONTENT_DIR/blogs, LOCAL_CONTENT_DIR/projects).

type Repo = 'blogs' | 'projects'

const ghHeaders = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    'X-GitHub-Api-Version': '2022-11-28',
}

function localDir(repo: Repo) {
    const root = process.env.LOCAL_CONTENT_DIR
    return root ? path.join(root, repo) : null
}

async function listFiles(repo: Repo): Promise<string[] | undefined> {
    const dir = localDir(repo)
    if (dir) {
        try {
            return (await fs.readdir(dir)).filter(f => f.endsWith('.mdx'))
        } catch { return undefined }
    }
    const res = await fetch(`https://api.github.com/repos/Bhargavoza1/${repo}/git/trees/main?recursive=1`,
        { headers: ghHeaders, next: { revalidate: 1 } })
    if (!res.ok) return undefined
    const tree: { tree: { path: string }[] } = await res.json()
    return tree.tree.map(o => o.path).filter(p => p.endsWith('.mdx'))
}

async function readRaw(repo: Repo, file: string): Promise<string | undefined> {
    const dir = localDir(repo)
    if (dir) {
        try {
            return await fs.readFile(path.join(dir, file), 'utf8')
        } catch { return undefined }
    }
    const res = await fetch(`https://raw.githubusercontent.com/Bhargavoza1/${repo}/main/${file}`,
        { headers: ghHeaders, next: { revalidate: 1 } })
    if (!res.ok) return undefined
    const raw = await res.text()
    return raw === '404: Not Found' ? undefined : raw
}

function getFrontmatterOnly(rawMDX: string): Meta | null {
    const match = rawMDX.match(/^---\r?\n([\s\S]*?)\r?\n---/)
    if (!match) return null

    const frontmatter = match[1]
    const get = (key: string) => frontmatter.match(new RegExp(`^${key}:\\s*['"]?([^'"\n]+)['"]?`, 'm'))?.[1]?.trim() ?? ''
    const tags = (frontmatter.match(/tags:\s*\[([^\]]+)\]/)?.[1] ?? '')
        .split(',').map(t => t.trim().replace(/['"]/g, '')).filter(Boolean)

    return {
        id: '',
        title: get('title'),
        image: get('image'),
        description: get('description'),
        date: get('date'),
        tags,
        minutes: readMinutes(rawMDX),
    }
}

// "## Heading" lines of the body, with the same ids rehype-slug gives them
function getHeadings(rawMDX: string): Heading[] {
    const body = rawMDX.replace(/^---[\s\S]*?\n---/, '').replace(/```[\s\S]*?```/g, '')
    const slugger = new GithubSlugger()
    const out: Heading[] = []
    for (const m of Array.from(body.matchAll(/^(#{2,3})\s+(.+?)\s*#*\s*$/gm))) {
        const text = m[2].replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '').trim()
        const id = slugger.slug(text)
        out.push({ depth: m[1].length, text, id })
    }
    return out
}

function readMinutes(rawMDX: string) {
    const words = rawMDX.replace(/^---[\s\S]*?\n---/, '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.round(words / 220))
}

// YAML turns an unquoted 2026-11-20 into a Date
function toDateString(d: unknown) {
    return d instanceof Date ? d.toISOString().slice(0, 10) : String(d ?? '')
}

async function getPost(repo: Repo, fileName: string): Promise<BlogPost | undefined> {
    const rawMDX = await readRaw(repo, fileName)
    if (!rawMDX) return undefined

    const { frontmatter, content } = await compileMDX<{ title: string, image: string, description: string, date: string, tags: string[] }>({
        source: rawMDX,
        components: { Video, CustomImage, Callout, ReplayViewer },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    // @ts-ignore
                    rehypeHighlight,
                    rehypeSlug,
                    // @ts-ignore
                    rehypeKatex,
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                ],
                remarkPlugins: [remarkMath],
            },
        }
    })

    const id = fileName.replace(/\.mdx$/, '')
    return {
        meta: {
            id, title: frontmatter.title, image: frontmatter.image, description: frontmatter.description,
            date: toDateString(frontmatter.date as unknown),
            tags: frontmatter.tags ?? [], minutes: readMinutes(rawMDX),
        },
        headings: getHeadings(rawMDX),
        content,
    }
}

async function getPostsMeta(repo: Repo): Promise<Meta[] | undefined> {
    const files = await listFiles(repo)
    if (!files) return undefined
    const posts: Meta[] = []
    for (const file of files) {
        const raw = await readRaw(repo, file)
        if (!raw) continue
        const meta = getFrontmatterOnly(raw)
        if (meta) {
            meta.id = file.replace(/\.mdx$/, '')
            posts.push(meta)
        }
    }
    return posts.sort((a, b) => a.date < b.date ? 1 : -1)
}

export const getBlogPostByName = (fileName: string) => getPost('blogs', fileName)
export const getProjectPostByName = (fileName: string) => getPost('projects', fileName)
export const getBlogPostsMeta = () => getPostsMeta('blogs')
export const getProjectPostsMeta = () => getPostsMeta('projects')
