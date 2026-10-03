import { Link, useParams } from 'react-router-dom'
import { formatDate, posts } from '../content'

export default function Post() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <section className="section page-top article">
        <h1>Article introuvable</h1>
        <Link to="/blog" className="back">
          ← Retour au blog
        </Link>
      </section>
    )
  }

  return (
    <article className="section page-top article">
      <Link to="/blog" className="back">
        ← Retour au blog
      </Link>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <h1>{post.title}</h1>
      <img src={post.cover} alt="" />
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  )
}
