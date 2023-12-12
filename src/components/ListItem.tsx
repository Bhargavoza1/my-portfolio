import Link from "next/link"
import getFormattedDate from "@/lib/getFormattedDate"
import Image from "next/image";

type Props = {
    post: Meta
}

export function ListBlogsItem({post}: Props) {
    const {id, description, image, title, date, tags} = post
    const formattedDate = getFormattedDate(date)


    return (
        <div className='pb-8'>
            <li className=" shadow-[0.0px_2.0px_2.0px_2.0px_rgba(0,0,0,0.4)] bg-gray-900   text-2xl dark:text-white/90 ">
                <Link href={`/blogs/${id}`}>
                    <div className='xl:flex xl:space-x-10  '>
                        <div className="xl:h-36 xl:w-48 h-28 w-auto relative ">
                            <Image src={image} alt=" " layout="fill" objectFit="cover"/>
                        </div>
                        <div className='xl:pt-2 pt-2'>
                            <p className="text-sm mt-1 pb-2">{formattedDate}</p>
                            <div
                                className="underline hover:text-black/70 dark:hover:text-white text-MyRed ">{title}</div>
                            <h2 className='text-lg text-gray-400 pt-2 xl:pb-0 pb-3'>{description}</h2>

                            <div
                                className=" xl:flex grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-x-0 gap-y-0 xl:space-x-3 pt-1 xl:pb-0 pb-3   ">{tags.map(tag => (
                                <div key={tag} className=' text-MyBlue text-sm'>#{tag}</div>))}</div>

                        </div>
                    </div>
                </Link>

            </li>

        </div>
    )
}

export function ListProjectsItem({post}: Props) {
    const {id, description, image, title, date, tags} = post
    const formattedDate = getFormattedDate(date)

    return (
        <div className='pb-8'>
            <li className=" shadow-[0.0px_2.0px_2.0px_2.0px_rgba(0,0,0,0.4)] bg-gray-900  text-2xl dark:text-white/90">

                <Link
                    href={`/projects/${id}`}>


                    <div className='xl:flex xl:space-x-10'>
                        <div className="xl:h-36 xl:w-48 h-28 w-auto relative">
                            <Image src={image} alt=" " layout="fill" objectFit="cover"/>
                        </div>
                        <div className='xl:pt-2 pt-2'>
                            <p className="text-sm mt-1 pb-2">{formattedDate}</p>
                            <div
                                className="underline hover:text-black/70 dark:hover:text-white text-MyRed ">{title}</div>
                            <h2 className='text-lg text-gray-400 pt-2 xl:pb-0 pb-3'>{description}</h2>

                            <div
                                className=" xl:flex grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-x-0 gap-y-0 xl:space-x-3 pt-1 xl:pb-0 pb-3   ">{tags.map(tag => (
                                <div key={tag} className=' text-MyBlue text-sm'>#{tag}</div>))}</div>
                        </div>
                    </div>

                </Link>


            </li>

        </div>
    )
}

