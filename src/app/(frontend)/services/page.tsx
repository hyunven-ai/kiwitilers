import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  let services: any[] = [];
  try {
    services = await prisma.service.findMany({
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error("Error loading services from database:", error);
  }

  // Fallback defaults if database has no records yet
  if (services.length === 0) {
    services = [
      { id: "bathroom-tiling", title: "Bathroom Tiling", description: "Professional bathroom wall and floor tiling.", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop" },
      { id: "kitchen-tiling", title: "Kitchen Tiling", description: "Kitchen floors, walls and splashbacks.", image: "https://res.cloudinary.com/dzojrrwtr/image/upload/v1788591762/kitchentilling_j45khs.webp" },
      { id: "floor-tiling", title: "Floor Tiling", description: "Durable and precise floor tile installation.", image: "https://res.cloudinary.com/dzojrrwtr/image/upload/v1788591848/floor_tiling_tgz1am.webp" },
      { id: "wall-tiling", title: "Wall Tiling", description: "Professional wall tile installation.", image: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800&auto=format&fit=crop" },
    ];
  }

  return (
    <div className="flex flex-col min-h-screen font-sans">
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
              <div
                key={service.id}
                className="group bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl hover:border-slate-200 transition-all duration-500 flex flex-col"
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={service.image || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {service.icon && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-sm shadow-sm z-20">
                      {service.icon}
                    </div>
                  )}
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-outfit font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-8 flex-1 leading-relaxed text-sm">
                    {service.description}
                  </p>
                  <Link
                    href={`/quote?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex items-center justify-center rounded-full w-full px-4 py-3 border border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white transition-colors font-medium text-sm"
                  >
                    Request a Quote
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
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact our team of experts today for a free, no-obligation quote.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-slate-50 rounded-full px-8 py-3.5 font-semibold transition-colors shadow-md"
          >
            Request a Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
