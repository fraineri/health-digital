import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-footer-text pt-20 pb-8 text-sm" id="contacto">
      <div className="container">

        <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-3 md:gap-8 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-12">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-sans text-lg font-bold text-white no-underline mb-4">
              <span className="text-xl">🌿</span>
              Integrative Medicine
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-[90%]">
              Redefiniendo el cuidado de la salud a través de la integración consciente de la ciencia moderna y la tradición milenaria.
            </p>
          </div>

          {/* Spacer / Empty column on desktop for layout matching */}
          <div className="hidden lg:block"></div>

          {/* Legal Column */}
          <div>
            <h4 className="text-white font-sans font-semibold text-base mb-6">Legal</h4>
            <ul className="list-none flex flex-col gap-4">
              <li><Link href="#terminos" className="text-gray-400 no-underline transition-colors duration-200 hover:text-white">Términos Médicos</Link></li>
              <li><Link href="#privacidad" className="text-gray-400 no-underline transition-colors duration-200 hover:text-white">Política de Privacidad</Link></li>
              <li><Link href="#consentimiento" className="text-gray-400 no-underline transition-colors duration-200 hover:text-white">Consentimiento Informado</Link></li>
            </ul>
          </div>

          {/* Contact & Social Column */}
          <div>
            <h4 className="text-white font-sans font-semibold text-base mb-6">Contacto</h4>
            <ul className="list-none flex flex-col gap-4">
              <li>
                <a href="mailto:info@medicinaintegrativa.com" className="text-gray-400 no-underline transition-colors duration-200 hover:text-white">info@medicinaintegrativa.com</a>
              </li>
              <li className="text-gray-400">Buenos Aires, Argentina</li>
            </ul>
            <div className="flex gap-5 mt-8">
              {/* Fake Social Icons for UI completeness - mitigating distraction risk by putting them only here */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 transition-colors duration-200 hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="mailto:info@medicinaintegrativa.com" aria-label="Email" className="text-gray-400 transition-colors duration-200 hover:text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col gap-4 text-center text-gray-500 text-xs md:flex-row md:justify-between md:items-center md:text-left md:gap-0">
          <p>
            © {new Date().getFullYear()} Integrative Medicine. Todos los derechos reservados.
          </p>
          <p>
            La consulta no reemplaza el tratamiento de urgencias médicas.
          </p>
        </div>

      </div>
    </footer>
  );
}
