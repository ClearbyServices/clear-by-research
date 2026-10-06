"use client";

import { useState } from "react";
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

interface Service {
  slug: string;
  h1?: string;
  sub_menu?: string;
  category?: string;
  menu_order?: number;
}

export default function HeaderClient({
  services = [],
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
  services: Service[];
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
    <header className="w-full bg-brand-light border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-0.5">
              <img 
                src="/favcon.png" 
                alt="Clearby Research Logo" 
                className="w-9 h-9 object-contain rounded-sm" 
              />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-serif font-bold text-brand-purple leading-tight">Clearby Research</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-5 text-sm font-medium text-gray-700">
            <Link 
              href="/" 
              className={`transition py-2 ${isActive("/") ? "text-brand-purple font-semibold border-b-2 border-brand-purple" : "hover:text-brand-purple"}`}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`transition py-2 ${isActive("/about") ? "text-brand-purple font-semibold border-b-2 border-brand-purple" : "hover:text-brand-purple"}`}
            >
              About
            </Link>
            
            {/* PhD Dropdown Menu */}
            <div className="relative group py-4">
              <Link 
                href="/services" 
                className={`transition flex items-center gap-1 ${isActive("/services") ? "text-brand-purple font-semibold" : "hover:text-brand-purple"}`}
              >
                PhD 
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </Link>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[760px] bg-white border border-gray-200 shadow-2xl rounded-sm p-6 hidden group-hover:grid grid-cols-4 gap-6 z-55">
                <div className="flex flex-col space-y-2.5">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-1">Research Planning</span>
                  {researchPlanning?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-xs transition leading-snug ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-700 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-2.5">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-1">Research Development</span>
                  {researchDevelopment?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-xs transition leading-snug ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-700 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-2.5">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-1">Research Execution</span>
                  {researchExecution?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-xs transition leading-snug ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-700 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-2.5">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-1">Thesis</span>
                  {thesisCat?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-xs transition leading-snug ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-700 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Master's Dropdown Menu */}
            <div className="relative group py-4">
              <Link href="/services" className="transition flex items-center gap-1 hover:text-brand-purple">
                Master's 
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </Link>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[580px] bg-white border border-gray-200 shadow-2xl rounded-sm p-6 hidden group-hover:grid grid-cols-2 gap-4 z-55">
                {mastersServices?.length > 0 ? (
                  mastersServices.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-xs transition leading-snug ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-700 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 col-span-2">No Master's services found.</p>
                )}
              </div>
            </div>

            {/* Other Services Dropdown Menu */}
            <div className="relative group py-4">
              <Link href="/services" className="transition flex items-center gap-1 hover:text-brand-purple">
                Other Services 
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </Link>
              
              <div className="absolute top-full right-0 w-[900px] bg-white border border-gray-200 shadow-2xl rounded-sm p-6 hidden group-hover:grid grid-cols-4 gap-6 z-55">
                <div className="flex flex-col space-y-2.5">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-1">Research Paper</span>
                  {researchPaper?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-xs transition leading-snug ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-700 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-2.5">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-1">Data Analysis</span>
                  {dataAnalysis?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-xs transition leading-snug ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-700 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-2.5">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-1">Implementation</span>
                  {implementation?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-xs transition leading-snug ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-700 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-2.5">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-1">Academic Support</span>
                  {academicSupport?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className={`text-xs transition leading-snug ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-700 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link 
              href="/blog" 
              className={`transition py-2 ${isActive("/blog") ? "text-brand-purple font-semibold border-b-2 border-brand-purple" : "hover:text-brand-purple"}`}
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className={`transition py-2 ${isActive("/contact") ? "text-brand-purple font-semibold border-b-2 border-brand-purple" : "hover:text-brand-purple"}`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link href="/contact" className="bg-brand-purple text-white px-5 py-2.5 text-xs font-semibold hover:bg-opacity-90 transition rounded-sm shadow-sm">
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
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl max-h-[85vh] overflow-y-auto px-6 py-6 space-y-4 z-50">
          <Link 
            href="/" 
            onClick={() => setMobileMenuOpen(false)} 
            className={`block text-sm font-semibold py-1 ${isActive("/") ? "text-brand-purple font-bold" : "text-gray-800 hover:text-brand-purple"}`}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            onClick={() => setMobileMenuOpen(false)} 
            className={`block text-sm font-semibold py-1 ${isActive("/about") ? "text-brand-purple font-bold" : "text-gray-800 hover:text-brand-purple"}`}
          >
            About
          </Link>

          {/* Mobile PhD Accordion */}
          <div>
            <button 
              onClick={() => toggleSection("phd")}
              className="w-full flex justify-between items-center text-sm font-semibold text-gray-800 py-1"
            >
              <span>PhD Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "phd" ? "rotate-180" : ""}`} />
            </button>
            {openSection === "phd" && (
              <div className="pl-4 pt-2 space-y-3 border-l-2 border-brand-gold ml-2 my-2">
                <div>
                  <p className="text-[10px] font-bold uppercase text-brand-gold mb-1">Research Planning</p>
                  {researchPlanning?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-xs py-1 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-brand-gold mb-1">Research Development</p>
                  {researchDevelopment?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-xs py-1 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-brand-gold mb-1">Research Execution</p>
                  {researchExecution?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-xs py-1 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-brand-gold mb-1">Thesis</p>
                  {thesisCat?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-xs py-1 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Master's Accordion */}
          <div>
            <button 
              onClick={() => toggleSection("masters")}
              className="w-full flex justify-between items-center text-sm font-semibold text-gray-800 py-1"
            >
              <span>Master's Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "masters" ? "rotate-180" : ""}`} />
            </button>
            {openSection === "masters" && (
              <div className="pl-4 pt-2 space-y-2 border-l-2 border-brand-gold ml-2 my-2">
                {mastersServices?.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-xs py-1 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                    {s.sub_menu || s.h1}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Other Services Accordion */}
          <div>
            <button 
              onClick={() => toggleSection("other")}
              className="w-full flex justify-between items-center text-sm font-semibold text-gray-800 py-1"
            >
              <span>Other Services</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${openSection === "other" ? "rotate-180" : ""}`} />
            </button>
            {openSection === "other" && (
              <div className="pl-4 pt-2 space-y-3 border-l-2 border-brand-gold ml-2 my-2">
                <div>
                  <p className="text-[10px] font-bold uppercase text-brand-gold mb-1">Research & Publication</p>
                  {researchPaper?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-xs py-1 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-brand-gold mb-1">Data Analysis</p>
                  {dataAnalysis?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-xs py-1 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-brand-gold mb-1">Implementation</p>
                  {implementation?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-xs py-1 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
                      {s.sub_menu || s.h1}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-brand-gold mb-1">Academic Support</p>
                  {academicSupport?.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setMobileMenuOpen(false)} className={`block text-xs py-1 ${pathname === `/services/${s.slug}` ? "text-brand-purple font-bold" : "text-gray-600 hover:text-brand-purple"}`}>
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
            className={`block text-sm font-semibold py-1 ${isActive("/blog") ? "text-brand-purple font-bold" : "text-gray-800 hover:text-brand-purple"}`}
          >
            Blog
          </Link>
          <Link 
            href="/contact" 
            onClick={() => setMobileMenuOpen(false)} 
            className={`block text-sm font-semibold py-1 ${isActive("/contact") ? "text-brand-purple font-bold" : "text-gray-800 hover:text-brand-purple"}`}
          >
            Contact
          </Link>

          <div className="pt-4 pb-2">
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block text-center bg-brand-purple text-white py-3 text-sm font-semibold rounded-sm shadow-md"
            >
              Schedule Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}