"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import { LampContainer } from "@/components/ui/lamp";
import { supabase } from "@/lib/supabaseClient";
import BlogCarousel from "@/components/BlogCarousel"; // <-- Imported the new Blog Carousel

interface HeroContent {
  badge: string;
  title: string;
  description: string;
  cta_text: string;
  cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
}

interface StatItem {
  id?: string | number;
  metric_number: string;
  label: string;
}

interface ServiceItem {
  id?: string | number;
  title: string;
  description: string;
  link_url?: string;
  badge?: string;
}

interface WhyChooseItem {
  id?: string | number;
  point_text: string;
}

interface AboutPreview {
  title: string;
  body_html: string;
}

interface ProcessStep {
  id?: string | number;
  step_number: string;
  stage_label?: string;
  title: string;
  description: string;
}

interface FacultyMember {
  id?: string | number;
  name: string;
  credentials: string;
  experience: string;
  specializations: string[];
}

interface DisciplineCategory {
  id?: string | number;
  category_title: string;
  disciplines_list: string[];
}

interface FaqItem {
  id?: string | number;
  question: string;
  answer: string;
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();

  // Dynamic Content States from Supabase with Fallbacks
  const [hero, setHero] = useState<HeroContent>({
    badge: "PHD RESEARCH GUIDANCE",
    title: "PhD Research Guidance from Expert Consultants: From Topic Consultation to Successful Thesis Defence",
    description: "Get personalized coaching at every stage of your doctoral research...",
    cta_text: "Schedule Free Consultation",
    cta_link: "/contact",
    secondary_cta_text: "Explore Our Services",
    secondary_cta_link: "/services"
  });
  const [stats, setStats] = useState<StatItem[]>([]);
  const [servicesList, setServicesList] = useState<ServiceItem[]>([]);
  const [whyChoose, setWhyChoose] = useState<WhyChooseItem[]>([]);
  const [about, setAbout] = useState<AboutPreview>({
    title: "About E-Clearby Research Consulting Pvt Ltd",
    body_html: `
      <p>In the world of academia, research is the foundation upon which knowledge is built and innovations are forged. However, the path to successful research — especially at advanced levels such as PhDs — can be an arduous and intricate journey. This is where E-Clearby Research Consulting Pvt. Ltd. emerges as a beacon of expertise and support, dedicated to guiding scholars toward academic excellence.</p>
      <p class="mt-4">As trusted PhD Topics Consultants, we help you select a research direction that is original and achievable; through expert guidance in Thesis Writing, we support you in structuring and strengthening your own work chapter by chapter.</p>
    `
  });
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [facultyList, setFacultyList] = useState<FacultyMember[]>([]);
  const [disciplines, setDisciplines] = useState<DisciplineCategory[]>([
    {
      category_title: "Business, Management & Commerce",
      disciplines_list: ["Business Administration", "Marketing", "Finance & Accounting", "Human Resource Management", "Organizational Behavior", "Economics"]
    },
    {
      category_title: "Engineering & Technology",
      disciplines_list: ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Electronics & Communication", "Chemical Engineering", "Robotics & Automation"]
    },
    {
      category_title: "Computer Science, Data & AI",
      disciplines_list: ["Computer Science", "Information Technology", "Data Science", "Artificial Intelligence & Machine Learning", "Cybersecurity", "Information Systems"]
    },
    {
      category_title: "Medical, Nursing & Allied Health",
      disciplines_list: ["Medicine", "Nursing", "Public Health", "Pharmacy", "Physiotherapy", "Biomedical Sciences"]
    },
    {
      category_title: "Life Sciences & Biotechnology",
      disciplines_list: ["Biotechnology", "Microbiology", "Biochemistry", "Genetics", "Molecular Biology", "Bioinformatics"]
    },
    {
      category_title: "Science & Environment",
      disciplines_list: ["Mathematics", "Statistics", "Physics", "Chemistry", "Environmental Science", "Sustainable Development"]
    },
    {
      category_title: "Social Sciences & Education",
      disciplines_list: ["Psychology", "Sociology", "Economics", "Political Science", "Education", "Social Work"]
    },
    {
      category_title: "Humanities, Languages & Literature",
      disciplines_list: ["English Literature", "History", "Philosophy", "Linguistics", "Languages", "Cultural Studies"]
    },
    {
      category_title: "Law, Policy & Governance",
      disciplines_list: ["Law", "Public Administration", "Public Policy", "Governance", "Criminology", "International Relations"]
    }
  ]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);

