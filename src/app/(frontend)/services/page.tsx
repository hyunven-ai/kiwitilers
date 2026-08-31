import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const services = [
    { id: "bathroom-tiling", title: "Bathroom Tiling", desc: "Professional bathroom wall and floor tiling.", image: "🛀" },
    { id: "kitchen-tiling", title: "Kitchen Tiling", desc: "Kitchen floors, walls and splashbacks.", image: "🍳" },
    { id: "floor-tiling", title: "Floor Tiling", desc: "Durable and precise floor tile installation.", image: "🏢" },
    { id: "wall-tiling", title: "Wall Tiling", desc: "Professional wall tile installation.", image: "🧱" },
    { id: "outdoor-tiling", title: "Outdoor Tiling", desc: "Patios, balconies, outdoor areas and pathways.", image: "🏡" },
    { id: "large-format-tiling", title: "Large Format Tiling", desc: "Installation of large-format and premium tiles.", image: "⬜" },
    { id: "tile-repair", title: "Tile Repair", desc: "Replacement and repair of damaged tiles.", image: "🔨" },
    { id: "regrouting", title: "Regrouting", desc: "Remove old grout and restore tile surfaces.", image: "✨" }
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
              <div key={service.id} className="group bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden hover:shadow-lg hover:border-blue-100 transition-all">
                <div className="h-48 bg-slate-200 flex items-center justify-center text-6xl">
                  {service.image}
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                  <p className="text-slate-600 mb-6">{service.desc}</p>
                  <Button asChild variant="outline" className="rounded-full w-full">
                    <Link href={`/services/${service.id}`}>Learn More</Link>
                  </Button>
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
          <Button size="lg" asChild className="bg-white text-blue-600 hover:bg-slate-50 rounded-full px-8">
            <Link href="/quote">Request a Free Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
