import Image from "next/image"

type Props = {
    src: string,
    alt: string,
    priority?: string,
    height?: number,
    width?: number,
}

export default function CustomImage({ src, alt, priority, height=1500 , width=1500}  : Props ) {

    const prty = priority ? true : false

    return (

        <div className="h-auto w-auto   ">
            <Image
                className="rounded-lg mx-auto"
                src={src}
                alt={alt}
                height={height}
                width={width}


                priority={prty}
            />
        </div>
    )
}