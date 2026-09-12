"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import {
  LayoutDashboard,
  Users,
  Wrench,
  FolderKanban,
  Star,
  FileText,
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
} from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Leads", href: "/admin/leads", icon: Users },
    { name: "Services", href: "/admin/services", icon: Wrench },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Testimonials", href: "/admin/testimonials", icon: Star },
    { name: "Blog", href: "/admin/blog", icon: FileText },
    { name: "Settings", href: "/admin/settings", icon: SettingsIcon },
  ];

  const currentNav = navItems.find((item) =>
    item.href === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(item.href)
  );

  const handleLogout = () => {
    // Clear any local storage/cookie if used
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
      sessionStorage.removeItem("admin_auth");
    }
    router.push("/admin/login");
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dzojrrwtr/image/upload/v1788159188/logo-kiwitilers_p9ef5q.webp"
              alt="KiwiTilers Logo"
              className="h-10 w-auto object-contain brightness-0 invert"
            />
          </Link>
        </div>

        <div className="px-6 py-3 text-xs uppercase tracking-wider text-slate-500 font-semibold">
          Admin Portal
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white text-sm transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <span>Public Website</span>
            </span>
            <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-400">Live</span>
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors text-left text-slate-400 text-sm font-medium"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              {currentNav?.name || "Admin Panel"}
            </h1>
            <p className="text-xs text-slate-500">KiwiTilers Management Console</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                AD
              </div>
              <div className="text-left pr-2">
                <div className="text-xs font-semibold text-slate-800">Administrator</div>
                <div className="text-[10px] text-emerald-600 font-medium">● Online</div>
              </div>
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
