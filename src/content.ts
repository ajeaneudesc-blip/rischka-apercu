import { asset } from './site'

interface Entry {
  data: Record<string, unknown>
  body: string
  html: string
}

type Files = Record<string, Entry>

const blogFiles = import.meta.glob<Entry>('/content/blog/*.md', { import: 'default', eager: true })
const eventFiles = import.meta.glob<Entry>('/content/events/*.md', { import: 'default', eager: true })
const testimonialFiles = import.meta.glob<Entry>('/content/testimonials/*.md', { import: 'default', eager: true })

export interface Post {
  slug: string
  title: string
  date: string
  cover: string
  summary: string
  html: string
}

export interface SiteEvent {
  slug: string
  title: string
  category: 'Organisé' | 'Suivi'
  date: string
  place: string
  role: string
  image: string
}

export interface Testimonial {
  slug: string
  author: string
  role: string
  body: string
}

const text = (v: unknown) => (v == null ? '' : String(v))

const parse = (files: Files) =>
  Object.entries(files).map(([path, entry]) => ({ slug: path.split('/').pop()!.replace(/\.md$/, ''), ...entry }))

const byDateDesc = <T extends { date: string }>(items: T[]) => items.sort((x, y) => y.date.localeCompare(x.date))

export const posts: Post[] = byDateDesc(
  parse(blogFiles).map(({ slug, data, html }) => ({
    slug,
    title: text(data.title),
    date: text(data.date),
    cover: asset(text(data.cover)),
    summary: text(data.summary),
    html,
  })),
)

export const events: SiteEvent[] = byDateDesc(
  parse(eventFiles).map(({ slug, data }) => ({
    slug,
    title: text(data.title),
    category: data.category === 'Suivi' ? 'Suivi' : 'Organisé',
    date: text(data.date),
    place: text(data.place),
    role: text(data.role),
    image: asset(text(data.image)),
  })),
)

export const testimonials: Testimonial[] = parse(testimonialFiles).map(({ slug, data, body }) => ({
  slug,
  author: text(data.author),
  role: text(data.role),
  body,
}))

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split('-')
  return y && m && d ? `${d}/${m}/${y}` : iso
}
