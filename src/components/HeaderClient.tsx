"use client";

import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Sparkles } from "lucide-react";

interface Service {
  slug: string;
  h1?: string;
  sub_menu?: string;
  category?: string;
  menu_order?: number;
}

export default function HeaderClient({
  mastersServices = [],
  researchPlanning = [],
  researchDevelopment = [],
  researchExecution = [],
  thesisCat = [],
  researchPaper = [],
  dataAnalysis = [],
  implementation = [],
  academicSupport = [],
}: {
  services?: Service[];
  mastersServices: Service[];
  researchPlanning: Service[];
  researchDevelopment: Service[];
  researchExecution: Service[];
  thesisCat: Service[];
  researchPaper: Service[];
  dataAnalysis: Service[];
  implementation: Service[];
  academicSupport: Service[];
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full bg-brand-light border-b border-gray-200/80 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <Image 
                src="/favcon.png" 
                alt="Clearby Research Logo" 
                width={40}
                height={40}
                className="w-10 h-10 object-contain rounded-sm transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold text-brand-purple leading-tight tracking-tight">Clearby Research</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7 text-base font-semibold text-gray-700">
            <Link 
              href="/" 
              className={`transition-colors py-2 relative ${isActive("/") ? "text-brand-purple" : "hover:text-brand-purple"}`}
            >
              Home
              {isActive("/") && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-purple rounded-full" />}
            </Link>
            <Link 
              href="/about" 
              className={`transition-colors py-2 relative ${isActive("/about") ? "text-brand-purple" : "hover:text-brand-purple"}`}
            >
              About
              {isActive("/about") && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-purple rounded-full" />}
            </Link>
            
            {/* PhD Dropdown Menu */}
            <div className="relative group py-4">
              <Link 
                href="/services" 
                className={`transition-colors flex items-center gap-1.5 ${isActive("/services") ? "text-brand-purple" : "hover:text-brand-purple"}`}
              >
                PhD 
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 text-brand-gold" />
              </Link>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[820px] bg-white border border-slate-200/80 shadow-2xl rounded-2xl p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 grid grid-cols-4 gap-8 z-50">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-gold uppercase tracking-wider pb-2 border-b border-slate-100">
                    <Sparkles className="w-3.5 h-3.5" /> Research Planning
                  </div>
                  {researchPlanning?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-sm transition-all leading-snug py-1 px-2 rounded-lg ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold bg-brand-purple/5" : "text-gray-600 hover:text-brand-purple hover:bg-slate-50"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-gold uppercase tracking-wider pb-2 border-b border-slate-100">
                    <Sparkles className="w-3.5 h-3.5" /> Development
                  </div>
                  {researchDevelopment?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-sm transition-all leading-snug py-1 px-2 rounded-lg ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold bg-brand-purple/5" : "text-gray-600 hover:text-brand-purple hover:bg-slate-50"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-gold uppercase tracking-wider pb-2 border-b border-slate-100">
                    <Sparkles className="w-3.5 h-3.5" /> Execution
                  </div>
                  {researchExecution?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-sm transition-all leading-snug py-1 px-2 rounded-lg ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold bg-brand-purple/5" : "text-gray-600 hover:text-brand-purple hover:bg-slate-50"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-gold uppercase tracking-wider pb-2 border-b border-slate-100">
                    <Sparkles className="w-3.5 h-3.5" /> Thesis
                  </div>
                  {thesisCat?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-sm transition-all leading-snug py-1 px-2 rounded-lg ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold bg-brand-purple/5" : "text-gray-600 hover:text-brand-purple hover:bg-slate-50"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Master's Dropdown Menu */}
            <div className="relative group py-4">
              <Link href="/services" className="transition-colors flex items-center gap-1.5 hover:text-brand-purple">
                Master&apos;s 
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 text-brand-gold" />
              </Link>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white border border-slate-200/80 shadow-2xl rounded-2xl p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 grid grid-cols-2 gap-4 z-50">
                {mastersServices?.length > 0 ? (
                  mastersServices.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-sm transition-all leading-snug py-2 px-3 rounded-lg ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold bg-brand-purple/5" : "text-gray-600 hover:text-brand-purple hover:bg-slate-50"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 col-span-2">No Master&apos;s services found.</p>
                )}
              </div>
            </div>

            {/* Other Services Dropdown Menu */}
            <div className="relative group py-4">
              <Link href="/services" className="transition-colors flex items-center gap-1.5 hover:text-brand-purple">
                Other Services 
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180 text-brand-gold" />
              </Link>
              
              <div className="absolute top-full right-0 w-[940px] bg-white border border-slate-200/80 shadow-2xl rounded-2xl p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 grid grid-cols-4 gap-8 z-50">
                <div className="flex flex-col space-y-3">
                  <span className="text-xs font-bold text-brand-gold uppercase tracking-wider pb-2 border-b border-slate-100">Research Paper</span>
                  {researchPaper?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-sm transition-all leading-snug py-1 px-2 rounded-lg ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold bg-brand-purple/5" : "text-gray-600 hover:text-brand-purple hover:bg-slate-50"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-3">
                  <span className="text-xs font-bold text-brand-gold uppercase tracking-wider pb-2 border-b border-slate-100">Data Analysis</span>
                  {dataAnalysis?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-sm transition-all leading-snug py-1 px-2 rounded-lg ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold bg-brand-purple/5" : "text-gray-600 hover:text-brand-purple hover:bg-slate-50"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-3">
                  <span className="text-xs font-bold text-brand-gold uppercase tracking-wider pb-2 border-b border-slate-100">Implementation</span>
                  {implementation?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-sm transition-all leading-snug py-1 px-2 rounded-lg ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold bg-brand-purple/5" : "text-gray-600 hover:text-brand-purple hover:bg-slate-50"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-3">
                  <span className="text-xs font-bold text-brand-gold uppercase tracking-wider pb-2 border-b border-slate-100">Academic Support</span>
                  {academicSupport?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-sm transition-all leading-snug py-1 px-2 rounded-lg ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold bg-brand-purple/5" : "text-gray-600 hover:text-brand-purple hover:bg-slate-50"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link 
              href="/blog" 
              className={`transition-colors py-2 relative ${isActive("/blog") ? "text-brand-purple" : "hover:text-brand-purple"}`}
            >
              Blog
              {isActive("/blog") && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-purple rounded-full" />}
            </Link>
            <Link 
              href="/contact" 
              className={`transition-colors py-2 relative ${isActive("/contact") ? "text-brand-purple" : "hover:text-brand-purple"}`}
            >
              Contact
              {isActive("/contact") && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-purple rounded-full" />}
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link href="/contact" className="bg-brand-purple text-white px-6 py-3 text-xs font-bold uppercase tracking-wider hover:bg-brand-purple/90 transition-all rounded-xl shadow-md hover:shadow-lg">
              Schedule Free Consultation
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-purple p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-2xl max-h-[85vh] overflow-y-auto px-6 py-6 space-y-4 z-50">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)} 
            className={`block text-base font-semibold py-1.5 ${isActive("/") ? "text-brand-purple font-bold" : "text-gray-800 hover:text-brand-purple"}`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            onClick={() => setMobileMenuOpen(false)} 
            className={`block text-base font-semibold py-1.5 ${isActive("/about") ? "text-brand-purple font-bold" : "text-gray-800 hover:text-brand-purple"}`}
          >
            About
          </Link>

          {/* Mobile PhD Accordion with simultaneous routing */}
          <div>
            <div className="w-full flex justify-between items-center text-base font-semibold text-gray-800 py-1.5">
              <Link 
                href="/services" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-purple transition-colors flex-1"
              >
                PhD Services
              </Link>
              <button 
                onClick={() => toggleSection("phd")}
                className="p-2 text-brand-purple focus:outline-none"
                aria-label="Toggle PhD Menu"
              >
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openSection === "phd" ? "rotate-180" : ""}`} />
              </button>
            </div>
            {openSection === "phd" && (
              <div className="pl-4 pt-2 space-y-3 border-l-2 border-brand-gold ml-2 my-2">
                <div>
                  <p className="text-xs font-bold uppercase text-brand-gold mb-1.5">Research Planning</p>
                  {researchPlanning?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-sm py-1.5 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-brand-gold mb-1.5">Research Development</p>
                  {researchDevelopment?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-sm py-1.5 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-brand-gold mb-1.5">Research Execution</p>
                  {researchExecution?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-sm py-1.5 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-brand-gold mb-1.5">Thesis</p>
                  {thesisCat?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-sm py-1.5 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Master's Accordion with simultaneous routing */}
          <div>
            <div className="w-full flex justify-between items-center text-base font-semibold text-gray-800 py-1.5">
              <Link 
                href="/services" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-purple transition-colors flex-1"
              >
                Master&apos;s Services
              </Link>
              <button 
                onClick={() => toggleSection("masters")}
                className="p-2 text-brand-purple focus:outline-none"
                aria-label="Toggle Master's Menu"
              >
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openSection === "masters" ? "rotate-180" : ""}`} />
              </button>
            </div>
            {openSection === "masters" && (
              <div className="pl-4 pt-2 space-y-2.5 border-l-2 border-brand-gold ml-2 my-2">
                {mastersServices?.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-sm py-1.5 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                    {s.sub_menu || s.h1}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Other Services Accordion with simultaneous routing */}
          <div>
            <div className="w-full flex justify-between items-center text-base font-semibold text-gray-800 py-1.5">
              <Link 
                href="/services" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-brand-purple transition-colors flex-1"
              >
                Other Services
              </Link>
              <button 
                onClick={() => toggleSection("other")}
                className="p-2 text-brand-purple focus:outline-none"
                aria-label="Toggle Other Services Menu"
              >
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openSection === "other" ? "rotate-180" : ""}`} />
              </button>
            </div>
            {openSection === "other" && (
              <div className="pl-4 pt-2 space-y-3 border-l-2 border-brand-gold ml-2 my-2">
                <div>
                  <p className="text-xs font-bold uppercase text-brand-gold mb-1.5">Research & Publication</p>
                  {researchPaper?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-sm py-1.5 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-brand-gold mb-1.5">Data Analysis</p>
                  {dataAnalysis?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-sm py-1.5 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-brand-gold mb-1.5">Implementation</p>
                  {implementation?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-sm py-1.5 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-brand-gold mb-1.5">Academic Support</p>
                  {academicSupport?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-sm py-1.5 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link 
            href="/blog" 
            onClick={() => setMobileMenuOpen(false)} 
            className={`block text-base font-semibold py-1.5 ${isActive("/blog") ? "text-brand-purple font-bold" : "text-gray-800 hover:text-brand-purple"}`}
          >
            Blog
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setMobileMenuOpen(false)} 
            className={`block text-base font-semibold py-1.5 ${isActive("/contact") ? "text-brand-purple font-bold" : "text-gray-800 hover:text-brand-purple"}`}
          >
            Contact
          </Link>

          <div className="pt-4 pb-2">
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block text-center bg-brand-purple text-white py-3.5 text-xs font-bold uppercase tracking-wider rounded-xl shadow-md"
            >
              Schedule Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}