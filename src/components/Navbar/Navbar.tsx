import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navbarInner}`}>
        
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🌿</span>
          Integrative Medicine
        </Link>

        {/* Desktop Menu */}
        <ul className={styles.navLinks}>
          <li>
            <Link href="#especialidades">Especialidades</Link>
          </li>
          <li>
            <Link href="#como-funciona">Cómo Funciona</Link>
          </li>
          <li>
            <Link href="#faq">FAQ</Link>
          </li>
          <li>
            <Link href="#contacto">Contacto</Link>
          </li>
        </ul>

        {/* CTA Button */}
        <div className={styles.ctaWrapper}>
          <Link href="#reservar" className={styles.buttonCta}>
            Reservar Consulta
          </Link>
        </div>
      </div>
    </nav>
  );
}
