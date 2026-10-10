import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ServicesFilters from "@/components/ServicesFilters";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface ServiceRecord {
  slug: string;
  title: string;
  sub_menu?: string;
  category?: string;
  h1?: string;
  intro_paragraphs?: string[];
  menu_order?: number;
}

async function getServices() {
  const { data, error } = await supabase
    .from('services')
    .select('slug, title, sub_menu, category, h1, intro_paragraphs, menu_order')
    .order('menu_order', { ascending: true });

  if (error) {
    console.error("Error fetching services Details:", JSON.stringify(error, null, 2));
    return [];
  }

  if (!data) return [];

  return (data as ServiceRecord[]).map((item) => {
    const rawDesc = item.intro_paragraphs?.[0] || "Professional academic advisory service tailored to your research milestone.";
    const cleanDesc = rawDesc.replace(/<\/?[^>]+(>|$)/g, "");
    
    // Character limit for uniform card height
    const truncatedDesc = cleanDesc.length > 110 ? cleanDesc.substring(0, 110) + "..." : cleanDesc;

    return {
      slug: item.slug,
      title: item.sub_menu || item.h1 || item.title,
      category: item.category || "General",
      desc: truncatedDesc,
    };
  });
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="w-full flex flex-col bg-brand-light">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-widest mb-4 border border-brand-gold/20">
          <Sparkles className="w-3.5 h-3.5" /> Academic Advisory Suite
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-purple mb-6 tracking-tight">
          Our Services
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-base">
          Comprehensive academic support, tailored to every milestone of your scholarly journey. From conceptualizing a research topic to refining final manuscripts for publication, our specialists ensure technical rigor and intellectual depth.
        </p>
      </section>

      {/* Interactive Filters */}
      <ServicesFilters services={services} />

      {/* HIGH-END SERVICE CARDS GRID WITH ZOOM & FULL-CARD CLICK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link 
              key={service.slug} 
              href={`/services/${service.slug}`}
              className="group bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer"
            >
              {/* Top gradient highlight on hover */}
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
          ))}
        </div>
      </section>

      {/* CONSULTATION BANNER */}
      <section className="w-full py-20 bg-brand-purple px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple via-brand-purple/90 to-black/30 pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-serif font-bold text-white mb-2">
              Not sure which service you need?
            </h2>
            <p className="text-gray-300 text-sm">Talk to our expert academic consultants today.</p>
          </div>
          <Link href="/contact" className="bg-brand-gold text-brand-purple font-bold py-3.5 px-8 rounded-xl hover:opacity-90 transition-all shadow-lg inline-flex items-center gap-2 text-xs uppercase tracking-wider whitespace-nowrap">
            Schedule a Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}