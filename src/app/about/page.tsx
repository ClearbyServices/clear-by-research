import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { ExternalLink, CheckCircle2, ShieldCheck, Award } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export const revalidate = 0; // Ensures CRM updates appear instantly on the live page

export default async function AboutPage() {
  // Fetch all sections, ethics, values, and faculty directly from Supabase
  const [{ data: sectionsData }, { data: ethicsData }, { data: valuesData }, { data: facultyData }] = await Promise.all([
    supabase.from("about_sections").select("*").order("display_order", { ascending: true }),
    supabase.from("about_ethics").select("*").order("point_number", { ascending: true }),
    supabase.from("about_core_values").select("*").order("display_order", { ascending: true }),
    supabase.from("about_faculty").select("*").order("display_order", { ascending: true })
  ]);

  const sections = Object.fromEntries((sectionsData || []).map(s => [s.section_key, s]));

  // Safe mapping for faculty specializations and LinkedIn URLs
  const facultyList = (facultyData || []).map(f => ({
    name: f.name,
    title: f.credentials || f.title,
    experience: f.experience,
    specs: f.specializations || f.specs || [],
    linkedin_url: f.linkedin_url || "#"
  }));

  const coreValues = (valuesData && valuesData.length > 0 ? valuesData : [
    { title: "Expertise", description: "Research and methodological consultation tailored to your academic needs.", display_order: 1 },
    { title: "Confidentiality", description: "Careful handling of your research, data, documents, and intellectual property.", display_order: 2 },
    { title: "Integrity", description: "Responsible academic practices that respect originality and research ethics.", display_order: 3 },
    { title: "Clarity", description: "Clear explanations, practical feedback, and structured academic input.", display_order: 4 },
    { title: "Timeliness", description: "Reliable communication and delivery aligned with agreed timelines.", display_order: 5 }
  ]).map(v => ({
    title: v.title,
    desc: v.description,
    icon: v.title === "Expertise" ? "🎓" : v.title === "Confidentiality" ? "🔒" : v.title === "Integrity" ? "⚖️" : v.title === "Clarity" ? "💡" : "⏱️"
  }));

  const ethics = ethicsData && ethicsData.length > 0 ? ethicsData : [
    { id: 1, point_number: 1, title: "Academic Integrity", description: "Academic integrity is central to our approach. Our services are designed to encourage appropriate research practices, accurate attribution, responsible use of sources, and adherence to applicable university and institutional requirements." },
    { id: 2, point_number: 2, title: "Scholar Ownership", description: "The research thinking, interpretation, academic arguments, and final decisions remain with the scholar. We provide consultation and feedback; the scholar reviews, finalises, and submits the academic work." },
    { id: 3, point_number: 3, title: "Advisory and Consultative Role", description: "Our role is to provide academic input—not to replace the researcher. We help scholars understand research concepts, evaluate methodological choices, respond to feedback, and strengthen the presentation of their own work." },
    { id: 4, point_number: 4, title: "Transparent Engagement", description: "We believe scholars should clearly understand what a service includes before beginning an engagement. Our scope, deliverables, timelines, and responsibilities are communicated as clearly as possible." },
    { id: 5, point_number: 5, title: "Respect for University Requirements", description: "Research requirements differ across universities, disciplines, programmes, and supervisors. We encourage scholars to follow the applicable institutional guidelines and use our consultation within those requirements." }
  ];

  const hero = sections["hero"] || {};
  const foundingVision = sections["founding_vision"] || {};
  const approach = sections["approach"] || {};
  const visionFooter = sections["vision_footer"] || {};
  const ctaFooter = sections["cta_footer"] || {};

  return (
    <div className="w-full flex flex-col bg-brand-light text-brand-dark">
      
      {/* 1. HEADER & INTRO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <Link href="/" className="hover:text-brand-purple">HOME</Link> <span className="text-brand-gold">›</span> <span className="text-brand-purple">ABOUT US</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-purple mb-6">
          {hero.title || "About E-Clearby Research"}
        </h1>
        <div 
          className="text-gray-600 text-sm md:text-base leading-relaxed max-w-5xl space-y-4"
          dangerouslySetInnerHTML={{ __html: hero.body_html || "" }}
        />
      </section>

      {/* 2. OUR FOUNDING VISION SECTION */}
      <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="border-l-4 border-brand-gold pl-4 mb-6">
              <span className="text-xs font-bold text-brand-gold tracking-widest uppercase block mb-1">{foundingVision.badge || "A LEGACY OF SCHOLARLY SUPPORT"}</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple">{foundingVision.title || "Our Founding Vision"}</h2>
            </div>
            <div 
              className="text-gray-600 text-base leading-relaxed space-y-4 mb-8"
              dangerouslySetInnerHTML={{ __html: foundingVision.body_html || "" }}
            />
            <blockquote className="border-l-2 border-brand-purple/40 pl-4 py-2 italic text-sm text-gray-900 font-serif leading-relaxed bg-brand-gold/10 font-bold rounded-r-sm">
              &ldquo;Intellectual progress is the result of shared dedication. We don&apos;t just facilitate research; we nurture the next generation of global thought leaders.&rdquo;
            </blockquote>
          </div>
          <div className="w-full h-45 bg-gray-300 rounded-sm shadow-md overflow-hidden flex items-center justify-center relative">
            <div className="bg-white p-4 border border-gray-200 shadow-sm rounded-sm">
              <img 
                src="Vision.png" 
                alt="Clearby Research Vision" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR APPROACH TO ACADEMIC CONSULTANCY */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-brand-light">
       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="bg-white p-4 border border-gray-200 shadow-sm rounded-sm">
            <div className="bg-white p-4 border border-gray-200 shadow-sm rounded-sm">
              <img 
                src="About.png" 
                alt="Clearby Research About" 
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-6">
              {approach.title || "Our Approach to Academic Consultancy"}
            </h2>
            <div 
              className="text-gray-600 text-base leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: approach.body_html || "" }}
            />
          </div>
        </div>
      </section>

      {/* 4. OUR PROMISES & RESEARCH ETHICS COMMITMENT (DYNAMIC FROM SUPABASE) */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-2">Our Commitment to Research Ethics</h2>
          <div className="w-20 h-0.5 bg-brand-gold mx-auto mt-3"></div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-base text-gray-700">
            {ethics.map((item) => (
              <div key={item.id} className="border-b border-gray-200 pb-4">
                <p className="font-bold text-brand-purple text-lg mb-1">{item.point_number}. {item.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="bg-white p-4 border border-gray-200 shadow-sm rounded-sm">
            <img 
              src="Promises.png" 
              alt="Clearby Research Promises" 
            />
          </div>
        </div>
      </section>

      {/* 5. OUR CORE VALUES (DYNAMIC FROM SUPABASE) */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-brand-light">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-2">Our Core Values</h2>
          <div className="w-20 h-0.5 bg-brand-gold mx-auto mt-3"></div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {coreValues.map((val, idx) => (
            <div key={idx} className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm text-left flex flex-col justify-start">
              <div className="mb-4 text-2xl">{val.icon}</div>
              <h3 className="text-lg font-serif font-bold text-brand-purple mb-2">{val.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. OUR VISION */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-brand-purple mb-6">{visionFooter.title || "Our Vision"}</h2>
          <div 
            className="text-gray-600 text-sm md:text-base leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: visionFooter.body_html || "" }}
          />
        </div>
      </section>

      {/* 7. ELITE RESEARCH FACULTY (WITH CLICKABLE LINKEDIN CARDS) */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-brand-light border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-3">Elite Research Faculty</h2>
          <div className="w-20 h-0.5 bg-brand-gold mx-auto mb-4"></div>
          <p className="text-gray-600 text-xs md:text-sm max-w-2xl mx-auto">
            Our consultants are not just advisors; they are seasoned researchers, peer-reviewers, and academic pioneers with decades of cumulative experience in the ivory tower.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {facultyList.map((fac, idx) => (
            <a 
              key={idx} 
              href={fac.linkedin_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-8 border border-gray-200 rounded-sm text-center shadow-sm hover:border-brand-gold hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block cursor-pointer group"
            >
              <div className="w-20 h-20 bg-brand-light border border-brand-gold/30 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden shadow-sm">
                <img 
                  src="/Faculty.png" 
                  alt="Faculty" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-purple mb-1 group-hover:text-brand-gold transition-colors">{fac.name}</h3>
              <p className="text-xs text-brand-gold font-bold mb-3">{fac.title}</p>
              <p className="text-xs text-gray-500 mb-6 font-medium">{fac.experience}</p>
              
              <div className="border-t border-gray-200 pt-4 text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Credentials:</p>
                <p className="text-xs text-gray-700 mb-3 font-medium">{fac.title}</p>
                
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Specializations:</p>
                <ul className="space-y-1 text-xs text-gray-700">
                  {fac.specs.map((s: string, i: number) => <li key={i}>✓ {s}</li>)}
                </ul>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 8. FINAL BOTTOM CTA BANNER */}
      <section className="w-full py-20 bg-white border-t border-gray-200 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-4">
            {ctaFooter.title || "Ready to start your research journey?"}
          </h2>
          <p className="text-gray-600 text-xs md:text-sm mb-8 leading-relaxed">
            {ctaFooter.subtitle || "Whether you are at the proposal stage or finalizing your dissertation, our experts are ready to provide the guidance you need to succeed."}
          </p>
          <a 
            href="/contact" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-brand-purple text-white font-bold py-3.5 px-8 rounded-sm hover:bg-opacity-90 transition inline-block text-xs uppercase tracking-wider shadow-md mb-4"
          >
            Book Your Initial Consultation
          </a>
          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
            {ctaFooter.body_html || "Confidential • Professional • Academic-Focused"}
          </div>
        </div>
      </section>

    </div>
  );
}