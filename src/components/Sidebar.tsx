"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MessageSquare, Settings, Users2, ChevronRight, ChevronLeft } from "lucide-react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = { pathname: 'teste', basename: '' };

  const menuItems = [
    {
      title: "Cadastrar Grupo",
      icon: <Users2 className="sidebar-icon" />,
      path: "/grupos/cadastrar",
    },
    {
      title: "Listar Mensagens",
      icon: <Menu className="sidebar-icon" />,
      path: "/mensagens",
    },
    {
      title: "Enviar Mensagem",
      icon: <MessageSquare className="sidebar-icon" />,
      path: "/mensagens/enviar",
    },
    {
      title: "Configurações",
      icon: <Settings className="sidebar-icon" />,
      path: "/configuracoes",
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen bg-white border-r shadow-sm transition-all duration-200 ease-in-out ${isExpanded ? "w-64" : "w-20"
        }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          {isExpanded && (
            <h1 className="text-xl font-semibold text-primary animate-fade-in">
              Dashboard
            </h1>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isExpanded ? (
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? "active" : ""
                }`}
            >
              {item.icon}
              {isExpanded && (
                <span className="animate-fade-in truncate">{item.title}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;