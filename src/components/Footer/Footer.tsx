import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="contacto">
      <div className={`container ${styles.container}`}>
        
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>🌿</span>
              Integrative Medicine
            </Link>
            <p className={styles.brandDesc}>
              Redefiniendo el cuidado de la salud a través de la integración consciente de la ciencia moderna y la tradición milenaria.
            </p>
          </div>

          {/* Spacer / Empty column on desktop for layout matching */}
          <div className={styles.spacerCol}></div>

          {/* Legal Column */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Legal</h4>
            <ul className={styles.linksList}>
              <li><Link href="#terminos">Términos Médicos</Link></li>
              <li><Link href="#privacidad">Política de Privacidad</Link></li>
              <li><Link href="#consentimiento">Consentimiento Informado</Link></li>
            </ul>
          </div>

          {/* Contact & Social Column */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Contacto</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="mailto:info@medicinaintegrativa.com">info@medicinaintegrativa.com</a>
              </li>
              <li>Buenos Aires, Argentina</li>
            </ul>
            <div className={styles.socialIcons}>
              {/* Fake Social Icons for UI completeness - mitigating distraction risk by putting them only here */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="mailto:info@medicinaintegrativa.com" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Integrative Medicine. Todos los derechos reservados.
          </p>
          <p className={styles.disclaimer}>
            La consulta no reemplaza el tratamiento de urgencias médicas.
          </p>
        </div>

      </div>
    </footer>
  );
}
