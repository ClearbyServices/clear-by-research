import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight, Layers, Sparkles } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import ContactForm from "@/components/ContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import type { Metadata } from "next";
import BlogCarousel from "@/components/BlogCarousel";

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
    <div className="w-full flex flex-col bg-brand-light text-brand-dark overflow-x-hidden">
      
      {/* 1. HERO SECTION (Matched to Homepage styling) */}
      <section className="w-full bg-brand-purple text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7">
            {/* Breadcrumbs */}
            <div className="mb-6 text-[11px] font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
              <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link> 
              <span className="text-brand-gold">›</span> 
              <Link href="/services" className="hover:text-brand-gold transition-colors">Services</Link> 
              <span className="text-brand-gold">›</span> 
              <span className="text-brand-gold">{breadcrumbLabel}</span>
            </div>

            <span className="text-brand-gold text-xs font-bold tracking-widest mb-4 block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> {service.category}
            </span>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight mb-6">
              {service.h1}
            </h1>

            <div className="text-gray-300 text-sm md:text-base mb-8 leading-relaxed max-w-2xl prose prose-invert [&_a]:text-brand-gold [&_a]:underline [&_a:hover]:opacity-80">
              {service.introParagraphs.map((para, idx) => (
                <div key={idx} dangerouslySetInnerHTML={{ __html: para }} className="mb-4 last:mb-0" />
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <ContactForm variant="hero" />
          </div>
          
        </div>
      </section>
      
      {/* 2. STATS BAR (Matched to Homepage) */}
      <section className="w-full bg-[#24133A] text-white py-12 border-t border-b border-brand-gold/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { metric: "500+", label: "Scholars Assisted" },
            { metric: "50+", label: "Global Universities" },
            { metric: "4.9", label: "Client Rating" },
            { metric: "100%", label: "Confidentiality" }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-4 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-gold mb-2">{stat.metric}</h3>
              <p className="text-xs uppercase tracking-widest text-gray-300 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* 3. FEATURES SECTION (Matched to Homepage Services Grid styling) */}
      {service.featuresSection && service.featuresSection.list && service.featuresSection.list.length > 0 && (
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-brand-light">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-3">
              {service.featuresSection.title}
            </h2>
            {service.featuresSection.intro && (
              <p className="text-gray-600 text-sm max-w-2xl mx-auto">{service.featuresSection.intro}</p>
            )}
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.featuresSection.list.map((feat, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition rounded-sm flex flex-col justify-start group"
              >
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-5 group-hover:bg-brand-purple group-hover:text-white transition-colors duration-300">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif font-bold text-brand-purple mb-3 group-hover:text-brand-gold transition-colors">
                  {feat.title}
                </h3>
                <div 
                  className="text-xs text-gray-600 leading-relaxed [&_p]:mb-2 [&_a]:underline [&_a]:text-brand-purple" 
                  dangerouslySetInnerHTML={{ __html: feat.desc }} 
                />
              </div>
            ))}
          </div>

          {service.featuresSection.outro && (
            <p className="max-w-3xl mx-auto text-center text-sm text-gray-600 mt-12">
              {service.featuresSection.outro}
            </p>
          )}
        </section>
      )}

      {/* 4. SUB-SERVICES / MODULES SECTION */}
      {service.subServices && service.subServices.length > 0 && (
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-2">Specialized Modules</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-3">Sub-Services</h2>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.subServices.map((sub, idx) => (
              <div 
                key={idx} 
                className="bg-brand-light p-6 border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3 text-brand-gold">
                    <Layers className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Module 0{idx + 1}</span>
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

      {/* 5. COMPARISON TABLE */}
      {service.comparisonSection && service.comparisonSection.data && service.comparisonSection.data.length > 0 && (
        <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#24133A] text-white">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">{service.comparisonSection.title}</h2>
            <p className="text-gray-300 text-sm">See how our professional academic advisory compares to generic online alternatives.</p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto bg-brand-purple/50 rounded-sm border border-brand-gold/20 p-6 shadow-xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/20 text-brand-gold">
                  <th className="py-4 px-6 uppercase tracking-wider text-[11px] font-bold">Feature</th>
                  <th className="py-4 px-6 uppercase tracking-wider text-[11px] font-bold">Generic Online Services</th>
                  <th className="py-4 px-6 uppercase tracking-wider text-[11px] font-bold">E-Clearby Research Consulting</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-xs text-gray-200">
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

      {/* 6. FAQ (Using external Client Component) */}
      <FaqAccordion faqs={service.faqs} />

      {/* 7. CTA SECTION (Matched to Homepage Lamp CTA vibe, but built for Server Component compatibility) */}
      <section className="w-full py-24 bg-brand-purple text-white px-4 sm:px-6 lg:px-8 text-center border-t border-brand-gold/20">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold text-white tracking-widest uppercase block mb-3">
            Ready to Take the Next Step?
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            {service.ctaSection.title}
          </h2>
          <div 
            className="text-gray-300 text-sm max-w-2xl mx-auto mb-10 leading-relaxed [&_p]:mb-2 [&_a]:underline [&_a]:text-brand-gold"
            dangerouslySetInnerHTML={{ __html: service.ctaSection.text }}
          />
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/contact" 
              className="bg-brand-gold text-brand-purple font-bold py-3.5 px-8 rounded-sm hover:opacity-90 transition text-sm shadow-lg inline-flex items-center gap-2"
            >
              {service.ctaSection.buttonText} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 8. BLOG CAROUSEL */}
      <BlogCarousel />
            
    </div>
  );
}