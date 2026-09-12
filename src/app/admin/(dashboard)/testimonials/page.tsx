"use client";

import { useEffect, useState } from "react";
import {
  Star,
  Plus,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  Quote,
  RefreshCw,
} from "lucide-react";

interface Testimonial {
  id: string;
  customerName: string;
  projectType: string | null;
  rating: number;
  content: string;
  isFeatured: boolean;
  createdAt: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deleteConfirmTestimonial, setDeleteConfirmTestimonial] = useState<Testimonial | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    customerName: "",
    projectType: "",
    rating: 5,
    content: "",
    isFeatured: true,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/testimonials");
      const json = await res.json();
      if (json.success) {
        setTestimonials(json.data);
      }
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openAddModal = () => {
    setFormData({
      customerName: "",
      projectType: "Bathroom Renovation",
      rating: 5,
      content: "",
      isFeatured: true,
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (t: Testimonial) => {
    setEditingTestimonial(t);
    setFormData({
      customerName: t.customerName,
      projectType: t.projectType || "",
      rating: t.rating,
      content: t.content,
      isFeatured: t.isFeatured,
    });
  };

  const handleCreateTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Testimonial added successfully");
        setIsAddModalOpen(false);
        fetchTestimonials();
      } else {
        alert(json.error || "Failed to create testimonial");
      }
    } catch (err) {
      alert("Error saving testimonial");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;

    try {
      setSaving(true);
      const res = await fetch(`/api/testimonials/${editingTestimonial.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Testimonial updated successfully");
        setEditingTestimonial(null);
        fetchTestimonials();
      } else {
        alert(json.error || "Failed to update testimonial");
      }
    } catch (err) {
      alert("Error updating testimonial");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    try {
      setSaving(true);
      const res = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        showToast("Testimonial deleted successfully");
        setDeleteConfirmTestimonial(null);
        fetchTestimonials();
      } else {
        alert(json.error || "Failed to delete testimonial");
      }
    } catch (err) {
      alert("Error deleting testimonial");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Testimonials & Reviews</h1>
          <p className="text-sm text-slate-500">
            Showcase verified client satisfaction and reviews across the website.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium shadow-sm shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials Grid */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-100">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-blue-600" />
          <p className="text-sm">Loading client reviews...</p>
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
          <Star className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h3 className="text-lg font-semibold text-slate-800">No Reviews Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
            Build trust with new visitors by adding your first positive customer testimonial.
          </p>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-xl"
          >
            Add Testimonial
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 flex flex-col justify-between hover:shadow-md transition-all relative"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  {item.isFeatured && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">
                      Featured
                    </span>
                  )}
                </div>

                <div className="relative mb-4">
                  <Quote className="w-6 h-6 text-slate-200 absolute -top-1 -left-1 -z-0" />
                  <p className="text-xs text-slate-700 leading-relaxed italic relative z-10 pl-4">
                    "{item.content}"
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-slate-900">{item.customerName}</h4>
                  {item.projectType && (
                    <span className="text-[11px] text-slate-500">{item.projectType}</span>
                  )}
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmTestimonial(item)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Testimonial Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Add Customer Review</h3>
                <p className="text-xs text-slate-500">Record a testimonial from a satisfied client.</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTestimonial} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Project Type</label>
                  <input
                    type="text"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    placeholder="e.g. Kitchen Splashback"
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Rating (Stars)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value={5}>5 Stars - Excellent</option>
                    <option value={4}>4 Stars - Great</option>
                    <option value={3}>3 Stars - Average</option>
                  </select>
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span className="text-xs font-semibold text-slate-700">Feature on Homepage</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Review Content *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="What did the client say about the quality, timeliness, and experience?"
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
                  {saving ? "Saving..." : "Publish Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Testimonial Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Edit Testimonial</h3>
                <p className="text-xs text-slate-500">Updating review from {editingTestimonial.customerName}</p>
              </div>
              <button
                onClick={() => setEditingTestimonial(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateTestimonial} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Project Type</label>
                  <input
                    type="text"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Rating (Stars)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value={5}>5 Stars - Excellent</option>
                    <option value={4}>4 Stars - Great</option>
                    <option value={3}>3 Stars - Average</option>
                  </select>
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                    />
                    <span className="text-xs font-semibold text-slate-700">Feature on Homepage</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Review Content *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Update Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmTestimonial && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Delete Review?</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Are you sure you want to delete the review from <span className="font-semibold text-slate-700">"{deleteConfirmTestimonial.customerName}"</span>?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmTestimonial(null)}
                className="flex-1 py-2 text-sm border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteTestimonial(deleteConfirmTestimonial.id)}
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
