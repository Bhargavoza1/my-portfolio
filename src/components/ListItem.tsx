import Link from "next/link"
import getFormattedDate from "@/lib/getFormattedDate"
import Image from "next/image";

type Props = {
    post: Meta
}

export function ListBlogsItem({post}: Props) {
    const {id, description, image, title, date} = post
    const formattedDate = getFormattedDate(date)
    return (
        <li className="  text-2xl dark:text-white/90 ">
            <Link href={`/blogs/${id}`}>
                <div className='xl:flex xl:space-x-10  '>
                    <div className="xl:h-32 xl:w-48 h-28 w-auto relative ">
                        <Image src={image} alt=" " layout="fill" objectFit="cover" />
                    </div>
                    <div className='xl:pt-2 pt-2'>
                        <p className="text-sm mt-1 pb-2">{formattedDate}</p>
                        <div className="underline hover:text-black/70 dark:hover:text-white text-MyRed ">{title}</div>
                        <h2 className='text-xl text-gray-400 pt-2 xl:pb-0 pb-3'>{description}</h2>


                    </div>
                </div>
            </Link>

        </li>
    )
}

export function ListProjectsItem({post}: Props) {
    const {id, description ,image, title, date} = post
    const formattedDate = getFormattedDate(date)

    return (
        <li className="  text-2xl dark:text-white/90 ">

            <Link
                  href={`/projects/${id}`}>


                <div className='xl:flex xl:space-x-8'>
                    <div className="xl:h-32 xl:w-48 h-28 w-auto relative">
                        <Image src={image} alt=" " layout="fill" objectFit="cover" className="rounded-xl"/>
                    </div>
                    <div className='xl:pt-0 pt-2'>
                        <p className="text-sm mt-1 pb-2">{formattedDate}</p>
                        <div className="underline hover:text-black/70 dark:hover:text-white text-MyRed ">{title}</div>
                        <h2 className='text-xl text-gray-400 pt-2'>{description}</h2>

                        <br/>
                    </div>
                </div>

            </Link>


            <br/>
        </li>
    )
}

