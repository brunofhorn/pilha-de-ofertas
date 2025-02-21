import { Inter } from 'next/font/google'
import { Bell, User2 } from 'lucide-react'
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

const menuItems = [
  {
    title: "Cadastrar Grupo",
    icon: "Users2",
    path: "/grupos/cadastrar",
  },
  {
    title: "Listar Mensagens",
    icon: "Menu",
    path: "/mensagens",
  },
  {
    title: "Enviar Mensagem",
    icon: "MessageSquare",
    path: "/mensagens/enviar",
  },
  {
    title: "Configurações",
    icon: "Settings",
    path: "/configuracoes",
  },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* Sidebar */}
          <aside className="fixed left-0 top-0 z-40 h-screen bg-white border-r shadow-sm w-64">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h1 className="text-xl font-semibold text-primary">
                  Dashboard
                </h1>
              </div>
              <nav className="flex-1 space-y-1 p-2">
                {menuItems.map((item) => (
                  <a
                    key={item.path}
                    href={item.path}
                    className="sidebar-link"
                  >
                    <User2 />
                    <span className="truncate">{item.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Header */}
          <header className="fixed top-0 right-0 z-30 w-full h-16 bg-white border-b px-4">
            <div className="flex items-center justify-end h-full">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="pl-64 pt-16">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}