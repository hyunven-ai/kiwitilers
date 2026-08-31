import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const services = [
    { id: "bathroom-tiling", title: "Bathroom Tiling", desc: "Professional bathroom wall and floor tiling.", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop" },
    { id: "kitchen-tiling", title: "Kitchen Tiling", desc: "Kitchen floors, walls and splashbacks.", image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop" },
    { id: "floor-tiling", title: "Floor Tiling", desc: "Durable and precise floor tile installation.", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop" },
    { id: "wall-tiling", title: "Wall Tiling", desc: "Professional wall tile installation.", image: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800&auto=format&fit=crop" },
    { id: "outdoor-tiling", title: "Outdoor Tiling", desc: "Patios, balconies, outdoor areas and pathways.", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop" },
    { id: "large-format-tiling", title: "Large Format Tiling", desc: "Installation of large-format and premium tiles.", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=800&auto=format&fit=crop" },
    { id: "tile-repair", title: "Tile Repair", desc: "Replacement and repair of damaged tiles.", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop" },
    { id: "regrouting", title: "Regrouting", desc: "Remove old grout and restore tile surfaces.", image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=800&auto=format&fit=crop" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-slate-900 text-white py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-outfit font-bold mb-6">Our Services</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            We offer comprehensive tiling solutions for residential and commercial properties across New Zealand.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:border-slate-200 transition-all duration-500 flex flex-col">
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-outfit font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-slate-600 mb-8 flex-1">{service.desc}</p>
                  <Link href={`/services/${service.id}`} className="inline-flex items-center justify-center rounded-full w-full px-4 py-3 border border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white transition-colors font-medium">
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-outfit font-bold mb-6">Ready to start your project?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Contact our team of experts today for a free, no-obligation quote.</p>
          <Link href="/quote" className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-slate-50 rounded-full px-8 py-3 font-medium transition-colors">
            Request a Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
