import Image from "next/image"

type Props = {
    src: string,
    alt: string,
    priority?: string,
}

export default function CustomImage({ src, alt, priority }: Props) {

    const prty = priority ? true : false

    return (

        <div className="h-auto w-auto   ">
            <Image
                className="rounded-lg mx-auto"
                src={src}
                alt={alt}
                height={1000}
                width={1000}
                objectFit="cover"

                priority={prty}
            />
        </div>
    )
}