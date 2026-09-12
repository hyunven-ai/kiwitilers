"use client";

import { useEffect, useState } from "react";
import {
  FolderKanban,
  Plus,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Tag,
  Search,
  RefreshCw,
  Image as ImageIcon,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  serviceType: string;
  tileType: string | null;
  description: string;
  beforeImage: string | null;
  afterImage: string | null;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirmProject, setDeleteConfirmProject] = useState<Project | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    location: "",
    serviceType: "Bathrooms",
    tileType: "",
    description: "",
    beforeImage: "",
    afterImage: "",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== "All") params.append("category", selectedCategory);
      if (search.trim()) params.append("search", search.trim());

      const res = await fetch(`/api/projects?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setProjects(json.data);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProjects();
  };

  const openAddModal = () => {
    setFormData({
      title: "",
      slug: "",
      location: "Auckland",
      serviceType: "Bathrooms",
      tileType: "Large-format Porcelain",
      description: "",
      beforeImage: "",
      afterImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      slug: p.slug,
      location: p.location,
      serviceType: p.serviceType,
      tileType: p.tileType || "",
      description: p.description,
      beforeImage: p.beforeImage || "",
      afterImage: p.afterImage || "",
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setFormData({ ...formData, title, slug });
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Project added to portfolio");
        setIsAddModalOpen(false);
        fetchProjects();
      } else {
        alert(json.error || "Failed to create project");
      }
    } catch (err) {
      alert("Error saving project");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      setSaving(true);
      const res = await fetch(`/api/projects/${editingProject.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Project updated successfully");
        setEditingProject(null);
        fetchProjects();
      } else {
        alert(json.error || "Failed to update project");
      }
    } catch (err) {
      alert("Error updating project");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      setSaving(true);
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        showToast("Project deleted successfully");
        setDeleteConfirmProject(null);
        fetchProjects();
      } else {
        alert(json.error || "Failed to delete project");
      }
    } catch (err) {
      alert("Error deleting project");
    } finally {
      setSaving(false);
    }
  };

  const categories = ["All", "Bathrooms", "Kitchens", "Commercial", "Outdoor", "Walls"];

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
          <h1 className="text-2xl font-bold text-slate-900">Projects Portfolio</h1>
          <p className="text-sm text-slate-500">
            Showcase completed tiling transformations on the website portfolio.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium shadow-sm shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search project, location..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </form>
      </div>

      {/* Portfolio Grid */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-100">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-blue-600" />
          <p className="text-sm">Loading portfolio projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
          <FolderKanban className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <h3 className="text-lg font-semibold text-slate-800">No Projects Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
            Upload your completed work to impress potential clients.
          </p>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-xl"
          >
            Add First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden flex flex-col hover:shadow-md transition-all group"
            >
              {/* Image Preview */}
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                {project.afterImage ? (
                  <img
                    src={project.afterImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <ImageIcon className="w-8 h-8 opacity-40" />
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm">
                  {project.serviceType}
                </div>
                <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-xs flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  <span>{project.location}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  {project.tileType && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
                      <Tag className="w-3 h-3 text-slate-400" />
                      <span>{project.tileType}</span>
                    </div>
                  )}
                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    /{project.slug}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(project)}
                      className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Project"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmProject(project)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Add Portfolio Project</h3>
                <p className="text-xs text-slate-500">Showcase a newly completed job.</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Modern Villa Ensuite Renovation"
                  className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-2.5 text-sm font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Category / Area *</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Bathrooms">Bathrooms</option>
                    <option value="Kitchens">Kitchens</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Walls">Walls</option>
                    <option value="Flooring">Flooring</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Location / Suburb *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Ponsonby, Auckland"
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Tile Spec / Material</label>
                  <input
                    type="text"
                    value={formData.tileType}
                    onChange={(e) => setFormData({ ...formData, tileType: e.target.value })}
                    placeholder="e.g. Large-format Travertine"
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">After / Main Image URL *</label>
                <input
                  type="text"
                  required
                  value={formData.afterImage}
                  onChange={(e) => setFormData({ ...formData, afterImage: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {formData.afterImage && (
                  <div className="mt-2 h-24 rounded-xl overflow-hidden border border-slate-200">
                    <img src={formData.afterImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Before Image URL (Optional)</label>
                <input
                  type="text"
                  value={formData.beforeImage}
                  onChange={(e) => setFormData({ ...formData, beforeImage: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe scope, challenges solved, client requirements..."
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
                  {saving ? "Saving..." : "Add to Portfolio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Edit Project</h3>
                <p className="text-xs text-slate-500">Updating #{editingProject.slug}</p>
              </div>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProject} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-2.5 text-sm font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Category *</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Bathrooms">Bathrooms</option>
                    <option value="Kitchens">Kitchens</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Walls">Walls</option>
                    <option value="Flooring">Flooring</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Tile Spec / Material</label>
                  <input
                    type="text"
                    value={formData.tileType}
                    onChange={(e) => setFormData({ ...formData, tileType: e.target.value })}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">After Image URL *</label>
                <input
                  type="text"
                  required
                  value={formData.afterImage}
                  onChange={(e) => setFormData({ ...formData, afterImage: e.target.value })}
                  className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                {formData.afterImage && (
                  <div className="mt-2 h-24 rounded-xl overflow-hidden border border-slate-200">
                    <img src={formData.afterImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Before Image URL</label>
                <input
                  type="text"
                  value={formData.beforeImage}
                  onChange={(e) => setFormData({ ...formData, beforeImage: e.target.value })}
                  className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Description *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-sm disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Update Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Delete Project?</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Are you sure you want to remove <span className="font-semibold text-slate-700">"{deleteConfirmProject.title}"</span> from your portfolio?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmProject(null)}
                className="flex-1 py-2 text-sm border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteProject(deleteConfirmProject.id)}
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
