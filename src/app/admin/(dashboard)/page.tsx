"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, FolderKanban, FileText, ArrowRight, RefreshCw, AlertCircle, Clock, MapPin } from "lucide-react";

interface StatsData {
  totalLeads: number;
  newLeads: number;
  totalProjects: number;
  publishedBlogs: number;
}

interface RecentLead {
  id: string;
  fullName: string;
  serviceRequired: string;
  location: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/stats");
      const json = await res.json();
      if (json.success) {
        setStats(json.stats);
        setRecentLeads(json.recentLeads || []);
      } else {
        setError(json.error || "Failed to load dashboard data");
      }
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statCards = [
    {
      label: "Total Leads",
      value: stats?.totalLeads ?? "...",
      badge: "Lifetime",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      href: "/admin/leads",
    },
    {
      label: "New Leads",
      value: stats?.newLeads ?? "...",
      badge: "Needs Review",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-100",
      href: "/admin/leads?status=NEW",
    },
    {
      label: "Projects in Portfolio",
      value: stats?.totalProjects ?? "...",
      badge: "Live Projects",
      icon: FolderKanban,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      href: "/admin/projects",
    },
    {
      label: "Published Articles",
      value: stats?.publishedBlogs ?? "...",
      badge: "SEO Content",
      icon: FileText,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      href: "/admin/blog",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW":
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">New</span>;
      case "CONTACTED":
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Contacted</span>;
      case "QUOTED":
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200">Quoted</span>;
      case "APPROVED":
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Approved</span>;
      case "COMPLETED":
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">Completed</span>;
      case "CANCELLED":
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">Cancelled</span>;
      default:
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-50 text-slate-600">{status}</span>;
    }
  };

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-NZ", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with refresh */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">System Performance & Overview</h2>
          <p className="text-sm text-slate-500">Live operational data directly connected to KiwiTilers database.</p>
        </div>
        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className={`bg-white p-6 rounded-2xl shadow-sm border ${stat.border} hover:shadow-md hover:-translate-y-0.5 transition-all group flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-semibold ${stat.color} ${stat.bg} px-2.5 py-0.5 rounded-full`}>
                    {stat.badge}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-slate-500">{stat.label}</h3>
                <div className="text-3xl font-extrabold text-slate-900 mt-1">
                  {loading ? (
                    <span className="inline-block w-12 h-8 bg-slate-100 animate-pulse rounded"></span>
                  ) : (
                    stat.value
                  )}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 group-hover:text-blue-600 font-medium">
                <span>Manage</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Leads Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Customer Inquiries & Leads</h2>
            <p className="text-xs text-slate-500">Live requests submitted via website quote form.</p>
          </div>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:text-blue-700"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold border-b border-slate-100">Customer</th>
                <th className="p-4 font-semibold border-b border-slate-100">Service Required</th>
                <th className="p-4 font-semibold border-b border-slate-100">Location</th>
                <th className="p-4 font-semibold border-b border-slate-100">Date Received</th>
                <th className="p-4 font-semibold border-b border-slate-100">Status</th>
                <th className="p-4 font-semibold border-b border-slate-100 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-sm text-slate-400">
                    Loading recent leads...
                  </td>
                </tr>
              ) : recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-sm text-slate-500">
                    No leads found in database yet.
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-slate-900">{lead.fullName}</div>
                      <div className="text-[11px] text-slate-400">#{lead.id.slice(-6)}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-700 font-medium">{lead.serviceRequired}</td>
                    <td className="p-4 text-sm text-slate-500 flex items-center gap-1.5 pt-5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{lead.location}</span>
                    </td>
                    <td className="p-4 text-sm text-slate-500">{formatDate(lead.createdAt)}</td>
                    <td className="p-4">{getStatusBadge(lead.status)}</td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/admin/leads?id=${lead.id}`}
                        className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
