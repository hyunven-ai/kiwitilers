"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock, Calendar, User, ArrowRight, BookOpen, Sparkles } from "lucide-react";

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  author: string | null;
  image: string | null;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface BlogClientProps {
  initialPosts: BlogPostItem[];
}

// Helper to calculate reading time
function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

// Derive a topic/category tag from title or content
function getArticleCategory(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("trend") || t.includes("2026") || t.includes("style")) return "Trends & Design";
  if (t.includes("bathroom") || t.includes("shower")) return "Bathroom Tiling";
  if (t.includes("kitchen") || t.includes("splashback")) return "Kitchen & Dining";
  if (t.includes("outdoor") || t.includes("patio")) return "Outdoor & Pool";
  if (t.includes("choose") || t.includes("guide") || t.includes("how to")) return "Buying Guide";
  if (t.includes("grout") || t.includes("maintain") || t.includes("clean")) return "Care & Maintenance";
  return "Expert Advice";
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Trends & Design",
    "Bathroom Tiling",
    "Kitchen & Dining",
    "Buying Guide",
    "Care & Maintenance",
  ];

  // Filter posts based on search input and selected category
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(search.toLowerCase())) ||
        post.content.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;
      if (selectedCategory === "All") return true;

      const category = getArticleCategory(post.title);
      return category === selectedCategory;
    });
  }, [initialPosts, search, selectedCategory]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const regularPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold tracking-wide uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KiwiTilers Insights & Guides</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-outfit font-bold mb-6 tracking-tight">
            Tiling Wisdom, Trends & Tips
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Discover expert renovation guides, material comparisons, and inspirational surface design from New Zealand's trusted master tilers.
          </p>

          {/* Search bar inside Hero */}
          <div className="mt-10 max-w-xl mx-auto relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles by title, topic, or keyword..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/15 transition-all shadow-xl"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-4 text-xs bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-md transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 bg-slate-50 flex-1">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none justify-start md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105"
                    : "bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredPosts.length === 0 ? (
            /* Empty State */
            <div className="text-center py-24 bg-white rounded-3xl border border-slate-200/70 p-12 max-w-lg mx-auto shadow-sm">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 opacity-70" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-outfit">No Articles Found</h3>
              <p className="text-sm text-slate-500 mb-6">
                We couldn't find any articles matching your search query "{search}". Try searching for another topic or reset filters.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="px-6 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-full hover:bg-blue-600 transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Post Spotlight (if no active keyword search) */}
              {featuredPost && !search && selectedCategory === "All" && (
                <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-7 h-72 lg:h-auto min-h-[340px] relative overflow-hidden bg-slate-100">
                    <img
                      src={featuredPost.image || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop"}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg">
                      Featured Spotlight
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-medium text-slate-400 mb-4">
                        <span className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 font-semibold">
                          {getArticleCategory(featuredPost.title)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {getReadingTime(featuredPost.content)}
                        </span>
                      </div>

                      <Link href={`/blog/${featuredPost.slug}`} className="block group">
                        <h2 className="text-2xl lg:text-3xl font-outfit font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                          {featuredPost.title}
                        </h2>
                      </Link>

                      <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                        {featuredPost.excerpt || featuredPost.content.substring(0, 180) + "..."}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {featuredPost.author ? featuredPost.author.charAt(0) : "K"}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{featuredPost.author || "KiwiTilers Team"}</div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(featuredPost.createdAt).toLocaleDateString("en-NZ", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 hover:underline"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid of Articles */}
              <div>
                {(!search && selectedCategory === "All" && regularPosts.length > 0) && (
                  <h3 className="text-2xl font-outfit font-bold text-slate-900 mb-6">
                    Recent Articles & Guides
                  </h3>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* If there's an active search or category filter, show all matching posts; otherwise show regularPosts */}
                  {(search || selectedCategory !== "All" ? filteredPosts : regularPosts).map((post) => {
                    const category = getArticleCategory(post.title);
                    const readTime = getReadingTime(post.content);

                    return (
                      <article
                        key={post.id}
                        className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col"
                      >
                        {/* Post Thumbnail */}
                        <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100">
                          <img
                            src={post.image || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                            {category}
                          </div>
                        </Link>

                        {/* Post Body */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(post.createdAt).toLocaleDateString("en-NZ", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {readTime}
                              </span>
                            </div>

                            <Link href={`/blog/${post.slug}`}>
                              <h3 className="text-xl font-outfit font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2 leading-snug">
                                {post.title}
                              </h3>
                            </Link>

                            <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-6">
                              {post.excerpt || post.content.substring(0, 140) + "..."}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2">
                              <User className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-xs text-slate-600 font-medium">
                                {post.author || "KiwiTilers Team"}
                              </span>
                            </div>

                            <Link
                              href={`/blog/${post.slug}`}
                              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700"
                            >
                              <span>Read</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 bg-slate-900 text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold mb-4">
            Have a Specific Question About Your Space?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-8">
            Our master tilers offer personalized consultation and free on-site estimates across Auckland and surrounding areas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-3.5 text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all w-full sm:w-auto"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full px-8 py-3.5 text-sm font-semibold transition-all w-full sm:w-auto"
            >
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
