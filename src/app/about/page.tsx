import Link from "next/link";


export default function AboutPage() {
  const coreValues = [
    { title: "Expertise", desc: "Research and methodological consultation tailored to your academic needs.", icon: "🎓" },
    { title: "Confidentiality", desc: "Careful handling of your research, data, documents, and intellectual property.", icon: "🔒" },
    { title: "Integrity", desc: "Responsible academic practices that respect originality and research ethics.", icon: "⚖️" },
    { title: "Clarity", desc: "Clear explanations, practical feedback, and structured academic input.", icon: "💡" },
    { title: "Timeliness", desc: "Reliable communication and delivery aligned with agreed timelines.", icon: "⏱️" },
  ];

  const facultyList = [
    {
      name: "Dr. Sarah Jenkins",
      title: "PhD in Quantitative Analysis, Stanford University",
      experience: "14+ Years Academic Experience",
      specs: ["Qualitative Research Design", "Literature Synthesis & Analysis", "Theoretical Framework Development"],
    },
    {
      name: "Dr. Robert Chen",
      title: "PhD in Methodology Design, Oxford University",
      experience: "12+ Years Research Experience",
      specs: ["Mixed-Methods Integration", "Longitudinal Study Design", "Ethical Compliance Review"],
    },
    {
      name: "Dr. Elena Rossi",
      title: "PhD in Literature Review, Harvard University",
      experience: "15+ Years Editorial Experience",
      specs: ["Systematic Review Protocols", "Critical Discourse Analysis", "Narrative Synthesis"],
    },
  ];

  return (
    <div className="w-full flex flex-col bg-brand-light text-brand-dark">
      
      {/* 1. HEADER & INTRO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
          <Link href="/" className="hover:text-brand-purple">HOME</Link> <span className="text-brand-gold">›</span> <span className="text-brand-purple">ABOUT US</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-purple mb-6">
          About E-Clearby Research
        </h1>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-5xl mb-4">
          Research is more than the process of completing an academic requirement. It involves asking meaningful questions, evaluating evidence, making informed methodological decisions, and developing knowledge in a structured and academically rigorous way. For many scholars, navigating this process alongside university requirements, supervisor feedback, data, deadlines, and publication expectations can be challenging.
        </p>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-5xl mb-4">
          E-Clearby Research Consulting Pvt. Ltd. provides academic consultation and research assistance to PhD scholars, Master's students, and researchers across different disciplines. Our role is to help you make informed research decisions, strengthen your academic work, and navigate complex stages of the research process with greater clarity and confidence.
        </p>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-5xl mb-4">
          From topic selection and research methodology to literature review, data analysis consultation, thesis development, academic editing, publication assistance, and viva preparation, we provide structured input at different stages of the research journey.
        </p>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-5xl">
          Our approach is simple: your research remains yours. We provide consultation, review, methodological input, feedback, and recommendations while you remain responsible for developing, interpreting, finalising, and submitting your academic work.
        </p>
      </section>

      {/* 2. OUR FOUNDING VISION SECTION */}
      <section className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="border-l-4 border-brand-gold pl-4 mb-6">
              <span className="text-xs font-bold text-brand-gold tracking-widest uppercase block mb-1">A LEGACY OF SCHOLARLY SUPPORT</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple">Our Founding Vision</h2>
            </div>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              E-Clearby Research was established in response to the growing isolation felt by doctoral candidates in an increasingly fragmented academic landscape. We recognized that while the pursuit of a PhD is a solitary endeavor, the infrastructure of research should never be.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Our journey began with a small circle of senior academics who shared a singular goal: to provide the bridge between raw data and profound insight. Today, that vision has expanded into a premier consultancy that serves hundreds of scholars across various continents, maintaining the same personal touch and rigorous standards that defined our inception.
            </p>
            <blockquote className="border-l-2 border-brand-purple/40 pl-4 py-2 italic text-sm text-gray-900 font-serif leading-relaxed bg-brand-gold/10 font-bold rounded-r-sm">
  "Intellectual progress is the result of shared dedication. We don't just facilitate research; we nurture the next generation of global thought leaders."
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
              Our Approach to Academic Consultancy
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              Academic research can be an independent journey, but independent research does not have to mean navigating every challenge without expert input. Our consultancy model is designed to give scholars access to structured academic perspectives while preserving their ownership of the research process.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              We work with the research materials, ideas, data, and objectives provided by the scholar and help identify areas that may require greater clarity, stronger alignment, methodological consideration, or further refinement.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              Rather than replacing the scholar's role, we aim to make the research process more structured and informed—helping scholars understand their options, evaluate academic decisions, and improve their own work.
            </p>
          </div>
        </div>
      </section>

      {/* 4. OUR PROMISES & RESEARCH ETHICS COMMITMENT */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-2">Our Commitment to Research Ethics</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-base text-gray-700">
            <div className="border-b border-gray-200 pb-4">
              <p className="font-bold text-brand-purple text-lg mb-1">1. Academic Integrity</p>
              <p className="text-sm text-gray-600 leading-relaxed">Academic integrity is central to our approach. Our services are designed to encourage appropriate research practices, accurate attribution, responsible use of sources, and adherence to applicable university and institutional requirements.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <p className="font-bold text-brand-purple text-lg mb-1">2. Scholar Ownership</p>
              <p className="text-sm text-gray-600 leading-relaxed">The research thinking, interpretation, academic arguments, and final decisions remain with the scholar. We provide consultation and feedback; the scholar reviews, finalises, and submits the academic work.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <p className="font-bold text-brand-purple text-lg mb-1">3. Advisory and Consultative Role</p>
              <p className="text-sm text-gray-600 leading-relaxed">Our role is to provide academic input—not to replace the researcher. We help scholars understand research concepts, evaluate methodological choices, respond to feedback, and strengthen the presentation of their own work.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <p className="font-bold text-brand-purple text-lg mb-1">4. Transparent Engagement</p>
              <p className="text-sm text-gray-600 leading-relaxed">We believe scholars should clearly understand what a service includes before beginning an engagement. Our scope, deliverables, timelines, and responsibilities are communicated as clearly as possible.</p>
            </div>
            <div>
              <p className="font-bold text-brand-purple text-lg mb-1">5. Respect for University Requirements</p>
              <p className="text-sm text-gray-600 leading-relaxed">Research requirements differ across universities, disciplines, programmes, and supervisors. We encourage scholars to follow the applicable institutional guidelines and use our consultation within those requirements.</p>
            </div>
          </div>
          <div className="bg-white p-4 border border-gray-200 shadow-sm rounded-sm">
            <img 
              src="Promises.png" 
              alt="Clearby Research Promises" 
            />
          </div>
        </div>
      </section>

      {/* 5. OUR CORE VALUES */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-brand-light">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-2">Our Core Values</h2>
          <div className="w-20 h-0.5 bg-brand-gold mx-auto mt-3"></div>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          
          {/* Card 1: Expertise */}
          <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm text-left flex flex-col justify-start">
            <div className="mb-4 text-brand-purple">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 01-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.005 11.5c.355 0 .707-.02 1.058-.06M12 20.904v-9.415m0 0a55.405 55.405 0 017.005-2.887M17 15a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-serif font-bold text-brand-purple mb-2">Expertise</h3>
            <p className="text-xs text-gray-600 leading-relaxed">Research and methodological consultation tailored to your academic needs.</p>
          </div>

          {/* Card 2: Confidentiality */}
          <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm text-left flex flex-col justify-start">
            <div className="mb-4 text-brand-purple">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-serif font-bold text-brand-purple mb-2">Confidentiality</h3>
            <p className="text-xs text-gray-600 leading-relaxed">Careful handling of your research, data, documents, and intellectual property.</p>
          </div>

          {/* Card 3: Integrity */}
          <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm text-left flex flex-col justify-start">
            <div className="mb-4 text-brand-purple">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.255a15.932 15.932 0 01-9.031 1.77 15.932 15.932 0 01-9.031-1.77c-.483-.227-.711-.756-.59-1.255L5.25 4.97m13.5 0a48.39 48.39 0 00-13.5 0"></path>
              </svg>
            </div>
            <h3 className="text-lg font-serif font-bold text-brand-purple mb-2">Integrity</h3>
            <p className="text-xs text-gray-600 leading-relaxed">Responsible academic practices that respect originality and research ethics.</p>
          </div>

          {/* Card 4: Clarity */}
          <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm text-left flex flex-col justify-start">
            <div className="mb-4 text-brand-purple">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-serif font-bold text-brand-purple mb-2">Clarity</h3>
            <p className="text-xs text-gray-600 leading-relaxed">Clear explanations, practical feedback, and structured academic input.</p>
          </div>

          {/* Card 5: Timeliness */}
          <div className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm text-left flex flex-col justify-start">
            <div className="mb-4 text-brand-purple">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-serif font-bold text-brand-purple mb-2">Timeliness</h3>
            <p className="text-xs text-gray-600 leading-relaxed">Reliable communication and delivery aligned with agreed timelines.</p>
          </div>

        </div>
      </section>

      {/* 6. OUR VISION */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-brand-purple mb-6">Our Vision</h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
            Our vision is to make high-quality academic consultation more accessible to scholars while encouraging independent research thinking and responsible academic practice.
          </p>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            We believe the strongest research outcomes come when scholars own their research and have access to the right expertise at the right stage. E-Clearby Research offers expert guidance to help researchers move from uncertainty to greater clarity, structure, and confidence.
          </p>
        </div>
      </section>

      {/* 7. ELITE RESEARCH FACULTY */}
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
            <div key={idx} className="bg-white p-8 border border-gray-200 rounded-sm text-center shadow-sm">
              <div className="w-20 h-20 bg-brand-light border border-brand-gold/30 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden shadow-sm">
                <img 
                  src="/Faculty.png" 
                  alt="Faculty" 
                  className="w-full h-full object-cover" 
                />
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
            </div>
          ))}
        </div>
      </section>

      {/* 8. FINAL BOTTOM CTA BANNER */}
      <section className="w-full py-20 bg-white border-t border-gray-200 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-4">
            Ready to start your research journey?
          </h2>
          <p className="text-gray-600 text-xs md:text-sm mb-8 leading-relaxed">
            Whether you are at the proposal stage or finalizing your dissertation, our experts are ready to provide the guidance you need to succeed.
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
            Confidential • Professional • Academic-Focused
          </div>
        </div>
      </section>

    </div>
  );
}