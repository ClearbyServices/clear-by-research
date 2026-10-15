"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Pencil, Trash2, X, Plus, Bold, Italic, Heading1, Quote, Link as LinkIcon } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function HomeTab() {
  const [subTab, setSubTab] = useState<"hero" | "stats" | "services" | "why" | "process" | "faqs">("hero");

  // States
  const [hero, setHero] = useState({ id: "", badge: "", title: "", description: "", cta_text: "", cta_link: "", secondary_cta_text: "", secondary_cta_link: "" });
  const [stats, setStats] = useState<{ id: string; metric_number: string; label: string; display_order: number }[]>([]);
  const [services, setServices] = useState<{
    id: string;
    title: string;
    description: string;
    category: string;
    badge: string;
    link_url: string;
    display_order: number;
  }[]>([]);
  const [whyChoose, setWhyChoose] = useState<{ id: string; point_text: string; display_order: number }[]>([]);
  const [processSteps, setProcessSteps] = useState<{
    id: string;
    step_number: string;
    stage_label: string;
    title: string;
    description: string;
    display_order: number;
  }[]>([]);
  const [faqs, setFaqs] = useState<{
    id: string;
    question: string;
    answer: string;
    display_order: number;
  }[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [showStatModal, setShowStatModal] = useState(false);
  const [editingStat, setEditingStat] = useState<{ id: string; metric_number: string; label: string; display_order: number } | null>(null);
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

  const loadHomeData = async () => {
    try {
      const hRes = await supabase.from("home_hero").select("*").limit(1).maybeSingle();
      const sRes = await supabase.from("home_stats").select("*").order("display_order", { ascending: true });
      const svRes = await supabase.from("home_services").select("*").order("display_order", { ascending: true });
      const wRes = await supabase.from("home_why_choose").select("*").order("display_order", { ascending: true });
      const pRes = await supabase.from("home_process").select("*").order("display_order", { ascending: true });
      const fRes = await supabase.from("home_faqs").select("*").order("display_order", { ascending: true });

      if (hRes.data) setHero(hRes.data);
      if (sRes.data) setStats(sRes.data);
      if (svRes.data) setServices(svRes.data);
      if (wRes.data) setWhyChoose(wRes.data);
      if (pRes.data) setProcessSteps(pRes.data);
      if (fRes.data) setFaqs(fRes.data);
    } catch (err) {
      console.error("Error loading home data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  // Helper to insert formatting tags into text areas
  const insertFormatting = <T extends object, K extends keyof T>(
    field: K,
    formState: T,
    setFormState: React.Dispatch<React.SetStateAction<T>>,
    tagOpen: string,
    tagClose: string
  ) => {
    const val = String(formState[field] ?? "");
    setFormState({ ...formState, [field]: val + `${tagOpen}text${tagClose}` } as T);
  };

  const insertLink = <T extends object, K extends keyof T>(
    field: K,
    formState: T,
    setFormState: React.Dispatch<React.SetStateAction<T>>
  ) => {
    const url = prompt("Enter hyperlink URL (e.g. /services or https://...):");
    if (!url) return;
    const val = String(formState[field] ?? "");
    setFormState({ ...formState, [field]: val + `<a href="${url}" class="text-indigo-600 underline" target="_blank">link text</a>` } as T);
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("home_hero").update({
      badge: hero.badge,
      title: hero.title,
      description: hero.description,
      cta_text: hero.cta_text,
      cta_link: hero.cta_link,
      secondary_cta_text: hero.secondary_cta_text,
      secondary_cta_link: hero.secondary_cta_link,
      updated_at: new Date().toISOString()
    }).eq("id", hero.id);

    if (!error) {
      alert("Hero section updated successfully!");
      setShowHeroModal(false);
      loadHomeData();
    } else {
      alert(`Error: ${error.message}`);
    }
  };

  const handleSaveStat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStat) {
      const { error } = await supabase.from("home_stats").update(statForm).eq("id", editingStat.id);
      if (!error) { setShowStatModal(false); loadHomeData(); }
    } else {
      const { error } = await supabase.from("home_stats").insert([statForm]);
      if (!error) { setShowStatModal(false); loadHomeData(); }
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      const { error } = await supabase.from("home_services").update(serviceForm).eq("id", editingService.id);
      if (!error) { setShowServiceModal(false); loadHomeData(); }
    } else {
      const { error } = await supabase.from("home_services").insert([serviceForm]);
      if (!error) { setShowServiceModal(false); loadHomeData(); }
    }
  };

  const handleSaveWhy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWhy) {
      const { error } = await supabase.from("home_why_choose").update(whyForm).eq("id", editingWhy.id);
      if (!error) { setShowWhyModal(false); loadHomeData(); }
    } else {
      const { error } = await supabase.from("home_why_choose").insert([whyForm]);
      if (!error) { setShowWhyModal(false); loadHomeData(); }
    }
  };

  const handleSaveProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProcess) {
      const { error } = await supabase.from("home_process").update(processForm).eq("id", editingProcess.id);
      if (!error) { setShowProcessModal(false); loadHomeData(); }
    } else {
      const { error } = await supabase.from("home_process").insert([processForm]);
      if (!error) { setShowProcessModal(false); loadHomeData(); }
    }
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaq) {
      const { error } = await supabase.from("home_faqs").update(faqForm).eq("id", editingFaq.id);
      if (!error) { setShowFaqModal(false); loadHomeData(); }
    } else {
      const { error } = await supabase.from("home_faqs").insert([faqForm]);
      if (!error) { setShowFaqModal(false); loadHomeData(); }
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Manage Home Page</h2>
          <p className="text-sm text-slate-500 mt-1">Control your homepage hero, stats, services grid, process steps, and FAQs with full rich formatting support.</p>
        </div>
        <div className="flex gap-1 bg-slate-100 p-1.5 rounded-xl flex-wrap">
          <button onClick={() => setSubTab("hero")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "hero" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>Hero Section</button>
          <button onClick={() => setSubTab("stats")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "stats" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>Stats ({stats.length})</button>
          <button onClick={() => setSubTab("services")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "services" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>Services ({services.length})</button>
          <button onClick={() => setSubTab("why")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "why" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>Why Choose ({whyChoose.length})</button>
          <button onClick={() => setSubTab("process")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "process" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>Process Steps ({processSteps.length})</button>
          <button onClick={() => setSubTab("faqs")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "faqs" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>FAQs ({faqs.length})</button>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 font-medium bg-white rounded-2xl border border-slate-200">Loading Home page data...</div>
      ) : subTab === "hero" ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h3 className="font-bold text-slate-800 text-lg">Hero Section Content</h3>
            <button onClick={() => setShowHeroModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer flex items-center gap-1.5">
              <Pencil className="w-3.5 h-3.5" /> Edit Hero
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div><strong className="text-slate-400 block text-xs uppercase mb-1">Badge:</strong> {hero.badge}</div>
            <div><strong className="text-slate-400 block text-xs uppercase mb-1">Title:</strong> <span className="font-bold text-slate-900">{hero.title}</span></div>
            <div className="col-span-2"><strong className="text-slate-400 block text-xs uppercase mb-1">Description:</strong> <div dangerouslySetInnerHTML={{ __html: hero.description }} className="prose text-sm mt-1" /></div>
            <div><strong className="text-slate-400 block text-xs uppercase mb-1">Primary CTA:</strong> {hero.cta_text} ({hero.cta_link})</div>
            <div><strong className="text-slate-400 block text-xs uppercase mb-1">Secondary CTA:</strong> {hero.secondary_cta_text} ({hero.secondary_cta_link})</div>
          </div>
        </div>
      ) : subTab === "stats" ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm">Stats Counters</h3>
            <button onClick={() => { setEditingStat(null); setStatForm({ metric_number: "", label: "", display_order: stats.length + 1 }); setShowStatModal(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Add Stat
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-5 w-20 text-center">Order</th>
                <th className="p-5">Metric</th>
                <th className="p-5">Label</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/80">
                  <td className="p-5 text-center font-bold text-slate-400">{st.display_order}</td>
                  <td className="p-5 font-extrabold text-indigo-600 text-lg">{st.metric_number}</td>
                  <td className="p-5 font-semibold text-slate-800 text-sm">{st.label}</td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { setEditingStat(st); setStatForm(st); setShowStatModal(true); }} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl transition-colors cursor-pointer"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => { if (window.confirm("Delete stat?")) { await supabase.from("home_stats").delete().eq("id", st.id); loadHomeData(); }}} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : subTab === "services" ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm">Services Grid</h3>
            <button onClick={() => { setEditingService(null); setServiceForm({ title: "", description: "", category: "PhD", badge: "", link_url: "", display_order: services.length + 1 }); setShowServiceModal(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Add Service Card
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-5 w-20 text-center">Order</th>
                <th className="p-5">Service Title & Description</th>
                <th className="p-5">Category</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((sv) => (
                <tr key={sv.id} className="hover:bg-slate-50/80">
                  <td className="p-5 text-center font-bold text-slate-400">{sv.display_order}</td>
                  <td className="p-5">
                    <p className="font-bold text-slate-900 text-sm">{sv.title}</p>
                    <div dangerouslySetInnerHTML={{ __html: sv.description }} className="text-xs text-slate-500 mt-0.5" />
                  </td>
                  <td className="p-5"><span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-full">{sv.category}</span></td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { setEditingService(sv); setServiceForm(sv); setShowServiceModal(true); }} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl transition-colors cursor-pointer"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => { if (window.confirm("Delete service?")) { await supabase.from("home_services").delete().eq("id", sv.id); loadHomeData(); }}} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : subTab === "why" ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm">Why Choose Us Points</h3>
            <button onClick={() => { setEditingWhy(null); setWhyForm({ point_text: "", display_order: whyChoose.length + 1 }); setShowWhyModal(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Add Point
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-5 w-20 text-center">Order</th>
                <th className="p-5">Value Proposition Text</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {whyChoose.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50/80">
                  <td className="p-5 text-center font-bold text-slate-400">{w.display_order}</td>
                  <td className="p-5 font-semibold text-slate-900 text-sm">
                    ✓ <span dangerouslySetInnerHTML={{ __html: w.point_text }} />
                  </td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { setEditingWhy(w); setWhyForm(w); setShowWhyModal(true); }} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl transition-colors cursor-pointer"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => { if (window.confirm("Delete point?")) { await supabase.from("home_why_choose").delete().eq("id", w.id); loadHomeData(); }}} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : subTab === "process" ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm">Guidance Process Steps</h3>
            <button onClick={() => { setEditingProcess(null); setProcessForm({ step_number: `0${processSteps.length + 1}`, stage_label: "STAGE", title: "", description: "", display_order: processSteps.length + 1 }); setShowProcessModal(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Add Process Step
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-5 w-20 text-center">Step</th>
                <th className="p-5">Title & Description</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {processSteps.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80">
                  <td className="p-5 text-center font-extrabold text-indigo-600 text-lg">{p.step_number}</td>
                  <td className="p-5">
                    <p className="font-bold text-slate-900 text-sm">{p.title}</p>
                    <div dangerouslySetInnerHTML={{ __html: p.description }} className="text-xs text-slate-500 mt-0.5" />
                  </td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { setEditingProcess(p); setProcessForm(p); setShowProcessModal(true); }} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl transition-colors cursor-pointer"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => { if (window.confirm("Delete step?")) { await supabase.from("home_process").delete().eq("id", p.id); loadHomeData(); }}} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm">Frequently Asked Questions</h3>
            <button onClick={() => { setEditingFaq(null); setFaqForm({ question: "", answer: "", display_order: faqs.length + 1 }); setShowFaqModal(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Add FAQ
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-5 w-20 text-center">Order</th>
                <th className="p-5">Question & Answer</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {faqs.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/80">
                  <td className="p-5 text-center font-bold text-slate-400">{f.display_order}</td>
                  <td className="p-5">
                    <p className="font-bold text-slate-900 text-sm">{f.question}</p>
                    <div dangerouslySetInnerHTML={{ __html: f.answer }} className="text-xs text-slate-500 mt-1" />
                  </td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { setEditingFaq(f); setFaqForm(f); setShowFaqModal(true); }} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl transition-colors cursor-pointer"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => { if (window.confirm("Delete FAQ?")) { await supabase.from("home_faqs").delete().eq("id", f.id); loadHomeData(); }}} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* HERO EDIT MODAL */}
      {showHeroModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveHero} className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col p-8 space-y-4">
            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="text-lg font-bold text-slate-900">Edit Hero Section</h3>
              <button type="button" onClick={() => setShowHeroModal(false)}><X className="w-5 h-5 text-slate-400"/></button>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Badge</label>
              <input value={hero.badge || ""} onChange={e => setHero({...hero, badge: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Title</label>
              <textarea rows={2} value={hero.title || ""} onChange={e => setHero({...hero, title: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold uppercase text-slate-400">Description (HTML / Rich Text)</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("description", hero, setHero, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertFormatting("description", hero, setHero, "<em>", "</em>")} title="Italic" className="p-1.5 hover:bg-white rounded"><Italic className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("description", hero, setHero)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertFormatting("description", hero, setHero, "<h3>", "</h3>")} title="Heading" className="p-1.5 hover:bg-white rounded"><Heading1 className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertFormatting("description", hero, setHero, "<blockquote>", "</blockquote>")} title="Quote" className="p-1.5 hover:bg-white rounded"><Quote className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <textarea rows={4} value={hero.description || ""} onChange={e => setHero({...hero, description: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Primary CTA Text</label>
                <input value={hero.cta_text || ""} onChange={e => setHero({...hero, cta_text: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Primary CTA Link</label>
                <input value={hero.cta_link || ""} onChange={e => setHero({...hero, cta_link: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button type="button" onClick={() => setShowHeroModal(false)} className="px-5 py-2.5 text-sm text-slate-600 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">Save Hero</button>
            </div>
          </form>
        </div>
      )}

      {/* STAT MODAL */}
      {showStatModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveStat} className="bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{editingStat ? "Edit Stat" : "Add Stat"}</h3>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Metric Number (e.g. 11+)</label>
              <input required value={statForm.metric_number} onChange={e => setStatForm({...statForm, metric_number: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Label</label>
              <input required value={statForm.label} onChange={e => setStatForm({...statForm, label: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Display Order</label>
              <input type="number" required value={statForm.display_order} onChange={e => setStatForm({...statForm, display_order: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowStatModal(false)} className="px-5 py-2.5 text-sm text-slate-600 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold">Save Stat</button>
            </div>
          </form>
        </div>
      )}

      {/* SERVICE MODAL */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveService} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{editingService ? "Edit Service" : "Add Service"}</h3>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Title</label>
              <input required value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold uppercase text-slate-400">Description</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("description", serviceForm, setServiceForm, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("description", serviceForm, setServiceForm)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <textarea rows={3} required value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Category</label>
                <input required value={serviceForm.category} onChange={e => setServiceForm({...serviceForm, category: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Display Order</label>
                <input type="number" required value={serviceForm.display_order} onChange={e => setServiceForm({...serviceForm, display_order: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowServiceModal(false)} className="px-5 py-2.5 text-sm text-slate-600 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold">Save Service</button>
            </div>
          </form>
        </div>
      )}

      {/* WHY MODAL */}
      {showWhyModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveWhy} className="bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{editingWhy ? "Edit Point" : "Add Why Choose Point"}</h3>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold uppercase text-slate-400">Point Text</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("point_text", whyForm, setWhyForm, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("point_text", whyForm, setWhyForm)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <textarea rows={3} required value={whyForm.point_text} onChange={e => setWhyForm({...whyForm, point_text: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Display Order</label>
              <input type="number" required value={whyForm.display_order} onChange={e => setWhyForm({...whyForm, display_order: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowWhyModal(false)} className="px-5 py-2.5 text-sm text-slate-600 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold">Save Point</button>
            </div>
          </form>
        </div>
      )}

      {/* PROCESS MODAL */}
      {showProcessModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveProcess} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{editingProcess ? "Edit Process Step" : "Add Process Step"}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Step Number (e.g. 01)</label>
                <input required value={processForm.step_number} onChange={e => setProcessForm({...processForm, step_number: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Display Order</label>
                <input type="number" required value={processForm.display_order} onChange={e => setProcessForm({...processForm, display_order: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Title</label>
              <input required value={processForm.title} onChange={e => setProcessForm({...processForm, title: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold uppercase text-slate-400">Description</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("description", processForm, setProcessForm, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("description", processForm, setProcessForm)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <textarea rows={3} required value={processForm.description} onChange={e => setProcessForm({...processForm, description: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowProcessModal(false)} className="px-5 py-2.5 text-sm text-slate-600 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold">Save Step</button>
            </div>
          </form>
        </div>
      )}

      {/* FAQ MODAL */}
      {showFaqModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveFaq} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col p-8 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{editingFaq ? "Edit FAQ" : "Add FAQ"}</h3>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Question</label>
              <input required value={faqForm.question} onChange={e => setFaqForm({...faqForm, question: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold uppercase text-slate-400">Answer</label>
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                  <button type="button" onClick={() => insertFormatting("answer", faqForm, setFaqForm, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                  <button type="button" onClick={() => insertLink("answer", faqForm, setFaqForm)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                </div>
              </div>
              <textarea rows={4} required value={faqForm.answer} onChange={e => setFaqForm({...faqForm, answer: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Display Order</label>
              <input type="number" required value={faqForm.display_order} onChange={e => setFaqForm({...faqForm, display_order: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={() => setShowFaqModal(false)} className="px-5 py-2.5 text-sm text-slate-600 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold">Save FAQ</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}