"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceItem {
  slug: string;
  title: string;
  category: string;
  desc: string;
}

export default function ServicesFilters({ services }: { services: ServiceItem[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Extract unique categories safely
  const uniqueCategories = Array.from(new Set(services.map(s => s.category).filter(Boolean)));
  const filters = ['All', ...uniqueCategories];

  // Strictly filter services by matching category case-insensitively
  const filteredServices = activeFilter === 'All' 
    ? services 
    : services.filter(service => service.category?.trim().toLowerCase() === activeFilter.trim().toLowerCase());

  // Group services by category when "All" is active to create clean divided sections
  const groupedServices = uniqueCategories.reduce((acc: { [key: string]: ServiceItem[] }, cat) => {
    acc[cat] = services.filter(s => s.category?.trim().toLowerCase() === cat.trim().toLowerCase());
    return acc;
  }, {});

  return (
    <>
      {/* CATEGORY FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map((filter, idx) => (
            <button 
              key={idx} 
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-xs font-semibold border rounded-xl transition-all cursor-pointer ${
                activeFilter === filter 
                  ? 'bg-brand-purple text-white border-brand-purple shadow-md' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-brand-purple hover:text-brand-purple'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* SERVICES DISPLAY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {activeFilter === 'All' ? (
          /* "ALL" VIEW: Grouped by category with visual dividers between sections */
          <div className="space-y-16">
            {Object.entries(groupedServices).map(([category, catServices], catIdx) => (
              categoryItems(category, catServices, catIdx)
            ))}
          </div>
        ) : (
          /* SPECIFIC FILTER VIEW: Strictly shows only the selected category items */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, idx) => renderCard(service, idx))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-500 text-sm bg-white rounded-2xl border border-slate-200">
                No services found for this category.
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}

// Helper function to render individual service cards
function renderCard(service: ServiceItem, idx: number) {
  return (
    <Link 
      key={idx} 
      href={`/services/${service.slug}`}
      className="group bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        <div className="mb-4">
          <span className="inline-block bg-brand-purple/5 text-brand-purple text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-brand-purple/10">
            {service.category}
          </span>
        </div>

        <h3 className="text-xl font-serif font-bold text-brand-purple mb-3 group-hover:text-brand-gold transition-colors duration-300 line-clamp-2">
          {service.title}
        </h3>
        
        <p className="text-xs text-gray-600 leading-relaxed mb-6">
          {service.desc}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-purple group-hover:text-brand-gold transition-colors">
        <span>Learn More</span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
      </div>
    </Link>
  );
}

// Helper function to render category groups with dividing lines
function categoryItems(category: string, catServices: ServiceItem[], index: number) {
  if (catServices.length === 0) return null;

  return (
    <div key={category} className={index > 0 ? "pt-12 border-t border-slate-200/80" : ""}>
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-serif font-bold text-brand-purple tracking-tight">{category}</h2>
        <div className="flex-1 h-px bg-slate-200" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {catServices.map((service, idx) => renderCard(service, idx))}
      </div>
    </div>
  );
}