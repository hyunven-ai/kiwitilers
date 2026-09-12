"use client";

import { useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  CheckCircle2,
  AlertCircle,
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
  Database,
  RefreshCw,
  Search,
  Code,
  Share2,
  Eye,
  Sparkles,
  HelpCircle,
  Check,
  Plus,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"seo" | "custom_tags" | "social" | "general" | "system">("seo");

  const [settings, setSettings] = useState({
    // General & Contact
    siteName: "KiwiTilers",
    tagline: "Crafted Surfaces & Architectural Precision",
    adminEmail: "admin@kiwitilers.co.nz",
    phone: "0800 123 456",
    address: "Auckland, New Zealand",

    // SEO & Meta Tags
    metaTitle: "KiwiTilers | Professional Tiling Services & Waterproofing NZ",
    metaDescription:
      "Specialist residential and commercial tiling across Auckland. Over 8 years of master craftsmanship, certified NZBC E3 waterproofing, large-format porcelain, and 10-year workmanship warranties.",
    metaKeywords:
      "tiling services auckland, bathroom tiling, kitchen splashbacks, outdoor tiling, floor tilers nz, waterproof tiling, large format tiles, commercial tiling",
    canonicalUrl: "https://kiwitilers.co.nz",
    robotsIndex: "index, follow",

    // OpenGraph / Social
    ogTitle: "KiwiTilers | Master Tiling & Architectural Surfaces",
    ogDescription:
      "From luxury bathrooms to commercial landmarks, KiwiTilers delivers architectural precision, mitered stonework, and 100% certified waterproofing.",
    ogImage: "https://res.cloudinary.com/dzojrrwtr/image/upload/v1788593395/Commercial_Lobby_Flooring1_ynacbk.webp",

    // Custom Tags & Tracking
    googleAnalyticsId: "",
    googleVerification: "",
    customHeadTags: "",
    customBodyTags: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/settings");
      const json = await res.json();
      if (json.success && json.data) {
        setSettings((prev) => ({
          ...prev,
          ...json.data,
        }));
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Settings & Meta Tags saved successfully!");
      } else {
        alert(json.error || "Failed to save settings");
      }
    } catch (err) {
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  // Helper insertion snippets
  const insertSnippetToHead = (snippet: string) => {
    setSettings((prev) => ({
      ...prev,
      customHeadTags: prev.customHeadTags ? `${prev.customHeadTags}\n${snippet}` : snippet,
    }));
    showToast("Snippet added to Custom Head Tags");
  };

  const insertSnippetToBody = (snippet: string) => {
    setSettings((prev) => ({
      ...prev,
      customBodyTags: prev.customBodyTags ? `${prev.customBodyTags}\n${snippet}` : snippet,
    }));
    showToast("Snippet added to Custom Body Tags");
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header & Global Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">System & Website Settings</h1>
          <p className="text-sm text-slate-500">
            Manage meta tags, search engine indexing, custom scripts, branding, and contact channels.
          </p>
        </div>

        <button
          onClick={() => handleSave()}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm shadow-blue-500/20 transition-all disabled:opacity-50 cursor-pointer shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save All Settings"}</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "seo", label: "SEO & Meta Tags", icon: Search },
          { id: "custom_tags", label: "Custom Tags & Scripts", icon: Code },
          { id: "social", label: "Social & OpenGraph", icon: Share2 },
          { id: "general", label: "Branding & Contact", icon: Globe },
          { id: "system", label: "System Info", icon: Database },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold rounded-t-xl transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-white text-blue-600 border-t-2 border-x border-b-0 border-t-blue-600 border-x-slate-200 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="p-16 text-center text-slate-400 bg-white rounded-2xl border border-slate-100">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />
          <p className="text-sm">Loading configuration...</p>
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          {/* TAB 1: SEO & META TAGS */}
          {activeTab === "seo" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Google Search Live SERP Preview */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <h2 className="text-base font-bold text-slate-900">Google Search Result Preview</h2>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Live Simulation</span>
                </div>

                {/* Google SERP Snippet Box */}
                <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/70 max-w-2xl font-sans">
                  <div className="flex items-center gap-2 text-xs text-slate-600 mb-1">
                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[9px]">
                      KT
                    </div>
                    <span className="text-xs text-slate-700 font-medium truncate">
                      {settings.canonicalUrl || "https://kiwitilers.co.nz"}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-1 mb-1 font-sans">
                    {settings.metaTitle || `${settings.siteName} | Professional Tiling Services`}
                  </h3>

                  <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                    {settings.metaDescription || "From bathroom renovations to complete floor and wall tiling, KiwiTilers delivers reliable, high-quality tiling solutions for homes and businesses."}
                  </p>
                </div>
              </div>

              {/* Meta Title, Description, Keywords Inputs */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <Search className="w-5 h-5 text-blue-600" />
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Search Engine Meta Tags</h2>
                    <p className="text-xs text-slate-500">Configure global metadata injected into the website HTML header.</p>
                  </div>
                </div>

                {/* Meta Title */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Meta Title (SEO Title) *
                    </label>
                    <span
                      className={`text-[11px] font-mono ${
                        settings.metaTitle.length > 60 ? "text-amber-600 font-semibold" : "text-slate-400"
                      }`}
                    >
                      {settings.metaTitle.length}/60 chars (recommended: 50-60)
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={settings.metaTitle}
                    onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                    placeholder="e.g. KiwiTilers | Professional Tiling Services & Waterproofing NZ"
                    className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    The title tag is the single most important on-page SEO factor. Appears in browser tabs and search engine snippets.
                  </p>
                </div>

                {/* Meta Description */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Meta Description *
                    </label>
                    <span
                      className={`text-[11px] font-mono ${
                        settings.metaDescription.length > 160 ? "text-amber-600 font-semibold" : "text-slate-400"
                      }`}
                    >
                      {settings.metaDescription.length}/160 chars (recommended: 140-160)
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    required
                    value={settings.metaDescription}
                    onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                    placeholder="Concise summary highlighting your unique value proposition, services, and location..."
                    className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Displayed beneath your page title in search engine results. Write compelling copy that encourages clicks.
                  </p>
                </div>

                {/* Meta Keywords */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Meta Keywords
                    </label>
                    <span className="text-[11px] text-slate-400">Comma-separated</span>
                  </div>
                  <input
                    type="text"
                    value={settings.metaKeywords}
                    onChange={(e) => setSettings({ ...settings, metaKeywords: e.target.value })}
                    placeholder="tiling services, bathroom renovation, kitchen splashback, waterproof tiling auckland"
                    className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white font-sans"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Separate keywords with commas. Used by internal search, specific search engine indexes, and directory aggregators.
                  </p>
                </div>

                {/* Canonical URL & Robots Indexing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Canonical Site URL</label>
                    <input
                      type="url"
                      value={settings.canonicalUrl}
                      onChange={(e) => setSettings({ ...settings, canonicalUrl: e.target.value })}
                      placeholder="https://kiwitilers.co.nz"
                      className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white font-mono text-xs"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">Prevents duplicate content penalties across domain variants.</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Robots Indexing</label>
                    <select
                      value={settings.robotsIndex}
                      onChange={(e) => setSettings({ ...settings, robotsIndex: e.target.value })}
                      className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                    >
                      <option value="index, follow">index, follow (Allow search engines to index - Recommended)</option>
                      <option value="noindex, nofollow">noindex, nofollow (Block search engines - Staging/Dev)</option>
                      <option value="index, nofollow">index, nofollow (Index page but don't follow outbound links)</option>
                    </select>
                    <span className="text-[11px] text-slate-400 mt-1 block">Controls how search engine crawlers spider your pages.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOM TAGS & SCRIPTS */}
          {activeTab === "custom_tags" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Google Verification & Analytics IDs */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-5">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Analytics & Verification Codes</h2>
                    <p className="text-xs text-slate-500">Quick-entry fields for standard Google webmaster verification and tracking.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Google Analytics 4 Measurement ID
                    </label>
                    <input
                      type="text"
                      value={settings.googleAnalyticsId}
                      onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                      placeholder="G-XXXXXXXXXX"
                      className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white font-mono text-xs"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Automatically injects Google Tag Manager (gtag.js) script into the site.
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Google Search Console Verification Token
                    </label>
                    <input
                      type="text"
                      value={settings.googleVerification}
                      onChange={(e) => setSettings({ ...settings, googleVerification: e.target.value })}
                      placeholder="e.g. abcdef1234567890..."
                      className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white font-mono text-xs"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Injected as &lt;meta name="google-site-verification" content="..."&gt;.
                    </span>
                  </div>
                </div>
              </div>

              {/* Custom <head> Tags */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-600" />
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Custom &lt;head&gt; HTML Tags &amp; Scripts</h2>
                      <p className="text-xs text-slate-500">
                        Injected directly into the document &lt;head&gt;. Accepts &lt;meta&gt;, &lt;link&gt;, or &lt;script&gt; tags.
                      </p>
                    </div>
                  </div>

                  {/* Preset Helper Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => insertSnippetToHead('<meta name="geo.region" content="NZ-AUK" />\n<meta name="geo.placename" content="Auckland" />')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-colors"
                    >
                      <Plus className="w-3 h-3" /> Geo Meta
                    </button>
                    <button
                      type="button"
                      onClick={() => insertSnippetToHead('<meta name="theme-color" content="#0f172a" />')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-colors"
                    >
                      <Plus className="w-3 h-3" /> Theme Color
                    </button>
                  </div>
                </div>

                <div>
                  <textarea
                    rows={6}
                    value={settings.customHeadTags}
                    onChange={(e) => setSettings({ ...settings, customHeadTags: e.target.value })}
                    placeholder={`<!-- Paste custom head meta or script tags here -->\n<meta name="author" content="KiwiTilers" />\n<meta name="geo.region" content="NZ-AUK" />\n<script async src="https://example.com/tracking.js"></script>`}
                    className="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-900 text-emerald-400 leading-relaxed shadow-inner"
                  />
                  <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Scripts inserted here are executed asynchronously when the document loads.</span>
                  </p>
                </div>
              </div>

              {/* Custom <body> Tags */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-indigo-600" />
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Custom &lt;body&gt; HTML Tags &amp; Footer Scripts</h2>
                      <p className="text-xs text-slate-500">
                        Injected just before closing &lt;/body&gt;. Ideal for live chat widgets, conversion tracking pixels, or modals.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => insertSnippetToBody('<!-- Live Chat or Tracking Pixel -->\n<script>\n  console.log("Custom body script initialized");\n</script>')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer transition-colors"
                    >
                      <Plus className="w-3 h-3" /> Sample Script
                    </button>
                  </div>
                </div>

                <div>
                  <textarea
                    rows={6}
                    value={settings.customBodyTags}
                    onChange={(e) => setSettings({ ...settings, customBodyTags: e.target.value })}
                    placeholder={`<!-- Paste conversion pixels, live chat widgets, or tracking snippets here -->\n<script>\n  // Custom tracking code\n</script>`}
                    className="w-full p-3 font-mono text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-900 text-emerald-400 leading-relaxed shadow-inner"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SOCIAL & OPENGRAPH */}
          {activeTab === "social" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Social Card Live Preview */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-blue-600" />
                    <h2 className="text-base font-bold text-slate-900">Social Share Card Preview (OpenGraph)</h2>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">WhatsApp / Facebook / LinkedIn</span>
                </div>

                {/* Social Card Preview */}
                <div className="max-w-md bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                  <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
                    {settings.ogImage ? (
                      <img src={settings.ogImage} alt="Social Share Card" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                        No image preview available
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-slate-50 border-t border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 font-mono">
                      {settings.canonicalUrl ? new URL(settings.canonicalUrl).hostname.toUpperCase() : "KIWITILERS.CO.NZ"}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mb-1 font-outfit">
                      {settings.ogTitle || settings.metaTitle}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {settings.ogDescription || settings.metaDescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* OpenGraph Inputs */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-5">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <Share2 className="w-5 h-5 text-blue-600" />
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">OpenGraph & Social Meta Configurations</h2>
                    <p className="text-xs text-slate-500">Defines the title, description, and thumbnail image when links are shared on social apps.</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Social Share Title (og:title)</label>
                  <input
                    type="text"
                    value={settings.ogTitle}
                    onChange={(e) => setSettings({ ...settings, ogTitle: e.target.value })}
                    placeholder="e.g. KiwiTilers | Master Tiling & Architectural Surfaces"
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Social Share Description (og:description)</label>
                  <textarea
                    rows={2}
                    value={settings.ogDescription}
                    onChange={(e) => setSettings({ ...settings, ogDescription: e.target.value })}
                    placeholder="Short engaging sentence summarizing your services..."
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">Social Share Cover Image URL (og:image)</label>
                  <input
                    type="text"
                    value={settings.ogImage}
                    onChange={(e) => setSettings({ ...settings, ogImage: e.target.value })}
                    placeholder="https://images.unsplash.com/... or https://res.cloudinary.com/..."
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white font-mono text-xs"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Recommended dimensions: 1200x630px for high-resolution retina screens.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BRANDING & CONTACT */}
          {activeTab === "general" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* General Branding */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-5">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-slate-900">General Branding</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Site Name</label>
                    <input
                      type="text"
                      required
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Brand Tagline</label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                      className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-5">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-slate-900">Contact & Notifications</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Admin Email Address</label>
                    <input
                      type="email"
                      required
                      value={settings.adminEmail}
                      onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                      className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">Inquiries will be flagged to this email.</span>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Customer Support Phone</label>
                    <input
                      type="text"
                      required
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">Displayed in website header & contact page.</span>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">Business Address / Service Region</label>
                    <input
                      type="text"
                      required
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="w-full p-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SYSTEM INFO */}
          {activeTab === "system" && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <Database className="w-5 h-5 text-slate-600" />
                <h2 className="text-lg font-bold text-slate-900">Database & Environment</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-slate-400 block mb-1">Database Engine</span>
                  <span className="font-semibold text-slate-800 text-sm">SQLite (dev.db)</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-slate-400 block mb-1">ORM Client</span>
                  <span className="font-semibold text-slate-800 text-sm">Prisma Client 6.x</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                  <span className="text-slate-400 block mb-1">Connection State</span>
                  <span className="font-semibold text-emerald-600 text-sm">● Connected & Synced</span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Save Button Bar */}
          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving All Settings..." : "Save Settings"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
