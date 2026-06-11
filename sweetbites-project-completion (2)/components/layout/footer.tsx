import Link from 'next/link'

const footerLinks = {
  navegacion: [
    { label: 'Inicio', href: '/' },
    { label: 'Recetas', href: '/recetas' },
    { label: 'Categorias', href: '/recetas#categorias' },
  ],
  cuenta: [
    { label: 'Mi Perfil', href: '/perfil' },
    { label: 'Mis Recetas', href: '/mis-recetas' },
    { label: 'Favoritos', href: '/favoritos' },
  ],
  legal: [
    { label: 'Terminos de Uso', href: '/terminos' },
    { label: 'Privacidad', href: '/privacidad' },
    { label: 'Contacto', href: '/contacto' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-3xl">🍰</span>
              <span className="text-xl font-bold text-foreground">SweetBites</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              La comunidad de reposteria mas dulce. Descubre, comparte y guarda las mejores recetas de postres.
            </p>
            <div className="flex gap-2">
              <span className="text-2xl">🎂</span>
              <span className="text-2xl">🍪</span>
              <span className="text-2xl">🍫</span>
              <span className="text-2xl">🍨</span>
            </div>
          </div>

          {/* Navegacion */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Navegacion</h3>
            <ul className="space-y-2">
              {footerLinks.navegacion.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cuenta */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Mi Cuenta</h3>
            <ul className="space-y-2">
              {footerLinks.cuenta.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 SweetBites - Proyecto SENA
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            Desarrollado con <span className="text-primary">💚</span> por el equipo SweetBites
          </p>
        </div>
      </div>
    </footer>
  )
}
