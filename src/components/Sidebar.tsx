"use client";

import { menu } from "@/data/menu";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen bg-white border-r shadow-sm transition-all duration-200 ease-in-out ${isExpanded ? "w-64" : "w-20"
        }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          {isExpanded && (
            <h1 className="text-xl font-semibold text-primary animate-fade-in">
              Pilha de Ofertas
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
          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`sidebar-link ${pathname === item.path ? "active" : ""}`}
              >
                <Icon className="sidebar-icon" />
                {isExpanded && (
                  <span className="animate-fade-in truncate">{item.title}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;