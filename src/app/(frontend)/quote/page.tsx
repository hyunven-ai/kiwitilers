"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";

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

export default function QuotePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
        <h1 className="text-3xl font-outfit font-bold text-slate-900 mb-2">Request a Free Quote</h1>
        <p className="text-slate-600 mb-8">Tell us about your project and we'll get back to you with a detailed estimate.</p>

        {isSuccess ? (
          <div className="bg-green-50 text-green-800 p-6 rounded-2xl text-center">
            <h2 className="text-xl font-bold mb-2">Thank You!</h2>
            <p>Your quote request has been submitted successfully. We will contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <input {...register("fullName")} className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="John Doe" />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input {...register("phoneNumber")} className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="021 123 4567" />
                {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <input type="email" {...register("email")} className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="john@example.com" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Location</label>
                <input {...register("location")} className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="e.g. North Shore, Auckland" />
                {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Property Type</label>
                <select {...register("propertyType")} className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white">
                  <option value="">Select type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                </select>
                {errors.propertyType && <p className="text-red-500 text-sm">{errors.propertyType.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Service Required</label>
              <select {...register("serviceRequired")} className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white">
                <option value="">Select service</option>
                <option value="Bathroom Tiling">Bathroom Tiling</option>
                <option value="Kitchen Tiling">Kitchen Tiling</option>
                <option value="Floor Tiling">Floor Tiling</option>
                <option value="Wall Tiling">Wall Tiling</option>
                <option value="Outdoor Tiling">Outdoor Tiling</option>
                <option value="Other">Other</option>
              </select>
              {errors.serviceRequired && <p className="text-red-500 text-sm">{errors.serviceRequired.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Project Description</label>
              <textarea {...register("description")} rows={4} className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Tell us more about your project..." />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl text-lg font-medium">
              {isSubmitting ? "Submitting..." : "Submit Quote Request"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
