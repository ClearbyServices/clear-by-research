"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import { LampContainer } from "@/components/ui/lamp";


export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const router = useRouter();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const categories = [
    "All",
    "PhD",
    "Master's",
    "Research & Publication",
    "Data Analysis",
    "Implementation / Simulation",
    "Academic Support"
  ];

  const servicesList = [
    { title: "Topic Consultation", desc: "Help select and refine your research topic", category: "PhD", action: "Consult", link: "/services/phd-topic-consultation", icon: "💡" },
    { title: "Proposal Development", desc: "Develop compelling research proposals", category: "PhD", action: "Get Help", link: "/services/research-proposal-development", icon: "📄" },
    { title: "Literature Review", desc: "Comprehensive review of existing research and knowledge gaps", category: "PhD", action: "Learn More", link: "/services/literature-review-writing-service", icon: "📖" },
    { title: "Research Manuscript Development", desc: "Help select and refine your research", category: "Research & Publication", action: "Consult", link: "/services/research-paper-support", icon: "📑" },
    { title: "Data Analysis", desc: "Support for quantitative/qualitative analysis", category: "Data Analysis", action: "Learn More", link: "/services/phd-thesis-data-analysis-service", icon: "📊" },
    { title: "Expert Implementation", desc: "Hands-on support for implementation", category: "Implementation / Simulation", action: "Consult", link: "/services/software-implementation-help-for-phd-research", icon: "⚙️" },
    { title: "Thesis & Dissertation Writing", desc: "Comprehensive structural and writing support", category: "PhD", action: "Consult", link: "/services/phd-thesis-writing-services", icon: "✍️" },
    { title: "Explore our services", desc: "Browse our complete catalog of 40+ academic support services", category: "All", action: "Explore", link: "/services", icon: "📖" },
  ];

  const facultyList = [
    {
      name: "Dr. Ramkrishnan Raman",
      title: "PhD in Quantative Analysis, Stanford University",
      experience: "14+ Years Academic Experience",
      specs: ["Qualitative Research Design", "Literature Synthesis & Analysis", "Theoretical Framework Development"],
    },
    {
      name: "Dr. Veena Ganeshan",
      title: "PhD in Methodology Design, Oxford University",
      experience: "12+ Years Research Experience",
      specs: ["Mixed-Methods Integration", "Longitudinal Study Design", "Ethical Compliance Review"],
    },
    {
      name: "Dr. Yogesh Kotkar",
      title: "PhD in Literature Review, Harvard University",
      experience: "15+ Years Editorial Experience",
      specs: ["Systematic Review Protocols", "Critical Discourse Analysis", "Narrative Synthesis"],
    },
  ];

  return (
    <main className="flex flex-col w-full bg-brand-light text-brand-dark overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="w-full bg-brand-purple text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <span className="text-brand-gold text-xs font-bold tracking-widest mb-4 block">
              | PhD RESEARCH GUIDANCE
            </span>
            <h1 className="text-3xl md:text-xl lg:text-5xl font-serif font-bold leading-tight mb-6">
              PhD Research Guidance from Expert Consultants: From Topic Consultation to Successful Thesis Defence
            </h1>
            <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed max-w-2xl">
              Get personalized coaching at every stage of your doctoral research. Our PhD consultants provide expert feedback, strategic guidance, and proven methodologies to help you complete your research work with confidence. You drive the research—we guide you to excellence.
            </p>

            {/* Checkmark Features 2x3 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-xs md:text-sm text-brand-gold mb-10 font-medium">
              <div className="flex items-center gap-2">✓ END-TO-END PhD GUIDANCE</div>
              <div className="flex items-center gap-2">✓ EXPERT REVIEW & REFINEMENT</div>
              <div className="flex items-center gap-2">✓ ONE-TO-ONE EXPERT CONSULTATION</div>
              <div className="flex items-center gap-2">✓ THESIS DEFENCE PREPARATION</div>
              <div className="flex items-center gap-2">✓ PUBLICATION & JOURNAL GUIDANCE</div>
              <div className="flex items-center gap-2">✓ CONFIDENTIAL & PROFESSIONAL SERVICE</div>
            </div>

            {/* Hero CTA Buttons with Hover Scale & Shadow */}
            <div className="flex flex-wrap gap-4 items-center mb-6">
              <motion.a 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="/contact" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-brand-purple border border-white/30 text-white font-bold py-3.5 px-8 rounded-sm hover:bg-white/10 transition shadow-lg text-sm"
              >
                Schedule Free Consultation
              </motion.a>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link href="/services" className="inline-block bg-white text-brand-purple border border-white font-bold py-3.5 px-8 rounded-sm hover:bg-gray-100 transition shadow-lg text-sm">
                  Explore Our Services
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Hero Form Card */}
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
          {[{ num: "11+", label: "Years Experience" }, { num: "7853+", label: "Researchers Served" }, { num: "11300+", label: "Happy Clients" }, { num: "401+", label: "Qualified Experts" }].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-brand-gold mb-1">{stat.num}</h3>
              <p className="text-xs uppercase tracking-widest text-gray-300 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SERVICES GRID */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-brand-light">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-3">
            PhD Research Consultation, Thesis & Dissertation Coaching Services
          </h2>
          <p className="text-gray-600 text-sm">Structured guidance across every phase of your research journey.</p>
        </div>

        {/* Category Filter Pills - Redirects to /services with query params */}
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
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-xl transition rounded-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-serif font-bold text-brand-purple mb-3">{srv.title}</h3>
                <p className="text-xs text-gray-600 mb-6 leading-relaxed">{srv.desc}</p>
              </div>
              <Link href={srv.link || "/services"} className="text-xs font-bold text-brand-gold uppercase tracking-wider hover:text-brand-purple transition inline-flex items-center gap-1 group">
                {srv.action} <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
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
              {[
                "Expert PhD Thesis Consultants with 11+ Years of Experience",
                "Academic Integrity-First Approach to Thesis Guidance",
                "Personalized PhD Thesis Coaching for Your Unique Research",
                "Affordable Dissertation Consultation Services",
                "Fast-Track PhD Completion with Strategic Guidance"
              ].map((item, i) => (
                <div key={i} className="border-b border-gray-200 pb-5 flex items-center gap-3.5 transition-colors hover:text-brand-purple font-medium">
                  <span className="text-brand-gold font-bold text-xl">✓</span> {item}
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
            <img src="Why-Choose.png" alt="Clearby Research Why-Choose" className="w-full h-auto object-cover" />
          </motion.div>
        </div>
      </section>

      {/* 5. ABOUT COMPANY */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-brand-light">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="bg-white p-4 border border-gray-200 shadow-sm rounded-sm">
            <img src="About.png" alt="Clearby Research About" className="w-full h-auto object-cover" />
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-purple mb-6 leading-tight">
              About E-Clearby Research Consulting Pvt Ltd
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              In the world of academia, research is the foundation upon which knowledge is built and innovations are forged. However, the path to successful research — especially at advanced levels such as PhDs — can be an arduous and intricate journey. This is where E-Clearby Research Consulting Pvt. Ltd. emerges as a beacon of expertise and support, dedicated to guiding scholars toward academic excellence.
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              As trusted PhD Topics Consultants, we help you select a research direction that is original and achievable; through expert guidance in Thesis Writing, we support you in structuring and strengthening your own work chapter by chapter.
            </p>
          </div>
        </div>
      </section>

      {/* 6. OUR PROMISES & RESEARCH ETHICS */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-2">Our Promises & Research Ethics Commitment</h2>
          <div className="w-20 h-0.5 bg-brand-gold mx-auto mt-3"></div>
        </div>
        
       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
  <div className="lg:col-span-7 space-y-8 text-gray-700"> {/* Increased vertical space between items */}
    {[
      { title: "1. Academic Integrity is Non-Negotiable:", desc: "All guidance maintains university plagiarism standards. No shortcuts, no academic dishonesty. Your work represents your authentic research." },
      { title: "2. You Maintain Full Authorship:", desc: "You write your thesis; we provide feedback. We never write for you or submit work in your name. Your intellectual contributions remain 100% yours." },
      { title: "3. Our Role is Advisory Only:", desc: "We guide your thinking, not replace it. We coach you to do better work, not do it for you. We're like having an expert mentor, not a co-author." },
      { title: "4. Transparent Process:", desc: "Clear expectations from day one. What we will and won't do, spelled out. Regular check-ins to ensure alignment with your goals." },
      { title: "5. University Compliance:", desc: "We follow all university guidelines. Our services don't violate academic policies. We prepare students for legitimate academic success." }
    ].map((promise, i) => (
      <div key={i} className="flex items-start gap-4 pb-6 border-b border-gray-200"> {/* Increased gap for larger font alignment */}
        <span className="text-brand-gold text-xl mt-0.5 shrink-0">✓</span> {/* Increased checkmark size */}
        <div>
          {/* Increased title font size from default to text-lg */}
          <p className="font-bold text-brand-purple text-lg mb-1.5">{promise.title}</p>
          {/* Increased description font size from text-xs to text-sm */}
          <p className="text-sm text-gray-600 leading-relaxed">{promise.desc}</p>
        </div>
      </div>
    ))}
  </div>

  <div className="lg:col-span-5 bg-white p-3 border border-gray-200 shadow-sm rounded-sm">
    <img src="/Promises.png" alt="Clearby Research Promises" className="w-full h-auto object-cover rounded-sm" />
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
          {[
            { step: "01", title: "PLACE YOUR ENQUIRY", desc: "Share your research requirements, university guidelines, and current progress with our team." },
            { step: "02", title: "EXPERT CONSULTATION", desc: "One-on-one discussion with a research expert to evaluate requirements and challenges." },
            { step: "03", title: "CUSTOM WORK PLAN", desc: "Prepare a milestone-based research roadmap with chapter-wise deliverables." },
            { step: "04", title: "FLEXIBLE INSTALLMENT", desc: "Discuss and get a customized payment schedule with transparent milestone options." },
            { step: "05", title: "PAYMENT & CONFIRMATION", desc: "Approve the proposed work plan and complete the initial payment securely." },
            { step: "06", title: "PROJECT EXECUTION", desc: "Dedicated experts begin work with regular progress updates at every milestone." },
            { step: "07", title: "WORK DELIVERY", desc: "Receive completed deliverables as per the agreed timeline for your review." },
            { step: "08", title: "REVISION & FINALIZATION", desc: "Submit revision requests based on feedback until final successful submission." },
          ].map((st, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 border border-gray-200 rounded-sm relative flex flex-col justify-between shadow-sm hover:shadow-md transition"
            >
              <div>
                <span className="text-3xl font-serif font-bold text-brand-gold/40 absolute top-4 right-4">{st.step}</span>
                <span className="text-[10px] font-bold text-brand-gold tracking-widest block mb-1">STAGE {idx + 1}</span>
                <h3 className="text-lg font-serif font-bold text-brand-purple mb-3">{st.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{st.desc}</p>
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
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-brand-light p-8 border border-gray-200 rounded-sm text-center shadow-sm hover:shadow-md transition"
            >
              <div className="w-20 h-20 bg-white border border-brand-gold/30 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden shadow-sm">
                <img src="/Faculty.png" alt="Faculty" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-purple mb-1">{fac.name}</h3>
              <p className="text-xs text-brand-gold font-bold mb-3">{fac.title}</p>
              <p className="text-xs text-gray-500 mb-6 font-medium">{fac.experience}</p>
              
              <div className="border-t border-gray-200 pt-4 text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Credentials:</p>
                <p className="text-xs text-gray-700 mb-3 font-medium">{fac.title}</p>
                
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">Specializations:</p>
                <ul className="space-y-1 text-xs text-gray-700">
                  {fac.specs.map((s, i) => <li key={i}>✓ {s}</li>)}
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
          {[
            { 
              title: "Business, Management & Commerce", 
              items: ["Business Administration", "Marketing", "Finance & Accounting", "Human Resource Management", "Organizational Behavior", "Economics"] 
            },
            { 
              title: "Engineering & Technology", 
              items: ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Electronics & Communication", "Chemical Engineering", "Robotics & Automation"] 
            },
            { 
              title: "Computer Science, Data & AI", 
              items: ["Computer Science", "Information Technology", "Data Science", "Artificial Intelligence & Machine Learning", "Cybersecurity", "Information Systems"] 
            },
            { 
              title: "Medical, Nursing & Allied Health", 
              items: ["Medicine", "Nursing", "Public Health", "Pharmacy", "Physiotherapy", "Biomedical Sciences"] 
            },
            { 
              title: "Life Sciences & Biotechnology", 
              items: ["Biotechnology", "Microbiology", "Biochemistry", "Genetics", "Molecular Biology", "Bioinformatics"] 
            },
            { 
              title: "Science & Environment", 
              items: ["Mathematics", "Statistics", "Physics", "Chemistry", "Environmental Science", "Sustainable Development"] 
            },
            { 
              title: "Social Sciences & Education", 
              items: ["Psychology", "Sociology", "Economics", "Political Science", "Education", "Social Work"] 
            },
            { 
              title: "Humanities, Languages & Literature", 
              items: ["English Literature", "History", "Philosophy", "Linguistics", "Languages", "Cultural Studies"] 
            },
            { 
              title: "Law, Policy & Governance", 
              items: ["Law", "Public Administration", "Public Policy", "Governance", "Criminology", "International Relations"] 
            }
          ].map((col, idx) => (
            <div key={idx}>
              <h4 className="font-serif font-bold text-brand-purple mb-4 uppercase tracking-wider text-sm md:text-base">
                {col.title}
              </h4>
              <ul className="space-y-3 text-gray-700 text-sm">
                {col.items.map((item, i) => (
                  <li key={i} className="hover:text-brand-purple transition-colors">· {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200 text-sm italic text-gray-600 text-center">
          Can't find your discipline? We work across 40+ academic fields. <Link href="/contact" className="text-brand-gold font-semibold not-italic hover:underline">Contact us</Link> to discuss your specialized area.
        </div>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-brand-purple text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: "What's the difference between Clearby's 'guidance' and 'writing services'?",
                a: "We coach you to do better work; we don't do the work for you. You maintain full authorship, stay engaged with your research, and develop skills you'll use throughout your career. Writing services do the opposite."
              },
              {
                q: "Will my thesis be approved?",
                a: "We can't guarantee approval—that's your professor's decision. But our guidance significantly improves approval likelihood. 92% of our clients' theses are approved on first submission. Our role is to make your research as strong as possible."
              },
              {
                q: "How much does PhD thesis consultation cost?",
                a: "Services range from $100-300 per hour depending on discipline and consultant expertise. Many students budget $2K-5K total for full-thesis guidance (vs. $10K-15K for writing services). First consultation is free."
              },
              {
                q: "Can you help if I'm already partially through my thesis?",
                a: "Absolutely. Many students engage us mid-journey when they're stuck. We can jump in at any stage—topic, proposal, methodology, data analysis, or chapter revision. There's no penalty for joining mid-stream."
              },
              {
                q: "How is this different from working with my academic advisor?",
                a: "Your advisor oversees your research. We specialize in coaching the writing, methodology, and research skills. Many students work with both—their advisor ensures academic fit; we ensure quality execution."
              },
              {
                q: "Do you work with students from outside India?",
                a: "Yes. We serve doctoral scholars from 20+ countries across multiple time zones. Our flexible, asynchronous model works for international students. Language support available for non-native English speakers."
              },
              {
                q: "Is this actually ethical?",
                a: "Yes. University guidelines permit consultants who provide guidance and feedback on student work. What's not permitted is completing work for students, submitting work under their name, or plagiarism. We do none of those things."
              },
              {
                q: "How quickly will I see results?",
                a: "Depends on your starting point. Most students report clarity improvements within 2-3 consultations. Thesis timeline improvements vary: 1-3 months for topic/proposal clarity; 2-6 months for methodology validation; 3-12 months for full-thesis improvement."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-sm bg-brand-light overflow-hidden transition-all">
                <button onClick={() => toggleFaq(idx)} className="w-full px-6 py-4 text-left font-serif font-bold text-brand-purple flex justify-between items-center text-sm">
                  <span>{faq.q}</span>
                  <span className="text-brand-gold">{openFaq === idx ? "▲" : "▼"}</span>
                </button>
                {openFaq === idx && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="px-6 pb-4 text-xs text-gray-600 leading-relaxed border-t border-gray-200 pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

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
            <Link 
              href="/services" 
              className="border border-white/30 text-white font-bold py-3.5 px-8 rounded-sm hover:bg-white/10 transition text-sm"
            >
              Explore Services
            </Link>
          </div>
          <p className="text-xs text-brand-gold font-medium tracking-wide">
            ✓ 92% OF OUR CLIENTS' THESES ARE APPROVED ON FIRST SUBMISSION
          </p>
        </motion.div>
      </LampContainer>

    </main>
  );
}