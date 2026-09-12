import { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Clock,
  ArrowRight,
  ChevronRight,
  Star,
  Layers,
  Hammer,
  FileText,
  Building2,
  Home,
  BadgeCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | KiwiTilers - 8+ Years of Master Tiling Services in New Zealand",
  description:
    "Established in 2018, KiwiTilers brings over 8 years of master tiling craftsmanship, certified waterproofing (NZBC E3), and architectural surface expertise across Auckland and New Zealand.",
  openGraph: {
    title: "About KiwiTilers | 8+ Years of Professional Tiling Excellence",
    description:
      "Over 1,200 completed projects, 8 years of trusted craftsmanship, and comprehensive 10-year workmanship warranties for residential and commercial spaces.",
    type: "website",
  },
};

export default function AboutPage() {
  const stats = [
    {
      value: "8+",
      label: "Years of Excellence",
      detail: "Established in 2018, continuously serving NZ homeowners & commercial builders.",
    },
    {
      value: "1,200+",
      label: "Completed Projects",
      detail: "Bespoke bathrooms, luxury kitchens, feature walls, and commercial floors.",
    },
    {
      value: "100%",
      label: "NZBC E3 Compliance",
      detail: "Certified wet-area waterproofing with Producer Statements (PS3).",
    },
    {
      value: "10-Year",
      label: "Workmanship Warranty",
      detail: "Peace of mind guarantee backing our precision substrate prep and tile laying.",
    },
  ];

  const corePillars = [
    {
      icon: Award,
      title: "8+ Years Proven Craftsmanship",
      description:
        "Founded in 2018, our artisans bring nearly a decade of refined field technique, mastering every tile density, format, and layout configuration.",
    },
    {
      icon: ShieldCheck,
      title: "Certified Waterproofing (NZBC E3)",
      description:
        "Strict compliance with New Zealand wet-area standards, acoustic membrane underlays, and comprehensive council sign-off documentation.",
    },
    {
      icon: Layers,
      title: "Large Format & Zero-Lippage Mastery",
      description:
        "Specialists in handling 1200x2400mm porcelain slabs with European laser-guided leveling systems, eliminating lippage and uneven heights.",
    },
    {
      icon: Hammer,
      title: "Bespoke 45° Mitered Edge Detailing",
      description:
        "Artisanal diamond-cut mitering for shower niches, steps, and feature corners, delivering seamless stone returns without bulky plastic trims.",
    },
    {
      icon: Sparkles,
      title: "Premium Mortars & Epoxy Grouts",
      description:
        "We use only highest-grade flex-polymer adhesives and stain-resistant epoxy grouts engineered to endure humid wet rooms and coastal climate shifts.",
    },
    {
      icon: BadgeCheck,
      title: "Transparent Fixed-Price Quotes",
      description:
        "Detailed diagnostic surveys before commencement, clear itemized breakdowns, no hidden variations, and punctual project completion schedules.",
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "The Genesis: Tackling Substrate Quality",
      description:
        "KiwiTilers was founded in Auckland to solve a critical issue in the industry: premature tiling failures caused by rushed substrate preparation. We instituted a strict 'preparation first' methodology.",
    },
    {
      year: "2020",
      title: "Waterproofing Certification & Council Trust",
      description:
        "Expanded our certified wet-area waterproofing division, establishing trusted partnerships with top residential developers and architects demanding PS3 sign-offs.",
    },
    {
      year: "2023",
      title: "Commercial Expansion & Large-Format Slabs",
      description:
        "Invested in advanced European diamond wet-saws and mechanical slab lifters to pioneer ultra-large porcelain format installations across high-traffic commercial lobbies and boutique hotels.",
    },
    {
      year: "2026",
      title: "8 Years of Excellence & 1,200+ Landmarks",
      description:
        "Celebrating eight years of uninterrupted quality service. Over 1,200 homes, penthouses, and commercial spaces transformed with our signature 10-year workmanship guarantee.",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Diagnostic & Laser Survey",
      description:
        "We inspect your subfloors with precision digital levels and moisture meters, evaluating deflection, falls to waste, and substrate stability.",
    },
    {
      step: "02",
      title: "Substrate Prep & Waterproofing",
      description:
        "Installation of acoustic underlays, self-leveling screed, and multi-coat elastomeric waterproof membranes meeting NZBC Clause E3.",
    },
    {
      step: "03",
      title: "Precision Laying & Mitering",
      description:
        "Laser-aligned dry layout followed by full-coverage troweling, mechanical zero-lippage clips, and precision 45-degree mitered edges.",
    },
    {
      step: "04",
      title: "Grouting, Sealing & Sign-Off",
      description:
        "Application of anti-fungal epoxy or polymer grout, flexible perimeter silicone joints, deep clean polish, and issuance of warranty documentation.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#fafafa]">
      {/* 1. Hero Section */}
      <section className="bg-slate-950 text-white py-28 relative overflow-hidden">
        {/* Subtle decorative glowing background gradients */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[140px]" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[140px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-5xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-semibold tracking-wide uppercase mb-8 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>8+ Years of Master Craftsmanship • Established 2018</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-outfit font-bold tracking-tight text-white mb-8 leading-[1.1]">
            Eight Years of Architectural Mastery & Tiling Precision
          </h1>

          <p className="text-lg md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed mb-12">
            For nearly a decade, KiwiTilers has redefined interior and exterior surfaces across New Zealand. We fuse master artisan handcraft with modern laser engineering to deliver flawless, enduring installations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full px-9 py-4 font-semibold text-sm shadow-xl shadow-blue-500/20 transition-all hover:scale-105"
            >
              Request a Free Consultation
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full px-9 py-4 font-semibold text-sm transition-all"
            >
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Key Numbers & Stats Grid */}
      <section className="py-12 bg-white border-b border-slate-200/80 -mt-8 relative z-20 mx-4 md:mx-12 lg:mx-24 rounded-3xl shadow-xl shadow-slate-900/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {stats.map((stat, i) => (
              <div key={i} className={`pt-6 sm:pt-0 ${i > 0 ? "sm:pl-8" : ""}`}>
                <div className="text-4xl lg:text-5xl font-outfit font-bold text-slate-900 mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Deep-Dive Editorial Article: 8 Years of KiwiTilers */}
      <section className="py-32 px-4 md:px-12 lg:px-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column: Visual Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop"
                  alt="KiwiTilers master bathroom tiling craftsmanship"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-2">
                    Workmanship Guaranteed
                  </span>
                  <h4 className="text-xl font-outfit font-bold">
                    Sub-millimeter alignment meets certified waterproofing.
                  </h4>
                </div>
              </div>

              {/* Floating Highlight Card */}
              <div className="hidden sm:flex absolute -bottom-10 -right-8 bg-white p-6 rounded-2xl shadow-2xl border border-slate-200/80 max-w-xs items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900 font-outfit">4.9 / 5.0 Rating</div>
                  <div className="text-xs text-slate-500">Over 350+ verified homeowner & builder reviews across NZ</div>
                </div>
              </div>
            </div>

            {/* Right Column: In-Depth Editorial Article */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
                <FileText className="w-3.5 h-3.5" />
                <span>Our 8-Year Milestone Article</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-outfit font-bold text-slate-900 leading-tight mb-8">
                The KiwiTilers Story: 8 Years of Uncompromising Standard
              </h2>

              <div className="space-y-6 text-slate-600 text-base leading-relaxed">
                <p>
                  When KiwiTilers was established in 2018, the New Zealand residential and commercial construction sector was experiencing a rapid shift. Architectural designs demanded larger format tiles, continuous bathroom-to-shower floor planes, and intricate feature stonework. Yet, all too often, projects suffered from hurried subfloor preparation and shortcut waterproofing.
                </p>

                <p>
                  We founded KiwiTilers on a clear, uncompromising philosophy: <strong className="text-slate-900">a tile installation is only as durable as the engineering beneath it.</strong> Over the last 8 years, we have treated substrate leveling, moisture barrier testing, and membrane elasticity with the exact same rigor as the final surface layout.
                </p>

                {/* Pull Quote Box */}
                <div className="my-8 p-6 rounded-2xl bg-blue-50/80 border-l-4 border-blue-600 text-slate-800 italic font-serif text-lg leading-relaxed shadow-xs">
                  "In premium tiling, true luxury is quiet. It is the absence of lippage beneath your bare feet, the perfect 45-degree mitered edge around a niche, and the total confidence that water will never breach your subfloor."
                  <div className="not-italic text-xs font-sans font-bold text-slate-900 uppercase tracking-wider mt-3">
                    — Master Artisan & Operations Director, KiwiTilers
                  </div>
                </div>

                <p>
                  From small boutique en-suites in Ponsonby to expansive commercial lobbies in the Auckland CBD, our team has laid more than 85,000 square meters of tiles over 8 years. We stay ahead of industry standards with European zero-lippage mechanical leveling clips, laser line guides, and full Producer Statement (PS3) waterproofing compliance.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    KT
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">KiwiTilers Editorial</div>
                    <div className="text-[11px] text-slate-400">Published in Company History & Insights</div>
                  </div>
                </div>

                <Link
                  href="/blog/8-years-kiwitilers-tiling-excellence"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group"
                >
                  <span>Read Full 8-Year Anniversary Story</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Eight-Year Timeline / Milestones */}
      <section className="py-24 bg-white border-y border-slate-200/80">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3 block">
              Our Journey (2018 — 2026)
            </span>
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-slate-900">
              Key Milestones Across 8 Years of Growth
            </h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto mt-3">
              How focused craftsmanship and client trust built one of Auckland's most recommended tiling teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-200/70 relative hover:shadow-xl hover:border-slate-300 transition-all duration-300"
              >
                <div className="text-3xl font-outfit font-bold text-blue-600 mb-3">
                  {m.year}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-outfit">
                  {m.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Pillars of Excellence (Why Choose KiwiTilers) */}
      <section className="py-32 px-4 md:px-12 lg:px-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="max-w-2xl mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3 block">
              The KiwiTilers Difference
            </span>
            <h2 className="text-4xl md:text-5xl font-outfit font-bold tracking-tight mb-6">
              Why Discerning Architects & Homeowners Choose Us
            </h2>
            <p className="text-slate-300 text-base leading-relaxed font-light">
              We do not treat tiling as a quick cosmetic fix. We treat it as permanent architectural stonework that must protect your building envelope for decades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-800/80 backdrop-blur-xs border border-slate-700/80 p-8 rounded-3xl hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold font-outfit text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. The 4-Phase Delivery Process */}
      <section className="py-32 px-4 md:px-12 lg:px-24 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 pb-8 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3 block">
                Methodology
              </span>
              <h2 className="text-4xl md:text-5xl font-outfit font-bold text-slate-900 tracking-tight">
                Our 4-Step Master Process
              </h2>
            </div>
            <p className="text-slate-500 text-sm max-w-sm mt-4 md:mt-0 leading-relaxed">
              Every KiwiTilers project adheres to a proven quality-assurance protocol from day one to council sign-off.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col justify-between p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:shadow-lg transition-all duration-300">
                <div>
                  <span className="text-5xl font-outfit font-extrabold text-blue-600/20 block mb-6">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-outfit font-bold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center gap-2 text-[11px] font-semibold text-blue-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Quality Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Dual Residential & Commercial Specialization */}
      <section className="py-24 bg-slate-100/70 border-t border-slate-200/80 px-4 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Residential Box */}
            <div className="bg-white p-10 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-slate-900 mb-3">
                  Residential Renovations & New Builds
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  From luxury walk-in showers and bespoke splashbacks to expansive outdoor alfresco terraces, we work cleanly, protect your home, and respect your family's routine.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> Full bathroom tile stripping and rebuilds
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> Anti-mold epoxy grouts for long-term hygiene
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> Porcelain, marble, limestone, and handmade zellige
                  </li>
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t border-slate-100">
                <Link
                  href="/services"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5"
                >
                  <span>Explore Residential Services</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Commercial Box */}
            <div className="bg-white p-10 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-outfit font-bold text-slate-900 mb-3">
                  Commercial & Architectural Fit-Outs
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  High-traffic lobbies, hospitality venues, retail spaces, and office complexes engineered for durability, R-rated slip resistance, and rapid turnover schedules.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> Large-format porcelain slabs and terrazzo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> Expansion joints, acoustic underlays & PS3 Producer Statements
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> After-hours and phased installations for operational premises
                  </li>
                </ul>
              </div>
              <div className="pt-8 mt-8 border-t border-slate-100">
                <Link
                  href="/projects"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5"
                >
                  <span>Explore Commercial Projects</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Conversion Call to Action */}
      <section className="py-24 bg-slate-950 text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consult With 8-Year Experienced Tiling Specialists</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-outfit font-bold mb-6 tracking-tight">
            Ready to Bring 8 Years of Master Craftsmanship to Your Project?
          </h2>

          <p className="text-slate-300 max-w-xl mx-auto text-base leading-relaxed mb-10 font-light">
            Contact us today for a free on-site consultation, detailed feasibility assessment, and transparent fixed-price quotation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full px-9 py-4 font-semibold text-sm shadow-xl shadow-blue-500/25 transition-all w-full sm:w-auto"
            >
              Get a Free Quote Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full px-9 py-4 font-semibold text-sm transition-all w-full sm:w-auto"
            >
              Speak With Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
