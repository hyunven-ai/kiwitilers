import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kiwitilers.co.nz' },
    update: {
      password: 'admin123',
      name: 'KiwiTilers Admin',
      role: 'SUPERADMIN',
    },
    create: {
      email: 'admin@kiwitilers.co.nz',
      name: 'KiwiTilers Admin',
      password: 'admin123',
      role: 'SUPERADMIN',
    },
  });
  console.log('Admin user seeded:', admin.email);

  // 2. Services
  const services = [
    {
      title: 'Bathroom Tiling',
      slug: 'bathroom-tiling',
      description: 'Professional bathroom wall and floor tiling with complete waterproofing.',
      content: 'Complete bathroom tiling services including waterproof membrane application, screeding, and precision laying of ceramic, porcelain, and natural stone tiles.',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
      icon: '🚿',
    },
    {
      title: 'Kitchen Tiling',
      slug: 'kitchen-tiling',
      description: 'Kitchen floors, walls, splashbacks, and feature areas.',
      content: 'Upgrade your kitchen with custom splashbacks, durable flooring, and beautiful feature tile accents designed for both beauty and stain resistance.',
      image: 'https://res.cloudinary.com/dzojrrwtr/image/upload/v1788591762/kitchentilling_j45khs.webp',
      icon: '🍳',
    },
    {
      title: 'Floor Tiling',
      slug: 'floor-tiling',
      description: 'Durable, level, and precise floor tile installation for homes and offices.',
      content: 'High-traffic indoor and outdoor floor tiling with laser-level precision, expansion joints, and premium adhesive systems.',
      image: 'https://res.cloudinary.com/dzojrrwtr/image/upload/v1788591848/floor_tiling_tgz1am.webp',
      icon: '🏛️',
    },
    {
      title: 'Wall Tiling',
      slug: 'wall-tiling',
      description: 'Expert decorative and structural wall tiling installations.',
      content: 'From floor-to-ceiling bathroom walls to architectural feature walls in living spaces and commercial foyers.',
      image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800&auto=format&fit=crop',
      icon: '🧱',
    },
    {
      title: 'Outdoor Tiling',
      slug: 'outdoor-tiling',
      description: 'Weather-resistant patios, balconies, pool surrounds, and pathways.',
      content: 'Slip-resistant, UV-stable external tiles installed over waterproof pedestals or screeded slabs with optimal fall for drainage.',
      image: 'https://res.cloudinary.com/dzojrrwtr/image/upload/v1788591798/outdoortiling_cisjl9.webp',
      icon: '☀️',
    },
    {
      title: 'Large Format Tiling',
      slug: 'large-format-tiling',
      description: 'Specialized installation of large-format slabs and porcelain panels.',
      content: 'Requiring specialized suction handling, back-buttering, and lippage tuning systems for ultra-seamless modern aesthetics.',
      image: 'https://res.cloudinary.com/dzojrrwtr/image/upload/v1788591813/LargeFormatTiling_q4hhjy.webp',
      icon: '📐',
    },
    {
      title: 'Tile Repair',
      slug: 'tile-repair',
      description: 'Precise replacement and restoration of cracked or loose tiles.',
      content: 'Careful removal of damaged individual tiles without harming surrounding areas, re-bonding, and matching grout color.',
      image: 'https://res.cloudinary.com/dzojrrwtr/image/upload/v1788591883/Tile_Repair_ka0qdj.webp',
      icon: '🔧',
    },
    {
      title: 'Regrouting',
      slug: 'regrouting',
      description: 'Remove degraded grout and reseal tile joints for like-new appearance.',
      content: 'Eliminate mold, mildew, and discolored grout lines with antimicrobial, high-performance epoxy or cementitious grout.',
      image: 'https://res.cloudinary.com/dzojrrwtr/image/upload/v1788591833/Regrouting_yxjbse.webp',
      icon: '✨',
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  console.log(`Seeded ${services.length} services.`);

  // 3. Projects
  const projects = [
    {
      title: 'Modern Bathroom Renovation',
      slug: 'modern-bathroom-renovation',
      location: 'Auckland',
      serviceType: 'Bathrooms',
      tileType: 'Large-format Porcelain',
      description: 'Complete master bathroom remodel with floor-to-ceiling terrazzo and marble tiles.',
      beforeImage: '/images/bathroom_before_1788157367044.jpg',
      afterImage: '/images/bathroom_after_1788157380612.jpg',
    },
    {
      title: 'Kitchen Splashback & Island',
      slug: 'kitchen-splashback-island',
      location: 'West Auckland',
      serviceType: 'Kitchens',
      tileType: 'Glazed Subway Tiles',
      description: 'Herringbone pattern glazed ceramic splashback with integrated LED under-cabinet illumination.',
      beforeImage: '/images/bathroom_before_1788157367044.jpg',
      afterImage: '/images/project_kitchen_1788157394915.jpg',
    },
    {
      title: 'Luxury Ensuite Sanctuary',
      slug: 'luxury-ensuite-sanctuary',
      location: 'Central Auckland',
      serviceType: 'Bathrooms',
      tileType: 'Calacatta Marble',
      description: 'Custom walk-in shower with concealed linear drain, underfloor heating, and bookmatched marble slabs.',
      beforeImage: '/images/bathroom_before_1788157367044.jpg',
      afterImage: '/images/hero_bg_1788157349184.jpg',
    },
    {
      title: 'Commercial Lobby Flooring',
      slug: 'commercial-lobby-flooring',
      location: 'North Shore',
      serviceType: 'Commercial',
      tileType: 'Terrazzo & Granite',
      description: 'Heavy commercial grade flooring over 600m² with custom brass inlay borders.',
      beforeImage: '/images/bathroom_before_1788157367044.jpg',
      afterImage: 'https://res.cloudinary.com/dzojrrwtr/image/upload/v1788593395/Commercial_Lobby_Flooring1_ynacbk.webp',
    },
    {
      title: 'Outdoor Entertainment Patio',
      slug: 'outdoor-entertainment-patio',
      location: 'East Auckland',
      serviceType: 'Outdoor',
      tileType: 'Anti-Slip Bluestone',
      description: 'Exterior pool surround and barbecue patio with slope optimization and anti-slip rating.',
      beforeImage: '/images/bathroom_before_1788157367044.jpg',
      afterImage: 'https://res.cloudinary.com/dzojrrwtr/image/upload/v1788591798/outdoortiling_cisjl9.webp',
    },
    {
      title: 'Architectural Feature Wall',
      slug: 'architectural-feature-wall',
      location: 'South Auckland',
      serviceType: 'Walls',
      tileType: '3D Textured Ceramic',
      description: 'Dramatic living room accent wall featuring geometric tactile tiles and shadow gap detailing.',
      beforeImage: '/images/bathroom_before_1788157367044.jpg',
      afterImage: 'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800&auto=format&fit=crop',
    },
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`Seeded ${projects.length} projects.`);

  // 4. Leads / QuoteRequests
  const existingQuotes = await prisma.quoteRequest.count();
  if (existingQuotes === 0) {
    await prisma.quoteRequest.createMany({
      data: [
        {
          fullName: 'John Smith',
          phoneNumber: '021 889 1234',
          email: 'john.smith@gmail.com',
          location: 'Auckland',
          serviceRequired: 'Bathroom Tiling',
          propertyType: 'Residential',
          approxArea: '18 sqm',
          preferredDate: 'Next week',
          description: 'Master bathroom renovation, need tile removal and waterproofing.',
          status: 'NEW',
          estimatedValue: 4500,
          notes: 'Customer prefers Italian porcelain tiles.',
        },
        {
          fullName: 'Sarah Wilson',
          phoneNumber: '022 456 7890',
          email: 'sarah.w@outlook.com',
          location: 'North Shore',
          serviceRequired: 'Kitchen Tiling',
          propertyType: 'Residential',
          approxArea: '8 sqm',
          preferredDate: 'End of month',
          description: 'Subway tile splashback behind oven and sink.',
          status: 'CONTACTED',
          estimatedValue: 1850,
          notes: 'Called on Monday, waiting for sample selection.',
        },
        {
          fullName: 'Michael Brown',
          phoneNumber: '027 123 9988',
          email: 'michael.b@techspace.co.nz',
          location: 'West Auckland',
          serviceRequired: 'Floor Tiling',
          propertyType: 'Commercial',
          approxArea: '120 sqm',
          preferredDate: 'Within 2 months',
          description: 'Showroom ground floor porcelain tiling.',
          status: 'QUOTED',
          estimatedValue: 16500,
          notes: 'Quote sent via PDF, awaiting board approval.',
        },
        {
          fullName: 'Emma Davis',
          phoneNumber: '021 908 7766',
          email: 'emma.davis@nzhome.co.nz',
          location: 'Central Auckland',
          serviceRequired: 'Outdoor Tiling',
          propertyType: 'Residential',
          approxArea: '35 sqm',
          preferredDate: 'ASAP',
          description: 'Patio extension and non-slip exterior tiles.',
          status: 'APPROVED',
          estimatedValue: 6200,
          notes: 'Deposit paid. Starts next Monday.',
        },
      ],
    });
    console.log('Seeded sample quote requests / leads.');
  }

  // 5. Testimonials
  const existingTestimonials = await prisma.testimonial.count();
  if (existingTestimonials === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          customerName: 'David Miller',
          projectType: 'Bathroom Renovation',
          rating: 5,
          content: 'Exceptional craftsmanship and attention to detail. The KiwiTilers team transformed our dated bathroom into a 5-star hotel retreat. Highly recommended!',
          isFeatured: true,
        },
        {
          customerName: 'Sophie Chen',
          projectType: 'Kitchen Splashback',
          rating: 5,
          content: 'Stunning herringbone pattern in our kitchen. They arrived on time, kept the work area clean every evening, and finished precisely on schedule.',
          isFeatured: true,
        },
        {
          customerName: 'Liam Johnson',
          projectType: 'Commercial Lobby',
          rating: 5,
          content: 'KiwiTilers completed our 500sqm lobby flooring ahead of schedule. The quality of leveling and grout finishing is immaculate.',
          isFeatured: true,
        },
      ],
    });
    console.log('Seeded sample testimonials.');
  }

  // 6. Blog
  const blogs = [
    {
      title: 'How to Choose the Right Tiles for Your Bathroom',
      slug: 'how-to-choose-bathroom-tiles',
      excerpt: 'A comprehensive guide on slip ratings, moisture resistance, porcelain vs ceramic, and grout selection.',
      content: 'When selecting bathroom tiles, slip resistance (R-rating) and water absorption are the two most critical metrics. Porcelain tiles with less than 0.5% water absorption rate are ideal for wet areas...',
      author: 'KiwiTilers Team',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
      status: 'PUBLISHED',
    },
    {
      title: 'Top Tiling Trends in New Zealand for 2026',
      slug: 'top-tiling-trends-2026',
      excerpt: 'From ultra large format slabs to organic zellige textures and warm earthy tones.',
      content: 'Architects across New Zealand are embracing continuous surface design, minimizing grout lines with 1200x2400mm porcelain slabs, paired with artisanal zellige features...',
      author: 'KiwiTilers Team',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop',
      status: 'PUBLISHED',
    },
  ];

  for (const b of blogs) {
    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
  }
  console.log(`Seeded ${blogs.length} blog posts.`);

  // 7. Settings
  const settings = [
    { key: 'siteName', value: 'KiwiTilers' },
    { key: 'adminEmail', value: 'admin@kiwitilers.co.nz' },
    { key: 'phone', value: '0800 123 456' },
    { key: 'address', value: 'Auckland, New Zealand' },
    { key: 'tagline', value: 'Crafted Surfaces & Architectural Precision' },
  ];

  for (const set of settings) {
    await prisma.setting.upsert({
      where: { key: set.key },
      update: { value: set.value },
      create: set,
    });
  }
  console.log('Seeded site settings.');

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
