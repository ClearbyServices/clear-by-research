import Link from 'next/link';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default async function Footer() {
  // Fetch services ordered by menu_order from Supabase
  const { data: services } = await supabase
    .from('services')
    .select('slug, sub_menu, h1, category, menu_order')
    .order('menu_order', { ascending: true });

  // Helper filter function based on category/sub-category keywords
  const filterByCat = (keyword: string) => {
    return services?.filter((s) => s.category?.toLowerCase().includes(keyword.toLowerCase())) || [];
  };

  const mastersServices = services?.filter((s) => {
    const cat = s.category?.toLowerCase().replace(/['\s]/g, "") || "";
    return cat.includes("master");
  }) || [];

  const researchPlanning = filterByCat("research planning");
  const researchDevelopment = filterByCat("research development");
  const researchExecution = filterByCat("research execution");
  const thesisCat = filterByCat("thesis") || [];
  
  const researchPaper = filterByCat("Research Paper");
  const dataAnalysis = filterByCat("Data Analysis");
  const implementation = filterByCat("Implementation");
  const academicSupport = filterByCat("Academic Support");

  return (
    <footer className="bg-brand-purple text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Centered 30:70 Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 items-start justify-center">
          
          {/* 30% Column (Left): Centered Company Info, Socials, & Complete Links List */}
          <div className="lg:col-span-4 flex flex-col space-y-6 text-left mx-auto lg:mx-0 w-full max-w-sm lg:max-w-none">
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-md p-1">
                  <img 
                    src="/favcon.png" 
                    alt="Clearby Research Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-serif font-bold">Clearby Research</h3>
              </div>
              
              <p className="text-sm text-gray-300 mb-6 text-center lg:text-left">
                E-Clearby Research Consulting is a premier academic advisory firm.
              </p>
              
              <div className="flex items-start justify-center lg:justify-start gap-2.5 text-sm text-gray-300 mb-4 leading-relaxed text-center lg:text-left">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white/70 flex-shrink: 0 mt-1 hidden lg:block">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <a 
                  href="https://maps.app.goo.gl/FLBdZ5kPNpmFqYFT7" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-brand-gold transition-colors not-italic"
                >
                  VJ Indilife Sus-Pashan Road,<br />
                  Vardayani Society, Sutarwadi,<br />
                  Pashan Pune, Maharashtra 411021
                </a>
              </div>

              {/* Email and Phone with Icons Restored */}
              <div className="space-y-2 mb-6 text-center lg:text-left">
                <a 
                  href="mailto:contact@clearbyresearch.com" 
                  className="inline-flex items-center justify-center lg:justify-start gap-2.5 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white/70 flex-shrink: 0">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>contact@clearbyresearch.com</span>
                </a>

                <div>
                  <a 
                    href="tel:+917020112146" 
                    className="inline-flex items-center justify-center lg:justify-start gap-2.5 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white/70 flex-shrink: 0">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>+91-7020112146</span>
                  </a>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="flex justify-center lg:justify-start gap-4 items-center mb-6">
                <a href="https://www.linkedin.com/company/clearbyresearch/" target="_blank" rel="noopener noreferrer" className="w-6 h-6 text-white/70 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                <a href="https://www.facebook.com/share/19QAdaiSpy/" target="_blank" rel="noopener noreferrer" className="w-6 h-6 text-white/70 hover:text-white transition-colors" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                </a>
                <a href="https://www.instagram.com/clearbyresearch?stkn=MWZxNGVvdDZoNHV6Zw==" target="_blank" rel="noopener noreferrer" className="w-6 h-6 text-white/70 hover:text-white transition-colors" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="https://in.pinterest.com/0yz8vbtp9coatnn6btjos1aqmuxcmg/" target="_blank" rel="noopener noreferrer" className="w-6 h-6 text-white/70 hover:text-white transition-colors" aria-label="Pinterest">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.545.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                </a>
              </div>

              {/* Company Navigation Section */}
              <div className="text-center lg:text-left">
                <h4 className="text-base font-serif mb-3 border-b border-white/20 pb-1.5">Company</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link href="/" className="hover:text-brand-gold transition-colors">Home</Link></li>
                  <li><Link href="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
                  <li><Link href="/blog" className="hover:text-brand-gold transition-colors">Blog</Link></li>
                  <li><Link href="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
                  <li><Link href="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-brand-gold transition-colors">Terms of Use</Link></li>
                </ul>
              </div>
            </div>
          </div>

          {/* 70% Column (Right): Fully Aligned Categorized Services Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            
            {/* Service Sub-Column 1: PhD Services */}
            <div>
              <h4 className="text-base font-serif mb-4 border-b border-white/20 pb-1.5 text-brand-gold">PhD Services</h4>
              
              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block mb-1">Research Planning</span>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {researchPlanning.map((s, i) => (
                    <li key={i}><Link href={`/services/${s.slug}`} className="hover:text-brand-gold transition-colors">{s.sub_menu || s.h1}</Link></li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block mb-1">Research Development</span>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {researchDevelopment.map((s, i) => (
                    <li key={i}><Link href={`/services/${s.slug}`} className="hover:text-brand-gold transition-colors">{s.sub_menu || s.h1}</Link></li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block mb-1">Research Execution</span>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {researchExecution.map((s, i) => (
                    <li key={i}><Link href={`/services/${s.slug}`} className="hover:text-brand-gold transition-colors">{s.sub_menu || s.h1}</Link></li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold block mb-1">Thesis</span>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {thesisCat.map((s, i) => (
                    <li key={i}><Link href={`/services/${s.slug}`} className="hover:text-brand-gold transition-colors">{s.sub_menu || s.h1}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Service Sub-Column 2: Master's & Research Publication */}
            <div>
              <h4 className="text-base font-serif mb-4 border-b border-white/20 pb-1.5 text-brand-gold">Master's Services</h4>
              <ul className="space-y-1.5 text-xs text-gray-300 mb-6">
                {mastersServices.map((s, i) => (
                  <li key={i}><Link href={`/services/${s.slug}`} className="hover:text-brand-gold transition-colors">{s.sub_menu || s.h1}</Link></li>
                ))}
              </ul>

              <h4 className="text-base font-serif mb-4 border-b border-white/20 pb-1.5 text-brand-gold">Research Paper</h4>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {researchPaper.map((s, i) => (
                  <li key={i}><Link href={`/services/${s.slug}`} className="hover:text-brand-gold transition-colors">{s.sub_menu || s.h1}</Link></li>
                ))}
              </ul>
            </div>

            {/* Service Sub-Column 3: Data Analysis, Implementation & Academic Support */}
            <div>
              <h4 className="text-base font-serif mb-4 border-b border-white/20 pb-1.5 text-brand-gold">Data Analysis</h4>
              <ul className="space-y-1.5 text-xs text-gray-300 mb-6">
                {dataAnalysis.map((s, i) => (
                  <li key={i}><Link href={`/services/${s.slug}`} className="hover:text-brand-gold transition-colors">{s.sub_menu || s.h1}</Link></li>
                ))}
              </ul>

              <h4 className="text-base font-serif mb-4 border-b border-white/20 pb-1.5 text-brand-gold">Implementation / Simulation</h4>
              <ul className="space-y-1.5 text-xs text-gray-300 mb-6">
                {implementation.map((s, i) => (
                  <li key={i}><Link href={`/services/${s.slug}`} className="hover:text-brand-gold transition-colors">{s.sub_menu || s.h1}</Link></li>
                ))}
              </ul>

              <h4 className="text-base font-serif mb-4 border-b border-white/20 pb-1.5 text-brand-gold">Academic Support</h4>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {academicSupport.map((s, i) => (
                  <li key={i}><Link href={`/services/${s.slug}`} className="hover:text-brand-gold transition-colors">{s.sub_menu || s.h1}</Link></li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Centered Bottom Bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col justify-center items-center text-xs text-gray-400 space-y-2 text-center">
          <p>© 2026 E-Clearby Research Consulting Pvt. Ltd. All rights reserved.</p>
          <p>
            Developed and managed by{" "}
            <a 
              href="https://www.clearbyservices.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-gold hover:underline font-medium"
            >
              Clear by Services
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}