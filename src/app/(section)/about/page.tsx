import { redirect } from 'next/navigation'

// The About section now lives on the home page.
export default function About() {
    redirect('/#about')
}
