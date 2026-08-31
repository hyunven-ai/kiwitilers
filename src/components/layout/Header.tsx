"use client";

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="https://res.cloudinary.com/dzojrrwtr/image/upload/v1788159188/logo-kiwitilers_p9ef5q.webp" alt="KiwiTilers Logo" className="h-14 md:h-16 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          <Link href="/services" className="text-sm font-outfit font-semibold tracking-wide uppercase text-slate-600 hover:text-slate-900 transition-colors">Services</Link>
          <Link href="/projects" className="text-sm font-outfit font-semibold tracking-wide uppercase text-slate-600 hover:text-slate-900 transition-colors">Projects</Link>
          <Link href="/about" className="text-sm font-outfit font-semibold tracking-wide uppercase text-slate-600 hover:text-slate-900 transition-colors">About</Link>
          <Link href="/faq" className="text-sm font-outfit font-semibold tracking-wide uppercase text-slate-600 hover:text-slate-900 transition-colors">FAQ</Link>
          <Link href="/contact" className="text-sm font-outfit font-semibold tracking-wide uppercase text-slate-600 hover:text-slate-900 transition-colors">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="tel:+64800123456" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            0800 123 456
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            Get a Free Quote
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-900 p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <nav className="flex flex-col px-4 pt-2 pb-6 space-y-4">
              <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-700 hover:text-blue-600">Services</Link>
              <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-700 hover:text-blue-600">Projects</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-700 hover:text-blue-600">About</Link>
              <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-700 hover:text-blue-600">FAQ</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium text-slate-700 hover:text-blue-600">Contact</Link>

              <div className="pt-4 mt-2 border-t border-slate-100 flex flex-col gap-4">
                <Link href="tel:+64800123456" className="text-lg font-medium text-slate-700 text-center">
                  📞 0800 123 456
                </Link>
                <Link
                  href="/quote"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-medium bg-blue-600 text-white shadow-md"
                >
                  Get a Free Quote
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
