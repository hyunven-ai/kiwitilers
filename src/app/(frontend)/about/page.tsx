import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-slate-900 text-white py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-outfit font-bold mb-6">About KiwiTilers</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Your trusted partner for professional tiling services in New Zealand.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-outfit font-bold mb-6 text-slate-900">Our Story</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Founded with a passion for precision and beautiful design, KiwiTilers has grown into one of the most reliable tiling contractors in the region. We believe that every tile laid should be a testament to quality workmanship.
          </p>
          <p className="text-slate-600 mb-12 leading-relaxed">
            Whether it's a small bathroom renovation or a large commercial flooring project, our team brings the same level of dedication and attention to detail. We work closely with homeowners, builders, and designers to bring their visions to life.
          </p>

          <h2 className="text-3xl font-outfit font-bold mb-6 text-slate-900">Why Work With Us?</h2>
          <ul className="space-y-4 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <div>
                <strong>Expert Team:</strong> Our tilers are fully trained and highly experienced in all aspects of tiling.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <div>
                <strong>Quality Materials:</strong> We use only the best adhesives, grouts, and materials to ensure longevity.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <div>
                <strong>Transparent Pricing:</strong> No hidden costs. We provide clear, detailed quotes before any work begins.
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
