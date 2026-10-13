'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', href: '/', icon: '📊' },
    { name: 'Hábitos', href: '#habits', icon: '🔥' },
    { name: 'Tarefas', href: '#tasks', icon: '✅' },
  ]

  return (
    <aside className="w-64 border-r bg-zinc-50 dark:bg-zinc-950 flex flex-col justify-between hidden md:flex min-h-screen p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-primary flex items-center gap-2">
            <span>⚡</span> HabitFlow
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Produtividade & Hábitos</p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-zinc-200 dark:hover:bg-zinc-800'
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="text-xs text-muted-foreground pt-6 border-t">
        <p>Next.js App Router</p>
        <p className="mt-0.5">Prisma & Neon DB</p>
      </div>
    </aside>
  )
}