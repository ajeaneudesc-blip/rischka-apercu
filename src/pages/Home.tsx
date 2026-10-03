import { useState } from 'react'
import { Link } from 'react-router-dom'
import { events, formatDate, posts, testimonials } from '../content'
import { asset, email, phones, whatsappUrl } from '../site'

const services = [
  {
    title: 'Stratégie de communication',
    text: 'Plans de communication, calendriers éditoriaux et plans d’action, en digital comme sur le terrain, pour une marque ou une organisation.',
    image: asset('/images/portrait-wax.webp'),
  },
  {
    title: 'Organisation d’événements',
    text: 'Salons, séminaires, concours, team building et lancements de produits, de la préparation au jour J.',
    image: asset('/images/stage-pink-4.webp'),
  },
  {
    title: 'Création de contenus',
    text: 'Contenus visuels et rédactionnels pour les réseaux sociaux et vos supports, avec Canva et CapCut pour la vidéo.',
    image: asset('/images/host-mic.webp'),
  },
  {
    title: 'Animation de projets culturels',
    text: 'Coordination d’équipes et de partenaires pour des projets culturels et professionnels qui rassemblent.',
    image: asset('/images/host-garden.webp'),
  },
]

const path = [
  ['Depuis 2020', 'Kekely Digital', 'Responsable communication et marketing, event planner'],
  ['Depuis 2021', 'Coopérative agricole Essodoguedowe', 'Chargée de communication en freelance'],
  ['2018 à 2021', 'Radio Lomé', 'Publicité, marketing et partenariats'],
]

const languages = ['Français', 'Tem', 'Anglais', 'Éwé', 'Kabyè']

const filters = [
  ['Tous', 'Tous'],
  ['Organisé', 'Organisés'],
  ['Suivi', 'Suivis'],
] as const

type Filter = (typeof filters)[number][0]

export default function Home() {
  const [filter, setFilter] = useState<Filter>('Tous')
  const shown = events.filter((e) => filter === 'Tous' || e.category === filter)

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero-photo" src={asset('/images/hero.webp')} alt="Portrait de Rischka Adjemini" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <h1 id="hero-title">
            Des événements
            <br />
            qui rassemblent,
            <br />
            une communication
            <br />
            qui marque.
          </h1>
          <span className="chip">Cheffe de projets événementiels et communication</span>
        </div>
        <div className="glass hero-proof">
          <strong>7 ans</strong>
          <span>d’expérience en communication, marketing et événementiel à Lomé.</span>
        </div>
        <div className="glass hero-panel">
          <p>Derniers événements</p>
          <div className="hero-thumbs">
            {events.slice(0, 4).map((e) => (
              <Link key={e.slug} to="/#evenements" aria-label={e.title}>
                <img src={e.image} alt="" />
              </Link>
            ))}
          </div>
          <a href={whatsappUrl} className="btn btn-light" target="_blank" rel="noreferrer">
            Parlons de votre projet <span className="btn-arrow">→</span>
          </a>
        </div>
      </section>

      <section id="apropos" className="section about">
        <div className="about-photo">
          <img src={asset('/images/portrait-blue.webp')} alt="Rischka Adjemini" loading="lazy" />
          <div className="glass about-badge">
            <strong>Lomé, Togo</strong>
            <span>Disponible pour vos projets</span>
          </div>
        </div>
        <div className="about-text">
          <p className="eyebrow">À propos</p>
          <h2>Cheffe de projets événementiels et communication</h2>
          <p>
            Passionnée de communication, de marketing et d’événementiel, je conçois, planifie et coordonne des projets
            à fort impact. Mon objectif : créer des expériences engageantes qui renforcent la visibilité des marques et
            des organisations qui me font confiance.
          </p>
          <p>Créative, rigoureuse et organisée, j’aime autant la précision d’un plan d’action que la chaleur d’une salle pleine.</p>
          <ul className="path">
            {path.map(([when, where, what]) => (
              <li key={where}>
                <span>{when}</span>
                <div>
                  <strong>{where}</strong>
                  <em>{what}</em>
                </div>
              </li>
            ))}
          </ul>
          <p className="langs">
            Langues de travail : <strong>{languages.join(', ')}</strong>
          </p>
        </div>
      </section>

      <section id="services" className="section">
        <div className="section-head section-head-split">
          <h2>Ce que je peux faire pour vous</h2>
          <p>Une seule interlocutrice, de la stratégie à l’événement. Chaque mission est cadrée avec vous avant de démarrer.</p>
        </div>
        <div className="services">
          {services.map((s) => (
            <article key={s.title} className="service">
              <img src={s.image} alt="" loading="lazy" />
              <div className="service-body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="evenements" className="section section-tint">
        <div className="section-head section-head-split">
          <h2>Événements organisés et suivis</h2>
          <div className="filters" role="group" aria-label="Filtrer les événements">
            {filters.map(([value, label]) => (
              <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="events">
          {shown.map((e) => (
            <article key={e.slug} className="event">
              <img src={e.image} alt="" loading="lazy" />
              <div className="event-body">
                <span className="chip">{e.category}</span>
                <h3>{e.title}</h3>
                <p className="event-meta">
                  {formatDate(e.date)} · {e.place}
                </p>
                <p className="event-role">{e.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section testimonials">
        <h2>Ils parlent de notre collaboration</h2>
        <div className="quotes">
          {testimonials.map((t) => (
            <figure key={t.slug} className="quote">
              <blockquote>« {t.body} »</blockquote>
              <figcaption>
                <strong>{t.author}</strong>
                <span>{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="blog" className="section">
        <div className="section-head section-head-split">
          <h2>Le blog</h2>
          <p>Coulisses, retours d’expérience et conseils pour réussir vos événements et votre communication.</p>
        </div>
        <div className="posts">
          {posts.slice(0, 3).map((p) => (
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
        <div className="center">
          <Link to="/blog" className="btn btn-dark">
            Tous les articles <span className="btn-arrow">→</span>
          </Link>
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="contact-card">
          <img src={asset('/images/stage-pink-2.webp')} alt="" loading="lazy" />
          <div className="contact-shade" />
          <div className="contact-copy">
            <h2>Un projet, un événement, une idée ?</h2>
            <p>Écrivez-moi sur WhatsApp, je vous réponds pour en discuter.</p>
          </div>
          <div className="glass contact-actions">
            <a href={whatsappUrl} className="btn btn-yellow" target="_blank" rel="noreferrer">
              Écrire sur WhatsApp <span className="btn-arrow">→</span>
            </a>
            <a href={`mailto:${email}`}>{email}</a>
            {phones.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
