import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight, Layers, Sparkles } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import type { Metadata } from "next";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface ServiceData {
  slug: string;
  title: string;
  subMenu?: string;
  category: string;
  h1: string;
  introParagraphs: string[];
  featuresSection: {
    title: string;
    intro?: string;
    list: { title: string; desc: string }[];
    outro?: string;
  };
  subServices?: { title: string; desc: string }[];
  comparisonSection?: {
    title: string;
    data: { feature: string; generic: string; clearby: string }[];
  };
  faqs?: { q: string; a: string }[];
  ctaSection: {
    title: string;
    text: string;
    buttonText: string;
  };
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).trim();

  const { data: service } = await supabase
    .from("services")
    .select("title, meta_description")
    .eq("slug", decodedSlug)
    .single();

  if (!service) {
    return { title: "Service Not Found | E-Clearby Research" };
  }

  return {
    title: service.title,
    description: service.meta_description,
    alternates: { 
      canonical: `https://www.clearbyresearch.com/services/${decodedSlug}` 
    },
  };
}

async function getService(slug: string): Promise<ServiceData | null> {
  const decodedSlug = decodeURIComponent(slug).trim();

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', decodedSlug)
    .single();

  let resolvedData = data;

  if (error || !resolvedData) {
    const { data: fallbackData } = await supabase
      .from('services')
      .select('*')
      .ilike('slug', `%${decodedSlug}%`)
      .limit(1);

    if (fallbackData && fallbackData.length > 0) {
      resolvedData = fallbackData[0];
    }
  }

  if (!resolvedData) {
    return null;
  }

  return {
    slug: resolvedData.slug,
    title: resolvedData.title,
    subMenu: resolvedData.sub_menu,
    category: resolvedData.category,
    h1: resolvedData.h1 || resolvedData.title,
    introParagraphs: resolvedData.intro_paragraphs || [],
    featuresSection: resolvedData.features_section || { title: "", list: [] },
    subServices: resolvedData.sub_services || [],
    comparisonSection: resolvedData.comparison_section,
    faqs: resolvedData.faqs || [],
    ctaSection: resolvedData.cta_section || { title: "Ready to Get Started?", text: "Connect with our experts today.", buttonText: "Enquire Now" },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = await getService(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const breadcrumbLabel = service.subMenu || service.h1 || service.title;

  return (
    <div className="w-full flex flex-col bg-brand-light text-brand-dark">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="mb-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
          <Link href="/" className="hover:text-brand-purple transition-colors">Home</Link> 
          <span className="text-brand-gold">›</span> 
          <Link href="/services" className="hover:text-brand-purple transition-colors">Services</Link> 
          <span className="text-brand-gold">›</span> 
          <span className="text-brand-purple">{breadcrumbLabel}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-widest mb-3 border border-brand-gold/20">
              <Sparkles className="w-3.5 h-3.5" />
              {service.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-purple mb-6 leading-tight tracking-tight">
              {service.h1}
            </h1>

            <div className="space-y-4 mb-8 max-w-2xl text-gray-600 text-base leading-relaxed [&_p]:mb-4 [&_a]:text-brand-purple [&_a]:underline [&_a:hover]:opacity-80">
              {service.introParagraphs.map((para, idx) => (
                <div 
                  key={idx} 
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-xl p-2 border border-slate-100 ring-1 ring-brand-purple/5">
              <ContactForm variant="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* REDESIGNED FEATURES SECTION: Modern Interactive Cards */}
      {service.featuresSection && service.featuresSection.list && service.featuresSection.list.length > 0 && (
        <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-3">
              {service.featuresSection.title}
            </h2>
            {service.featuresSection.intro && (
              <p className="text-gray-600 text-sm max-w-xl mx-auto leading-relaxed">{service.featuresSection.intro}</p>
            )}
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {service.featuresSection.list.map((feat, idx) => (
              <div 
                key={idx} 
                className="group bg-brand-light p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top subtle highlight border on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold to-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-purple group-hover:text-white transition-colors duration-300">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-brand-purple mb-3 group-hover:text-brand-gold transition-colors duration-300">
                    {feat.title}
                  </h3>
                  <div 
                    className="text-xs text-gray-600 leading-relaxed [&_p]:mb-2 [&_a]:underline [&_a]:text-brand-purple" 
                    dangerouslySetInnerHTML={{ __html: feat.desc }} 
                  />
                </div>
              </div>
            ))}
          </div>

          {service.featuresSection.outro && (
            <p className="max-w-3xl mx-auto text-center text-sm text-gray-600 mt-16 relative z-10">
              {service.featuresSection.outro}
            </p>
          )}
        </section>
      )}

      {/* Sub-Services Section */}
{service.subServices && service.subServices.length > 0 && (
  <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
    <div className="max-w-7xl mx-auto text-center mb-16">
      <span className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-2">Specialized Modules</span>
      <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-3">Sub-Services</h2>
    </div>

    {/* Change lg:grid-cols-4 to lg:grid-cols-3 here */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {service.subServices.map((sub, idx) => (
        <div 
          key={idx} 
          className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-brand-purple/30 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-3 text-brand-gold">
              <Layers className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Module 0{idx + 1}</span>
            </div>
            <h3 className="font-serif font-bold text-brand-purple text-base mb-2 group-hover:text-brand-gold transition-colors">
              {sub.title}
            </h3>
            <div 
              className="text-xs text-gray-600 leading-relaxed [&_p]:mb-2 [&_a]:underline [&_a]:text-brand-purple" 
              dangerouslySetInnerHTML={{ __html: sub.desc }} 
            />
          </div>
        </div>
      ))}
    </div>
  </section>
)}

      {/* COMPARISON TABLE */}
      {service.comparisonSection && service.comparisonSection.data && service.comparisonSection.data.length > 0 && (
        <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-brand-purple text-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">{service.comparisonSection.title}</h2>
            <p className="text-gray-300 text-sm">See how our professional academic advisory compares to generic online alternatives.</p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-2xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20 text-brand-gold">
                  <th className="py-4 px-6 uppercase tracking-wider text-xs font-bold">Feature</th>
                  <th className="py-4 px-6 uppercase tracking-wider text-xs font-bold">Generic Online Services</th>
                  <th className="py-4 px-6 uppercase tracking-wider text-xs font-bold">E-Clearby Research Consulting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs md:text-sm text-gray-200">
                {service.comparisonSection.data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-bold text-white">{row.feature}</td>
                    <td className="py-4 px-6 text-gray-400">
                      <div dangerouslySetInnerHTML={{ __html: row.generic }} />
                    </td>
                    <td className="py-4 px-6 text-brand-gold font-semibold">
                      <div dangerouslySetInnerHTML={{ __html: row.clearby }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <FaqAccordion faqs={service.faqs} />

      {/* CTA SECTION */}
      <section className="w-full py-24 bg-brand-purple text-white px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{service.ctaSection.title}</h2>
          <div 
            className="text-gray-300 text-sm max-w-xl mx-auto mb-8 leading-relaxed [&_p]:mb-2 [&_a]:underline [&_a]:text-brand-gold"
            dangerouslySetInnerHTML={{ __html: service.ctaSection.text }}
          />
          <a href="/contact" className="bg-brand-gold text-brand-purple font-bold py-3.5 px-8 rounded-xl hover:opacity-90 transition-all inline-flex items-center gap-2 text-xs uppercase tracking-wider shadow-lg">
            {service.ctaSection.buttonText} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}