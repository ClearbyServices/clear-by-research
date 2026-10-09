import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
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

    return {
      slug: item.slug,
      title: item.sub_menu || item.h1 || item.title,
      category: item.category || "General",
      desc: cleanDesc,
    };
  });
}

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="w-full flex flex-col bg-brand-light">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-purple mb-6">
          Services
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Comprehensive academic support, tailored to every milestone of your scholarly journey. From conceptualizing to transforming a research topic, to refining final manuscripts for publication, our specialists ensure technical rigor and intellectual depth.
        </p>
      </section>

      <ServicesFilters services={services} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 border border-gray-100 shadow-sm rounded-sm">
            <h3 className="text-2xl font-serif font-bold text-brand-purple mb-4 flex items-center gap-3">
              Consulting & Mentorship
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Strategic guidance designed to build your research capacity. We provide high-level mentorship on theoretical frameworks, methodological choices, and academic planning.
            </p>
            <ul className="space-y-2 text-sm text-gray-700 font-medium">
              <li>Strategic Academic Planning</li>
              <li>Theoretical Justification</li>
              <li>Defense Rehearsal</li>
            </ul>
          </div>
          <div className="bg-white p-10 border border-gray-100 shadow-sm rounded-sm">
            <h3 className="text-2xl font-serif font-bold text-brand-purple mb-4 flex items-center gap-3">
              Hands-on Support
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Tactical execution and structured support. Our team assists with data processing, formatting to university standards, and structural editing for international publication.
            </p>
            <ul className="space-y-2 text-sm text-gray-700 font-medium">
              <li>Data Coding & Analysis</li>
              <li>Thesis Formatting</li>
              <li>Literature Synthesis</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-brand-purple px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-3xl font-serif font-bold text-white">
            Not sure which service you need? Talk to our consultants.
          </h2>
          <Link href="/contact" className="bg-brand-gold text-brand-purple font-bold py-3 px-8 rounded-sm hover:opacity-90 transition whitespace-nowrap">
            Schedule a Free Consultation →
          </Link>
        </div>
      </section>
    </div>
  );
}