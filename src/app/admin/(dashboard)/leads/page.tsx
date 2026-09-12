"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Trash2,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  FileEdit,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

interface Lead {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  location: string;
  serviceRequired: string;
  propertyType: string;
  approxArea: string | null;
  preferredDate: string | null;
  description: string | null;
  status: "NEW" | "CONTACTED" | "QUOTED" | "APPROVED" | "COMPLETED" | "CANCELLED";
  estimatedValue: number | null;
  notes: string | null;
  createdAt: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Selected Lead for Details/Edit Modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State for Editing Lead
  const [editStatus, setEditStatus] = useState<Lead["status"]>("NEW");
  const [editEstimatedValue, setEditEstimatedValue] = useState<string>("");
  const [editNotes, setEditNotes] = useState<string>("");

  // Form State for Adding New Lead
  const [newLead, setNewLead] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    location: "",
    serviceRequired: "Bathroom Tiling",
    propertyType: "Residential",
    approxArea: "",
    preferredDate: "",
    description: "",
    status: "NEW" as Lead["status"],
    estimatedValue: "",
    notes: "",
  });

  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      if (search.trim()) params.append("search", search.trim());

      const res = await fetch(`/api/leads?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setLeads(json.data);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const openLeadModal = (lead: Lead) => {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditEstimatedValue(lead.estimatedValue ? String(lead.estimatedValue) : "");
    setEditNotes(lead.notes || "");
    setIsEditModalOpen(true);
  };

  const handleSaveLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    try {
      setSaving(true);
      const res = await fetch(`/api/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          estimatedValue: editEstimatedValue ? parseFloat(editEstimatedValue) : null,
          notes: editNotes,
        }),
      });

      const json = await res.json();
      if (json.success) {
        showToast("Lead updated successfully");
        setIsEditModalOpen(false);
        fetchLeads();
      } else {
        alert(json.error || "Failed to update lead");
      }
    } catch (err) {
      alert("Error saving lead");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newLead,
          estimatedValue: newLead.estimatedValue ? parseFloat(newLead.estimatedValue) : null,
        }),
      });

      const json = await res.json();
      if (json.success) {
        showToast("New lead created successfully");
        setIsAddModalOpen(false);
        setNewLead({
          fullName: "",
          phoneNumber: "",
          email: "",
          location: "",
          serviceRequired: "Bathroom Tiling",
          propertyType: "Residential",
          approxArea: "",
          preferredDate: "",
          description: "",
          status: "NEW",
          estimatedValue: "",
          notes: "",
        });
        fetchLeads();
      } else {
        alert(json.error || "Failed to create lead");
      }
    } catch (err) {
      alert("Error creating lead");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    try {
      setSaving(true);
      const res = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        showToast("Lead deleted successfully");
        setDeleteConfirmId(null);
        if (selectedLead?.id === id) setIsEditModalOpen(false);
        fetchLeads();
      } else {
        alert(json.error || "Failed to delete lead");
      }
    } catch (err) {
      alert("Error deleting lead");
    } finally {
      setSaving(false);
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert("No leads to export");
      return;
    }

    const headers = [
      "ID",
      "Full Name",
      "Phone",
      "Email",
      "Location",
      "Service Required",
      "Property Type",
      "Status",
      "Estimated Value",
      "Notes",
      "Created At",
    ];

    const rows = leads.map((l) => [
      `"${l.id}"`,
      `"${l.fullName.replace(/"/g, '""')}"`,
      `"${l.phoneNumber}"`,
      `"${l.email}"`,
      `"${l.location.replace(/"/g, '""')}"`,
      `"${l.serviceRequired}"`,
      `"${l.propertyType}"`,
      `"${l.status}"`,
      l.estimatedValue || 0,
      `"${(l.notes || "").replace(/"/g, '""')}"`,
      `"${new Date(l.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `kiwitilers_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: Lead["status"]) => {
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
        return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  const statuses = [
    { label: "All Leads", value: "ALL" },
    { label: "New", value: "NEW" },
    { label: "Contacted", value: "CONTACTED" },
    { label: "Quoted", value: "QUOTED" },
    { label: "Approved", value: "APPROVED" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Cancelled", value: "CANCELLED" },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads & Inquiries Management</h1>
          <p className="text-sm text-slate-500">Track and convert incoming customer requests into jobs.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-sm font-medium shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium shadow-sm shadow-blue-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Record New Lead</span>
          </button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {statuses.map((st) => (
            <button
              key={st.value}
              onClick={() => setStatusFilter(st.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === st.value
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer, location..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </form>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold border-b border-slate-100">Customer</th>
                <th className="p-4 font-semibold border-b border-slate-100">Service</th>
                <th className="p-4 font-semibold border-b border-slate-100">Location</th>
                <th className="p-4 font-semibold border-b border-slate-100">Status</th>
                <th className="p-4 font-semibold border-b border-slate-100">Est. Value</th>
                <th className="p-4 font-semibold border-b border-slate-100">Received</th>
                <th className="p-4 font-semibold border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-sm text-slate-400">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
                    Loading leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-sm text-slate-500">
                    No leads match the criteria.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-slate-900">{lead.fullName}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{lead.email}</span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{lead.phoneNumber}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-700 font-medium">{lead.serviceRequired}</td>
                    <td className="p-4 text-sm text-slate-600">{lead.location}</td>
                    <td className="p-4">{getStatusBadge(lead.status)}</td>
                    <td className="p-4 text-sm font-semibold text-slate-800">
                      {lead.estimatedValue ? `$${lead.estimatedValue.toLocaleString()}` : "—"}
                    </td>
                    <td className="p-4 text-xs text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString("en-NZ", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openLeadModal(lead)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors title='View and Edit'"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(lead.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors title='Delete Lead'"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Detail Lead Modal */}
      {isEditModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedLead.fullName}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Lead Reference: #{selectedLead.id}</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Read-Only Lead Details */}
            <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-100 text-sm">
              <div>
                <span className="text-xs text-slate-400 block">Phone</span>
                <a href={`tel:${selectedLead.phoneNumber}`} className="font-medium text-blue-600 hover:underline">
                  {selectedLead.phoneNumber}
                </a>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Email</span>
                <a href={`mailto:${selectedLead.email}`} className="font-medium text-blue-600 hover:underline truncate block">
                  {selectedLead.email}
                </a>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Location</span>
                <span className="font-medium text-slate-800">{selectedLead.location}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Property Type</span>
                <span className="font-medium text-slate-800">{selectedLead.propertyType}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Service Requested</span>
                <span className="font-medium text-slate-800">{selectedLead.serviceRequired}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Approx. Area</span>
                <span className="font-medium text-slate-800">{selectedLead.approxArea || "Not specified"}</span>
              </div>
              {selectedLead.preferredDate && (
                <div className="col-span-2">
                  <span className="text-xs text-slate-400 block">Preferred Date / Timeline</span>
                  <span className="font-medium text-slate-800">{selectedLead.preferredDate}</span>
                </div>
              )}
              {selectedLead.description && (
                <div className="col-span-2 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
                  <span className="text-xs font-semibold text-slate-600 block mb-1">Customer Notes / Description:</span>
                  <p className="text-slate-700 text-xs leading-relaxed">{selectedLead.description}</p>
                </div>
              )}
            </div>

            {/* Editable Admin Fields */}
            <form onSubmit={handleSaveLead} className="space-y-4 pt-4">
              <h4 className="text-sm font-bold text-slate-900">Lead Status & Estimates</h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Current Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as Lead["status"])}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="QUOTED">Quoted</option>
                    <option value="APPROVED">Approved</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Estimated Value ($ NZD)</label>
                  <input
                    type="number"
                    value={editEstimatedValue}
                    onChange={(e) => setEditEstimatedValue(e.target.value)}
                    placeholder="e.g. 3500"
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Internal Admin Notes</label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Record quotes sent, customer preferences, follow-up dates..."
                  className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(selectedLead.id)}
                  className="text-xs text-red-600 hover:underline font-medium"
                >
                  Delete this lead
                </button>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record New Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Record New Lead</h3>
                <p className="text-xs text-slate-500">Add an inquiry received by phone, walk-in, or direct message.</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newLead.fullName}
                    onChange={(e) => setNewLead({ ...newLead, fullName: e.target.value })}
                    placeholder="e.g. Mike Ross"
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={newLead.phoneNumber}
                    onChange={(e) => setNewLead({ ...newLead, phoneNumber: e.target.value })}
                    placeholder="021 555 1234"
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="mike@example.co.nz"
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Location / Suburb *</label>
                  <input
                    type="text"
                    required
                    value={newLead.location}
                    onChange={(e) => setNewLead({ ...newLead, location: e.target.value })}
                    placeholder="e.g. Takapuna, North Shore"
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Service Required</label>
                  <select
                    value={newLead.serviceRequired}
                    onChange={(e) => setNewLead({ ...newLead, serviceRequired: e.target.value })}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Bathroom Tiling">Bathroom Tiling</option>
                    <option value="Kitchen Tiling">Kitchen Tiling</option>
                    <option value="Floor Tiling">Floor Tiling</option>
                    <option value="Wall Tiling">Wall Tiling</option>
                    <option value="Outdoor Tiling">Outdoor Tiling</option>
                    <option value="Large Format Tiling">Large Format Tiling</option>
                    <option value="Tile Repair">Tile Repair</option>
                    <option value="Regrouting">Regrouting</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Property Type</label>
                  <select
                    value={newLead.propertyType}
                    onChange={(e) => setNewLead({ ...newLead, propertyType: e.target.value })}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Estimated Value ($ NZD)</label>
                  <input
                    type="number"
                    value={newLead.estimatedValue}
                    onChange={(e) => setNewLead({ ...newLead, estimatedValue: e.target.value })}
                    placeholder="e.g. 5000"
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">Status</label>
                  <select
                    value={newLead.status}
                    onChange={(e) => setNewLead({ ...newLead, status: e.target.value as Lead["status"] })}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="QUOTED">Quoted</option>
                    <option value="APPROVED">Approved</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Project Notes / Description</label>
                <textarea
                  rows={2}
                  value={newLead.description}
                  onChange={(e) => setNewLead({ ...newLead, description: e.target.value })}
                  placeholder="Details about area, requirements, etc."
                  className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm disabled:opacity-50"
                >
                  {saving ? "Creating..." : "Save Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Delete Lead?</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              This action cannot be undone. Are you sure you want to remove this lead from the database?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 text-sm border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteLead(deleteConfirmId)}
                disabled={saving}
                className="flex-1 py-2 text-sm bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl shadow-sm"
              >
                {saving ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
