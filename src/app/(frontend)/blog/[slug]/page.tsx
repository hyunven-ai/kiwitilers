import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Clock, Calendar, User, ChevronRight, Tag, Sparkles } from "lucide-react";
import ShareButton from "./ShareButton";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Calculate reading time
function getReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

// Category determination helper
function getArticleCategory(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("trend") || t.includes("2026") || t.includes("style")) return "Trends & Design";
  if (t.includes("bathroom") || t.includes("shower")) return "Bathroom Tiling";
  if (t.includes("kitchen") || t.includes("splashback")) return "Kitchen & Dining";
  if (t.includes("outdoor") || t.includes("patio")) return "Outdoor & Pool";
  if (t.includes("choose") || t.includes("guide") || t.includes("how to")) return "Buying Guide";
  if (t.includes("grout") || t.includes("maintain") || t.includes("clean")) return "Care & Maintenance";
  return "Expert Advice";
}

// Rich content renderer for markdown-like or paragraph text
function renderFormattedContent(content: string) {
  const blocks = content.split(/\n\s*\n/);

  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // Heading 2 (## Heading)
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={index}
          className="text-2xl md:text-3xl font-outfit font-bold text-slate-900 mt-10 mb-4 tracking-tight"
        >
          {trimmed.replace(/^##\s+/, "")}
        </h2>
      );
    }

    // Heading 3 (### Heading)
    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={index}
          className="text-xl md:text-2xl font-outfit font-bold text-slate-900 mt-8 mb-3"
        >
          {trimmed.replace(/^###\s+/, "")}
        </h3>
      );
    }

    // Blockquote (> Quote)
    if (trimmed.startsWith("> ")) {
      return (
        <blockquote
          key={index}
          className="my-6 border-l-4 border-blue-600 bg-blue-50/60 p-6 rounded-r-2xl italic text-slate-700 text-lg leading-relaxed"
        >
          {trimmed.replace(/^>\s+/, "")}
        </blockquote>
      );
    }

    // Bullet points
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const items = trimmed.split("\n").filter((line) => line.trim().startsWith("- ") || line.trim().startsWith("* "));
      return (
        <ul key={index} className="my-6 space-y-2.5 list-disc list-inside text-slate-700 leading-relaxed text-base">
          {items.map((item, itemIdx) => (
            <li key={itemIdx} className="pl-1">
              {item.replace(/^[-*]\s+/, "")}
            </li>
          ))}
        </ul>
      );
    }

    // Numbered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed.split("\n").filter((line) => /^\d+\.\s+/.test(line.trim()));
      return (
        <ol key={index} className="my-6 space-y-2.5 list-decimal list-inside text-slate-700 leading-relaxed text-base">
          {items.map((item, itemIdx) => (
            <li key={itemIdx} className="pl-1 font-medium">
              <span className="font-normal text-slate-700">{item.replace(/^\d+\.\s+/, "")}</span>
            </li>
          ))}
        </ol>
      );
    }

    // Standard paragraph with line-break support
    return (
      <p
        key={index}
        className="text-slate-700 text-base md:text-lg leading-relaxed mb-6 font-normal whitespace-pre-line"
      >
        {trimmed}
      </p>
    );
  });
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await prisma.blog.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
    });

    if (!post || post.status !== "PUBLISHED") {
      return {
        title: "Article Not Found | KiwiTilers",
      };
    }

    return {
      title: `${post.title} | KiwiTilers NZ`,
      description: post.excerpt || post.content.substring(0, 160),
      openGraph: {
        title: post.title,
        description: post.excerpt || post.content.substring(0, 160),
        images: post.image ? [{ url: post.image }] : undefined,
        type: "article",
        publishedTime: post.createdAt.toISOString(),
      },
    };
  } catch (error) {
    return {
      title: "Blog Article | KiwiTilers",
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post: any = null;
  let relatedPosts: any[] = [];

  try {
    post = await prisma.blog.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
    });

    if (post && post.status === "PUBLISHED") {
      relatedPosts = await prisma.blog.findMany({
        where: {
          status: "PUBLISHED",
          NOT: { id: post.id },
        },
        take: 3,
        orderBy: { createdAt: "desc" },
      });
    }
  } catch (error) {
    console.error("Error loading blog article:", error);
  }

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  const category = getArticleCategory(post.title);
  const readTime = getReadingTime(post.content);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="bg-white border-b border-slate-200/80 sticky top-24 z-30">
        <div className="container mx-auto px-4 max-w-5xl h-14 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <Link href="/" className="hover:text-slate-900 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href="/blog" className="hover:text-slate-900 transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold truncate max-w-[200px] md:max-w-md">
              {post.title}
            </span>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-semibold text-slate-700 hover:text-blue-600 transition-colors shrink-0 ml-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </Link>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Article Header */}
          <div className="mb-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Tag className="w-3 h-3" />
              <span>{category}</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-outfit font-bold text-slate-900 tracking-tight leading-[1.15] mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed mb-8">
                {post.excerpt}
              </p>
            )}

            {/* Author Meta & Share Buttons Bar */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {post.author ? post.author.charAt(0) : "K"}
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-900">{post.author || "KiwiTilers Team"}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {new Date(post.createdAt).toLocaleDateString("en-NZ", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {readTime}
                    </span>
                  </div>
                </div>
              </div>

              <ShareButton title={post.title} />
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-12 rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 aspect-[16/9] relative bg-slate-100">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="bg-white rounded-3xl p-8 md:p-14 shadow-sm border border-slate-200/80 prose prose-slate max-w-none">
            {renderFormattedContent(post.content)}
          </div>

          {/* Author Box */}
          <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-200/80 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-md">
              KT
            </div>
            <div className="text-center sm:text-left flex-1">
              <div className="text-xs uppercase font-bold text-blue-600 tracking-wider mb-1">
                Published By
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                {post.author || "KiwiTilers Editorial Team"}
              </h4>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                KiwiTilers is New Zealand's premier residential and commercial tiling specialist. Our licensed team brings architectural precision, waterproofing expertise, and durable elegance to bathrooms, kitchens, and outdoor spaces across Auckland.
              </p>
            </div>
          </div>

          {/* Bottom Share Bar */}
          <div className="mt-8 flex items-center justify-between bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <span className="text-xs font-semibold text-slate-700">Found this guide helpful? Share it:</span>
            <ShareButton title={post.title} />
          </div>
        </div>
      </article>

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-outfit font-bold text-slate-900">
                  Related Reading
                </h3>
                <p className="text-xs text-slate-500">More guides and trends from KiwiTilers</p>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
              >
                View all articles →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/80 hover:shadow-lg hover:border-slate-300 transition-all flex flex-col"
                >
                  <div className="aspect-[16/10] bg-slate-200 relative overflow-hidden">
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                        {getArticleCategory(item.title)}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-1 mb-2 line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span>
                        {new Date(item.createdAt).toLocaleDateString("en-NZ", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="font-semibold text-blue-600 group-hover:underline">Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Conversion Banner */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-100 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready To Transform Your Project?</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-outfit font-bold mb-4">
            Get Expert Craftsmanship For Your Tiling Needs
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            From design consultation to flawless waterproof installation, trust Auckland's leading tiling professionals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-slate-50 rounded-full px-8 py-3.5 font-semibold text-sm shadow-md transition-all w-full sm:w-auto"
            >
              Request a Free Quote
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white border border-blue-500 rounded-full px-8 py-3.5 font-semibold text-sm transition-all w-full sm:w-auto"
            >
              Explore Completed Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
