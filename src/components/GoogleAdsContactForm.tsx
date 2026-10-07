"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface ServiceItem {
  sub_menu?: string;
  menu_order?: number;
}

export default function GoogleAdsContactForm() {
  const router = useRouter();
  const [subMenuOptions, setSubMenuOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  // Fetch sub_menu data ordered by menu_order from Supabase on mount
  useEffect(() => {
    async function fetchSubMenu() {
      const { data, error } = await supabase
        .from('services')
        .select('sub_menu, menu_order')
        .order('menu_order', { ascending: true });

      if (!error && data && data.length > 0) {
        const options: string[] = [];

        data.forEach((item: ServiceItem) => {
          if (item.sub_menu && !options.includes(item.sub_menu)) {
            options.push(item.sub_menu);
          }
        });

        setSubMenuOptions(options);

        if (options.length > 0) {
          setFormData((prev) => ({
            ...prev,
            service: options[0],
          }));
        }
      }
    }

    fetchSubMenu();
  }, []);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const submissionData = {
      name: formData.name,
      phone: `${formData.countryCode} ${formData.phone}`,
      email: formData.email,
      service: formData.service,
      message: formData.message,
      source: "Google Ads",
      priority: "High",
      status: "Fresh",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        router.push("/thank-you");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white text-brand-dark p-8 rounded-sm shadow-2xl relative">
      <h3 className="text-2xl font-serif font-bold mb-1">Get Expert Guidance</h3>
      <p className="text-xs text-gray-500 mb-6">Start your journey to a successful PhD today.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Name</label>
          <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-brand-purple rounded-sm placeholder-gray-400 bg-white" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Phone Number</label>
          <div className="flex">
            <select 
              name="countryCode" 
              value={formData.countryCode} 
              onChange={handleChange}
              className="border border-r-0 border-gray-300 bg-gray-50 text-gray-700 text-xs sm:text-sm rounded-l-sm font-medium px-2 py-3 focus:outline-none focus:border-brand-purple"
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+61">🇦🇺 +61</option>
              <option value="+971">🇦🇪 +971</option>
            </select>
            <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="7020112146" className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-brand-purple rounded-r-sm placeholder-gray-400 bg-white" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Email</label>
          <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="j.doe@university.edu" className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-brand-purple rounded-sm placeholder-gray-400 bg-white" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Select Services</label>
          <select name="service" value={formData.service} onChange={handleChange} className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-brand-purple rounded-sm bg-white text-gray-700">
            <option value="" disabled>Select a service...</option>
            {subMenuOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Message</label>
          <textarea required name="message" value={formData.message} onChange={handleChange} rows={3} placeholder="Tell us about your research..." className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-brand-purple rounded-sm resize-none placeholder-gray-400 bg-white"></textarea>
        </div>
        {status === "error" && <p className="text-red-500 text-xs">Failed to send. Please try again.</p>}
        <button type="submit" disabled={status === "loading"} className="w-full bg-brand-purple text-white font-bold py-3 text-sm hover:bg-opacity-90 transition rounded-sm shadow-md">
          {status === "loading" ? "SUBMITTING..." : "SUBMIT REQUEST"}
        </button>
      </form>
    </div>
  );
}