'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FolderOpen, 
  MessageSquare,
  ChevronLeft
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { cn } from '@/lib/utils'
import { mockUsers } from '@/lib/mock-data'

const currentUser = mockUsers[0]

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/usuarios', label: 'Usuarios', icon: Users },
  { href: '/admin/recetas', label: 'Aprobar Recetas', icon: BookOpen },
  { href: '/admin/categorias', label: 'Categorias', icon: FolderOpen },
  { href: '/admin/comentarios', label: 'Comentarios', icon: MessageSquare },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={currentUser} />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-border bg-card lg:block">
          <div className="sticky top-16 p-4">
            <div className="mb-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                Volver al sitio
              </Link>
            </div>

            <nav className="space-y-1">
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Navigation */}
        <div className="border-b border-border bg-card p-4 lg:hidden">
          <div className="flex gap-2 overflow-x-auto">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex flex-shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-background p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
