"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, X, Plus, Bold, Italic, Heading1, Quote, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type SubTabType = "hero" | "stats" | "services" | "why" | "process" | "faqs" | "about_preview" | "ethics" | "faculty" | "disciplines" | "cta";

export default function HomeTab() {
  const [subTab, setSubTab] = useState<SubTabType>("hero");

  // --- States ---
  const [hero, setHero] = useState({ id: "", badge: "", title: "", description: "", cta_text: "", cta_link: "", secondary_cta_text: "", secondary_cta_link: "" });
  const [stats, setStats] = useState<{ id: string; metric_number: string; label: string; display_order: number }[]>([]);
  const [services, setServices] = useState<{ id: string; title: string; description: string; category: string; badge: string; link_url: string; display_order: number; }[]>([]);
  const [whyChoose, setWhyChoose] = useState<{ id: string; point_text: string; display_order: number }[]>([]);
  const [processSteps, setProcessSteps] = useState<{ id: string; step_number: string; stage_label: string; title: string; description: string; display_order: number; }[]>([]);
  const [faqs, setFaqs] = useState<{ id: string; question: string; answer: string; display_order: number; }[]>([]);
  
  // Additional Sections
  const [aboutPreview, setAboutPreview] = useState({ id: "", title: "", body_html: "", badge_text: "", image_url: "" });
  const [ethics, setEthics] = useState<{ id: string; point_number: number; title: string; description: string; }[]>([]);
  const [faculty, setFaculty] = useState<{ id: string; name: string; credentials: string; experience: string; specializations: string[]; image_url: string; display_order: number; linkedin_url: string; }[]>([]);
  const [disciplines, setDisciplines] = useState<{ id: string; category_title: string; disciplines_list: string[]; display_order: number; icon_name: string; }[]>([]);
  const [cta, setCta] = useState({ id: "", badge_text: "", title: "", description: "", primary_button_text: "", primary_button_link: "", secondary_button_text: "", secondary_button_link: "", footer_stat_text: "" });

  const [loading, setLoading] = useState(true);

  // --- Modals & Forms ---
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [showStatModal, setShowStatModal] = useState(false);
  const [editingStat, setEditingStat] = useState<(typeof stats)[number] | null>(null);
  const [statForm, setStatForm] = useState({ metric_number: "", label: "", display_order: 1 });
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<(typeof services)[number] | null>(null);
  const [serviceForm, setServiceForm] = useState({ title: "", description: "", category: "PhD", badge: "", link_url: "", display_order: 1 });
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [editingWhy, setEditingWhy] = useState<(typeof whyChoose)[number] | null>(null);
  const [whyForm, setWhyForm] = useState({ point_text: "", display_order: 1 });
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [editingProcess, setEditingProcess] = useState<(typeof processSteps)[number] | null>(null);
  const [processForm, setProcessForm] = useState({ step_number: "", stage_label: "STAGE", title: "", description: "", display_order: 1 });
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<(typeof faqs)[number] | null>(null);
  const [faqForm, setFaqForm] = useState({ question: "", answer: "", display_order: 1 });
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showEthicsModal, setShowEthicsModal] = useState(false);
  const [editingEthics, setEditingEthics] = useState<(typeof ethics)[number] | null>(null);
  const [ethicsForm, setEthicsForm] = useState({ point_number: 1, title: "", description: "" });
  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<(typeof faculty)[number] | null>(null);
  const [facultyForm, setFacultyForm] = useState({ name: "", credentials: "", experience: "", specializations: "", image_url: "", linkedin_url: "", display_order: 1 });
  const [showDisciplineModal, setShowDisciplineModal] = useState(false);
  const [editingDiscipline, setEditingDiscipline] = useState<(typeof disciplines)[number] | null>(null);
  const [disciplineForm, setDisciplineForm] = useState({ category_title: "", disciplines_list: "", icon_name: "", display_order: 1 });
  const [showCtaModal, setShowCtaModal] = useState(false);

  const loadHomeData = async () => {
    try {
      const [hRes, sRes, svRes, wRes, pRes, fRes, apRes, ethRes, facRes, discRes, ctaRes] = await Promise.all([
        supabase.from("home_hero").select("*").limit(1).maybeSingle(),
        supabase.from("home_stats").select("*").order("display_order", { ascending: true }),
        supabase.from("home_services").select("*").order("display_order", { ascending: true }),
        supabase.from("home_why_choose").select("*").order("display_order", { ascending: true }),
        supabase.from("home_process").select("*").order("display_order", { ascending: true }),
        supabase.from("home_faqs").select("*").order("display_order", { ascending: true }),
        supabase.from("home_about_preview").select("*").limit(1).maybeSingle(),
        supabase.from("about_ethics").select("*").order("point_number", { ascending: true }),
        supabase.from("about_faculty").select("*").order("display_order", { ascending: true }),
        supabase.from("home_disciplines").select("*").order("display_order", { ascending: true }),
        supabase.from("home_cta").select("*").limit(1).maybeSingle()
      ]);

      if (hRes.data) setHero(hRes.data);
      if (sRes.data) setStats(sRes.data);
      if (svRes.data) setServices(svRes.data);
      if (wRes.data) setWhyChoose(wRes.data);
      if (pRes.data) setProcessSteps(pRes.data);
      if (fRes.data) setFaqs(fRes.data);
      if (apRes.data) setAboutPreview(apRes.data);
      if (ethRes.data) setEthics(ethRes.data);
      if (facRes.data) setFaculty(facRes.data);
      if (discRes.data) setDisciplines(discRes.data);
      if (ctaRes.data) setCta(ctaRes.data);
    } catch (err) {
      console.error("Error loading home data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadHomeData();
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const insertFormatting = <T extends Record<string, unknown>>(
    field: keyof T,
    formState: T,
    setFormState: React.Dispatch<React.SetStateAction<T>>,
    tagOpen: string,
    tagClose: string
  ) => {
    const currentVal = String(formState[field] ?? "");
    const textToFormat = prompt("What words do you want to format?\n(Type them exactly as they appear in the box)");
    if (!textToFormat) return;

    const formattedHtml = `${tagOpen}${textToFormat}${tagClose}`;

    if (currentVal.includes(textToFormat)) {
      setFormState((current) => ({ ...current, [field]: currentVal.replace(textToFormat, formattedHtml) }) as T);
    } else {
      setFormState((current) => ({ ...current, [field]: currentVal + (currentVal ? " " : "") + formattedHtml }) as T);
    }
  };

  const insertLink = <T extends Record<string, unknown>>(
    field: keyof T,
    formState: T,
    setFormState: React.Dispatch<React.SetStateAction<T>>
  ) => {
    const currentVal = String(formState[field] ?? "");
    const textToLink = prompt("Step 1: What words do you want to make clickable?\n(Type them exactly as they appear in the box)");
    if (!textToLink) return;

    const url = prompt(`Step 2: Where should "${textToLink}" link to?\n(e.g., /services or https://...)`);
    if (!url) return;

    const linkHtml = `<a href="${url}" class="text-brand-purple font-bold underline hover:text-brand-gold transition-colors">${textToLink}</a>`;

    if (currentVal.includes(textToLink)) {
      setFormState((current) => ({ ...current, [field]: currentVal.replace(textToLink, linkHtml) }) as T);
    } else {
      setFormState((current) => ({ ...current, [field]: currentVal + (currentVal ? " " : "") + linkHtml }) as T);
    }
  };

  // --- Save Handlers ---
  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("home_hero").update({ ...hero, updated_at: new Date().toISOString() }).eq("id", hero.id);
    if (!error) { alert("Hero section updated!"); setShowHeroModal(false); loadHomeData(); } else { alert(error.message); }
  };

  const handleSaveStat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStat) {
      const { error } = await supabase.from("home_stats").update(statForm).eq("id", editingStat.id);
      if (!error) { setShowStatModal(false); loadHomeData(); } else { alert(error.message); }
    } else {
      const { error } = await supabase.from("home_stats").insert([statForm]);
      if (!error) { setShowStatModal(false); loadHomeData(); } else { alert(error.message); }
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      const { error } = await supabase.from("home_services").update(serviceForm).eq("id", editingService.id);
      if (!error) { setShowServiceModal(false); loadHomeData(); } else { alert(error.message); }
    } else {
      const { error } = await supabase.from("home_services").insert([serviceForm]);
      if (!error) { setShowServiceModal(false); loadHomeData(); } else { alert(error.message); }
    }
  };

  const handleSaveWhy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWhy) {
      const { error } = await supabase.from("home_why_choose").update(whyForm).eq("id", editingWhy.id);
      if (!error) { setShowWhyModal(false); loadHomeData(); } else { alert(error.message); }
    } else {
      const { error } = await supabase.from("home_why_choose").insert([whyForm]);
      if (!error) { setShowWhyModal(false); loadHomeData(); } else { alert(error.message); }
    }
  };

  const handleSaveProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProcess) {
      const { error } = await supabase.from("home_process").update(processForm).eq("id", editingProcess.id);
      if (!error) { setShowProcessModal(false); loadHomeData(); } else { alert(error.message); }
    } else {
      const { error } = await supabase.from("home_process").insert([processForm]);
      if (!error) { setShowProcessModal(false); loadHomeData(); } else { alert(error.message); }
    }
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaq) {
      const { error } = await supabase.from("home_faqs").update(faqForm).eq("id", editingFaq.id);
      if (!error) { setShowFaqModal(false); loadHomeData(); } else { alert(error.message); }
    } else {
      const { error } = await supabase.from("home_faqs").insert([faqForm]);
      if (!error) { setShowFaqModal(false); loadHomeData(); } else { alert(error.message); }
    }
  };

  const handleSaveAboutPreview = async (e: React.FormEvent) => {
    e.preventDefault();
    let error;
    if (aboutPreview.id) {
      const res = await supabase.from("home_about_preview").update({ ...aboutPreview, updated_at: new Date().toISOString() }).eq("id", aboutPreview.id);
      error = res.error;
    } else {
      const { id, ...insertPayload } = aboutPreview;
      const res = await supabase.from("home_about_preview").insert([insertPayload]);
      error = res.error;
    }
    if (!error) { alert("About Preview updated!"); setShowAboutModal(false); loadHomeData(); } else { alert(error.message); }
  };

  const handleSaveEthics = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEthics) {
      const { error } = await supabase.from("about_ethics").update(ethicsForm).eq("id", editingEthics.id);
      if (!error) { setShowEthicsModal(false); loadHomeData(); } else { alert(error.message); }
    } else {
      const { error } = await supabase.from("about_ethics").insert([ethicsForm]);
      if (!error) { setShowEthicsModal(false); loadHomeData(); } else { alert(error.message); }
    }
  };

  const handleSaveFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...facultyForm,
      specializations: facultyForm.specializations.split(',').map(s => s.trim()).filter(Boolean)
    };
    if (editingFaculty) {
      const { error } = await supabase.from("about_faculty").update(payload).eq("id", editingFaculty.id);
      if (!error) { setShowFacultyModal(false); loadHomeData(); } else { alert(error.message); }
    } else {
      const { error } = await supabase.from("about_faculty").insert([payload]);
      if (!error) { setShowFacultyModal(false); loadHomeData(); } else { alert(error.message); }
    }
  };

