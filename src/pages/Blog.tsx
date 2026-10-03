import { Link } from 'react-router-dom'
import { formatDate, posts } from '../content'

export default function Blog() {
  return (
    <section className="section page-top">
      <div className="section-head section-head-split">
        <h1>Le blog</h1>
        <p>Coulisses, retours d’expérience et conseils pour réussir vos événements et votre communication.</p>
      </div>
      <div className="posts">
        {posts.map((p) => (
          <Link key={p.slug} to={`/blog/${p.slug}`} className="post-card">
            <img src={p.cover} alt="" loading="lazy" />
            <div>
              <time dateTime={p.date}>{formatDate(p.date)}</time>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
