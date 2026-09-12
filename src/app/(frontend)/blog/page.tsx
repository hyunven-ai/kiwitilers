import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import BlogClient, { BlogPostItem } from "./BlogClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog & Expert Tiling Guides | KiwiTilers NZ",
  description:
    "Explore expert tiling guides, 2026 design trends, material comparisons, and renovation tips from certified master tilers across New Zealand.",
  openGraph: {
    title: "Blog & Expert Tiling Guides | KiwiTilers NZ",
    description:
      "Explore expert tiling guides, 2026 design trends, material comparisons, and renovation tips from certified master tilers across New Zealand.",
    type: "website",
  },
};

export default async function BlogPage() {
  let posts: BlogPostItem[] = [];

  try {
    const dbPosts = await prisma.blog.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Ensure dates are serialized nicely
    posts = dbPosts.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error loading blog posts from database:", error);
  }

  // Fallback default sample posts if database has no records yet
  if (posts.length === 0) {
    posts = [
      {
        id: "default-1",
        title: "How to Choose the Right Tiles for Your Bathroom",
        slug: "how-to-choose-bathroom-tiles",
        excerpt:
          "A comprehensive guide on slip ratings (R9-R13), moisture absorption, porcelain vs ceramic, and waterproofing membrane standards in NZ.",
        content:
          "When selecting bathroom tiles, slip resistance (R-rating) and water absorption are the two most critical metrics. Porcelain tiles with less than 0.5% water absorption rate are ideal for wet areas...",
        author: "KiwiTilers Team",
        image:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop",
        status: "PUBLISHED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "default-2",
        title: "Top Tiling Trends in New Zealand for 2026",
        slug: "top-tiling-trends-2026",
        excerpt:
          "From ultra large format slabs to organic zellige textures and warm earthy tones, explore what's shaping contemporary kiwi homes.",
        content:
          "Architects across New Zealand are embracing continuous surface design, minimizing grout lines with 1200x2400mm porcelain slabs, paired with artisanal zellige features...",
        author: "KiwiTilers Team",
        image:
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
        status: "PUBLISHED",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  return <BlogClient initialPosts={posts} />;
}
