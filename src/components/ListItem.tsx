import Link from "next/link"
import getFormattedDate from "@/lib/getFormattedDate"

type Props = {
    post: Meta
}

export   function ListBlogsItem({ post }: Props) {
    const { id,description, title, date } = post
    const formattedDate = getFormattedDate(date)
    return (
        <li className="  text-2xl dark:text-white/90">
            <p className="text-sm mt-1">{formattedDate}</p>
            <Link className="underline hover:text-black/70 dark:hover:text-white text-MyRed" href={`/blogs/${id}`}>{title}</Link>
            <h2 className='text-xl text-gray-400'>{description}</h2>

            <br />

        </li>
    )
}

export  function ListProjectsItem({ post }: Props) {
    const { id,description,title, date } = post
    const formattedDate = getFormattedDate(date)

    return (
        <li className="  text-2xl dark:text-white/90">
            <p className="text-sm mt-1">{formattedDate}</p>
            <Link className="underline hover:text-black/70 dark:hover:text-white text-MyRed" href={`/projects/${id}`}>{title}</Link>
            <h2 className='text-xl text-gray-400'>{description}</h2>

            <br />
        </li>
    )
}

