import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  const projects = [
    { id: 1, title: "Modern Bathroom Renovation", location: "Auckland", category: "Bathrooms", tags: ["Large-format", "Porcelain"], image: "/images/bathroom_after_1788157380612.jpg" },
    { id: 2, title: "Kitchen Splashback", location: "West Auckland", category: "Kitchens", tags: ["Subway tiles", "Herringbone"], image: "/images/project_kitchen_1788157394915.jpg" },
    { id: 3, title: "Luxury Ensuite", location: "Central Auckland", category: "Bathrooms", tags: ["Marble", "Underfloor heating"], image: "/images/hero_bg_1788157349184.jpg" },
    { id: 4, title: "Commercial Lobby Flooring", location: "North Shore", category: "Commercial", tags: ["Terrazzo", "High-traffic"], image: "/images/bathroom_after_1788157380612.jpg" },
    { id: 5, title: "Outdoor Patio Tiling", location: "East Auckland", category: "Outdoor", tags: ["Anti-slip", "Natural stone"], image: "/images/project_kitchen_1788157394915.jpg" },
    { id: 6, title: "Feature Wall Installation", location: "South Auckland", category: "Walls", tags: ["Mosaic", "Custom design"], image: "/images/hero_bg_1788157349184.jpg" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-slate-900 text-white py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-outfit font-bold mb-6">Our Projects</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore our portfolio of completed tiling projects, showcasing our commitment to quality and detail.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {["All", "Bathrooms", "Kitchens", "Flooring", "Walls", "Outdoor", "Commercial"].map((filter) => (
              <button key={filter} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${filter === "All" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-slate-200 rounded-3xl overflow-hidden mb-6 relative">
                  <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <span className="font-medium text-blue-600">{project.category}</span>
                    <span>•</span>
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Load More Projects
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
