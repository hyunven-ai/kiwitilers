import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center">
            <img src="https://res.cloudinary.com/dzojrrwtr/image/upload/v1788158662/logo_kiwi_tilers_trds8h.webp" alt="KiwiTilers Logo" className="h-12 w-auto object-contain brightness-0 invert" />
          </Link>
          <div className="text-xs text-slate-500 mt-1">Admin Dashboard</div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {[
            { name: "Dashboard", href: "/admin", icon: "📊" },
            { name: "Leads", href: "/admin/leads", icon: "👥" },
            { name: "Services", href: "/admin/services", icon: "🛠️" },
            { name: "Projects", href: "/admin/projects", icon: "🏗️" },
            { name: "Testimonials", href: "/admin/testimonials", icon: "⭐" },
            { name: "Blog", href: "/admin/blog", icon: "📝" },
            { name: "Settings", href: "/admin/settings", icon: "⚙️" },
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-slate-800 hover:text-white transition-colors text-left text-slate-400">
            <span className="text-lg">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <h1 className="text-xl font-bold text-slate-800">Overview</h1>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              AD
            </div>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
