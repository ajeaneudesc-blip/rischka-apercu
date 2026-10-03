import { Link } from 'react-router-dom'
import { asset } from '../site'

export default function Footer() {
  return (
    <footer className="footer">
      <Link to="/" aria-label="Accueil">
        <img src={asset('/images/logo.webp')} alt="Rischka Adjemini" width="160" height="160" />
      </Link>
    </footer>
  )
}
