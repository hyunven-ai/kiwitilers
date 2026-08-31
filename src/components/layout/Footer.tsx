import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link href="/" className="text-2xl font-outfit font-bold text-white tracking-tight block">
            Kiwi<span className="text-blue-500">Tilers</span>
          </Link>
          <p className="text-sm text-slate-400">
            Professional tiling services for residential and commercial properties. Quality workmanship, beautiful results.
          </p>
        </div>
        
        <div>
          <h3 className="text-white font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services/bathroom-tiling" className="hover:text-white transition-colors">Bathroom Tiling</Link></li>
            <li><Link href="/services/kitchen-tiling" className="hover:text-white transition-colors">Kitchen Tiling</Link></li>
            <li><Link href="/services/floor-tiling" className="hover:text-white transition-colors">Floor Tiling</Link></li>
            <li><Link href="/services/outdoor-tiling" className="hover:text-white transition-colors">Outdoor Tiling</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/projects" className="hover:text-white transition-colors">Our Projects</Link></li>
            <li><Link href="/areas" className="hover:text-white transition-colors">Service Areas</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Auckland, New Zealand</li>
            <li><a href="tel:+64800123456" className="hover:text-white transition-colors">0800 123 456</a></li>
            <li><a href="mailto:info@kiwitilers.co.nz" className="hover:text-white transition-colors">info@kiwitilers.co.nz</a></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} KiwiTilers. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
