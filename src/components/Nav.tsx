import { useState } from 'react'
import { Link } from 'react-router-dom'
import { whatsappUrl } from '../site'

const links = [
  ['À propos', '/#apropos'],
  ['Services', '/#services'],
  ['Événements', '/#evenements'],
  ['Blog', '/blog'],
] as const

export default function Nav({ solid }: { solid: boolean }) {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <header className={`nav${solid ? ' nav-solid' : ''}${open ? ' nav-open' : ''}`}>
      <Link to="/" className="nav-brand" onClick={close}>
        Rischka <span>Adjemini</span>
      </Link>
      <nav className="nav-links" aria-label="Navigation principale">
        {links.map(([label, to]) => (
          <Link key={to} to={to} onClick={close}>
            {label}
          </Link>
        ))}
        <a href={whatsappUrl} className="nav-cta-mobile" target="_blank" rel="noreferrer">
          Me contacter
        </a>
      </nav>
      <a href={whatsappUrl} className="btn btn-light nav-cta" target="_blank" rel="noreferrer">
        Me contacter <span className="btn-arrow">→</span>
      </a>
      <button className="nav-toggle" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>
        <span />
        <span />
      </button>
    </header>
  )
}
