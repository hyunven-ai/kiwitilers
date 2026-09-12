"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Tag, RefreshCw } from "lucide-react";

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
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Bathrooms", "Kitchens", "Commercial", "Outdoor", "Walls", "Flooring"];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const url = activeFilter === "All" ? "/api/projects" : `/api/projects?category=${encodeURIComponent(activeFilter)}`;
        const res = await fetch(url);
        const json = await res.json();
        if (json.success) {
          setProjects(json.data);
        }
      } catch (err) {
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [activeFilter]);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <section className="bg-slate-900 text-white py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-outfit font-bold mb-6">Our Projects</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore our portfolio of completed tiling projects, showcasing our commitment to quality, precision, and detail.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeFilter === filter
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-400">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-blue-600" />
              <p className="text-sm">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800">No projects found in this category</h3>
              <p className="text-xs text-slate-500 mt-1 mb-6">Check back soon as we continuously upload new project photography.</p>
              <button
                onClick={() => setActiveFilter("All")}
                className="px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-full"
              >
                Show All Projects
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="group flex flex-col">
                  <div className="aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden mb-6 relative border border-slate-200/60 shadow-sm">
                    {project.afterImage ? (
                      <img
                        src={project.afterImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        No Image Available
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {project.serviceType}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" />
                      <span className="font-medium text-slate-700">{project.location}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    {project.tileType && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Tag className="w-3 h-3 text-slate-400" />
                        <span>{project.tileType}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-20 text-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3.5 text-sm font-semibold shadow-md shadow-blue-500/20 transition-all"
            >
              Discuss Your Project With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
