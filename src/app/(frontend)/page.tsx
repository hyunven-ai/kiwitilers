"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // For hover image reveal in services
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    { title: "Residential Tiling", img: "/images/hero_bg_1788157349184.jpg" },
    { title: "Commercial Flooring", img: "/images/project_kitchen_1788157394915.jpg" },
    { title: "Bathroom Renovations", img: "/images/bathroom_after_1788157380612.jpg" },
    { title: "Custom Splashes", img: "/images/project_kitchen_1788157394915.jpg" },
  ];

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-[#fafafa]">
      
      {/* 1. Asymmetrical Parallax Hero */}
      <section className="relative w-full h-[100vh] flex items-center pt-20 overflow-hidden px-4 md:px-12 lg:px-24">
        <motion.div 
          style={{ y: y1, opacity }} 
          className="absolute right-0 top-0 w-3/4 md:w-2/3 h-full z-0"
        >
          <div className="relative w-full h-full">
            <Image 
              src="/images/hero_bg_1788157349184.jpg" 
              alt="Luxury Tiling" 
              fill 
              className="object-cover object-left"
              priority
            />
            {/* Soft gradient fade on the left edge of the image to blend into background */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fafafa] to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#fafafa] to-transparent z-10" />
          </div>
        </motion.div>

        <div className="relative z-10 w-full md:w-2/3 mt-24">
          <div className="overflow-hidden mb-6">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="text-7xl md:text-[9rem] leading-[0.85] font-outfit font-bold tracking-tighter text-slate-900 mix-blend-exclusion"
            >
              CRAFTED<br/>SURFACES
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="mt-12 flex flex-col md:flex-row items-start md:items-center gap-8"
          >
            <p className="text-xl md:text-2xl text-slate-800 font-light max-w-md leading-relaxed bg-[#fafafa]/80 backdrop-blur-sm p-4 -ml-4">
              Bespoke tiling solutions bridging architectural intent with meticulous execution.
            </p>
            <Link 
              href="/quote" 
              className="group relative inline-flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-slate-900 border-b border-slate-900 pb-2 hover:border-transparent transition-colors"
            >
              Start a Project
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300 ease-out" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Editorial Text & Asymmetrical Images */}
      <section className="py-48 px-4 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <h2 className="text-5xl md:text-6xl font-outfit font-bold text-slate-900 leading-tight mb-8">
              Precision in every square inch.
            </h2>
            <p className="text-xl text-slate-600 font-light leading-relaxed mb-12">
              We approach each space as a unique canvas. From high-end residential renovations to expansive commercial developments, our team ensures flawless execution that endures.
            </p>
            <Link href="/about" className="text-blue-600 font-semibold tracking-wide uppercase text-sm hover:text-blue-800 transition-colors">Our Story —</Link>
          </motion.div>

          <div className="lg:col-span-7 relative h-[600px] w-full">
             <motion.div 
                style={{ y: y2 }}
                className="absolute top-0 right-0 w-3/4 h-[400px] z-10"
             >
                <Image src="/images/bathroom_after_1788157380612.jpg" alt="Interior" fill className="object-cover" />
             </motion.div>
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute bottom-0 left-0 w-2/3 h-[300px] z-20 border-8 border-[#fafafa]"
             >
                <Image src="/images/project_kitchen_1788157394915.jpg" alt="Detail" fill className="object-cover" />
             </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Hover Image Reveal Services List */}
      <section className="py-32 bg-slate-900 text-white relative">
        <div className="container mx-auto px-4 md:px-12 lg:px-24 z-10 relative">
          <div className="mb-24 flex flex-col md:flex-row md:justify-between md:items-end border-b border-slate-800 pb-12">
            <h2 className="text-5xl md:text-7xl font-outfit font-bold">Expertise.</h2>
            <p className="text-slate-400 max-w-sm text-lg font-light mt-6 md:mt-0">
              Specialized services tailored for architectural precision.
            </p>
          </div>

          <div className="relative" onMouseLeave={() => setHoveredService(null)}>
            {services.map((service, index) => (
              <Link 
                key={index}
                href="/services"
                className="group block border-b border-slate-800 py-12 relative z-20"
                onMouseEnter={() => setHoveredService(index)}
              >
                <div className="flex justify-between items-center text-4xl md:text-6xl font-outfit font-light text-slate-500 group-hover:text-white transition-colors duration-500">
                  <span>{service.title}</span>
                  <span className="text-2xl opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">↗</span>
                </div>
              </Link>
            ))}

            {/* Hover Image that follows the mouse (simplified by fixing it to the center for MVP) */}
            <div className="hidden lg:block absolute top-1/2 right-24 -translate-y-1/2 w-[400px] h-[500px] pointer-events-none z-10">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: hoveredService === index ? 1 : 0,
                    scale: hoveredService === index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image src={service.img} alt={service.title} fill className="object-cover brightness-75 grayscale group-hover:grayscale-0 transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Giant CTA */}
      <section className="py-48 px-4 text-center">
        <h2 className="text-6xl md:text-9xl font-outfit font-bold text-slate-900 tracking-tighter mb-12 uppercase">
          Let's<br/>Talk.
        </h2>
        <Link 
          href="/quote"
          className="inline-block bg-slate-900 text-white rounded-full px-12 py-6 text-xl font-medium hover:bg-blue-600 transition-colors duration-500 hover:scale-105 transform"
        >
          Request an Estimate
        </Link>
      </section>
    </div>
  );
}
