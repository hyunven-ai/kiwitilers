"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const quoteSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phoneNumber: z.string().min(5, "Phone is required"),
  email: z.string().email("Invalid email"),
  location: z.string().min(2, "Location is required"),
  serviceRequired: z.string().min(2, "Service is required"),
  propertyType: z.string().min(2, "Property type is required"),
  approxArea: z.string().optional(),
  preferredDate: z.string().optional(),
  description: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

function QuoteForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get("service") || "";

  const [services, setServices] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      serviceRequired: preselectedService || "Bathroom Tiling",
      propertyType: "Residential",
    },
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const titles = json.data.map((s: any) => s.title);
          setServices(titles);
          if (preselectedService && titles.includes(preselectedService)) {
            setValue("serviceRequired", preselectedService);
          }
        }
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };
    fetchServices();
  }, [preselectedService, setValue]);

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setIsSuccess(true);
      } else {
        alert(json.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200/80">
        <h1 className="text-3xl font-outfit font-bold text-slate-900 mb-2">Request a Free Quote</h1>
        <p className="text-slate-600 mb-8 text-sm">
          Tell us about your project and we will get back to you with a detailed estimate within 24 hours.
        </p>

        {isSuccess ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-8 rounded-2xl text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-bold">Inquiry Received!</h2>
            <p className="text-sm text-emerald-800 max-w-md mx-auto">
              Thank you for reaching out. Our team has received your details and will be in touch shortly to schedule a consultation.
            </p>
            <div className="pt-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <span>Browse Our Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Name *</label>
                <input
                  {...register("fullName")}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  placeholder="e.g. John Smith"
                />
                {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Phone Number *</label>
                <input
                  {...register("phoneNumber")}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  placeholder="021 123 4567"
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Address *</label>
              <input
                type="email"
                {...register("email")}
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Location / Suburb *</label>
                <input
                  {...register("location")}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  placeholder="e.g. North Shore, Auckland"
                />
                {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Property Type *</label>
                <select
                  {...register("propertyType")}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-sm"
                >
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
                {errors.propertyType && <p className="text-red-500 text-xs">{errors.propertyType.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Service Required *</label>
                <select
                  {...register("serviceRequired")}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-sm"
                >
                  {services.length > 0 ? (
                    services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Bathroom Tiling">Bathroom Tiling</option>
                      <option value="Kitchen Tiling">Kitchen Tiling</option>
                      <option value="Floor Tiling">Floor Tiling</option>
                      <option value="Wall Tiling">Wall Tiling</option>
                      <option value="Outdoor Tiling">Outdoor Tiling</option>
                    </>
                  )}
                  <option value="Other">Other Custom Work</option>
                </select>
                {errors.serviceRequired && <p className="text-red-500 text-xs">{errors.serviceRequired.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Approx. Area (Optional)</label>
                <input
                  {...register("approxArea")}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  placeholder="e.g. 25 sqm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Preferred Date / Timeline</label>
              <input
                {...register("preferredDate")}
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                placeholder="e.g. Next month, ASAP"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Project Description</label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                placeholder="Tell us about the space, current tile condition, design preferences..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl text-base font-semibold shadow-md shadow-blue-500/20 transition-all"
            >
              {isSubmitting ? "Submitting Inquiry..." : "Submit Quote Request"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="p-24 text-center">Loading form...</div>}>
      <QuoteForm />
    </Suspense>
  );
}
