import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { prisma } from "@/lib/prisma";
import CustomCodeInjector from "@/components/layout/CustomCodeInjector";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export async function generateMetadata(): Promise<Metadata> {
  let settings: Record<string, string> = {};
  try {
    const list = await prisma.setting.findMany();
    list.forEach((s) => {
      settings[s.key] = s.value;
    });
  } catch (error) {
    console.error("Error loading settings for metadata:", error);
  }

  const siteName = settings.siteName || "KiwiTilers";
  const title =
    settings.metaTitle ||
    (settings.tagline ? `${siteName} | ${settings.tagline}` : `${siteName} | Professional Tiling Services`);
  const description =
    settings.metaDescription ||
    "From bathroom renovations to complete floor and wall tiling, KiwiTilers delivers reliable, high-quality tiling solutions for homes and businesses.";
  const keywords = settings.metaKeywords
    ? settings.metaKeywords.split(",").map((k) => k.trim())
    : [
        "tiling services",
        "bathroom tiling",
        "kitchen tiling",
        "floor tiling",
        "auckland tilers",
        "waterproofing NZBC E3",
      ];
  const ogTitle = settings.ogTitle || title;
  const ogDescription = settings.ogDescription || description;
  const ogImage =
    settings.ogImage ||
    "https://res.cloudinary.com/dzojrrwtr/image/upload/v1788593395/Commercial_Lobby_Flooring1_ynacbk.webp";

  const isNoIndex = settings.robotsIndex?.toLowerCase().includes("noindex");

  return {
    metadataBase: settings.canonicalUrl ? new URL(settings.canonicalUrl) : undefined,
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords,
    robots: {
      index: !isNoIndex,
      follow: !settings.robotsIndex?.toLowerCase().includes("nofollow"),
    },
    verification: settings.googleVerification
      ? { google: settings.googleVerification }
      : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      siteName,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings: Record<string, string> = {};
  try {
    const list = await prisma.setting.findMany();
    list.forEach((s) => {
      settings[s.key] = s.value;
    });
  } catch (error) {
    console.error("Error loading settings for RootLayout:", error);
  }

  const gaId = settings.googleAnalyticsId?.trim();
  const customHeadTags = settings.customHeadTags || "";
  const customBodyTags = settings.customBodyTags || "";

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        <CustomCodeInjector headTags={customHeadTags} bodyTags={customBodyTags} />
        {children}
      </body>
    </html>
  );
}
