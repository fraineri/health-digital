import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-background py-5 border-b border-border sticky top-0 z-100">
      <div className="container flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-sans text-lg font-bold text-foreground no-underline"
        >
          <span className="text-xl">🌿</span>
          Integrative Medicine
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0 [&_a]:text-sm [&_a]:text-foreground [&_a]:font-medium [&_a]:no-underline [&_a]:transition-opacity [&_a]:duration-200 [&_a:hover]:opacity-70">
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
        <div className="flex items-center">
          <Link
            href="#booking"
            className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:bg-primary-hover hover:-translate-y-px"
          >
            Reservar Consulta
          </Link>
        </div>
      </div>
    </nav>
  );
}
