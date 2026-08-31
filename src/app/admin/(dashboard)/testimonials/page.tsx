import { Button } from "@/components/ui/button";

export default function TestimonialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">+ Add Testimonial</Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
        <div className="text-4xl mb-4">💬</div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">No testimonials yet</h2>
        <p className="text-slate-500 mb-6">Add customer reviews to build trust on your website.</p>
        <Button variant="outline">Add First Testimonial</Button>
      </div>
    </div>
  );
}