const handleSaveDiscipline = async (e: React.FormEvent) => {
  e.preventDefault();
  const payload = {
    category_title: disciplineForm.category_title,
    disciplines_list: disciplineForm.disciplines_list, // Saved directly as rich text HTML
    icon_name: disciplineForm.icon_name,
    display_order: disciplineForm.display_order
  };

  if (editingDiscipline) {
    const { error } = await supabase.from("home_disciplines").update(payload).eq("id", editingDiscipline.id);
    if (!error) { setShowDisciplineModal(false); loadHomeData(); } else { alert(error.message); }
  } else {
    const { error } = await supabase.from("home_disciplines").insert([payload]);
    if (!error) { setShowDisciplineModal(false); loadHomeData(); } else { alert(error.message); }
  }
};

  const handleSaveCta = async (e: React.FormEvent) => {
    e.preventDefault();
    let error;
    if (cta.id) {
      const res = await supabase.from("home_cta").update({ ...cta, updated_at: new Date().toISOString() }).eq("id", cta.id);
      error = res.error;
    } else {
      const { id, ...insertPayload } = cta;
      const res = await supabase.from("home_cta").insert([insertPayload]);
      error = res.error;
    }
    if (!error) { alert("CTA Banner updated!"); setShowCtaModal(false); loadHomeData(); } else { alert(error.message); }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Tab Navigation */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Manage Home Page</h2>
          <p className="text-sm text-slate-600 mt-1">Control all 11 sections of your homepage with rich formatting support.</p>
        </div>
        <div className="flex gap-1 bg-slate-100 p-1.5 rounded-xl flex-wrap">
          <button onClick={() => setSubTab("hero")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "hero" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>Hero</button>
          <button onClick={() => setSubTab("stats")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "stats" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>Stats</button>
          <button onClick={() => setSubTab("services")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "services" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>Services</button>
          <button onClick={() => setSubTab("why")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "why" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>Why Choose</button>
          <button onClick={() => setSubTab("process")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "process" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>Process</button>
          <button onClick={() => setSubTab("faqs")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "faqs" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>FAQs</button>
          <button onClick={() => setSubTab("about_preview")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "about_preview" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>About</button>
          <button onClick={() => setSubTab("ethics")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "ethics" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>Ethics</button>
          <button onClick={() => setSubTab("faculty")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "faculty" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>Faculty</button>
          <button onClick={() => setSubTab("disciplines")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "disciplines" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>Disciplines</button>
          <button onClick={() => setSubTab("cta")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "cta" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>CTA</button>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-500 font-medium bg-white rounded-2xl border border-slate-200">Loading Home page data...</div>
      ) : subTab === "hero" ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="font-bold text-slate-800 text-lg">Hero Section Content</h3>
            <button onClick={() => setShowHeroModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"><Pencil className="w-3.5 h-3.5" /> Edit Hero</button>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div><strong className="text-slate-600 block text-xs uppercase mb-1">Badge:</strong> {hero.badge}</div>
            <div><strong className="text-slate-600 block text-xs uppercase mb-1">Title:</strong> <span className="font-bold text-slate-900">{hero.title}</span></div>
            <div className="col-span-2"><strong className="text-slate-600 block text-xs uppercase mb-1">Description:</strong> <div dangerouslySetInnerHTML={{ __html: hero.description }} className="prose text-sm mt-1" /></div>
            <div><strong className="text-slate-600 block text-xs uppercase mb-1">Primary CTA:</strong> {hero.cta_text} ({hero.cta_link})</div>
            <div><strong className="text-slate-600 block text-xs uppercase mb-1">Secondary CTA:</strong> {hero.secondary_cta_text} ({hero.secondary_cta_link})</div>
          </div>
        </div>
      ) : subTab === "about_preview" ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="font-bold text-slate-800 text-lg">About Section Preview</h3>
            <button onClick={() => setShowAboutModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"><Pencil className="w-3.5 h-3.5" /> Edit About</button>
          </div>
          <div className="space-y-4 text-sm">
            <div><strong className="text-slate-600 block text-xs uppercase mb-1">Title:</strong> <span className="font-bold text-slate-900">{aboutPreview?.title || "Not set"}</span></div>
            <div><strong className="text-slate-600 block text-xs uppercase mb-1">Body HTML:</strong> <div dangerouslySetInnerHTML={{ __html: aboutPreview?.body_html || "" }} className="prose text-sm mt-1" /></div>
          </div>
        </div>
      ) : subTab === "cta" ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="font-bold text-slate-800 text-lg">Bottom CTA Banner</h3>
            <button onClick={() => setShowCtaModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"><Pencil className="w-3.5 h-3.5" /> Edit CTA</button>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="col-span-2"><strong className="text-slate-600 block text-xs uppercase mb-1">Badge:</strong> {cta?.badge_text}</div>
            <div><strong className="text-slate-600 block text-xs uppercase mb-1">Title:</strong> <span className="font-bold text-slate-900">{cta?.title}</span></div>
            <div><strong className="text-slate-600 block text-xs uppercase mb-1">Description:</strong> {cta?.description}</div>
            <div><strong className="text-slate-600 block text-xs uppercase mb-1">Primary Button:</strong> {cta?.primary_button_text} ({cta?.primary_button_link})</div>
            <div><strong className="text-slate-600 block text-xs uppercase mb-1">Secondary Button:</strong> {cta?.secondary_button_text} ({cta?.secondary_button_link})</div>
            <div className="col-span-2"><strong className="text-slate-600 block text-xs uppercase mb-1">Footer Stat:</strong> {cta?.footer_stat_text}</div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm capitalize">
              {subTab === "stats" ? "Stats Counters" : subTab === "services" ? "Services Grid" : subTab === "why" ? "Why Choose Us" : subTab === "process" ? "Process Steps" : subTab === "faqs" ? "FAQs" : subTab === "ethics" ? "Ethics & Promises" : subTab === "faculty" ? "Elite Faculty" : "Academic Disciplines"}
            </h3>
            <button onClick={() => {
              if (subTab === "stats") { setEditingStat(null); setStatForm({ metric_number: "", label: "", display_order: stats.length + 1 }); setShowStatModal(true); }
              else if (subTab === "services") { setEditingService(null); setServiceForm({ title: "", description: "", category: "PhD", badge: "", link_url: "", display_order: services.length + 1 }); setShowServiceModal(true); }
              else if (subTab === "why") { setEditingWhy(null); setWhyForm({ point_text: "", display_order: whyChoose.length + 1 }); setShowWhyModal(true); }
              else if (subTab === "process") { setEditingProcess(null); setProcessForm({ step_number: `0${processSteps.length + 1}`, stage_label: "STAGE", title: "", description: "", display_order: processSteps.length + 1 }); setShowProcessModal(true); }
              else if (subTab === "faqs") { setEditingFaq(null); setFaqForm({ question: "", answer: "", display_order: faqs.length + 1 }); setShowFaqModal(true); }
              else if (subTab === "ethics") { setEditingEthics(null); setEthicsForm({ point_number: ethics.length + 1, title: "", description: "" }); setShowEthicsModal(true); }
              else if (subTab === "faculty") { setEditingFaculty(null); setFacultyForm({ name: "", credentials: "", experience: "", specializations: "", image_url: "", linkedin_url: "", display_order: faculty.length + 1 }); setShowFacultyModal(true); }
              else if (subTab === "disciplines") { setEditingDiscipline(null); setDisciplineForm({ category_title: "", disciplines_list: "", icon_name: "", display_order: disciplines.length + 1 }); setShowDisciplineModal(true); }
            }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Add New
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-5 w-20 text-center">Order</th>
                <th className="p-5">Content Details</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {subTab === "stats" && stats.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/80">
                  <td className="p-5 text-center font-bold text-slate-500">{st.display_order}</td>
                  <td className="p-5 font-semibold text-slate-800 text-sm"><span className="text-indigo-600 font-extrabold mr-2">{st.metric_number}</span> {st.label}</td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { setEditingStat(st); setStatForm(st); setShowStatModal(true); }} aria-label={`Edit stat ${st.label}`} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => { if (window.confirm("Delete?")) { await supabase.from("home_stats").delete().eq("id", st.id); loadHomeData(); }}} aria-label={`Delete stat ${st.label}`} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {subTab === "services" && services.map((sv) => (
                <tr key={sv.id} className="hover:bg-slate-50/80">
                  <td className="p-5 text-center font-bold text-slate-500">{sv.display_order}</td>
                  <td className="p-5"><p className="font-bold text-slate-900 text-sm">{sv.title} <span className="ml-2 text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">{sv.category}</span></p></td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { setEditingService(sv); setServiceForm(sv); setShowServiceModal(true); }} aria-label={`Edit service ${sv.title}`} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => { if (window.confirm("Delete?")) { await supabase.from("home_services").delete().eq("id", sv.id); loadHomeData(); }}} aria-label={`Delete service ${sv.title}`} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {subTab === "why" && whyChoose.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50/80">
                  <td className="p-5 text-center font-bold text-slate-500">{w.display_order}</td>
                  <td className="p-5 font-semibold text-slate-900 text-sm">✓ <span dangerouslySetInnerHTML={{ __html: w.point_text }} /></td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { setEditingWhy(w); setWhyForm(w); setShowWhyModal(true); }} aria-label="Edit why choose point" className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => { if (window.confirm("Delete?")) { await supabase.from("home_why_choose").delete().eq("id", w.id); loadHomeData(); }}} aria-label="Delete why choose point" className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {subTab === "process" && processSteps.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80">
                  <td className="p-5 text-center font-extrabold text-indigo-600 text-lg">{p.step_number}</td>
                  <td className="p-5"><p className="font-bold text-slate-900 text-sm">{p.title}</p></td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { setEditingProcess(p); setProcessForm(p); setShowProcessModal(true); }} aria-label={`Edit process step ${p.title}`} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => { if (window.confirm("Delete?")) { await supabase.from("home_process").delete().eq("id", p.id); loadHomeData(); }}} aria-label={`Delete process step ${p.title}`} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {subTab === "faqs" && faqs.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/80">
                  <td className="p-5 text-center font-bold text-slate-500">{f.display_order}</td>
                  <td className="p-5"><p className="font-bold text-slate-900 text-sm">{f.question}</p></td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { setEditingFaq(f); setFaqForm(f); setShowFaqModal(true); }} aria-label={`Edit FAQ ${f.question}`} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => { if (window.confirm("Delete?")) { await supabase.from("home_faqs").delete().eq("id", f.id); loadHomeData(); }}} aria-label={`Delete FAQ ${f.question}`} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {subTab === "ethics" && ethics.map((eth) => (
                <tr key={eth.id} className="hover:bg-slate-50/80">
                  <td className="p-5 text-center font-bold text-slate-500">{eth.point_number}</td>
                  <td className="p-5"><p className="font-bold text-slate-900 text-sm">{eth.title}</p><p className="text-xs text-slate-600 mt-1">{eth.description}</p></td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { setEditingEthics(eth); setEthicsForm(eth); setShowEthicsModal(true); }} aria-label={`Edit ethic ${eth.title}`} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => { if (window.confirm("Delete?")) { await supabase.from("about_ethics").delete().eq("id", eth.id); loadHomeData(); }}} aria-label={`Delete ethic ${eth.title}`} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {subTab === "faculty" && faculty.map((fac) => (
                <tr key={fac.id} className="hover:bg-slate-50/80">
                  <td className="p-5 text-center font-bold text-slate-500">{fac.display_order}</td>
                  <td className="p-5"><p className="font-bold text-slate-900 text-sm">{fac.name} <span className="text-xs text-slate-600 font-normal">({fac.credentials})</span></p><p className="text-xs text-slate-600 mt-0.5">{fac.specializations?.join(', ')}</p><p className="text-xs text-indigo-500 mt-0.5 break-all">{fac.linkedin_url}</p></td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { setEditingFaculty(fac); setFacultyForm({ ...fac, specializations: fac.specializations?.join(', ') || "" }); setShowFacultyModal(true); }} aria-label={`Edit faculty ${fac.name}`} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => { if (window.confirm("Delete?")) { await supabase.from("about_faculty").delete().eq("id", fac.id); loadHomeData(); }}} aria-label={`Delete faculty ${fac.name}`} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
              {subTab === "disciplines" && disciplines.map((disc) => (
                <tr key={disc.id} className="hover:bg-slate-50/80">
                  <td className="p-5 text-center font-bold text-slate-500">{disc.display_order}</td>
                  <td className="p-5"><p className="font-bold text-slate-900 text-sm">{disc.category_title}</p><p className="text-xs text-slate-600 mt-1">{disc.disciplines_list?.join(', ')}</p></td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { setEditingDiscipline(disc); setDisciplineForm({ ...disc, disciplines_list: disc.disciplines_list?.join(', ') || "" }); setShowDisciplineModal(true); }} aria-label={`Edit discipline category ${disc.category_title}`} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => { if (window.confirm("Delete?")) { await supabase.from("home_disciplines").delete().eq("id", disc.id); loadHomeData(); }}} aria-label={`Delete discipline category ${disc.category_title}`} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- ALL MODALS --- */}
      {showHeroModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveHero} className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col p-8 space-y-4">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-bold text-slate-900">Edit Hero Section</h3>
              <button type="button" onClick={() => setShowHeroModal(false)} aria-label="Close hero modal"><X className="w-5 h-5 text-slate-500 hover:text-slate-800"/></button>
            </div>
            <div>
              <label htmlFor="hero-badge" className="block text-xs font-bold uppercase text-slate-600 mb-1">Badge</label>
              <input id="hero-badge" value={hero.badge || ""} onChange={e => setHero({...hero, badge: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="hero-title" className="block text-xs font-bold uppercase text-slate-600">Title (HTML)</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("title", hero, setHero, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertFormatting("title", hero, setHero, "<em>", "</em>")} title="Italic" className="p-1.5 hover:bg-white rounded"><Italic className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("title", hero, setHero)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <textarea id="hero-title" rows={2} value={hero.title || ""} onChange={e => setHero({...hero, title: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="hero-desc" className="block text-xs font-bold uppercase text-slate-600">Description (HTML)</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("description", hero, setHero, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertFormatting("description", hero, setHero, "<em>", "</em>")} title="Italic" className="p-1.5 hover:bg-white rounded"><Italic className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("description", hero, setHero)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertFormatting("description", hero, setHero, "<h3>", "</h3>")} title="Heading" className="p-1.5 hover:bg-white rounded"><Heading1 className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertFormatting("description", hero, setHero, "<blockquote>", "</blockquote>")} title="Quote" className="p-1.5 hover:bg-white rounded"><Quote className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <textarea id="hero-desc" rows={4} value={hero.description || ""} onChange={e => setHero({...hero, description: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="hero-cta-text" className="block text-xs font-bold uppercase text-slate-600 mb-1">Primary CTA Text</label>
                <input id="hero-cta-text" value={hero.cta_text || ""} onChange={e => setHero({...hero, cta_text: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label htmlFor="hero-cta-link" className="block text-xs font-bold uppercase text-slate-600 mb-1">Primary CTA Link</label>
                <input id="hero-cta-link" value={hero.cta_link || ""} onChange={e => setHero({...hero, cta_link: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button type="button" onClick={() => setShowHeroModal(false)} className="px-5 py-2.5 text-sm text-slate-700 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">Save Hero</button>
            </div>
          </form>
        </div>
      )}

      {showStatModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveStat} className="bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{editingStat ? "Edit Stat" : "Add Stat"}</h3>
            <div>
              <label htmlFor="stat-number" className="block text-xs font-bold uppercase text-slate-600 mb-1">Metric Number</label>
              <input id="stat-number" required value={statForm.metric_number} onChange={e => setStatForm({...statForm, metric_number: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <label htmlFor="stat-label" className="block text-xs font-bold uppercase text-slate-600 mb-1">Label</label>
              <input id="stat-label" required value={statForm.label} onChange={e => setStatForm({...statForm, label: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <label htmlFor="stat-order" className="block text-xs font-bold uppercase text-slate-600 mb-1">Display Order</label>
              <input id="stat-order" type="number" required value={statForm.display_order} onChange={e => setStatForm({...statForm, display_order: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowStatModal(false)} className="px-5 py-2.5 text-sm text-slate-700 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold">Save Stat</button>
            </div>
          </form>
        </div>
      )}

      {showServiceModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveService} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{editingService ? "Edit Service" : "Add Service"}</h3>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="home-service-title" className="block text-xs font-bold uppercase text-slate-600">Title</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("title", serviceForm, setServiceForm, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("title", serviceForm, setServiceForm)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <input id="home-service-title" required value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="home-service-desc" className="block text-xs font-bold uppercase text-slate-600">Description</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("description", serviceForm, setServiceForm, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("description", serviceForm, setServiceForm)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <textarea id="home-service-desc" rows={3} required value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="home-service-cat" className="block text-xs font-bold uppercase text-slate-600 mb-1">Category</label>
                <input id="home-service-cat" required value={serviceForm.category} onChange={e => setServiceForm({...serviceForm, category: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label htmlFor="home-service-order" className="block text-xs font-bold uppercase text-slate-600 mb-1">Display Order</label>
                <input id="home-service-order" type="number" required value={serviceForm.display_order} onChange={e => setServiceForm({...serviceForm, display_order: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowServiceModal(false)} className="px-5 py-2.5 text-sm text-slate-700 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold">Save Service</button>
            </div>
          </form>
        </div>
      )}

      {showWhyModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveWhy} className="bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{editingWhy ? "Edit Point" : "Add Why Choose Point"}</h3>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="why-point-text" className="block text-xs font-bold uppercase text-slate-600">Point Text</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("point_text", whyForm, setWhyForm, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("point_text", whyForm, setWhyForm)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <textarea id="why-point-text" rows={3} required value={whyForm.point_text} onChange={e => setWhyForm({...whyForm, point_text: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div>
              <label htmlFor="why-point-order" className="block text-xs font-bold uppercase text-slate-600 mb-1">Display Order</label>
              <input id="why-point-order" type="number" required value={whyForm.display_order} onChange={e => setWhyForm({...whyForm, display_order: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowWhyModal(false)} className="px-5 py-2.5 text-sm text-slate-700 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold">Save Point</button>
            </div>
          </form>
        </div>
      )}

      {showProcessModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveProcess} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{editingProcess ? "Edit Process Step" : "Add Process Step"}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="process-step-num" className="block text-xs font-bold uppercase text-slate-600 mb-1">Step Number</label>
                <input id="process-step-num" required value={processForm.step_number} onChange={e => setProcessForm({...processForm, step_number: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label htmlFor="process-step-order" className="block text-xs font-bold uppercase text-slate-600 mb-1">Display Order</label>
                <input id="process-step-order" type="number" required value={processForm.display_order} onChange={e => setProcessForm({...processForm, display_order: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="process-step-title" className="block text-xs font-bold uppercase text-slate-600">Title</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("title", processForm, setProcessForm, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("title", processForm, setProcessForm)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <input id="process-step-title" required value={processForm.title} onChange={e => setProcessForm({...processForm, title: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="process-step-desc" className="block text-xs font-bold uppercase text-slate-600">Description</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("description", processForm, setProcessForm, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("description", processForm, setProcessForm)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <textarea id="process-step-desc" rows={3} required value={processForm.description} onChange={e => setProcessForm({...processForm, description: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowProcessModal(false)} className="px-5 py-2.5 text-sm text-slate-700 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold">Save Step</button>
            </div>
          </form>
        </div>
      )}

      {showFaqModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveFaq} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{editingFaq ? "Edit FAQ" : "Add FAQ"}</h3>
            <div>
              <label htmlFor="faq-question" className="block text-xs font-bold uppercase text-slate-600 mb-1">Question</label>
              <input id="faq-question" required value={faqForm.question} onChange={e => setFaqForm({...faqForm, question: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="faq-answer" className="block text-xs font-bold uppercase text-slate-600">Answer</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("answer", faqForm, setFaqForm, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("answer", faqForm, setFaqForm)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <textarea id="faq-answer" rows={4} required value={faqForm.answer} onChange={e => setFaqForm({...faqForm, answer: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div>
              <label htmlFor="faq-order" className="block text-xs font-bold uppercase text-slate-600 mb-1">Display Order</label>
              <input id="faq-order" type="number" required value={faqForm.display_order} onChange={e => setFaqForm({...faqForm, display_order: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowFaqModal(false)} className="px-5 py-2.5 text-sm text-slate-700 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold">Save FAQ</button>
            </div>
          </form>
        </div>
      )}

      {showAboutModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveAboutPreview} className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Edit About Preview</h3>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="about-title" className="block text-xs font-bold uppercase text-slate-600">Title</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("title", aboutPreview, setAboutPreview, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("title", aboutPreview, setAboutPreview)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <input id="about-title" required value={aboutPreview.title || ""} onChange={e => setAboutPreview({...aboutPreview, title: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="about-body" className="block text-xs font-bold uppercase text-slate-600">Body Content (HTML)</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("body_html", aboutPreview, setAboutPreview, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("body_html", aboutPreview, setAboutPreview)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <textarea id="about-body" rows={6} required value={aboutPreview.body_html || ""} onChange={e => setAboutPreview({...aboutPreview, body_html: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowAboutModal(false)} className="px-5 py-2.5 text-sm text-slate-700 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold">Save About</button>
            </div>
          </form>
        </div>
      )}

      {showEthicsModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveEthics} className="bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{editingEthics ? "Edit Ethic Point" : "Add Ethic Point"}</h3>
            <div>
              <label htmlFor="ethic-num" className="block text-xs font-bold uppercase text-slate-600 mb-1">Point Number</label>
              <input id="ethic-num" type="number" required value={ethicsForm.point_number} onChange={e => setEthicsForm({...ethicsForm, point_number: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="ethic-title" className="block text-xs font-bold uppercase text-slate-600">Title</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("title", ethicsForm, setEthicsForm, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("title", ethicsForm, setEthicsForm)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <input id="ethic-title" required value={ethicsForm.title} onChange={e => setEthicsForm({...ethicsForm, title: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="ethic-desc" className="block text-xs font-bold uppercase text-slate-600">Description</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("description", ethicsForm, setEthicsForm, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("description", ethicsForm, setEthicsForm)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <textarea id="ethic-desc" rows={4} required value={ethicsForm.description} onChange={e => setEthicsForm({...ethicsForm, description: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowEthicsModal(false)} className="px-5 py-2.5 text-sm text-slate-700 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold">Save Point</button>
            </div>
          </form>
        </div>
      )}

      {showFacultyModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveFaculty} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{editingFaculty ? "Edit Faculty" : "Add Faculty"}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="faculty-name" className="block text-xs font-bold uppercase text-slate-600 mb-1">Name</label>
                <input id="faculty-name" required value={facultyForm.name} onChange={e => setFacultyForm({...facultyForm, name: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label htmlFor="faculty-order" className="block text-xs font-bold uppercase text-slate-600 mb-1">Display Order</label>
                <input id="faculty-order" type="number" required value={facultyForm.display_order} onChange={e => setFacultyForm({...facultyForm, display_order: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
            </div>
            <div>
              <label htmlFor="faculty-cred" className="block text-xs font-bold uppercase text-slate-600 mb-1">Credentials</label>
              <input id="faculty-cred" required value={facultyForm.credentials} onChange={e => setFacultyForm({...facultyForm, credentials: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <label htmlFor="faculty-specs" className="block text-xs font-bold uppercase text-slate-600 mb-1">Specializations (Comma separated)</label>
              <input id="faculty-specs" required value={facultyForm.specializations} onChange={e => setFacultyForm({...facultyForm, specializations: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <label htmlFor="faculty-linkedin" className="block text-xs font-bold uppercase text-slate-600 mb-1">LinkedIn Profile URL</label>
              <input id="faculty-linkedin" value={facultyForm.linkedin_url || ""} onChange={e => setFacultyForm({...facultyForm, linkedin_url: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" placeholder="https://linkedin.com/in/..." />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowFacultyModal(false)} className="px-5 py-2.5 text-sm text-slate-700 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold">Save Faculty</button>
            </div>
          </form>
        </div>
      )}

      {showDisciplineModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveDiscipline} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{editingDiscipline ? "Edit Discipline Category" : "Add Category"}</h3>
            
            {/* Category Title with Rich Text & Link Formatting */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="disc-title" className="block text-xs font-bold uppercase text-slate-600">Category Title (HTML)</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("category_title", disciplineForm, setDisciplineForm, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded cursor-pointer"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("category_title", disciplineForm, setDisciplineForm)} title="Hyperlink" className="p-1.5 hover:bg-white rounded cursor-pointer"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <input id="disc-title" required value={disciplineForm.category_title} onChange={e => setDisciplineForm({...disciplineForm, category_title: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>

            {/* Disciplines List with Rich Text & Link Formatting */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="disc-list" className="block text-xs font-bold uppercase text-slate-600">Disciplines List (HTML / Links)</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("disciplines_list", disciplineForm, setDisciplineForm, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded cursor-pointer"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("disciplines_list", disciplineForm, setDisciplineForm)} title="Hyperlink" className="p-1.5 hover:bg-white rounded cursor-pointer"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <textarea id="disc-list" rows={4} required value={disciplineForm.disciplines_list} onChange={e => setDisciplineForm({...disciplineForm, disciplines_list: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" placeholder="Add disciplines with HTML tags or links..." />
            </div>

            <div>
              <label htmlFor="disc-order" className="block text-xs font-bold uppercase text-slate-600 mb-1">Display Order</label>
              <input id="disc-order" type="number" required value={disciplineForm.display_order} onChange={e => setDisciplineForm({...disciplineForm, display_order: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowDisciplineModal(false)} className="px-5 py-2.5 text-sm text-slate-700 font-semibold cursor-pointer">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 cursor-pointer">Save Category</button>
            </div>
          </form>
        </div>
      )}

      {showCtaModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveCta} className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Edit CTA Banner</h3>
            <div>
              <label htmlFor="cta-badge" className="block text-xs font-bold uppercase text-slate-600 mb-1">Badge Text</label>
              <input id="cta-badge" value={cta.badge_text || ""} onChange={e => setCta({...cta, badge_text: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="cta-title" className="block text-xs font-bold uppercase text-slate-600">Title</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("title", cta, setCta, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("title", cta, setCta)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <input id="cta-title" required value={cta.title || ""} onChange={e => setCta({...cta, title: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="cta-desc" className="block text-xs font-bold uppercase text-slate-600">Description</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("description", cta, setCta, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("description", cta, setCta)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <textarea id="cta-desc" rows={3} required value={cta.description || ""} onChange={e => setCta({...cta, description: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cta-btn-text" className="block text-xs font-bold uppercase text-slate-600 mb-1">Primary Button Text</label>
                <input id="cta-btn-text" required value={cta.primary_button_text || ""} onChange={e => setCta({...cta, primary_button_text: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label htmlFor="cta-btn-link" className="block text-xs font-bold uppercase text-slate-600 mb-1">Primary Button Link</label>
                <input id="cta-btn-link" required value={cta.primary_button_link || ""} onChange={e => setCta({...cta, primary_button_link: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button type="button" onClick={() => setShowCtaModal(false)} className="px-5 py-2.5 text-sm text-slate-700 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold">Save CTA</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}