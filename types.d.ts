type Meta = {
    id: string,
    image: string,
    title: string,
    description: string,
    date: string,
    tags: string[],
    minutes?: number,
}

type Heading = {
    depth: number,
    text: string,
    id: string,
}

type BlogPost = {
    meta: Meta,
    headings: Heading[],
    content: ReactElement<any, string | JSXElementConstructor<any>>,
}
