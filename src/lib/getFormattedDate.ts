// "2024-06-19" -> "June 19, 2024". Reads the numbers itself, so a date like
// "2024-06-019" in old frontmatter still works.
function parts(dateString: string) {
    const m = String(dateString).match(/(\d{4})-(\d{1,2})-(\d{1,3})/)
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null
}

export default function getFormattedDate(dateString: string): string {
    const p = parts(dateString)
    const d = p ? new Date(Date.UTC(p[0], p[1] - 1, p[2])) : new Date(dateString)
    if (isNaN(d.getTime())) return String(dateString)
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(d)
}

// "2024-06-19" (mono dates in the notes list)
export function getIsoDate(dateString: string): string {
    const p = parts(dateString)
    if (!p) return String(dateString)
    return `${p[0]}-${String(p[1]).padStart(2, '0')}-${String(p[2]).padStart(2, '0')}`
}

export function getYear(dateString: string): string {
    return String(parts(dateString)?.[0] ?? '')
}
