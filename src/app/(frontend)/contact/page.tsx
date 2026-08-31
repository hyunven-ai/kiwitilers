import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="bg-slate-900 text-white py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-outfit font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Get in touch with KiwiTilers for inquiries, support, or to request a quote.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Get In Touch</h2>
              
              <div className="space-y-6 mb-12 text-slate-600">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                    📍
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Service Areas</h3>
                    <p>Auckland, North Shore, West Auckland, East Auckland, South Auckland, Central Auckland</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                    📞
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
                    <p><a href="tel:+64800123456" className="hover:text-blue-600">0800 123 456</a></p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                    <p><a href="mailto:info@kiwitilers.co.nz" className="hover:text-blue-600">info@kiwitilers.co.nz</a></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Name</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <input type="email" className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <textarea rows={4} className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white mt-1"></textarea>
                </div>
                <Button className="w-full bg-slate-900 text-white rounded-lg p-3 hover:bg-slate-800 transition-colors">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