  useEffect(() => {
    async function fetchHomePageData() {
      try {
        const [
          heroRes,
          statsRes,
          servicesRes,
          whyRes,
          aboutRes,
          processRes,
          facultyRes,
          discRes,
          faqRes
        ] = await Promise.all([
          supabase.from("home_hero").select("*").limit(1).maybeSingle(),
          supabase.from("home_stats").select("*").order("display_order", { ascending: true }),
          supabase.from("home_services").select("*").order("display_order", { ascending: true }),
          supabase.from("home_why_choose").select("*").order("display_order", { ascending: true }),
          supabase.from("home_about_preview").select("*").limit(1).maybeSingle(),
          supabase.from("home_process").select("*").order("display_order", { ascending: true }),
          supabase.from("about_faculty").select("*").order("display_order", { ascending: true }),
          supabase.from("home_disciplines").select("*").order("display_order", { ascending: true }),
          supabase.from("home_faqs").select("*").order("display_order", { ascending: true })
        ]);

        if (heroRes.data) setHero(heroRes.data);
        if (statsRes.data && statsRes.data.length > 0) setStats(statsRes.data);
        if (servicesRes.data && servicesRes.data.length > 0) setServicesList(servicesRes.data);
        if (whyRes.data && whyRes.data.length > 0) setWhyChoose(whyRes.data);
        if (aboutRes.data && aboutRes.data.body_html) setAbout(aboutRes.data);
        if (processRes.data && processRes.data.length > 0) setProcessSteps(processRes.data);
        if (facultyRes.data && facultyRes.data.length > 0) setFacultyList(facultyRes.data);
        if (discRes.data && discRes.data.length > 0) setDisciplines(discRes.data);
        if (faqRes.data && faqRes.data.length > 0) setFaqs(faqRes.data);
      } catch (err) {
        console.error("Error fetching homepage content:", err);
      }
    }
    fetchHomePageData();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const categories = [
    "All",
    "PhD",
    "Master&apos;s",
    "Research & Publication",
    "Data Analysis",
    "Implementation / Simulation",
    "Academic Support"
  ];

  return (
    <main className="flex flex-col w-full bg-brand-light text-brand-dark overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="w-full bg-brand-purple text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <span className="text-brand-gold text-xs font-bold tracking-widest mb-4 block">
              | {hero.badge}
            </span>
            <h1 className="text-3xl md:text-xl lg:text-5xl font-serif font-bold leading-tight mb-6">
              {hero.title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: hero.description }} className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-2xl prose prose-invert" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-xs md:text-sm text-brand-gold mb-10 font-medium">
              <div className="flex items-center gap-2">✓ END-TO-END PhD GUIDANCE</div>
              <div className="flex items-center gap-2">✓ EXPERT REVIEW & REFINEMENT</div>
              <div className="flex items-center gap-2">✓ ONE-TO-ONE EXPERT CONSULTATION</div>
              <div className="flex items-center gap-2">✓ THESIS DEFENCE PREPARATION</div>
              <div className="flex items-center gap-2">✓ PUBLICATION & JOURNAL GUIDANCE</div>
              <div className="flex items-center gap-2">✓ CONFIDENTIAL & PROFESSIONAL SERVICE</div>
            </div>

            <div className="flex flex-wrap gap-4 items-center mb-6">
              <motion.a 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={hero.cta_link || "/contact"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-brand-purple border border-white/30 text-white font-bold py-3.5 px-8 rounded-sm hover:bg-white/10 transition shadow-lg text-sm"
              >
                {hero.cta_text}
              </motion.a>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <a href={hero.secondary_cta_link || "/services"} className="inline-block bg-white text-brand-purple border border-white font-bold py-3.5 px-8 rounded-sm hover:bg-gray-100 transition shadow-lg text-sm">
                  {hero.secondary_cta_text}
                </a>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <ContactForm variant="hero" />
          </motion.div>

        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="w-full bg-[#24133A] text-white py-12 border-t border-b border-brand-gold/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-gold mb-1">{stat.metric_number}</h3>
              <p className="text-xs uppercase tracking-widest text-gray-300 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SERVICES GRID */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-brand-light">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-3">
            PhD Research Consultation, Thesis &amp; Dissertation Coaching Services
          </h2>
          <p className="text-gray-600 text-sm">Structured guidance across every phase of your research journey.</p>
        </div>

        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-3 mb-16">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (cat === "All") {
                  router.push('/services');
                } else {
                  router.push(`/services?category=${encodeURIComponent(cat)}`);
                }
              }}
              className="px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 border bg-white text-gray-700 border-gray-300 hover:border-brand-purple hover:text-brand-purple hover:scale-105"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((srv, idx) => (
            <motion.div 
              key={srv.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-xl transition rounded-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-serif font-bold text-brand-purple mb-3">{srv.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: srv.description }} className="text-xs text-gray-600 mb-6 leading-relaxed" />
              </div>
              <a href={srv.link_url || "/services"} className="text-xs font-bold text-brand-gold uppercase tracking-wider hover:text-brand-purple transition inline-flex items-center gap-1 group">
                {srv.badge || "Learn More"} <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-purple mb-8 leading-tight">
              Why Choose E-Clearby Research for Your PhD Research Guidance
            </h2>
            <div className="space-y-6 text-base md:text-lg text-gray-700">
              {whyChoose.map((item, i) => (
                <div key={item.id || i} className="border-b border-gray-200 pb-5 flex items-center gap-3.5 transition-colors hover:text-brand-purple font-medium">
                  <span className="text-brand-gold font-bold text-xl">✓</span>
                  <span dangerouslySetInnerHTML={{ __html: item.point_text }} />
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-4 border border-gray-200 shadow-sm rounded-sm"
          >
            <Image src="/Why-Choose.png" alt="Clearby Research Why-Choose" width={1200} height={800} className="w-full h-auto object-cover" />
          </motion.div>
        </div>
      </section>

      {/* 5. ABOUT COMPANY */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-brand-light">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="bg-white p-4 border border-gray-200 shadow-sm rounded-sm">
            <Image src="/About.png" alt="Clearby Research About" width={1200} height={800} className="w-full h-auto object-cover" />
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-purple mb-6 leading-tight">
              {about.title}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: about.body_html }} className="text-gray-700 text-base md:text-lg leading-relaxed space-y-6" />
          </div>
        </div>
      </section>

      {/* 6. OUR PROMISES & RESEARCH ETHICS */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-2">Our Promises &amp; Research Ethics Commitment</h2>
          <div className="w-20 h-0.5 bg-brand-gold mx-auto mt-3"></div>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8 text-gray-700">
            {[
              { title: "1. Academic Integrity is Non-Negotiable:", desc: "All guidance maintains university plagiarism standards. No shortcuts, no academic dishonesty. Your work represents your authentic research." },
              { title: "2. You Maintain Full Authorship:", desc: "You write your thesis; we provide feedback. We never write for you or submit work in your name. Your intellectual contributions remain 100% yours." },
              { title: "3. Our Role is Advisory Only:", desc: "We guide your thinking, not replace it. We coach you to do better work, not do it for you. We&apos;re like having an expert mentor, not a co-author." },
              { title: "4. Transparent Process:", desc: "Clear expectations from day one. What we will and won't do, spelled out. Regular check-ins to ensure alignment with your goals." },
              { title: "5. University Compliance:", desc: "We follow all university guidelines. Our services don't violate academic policies. We prepare students for legitimate academic success." }
            ].map((promise, i) => (
              <div key={i} className="flex items-start gap-4 pb-6 border-b border-gray-200">
                <span className="text-brand-gold text-xl mt-0.5 shrink-0">✓</span>
                <div>
                  <p className="font-bold text-brand-purple text-lg mb-1.5">{promise.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{promise.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 bg-white p-3 border border-gray-200 shadow-sm rounded-sm">
            <Image src="/Promises.png" alt="Clearby Research Promises" width={1200} height={800} className="w-full h-auto object-cover rounded-sm" />
          </div>
        </div>
      </section>

      {/* 7. 8-STAGE GUIDANCE PROCESS */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-brand-light">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-3">Our PhD Research Guidance Process</h2>
          <p className="text-gray-600 text-sm">A rigorous, step-by-step methodology designed to ensure academic excellence and research integrity.</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((st, idx) => (
            <motion.div 
              key={st.id || idx}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 border border-gray-200 rounded-sm relative flex flex-col justify-between shadow-sm hover:shadow-md transition"
            >
              <div>
                <span className="text-3xl font-serif font-bold text-brand-gold/40 absolute top-4 right-4">{st.step_number}</span>
                <span className="text-[10px] font-bold text-brand-gold tracking-widest block mb-1">{st.stage_label || "STAGE"} {idx + 1}</span>
                <h3 className="text-lg font-serif font-bold text-brand-purple mb-3">{st.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: st.description }} className="text-xs text-gray-600 leading-relaxed" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. ELITE RESEARCH FACULTY */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-3">Elite Research Faculty</h2>
          <div className="w-20 h-0.5 bg-brand-gold mx-auto mb-4"></div>
          <p className="text-gray-600 text-xs md:text-sm max-w-2xl mx-auto">
            Our consultants are not just advisors; they are seasoned researchers, peer-reviewers, and academic pioneers with decades of cumulative experience in the ivory tower.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {facultyList.map((fac, idx) => (
            <motion.div 
              key={fac.id || idx}
              whileHover={{ y: -5 }}
              className="bg-brand-light p-8 border border-gray-200 rounded-sm text-center shadow-sm hover:shadow-md transition"
            >
              <div className="w-20 h-20 bg-white border border-brand-gold/30 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden shadow-sm">
                <Image src="/Faculty.png" alt="Faculty" width={80} height={80} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-purple mb-1">{fac.name}</h3>
              <p className="text-xs text-brand-gold font-bold mb-3">{fac.credentials}</p>
              <p className="text-xs text-gray-500 mb-6 font-medium">{fac.experience}</p>
              
              <div className="border-t border-gray-200 pt-4 text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Credentials:</p>
                <p className="text-xs text-gray-700 mb-3 font-medium">{fac.credentials}</p>
                
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Specializations:</p>
                <ul className="space-y-1 text-xs text-gray-700">
                  {Array.isArray(fac.specializations) && fac.specializations.map((s: string, i: number) => <li key={i}>✓ {s}</li>)}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. ACADEMIC SUBJECTS */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-brand-light">
        <div className="max-w-7xl mx-auto mb-16 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-4">
            PhD Research Guidance Across Academic Disciplines
          </h2>
          <div className="w-24 h-0.5 bg-brand-gold mx-auto mb-6"></div>
          <p className="text-gray-600 text-sm md:text-base max-w-4xl mx-auto leading-relaxed">
            We provide ethical research guidance, consultation, and academic support to doctoral scholars and researchers across a wide range of disciplines—from business and engineering to health sciences, social sciences, life sciences, humanities, and technology.
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12">
          {disciplines.map((col, idx) => (
            <div key={col.id || idx}>
              <h4 className="font-serif font-bold text-brand-purple mb-4 uppercase tracking-wider text-sm md:text-base">
                {col.category_title}
              </h4>
              <ul className="space-y-3 text-gray-700 text-sm">
                {Array.isArray(col.disciplines_list) && col.disciplines_list.map((item: string, i: number) => (
                  <li key={i} className="hover:text-brand-purple transition-colors">· {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200 text-sm italic text-gray-600 text-center">
          Can&apos;t find your discipline? We work across 40+ academic fields. <a href="/contact" className="text-brand-gold font-semibold not-italic hover:underline">Contact us</a> to discuss your specialized area.
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-brand-purple text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={faq.id || idx} className="border border-gray-200 rounded-sm bg-brand-light overflow-hidden transition-all">
                <button onClick={() => toggleFaq(idx)} className="w-full px-6 py-4 text-left font-serif font-bold text-brand-purple flex justify-between items-center text-sm">
                  <span>{faq.question}</span>
                  <span className="text-brand-gold">{openFaq === idx ? "▲" : "▼"}</span>
                </button>
                {openFaq === idx && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="px-6 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-200 pt-3"
                  >
                    <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG CAROUSEL */}
      <BlogCarousel />

      {/* 11. FINAL BOTTOM CTA BANNER WITH LAMP EFFECT */}
      <LampContainer>
        <motion.div 
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-center max-w-4xl mx-auto px-4"
        >
          <span className="text-xs font-bold text-white tracking-widest uppercase block mb-3">
            Ready to Start Your PhD Thesis Guidance Journey?
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Take the Next Step Toward Thesis Success
          </h2>
          <p className="text-gray-300 text-sm max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 500+ doctoral scholars who accelerated their research with expert guidance. Your first consultation is free—no obligation, no sales pressure. Just expert advice tailored to your situation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a 
              href="/contact" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-brand-gold text-brand-purple font-bold py-3.5 px-8 rounded-sm hover:opacity-90 transition text-sm shadow-lg"
            >
              Schedule Your Free Consultation
            </a>
            <a 
              href="/service" 
              className="border border-white/30 text-white font-bold py-3.5 px-8 rounded-sm hover:bg-white/10 transition text-sm"
            >
              Explore Services
            </a>
          </div>
          <p className="text-xs text-brand-gold font-medium tracking-wide">
            ✓ 92% OF OUR CLIENTS&apos; THESES ARE APPROVED ON FIRST SUBMISSION
          </p>
        </motion.div>
      </LampContainer>

    </main>
  );
}