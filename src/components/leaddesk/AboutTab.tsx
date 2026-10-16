"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import { Pencil, Trash2, X, Plus, ExternalLink, Bold, Italic, Link as LinkIcon } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface AboutSection {
  id?: number;
  section_key: string;
  badge?: string;
  title?: string;
  subtitle?: string;
  body_html?: string;
  display_order?: number;
}

interface EthicsPoint {
  id?: number;
  point_number: number;
  title: string;
  description: string;
}

interface CoreValue {
  id?: number;
  title: string;
  description: string;
  display_order?: number;
}

interface FacultyMember {
  id?: string;
  name: string;
  title?: string;
  credentials?: string;
  experience: string;
  specs?: string[];
  specializations?: string[];
  linkedin_url?: string;
  display_order?: number;
}

export default function AboutTab() {
  const [subTab, setSubTab] = useState<"sections" | "ethics" | "values" | "faculty">("sections");
  
  // Data States
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [ethics, setEthics] = useState<EthicsPoint[]>([]);
  const [values, setValues] = useState<CoreValue[]>([]);
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals & Editing States
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [editingSection, setEditingSection] = useState<AboutSection | null>(null);

  const [showEthicsModal, setShowEthicsModal] = useState(false);
  const [editingEthics, setEditingEthics] = useState<EthicsPoint | null>(null);
  const [ethicsForm, setEthicsForm] = useState<EthicsPoint>({ point_number: 1, title: "", description: "" });

  const [showValueModal, setShowValueModal] = useState(false);
  const [editingValue, setEditingValue] = useState<CoreValue | null>(null);
  const [valueForm, setValueForm] = useState<CoreValue>({ title: "", description: "", display_order: 1 });

  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<FacultyMember | null>(null);
  const [facultyForm, setFacultyForm] = useState({ name: "", title: "", experience: "", specsString: "", linkedin_url: "", display_order: 1 });

  const loadAllAboutData = useCallback(async () => {
    setLoading(true);
    try {
      const [secRes, ethRes, valRes, facRes] = await Promise.all([
        supabase.from("about_sections").select("*").order("display_order", { ascending: true }),
        supabase.from("about_ethics").select("*").order("point_number", { ascending: true }),
        supabase.from("about_core_values").select("*").order("display_order", { ascending: true }),
        supabase.from("about_faculty").select("*").order("display_order", { ascending: true })
      ]);

      if (secRes.data) setSections(secRes.data);
      if (ethRes.data) setEthics(ethRes.data);
      if (valRes.data) setValues(valRes.data);
      if (facRes.data) setFaculty(facRes.data);

      if (ethRes.error) console.error("Error fetching about_ethics:", ethRes.error.message);
      if (valRes.error) console.error("Error fetching about_core_values:", valRes.error.message);
    } catch (err) {
      console.error("Error loading about data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadAllAboutData();
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadAllAboutData]);

  // --- Rich Text Handlers ---
  const insertFormatting = <T,>(
    field: keyof T,
    formState: T,
    setFormState: React.Dispatch<React.SetStateAction<T | null>>,
    tagOpen: string,
    tagClose: string
  ) => {
    const val = String(formState[field] ?? "");
    setFormState((current) => current ? { ...current, [field]: val + `${tagOpen}text${tagClose}` } : current);
  };

  const insertLink = <T,>(
    field: keyof T,
    formState: T,
    setFormState: React.Dispatch<React.SetStateAction<T | null>>
  ) => {
    const url = prompt("Enter hyperlink URL:");
    if (!url) return;
    const val = String(formState[field] ?? "");
    setFormState((current) => current ? { ...current, [field]: val + `<a href="${url}" class="text-indigo-600 underline" target="_blank">link text</a>` } : current);
  };

  // --- SAVE HANDLERS ---
  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;
    const { error } = await supabase.from("about_sections").update({
      badge: editingSection.badge,
      title: editingSection.title,
      subtitle: editingSection.subtitle,
      body_html: editingSection.body_html,
      updated_at: new Date().toISOString()
    }).eq("id", editingSection.id);

    if (!error) {
      setShowSectionModal(false);
      loadAllAboutData();
      alert("Section updated successfully!");
    } else {
      alert(`Error updating section: ${error.message}`);
    }
  };

  const handleSaveEthics = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...ethicsForm, updated_at: new Date().toISOString() };
    if (editingEthics && editingEthics.id) {
      const { error } = await supabase.from("about_ethics").update(payload).eq("id", editingEthics.id);
      if (!error) { setShowEthicsModal(false); loadAllAboutData(); } else alert(error.message);
    } else {
      const { error } = await supabase.from("about_ethics").insert([payload]);
      if (!error) { setShowEthicsModal(false); loadAllAboutData(); } else alert(error.message);
    }
  };

  const handleSaveValue = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...valueForm, updated_at: new Date().toISOString() };
    if (editingValue && editingValue.id) {
      const { error } = await supabase.from("about_core_values").update(payload).eq("id", editingValue.id);
      if (!error) { setShowValueModal(false); loadAllAboutData(); } else alert(error.message);
    } else {
      const { error } = await supabase.from("about_core_values").insert([payload]);
      if (!error) { setShowValueModal(false); loadAllAboutData(); } else alert(error.message);
    }
  };

  const handleSaveFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { 
      name: facultyForm.name,
      credentials: facultyForm.title,
      experience: facultyForm.experience,
      specializations: facultyForm.specsString.split(',').map(s => s.trim()).filter(Boolean),
      linkedin_url: facultyForm.linkedin_url,
      display_order: facultyForm.display_order || 1,
      updated_at: new Date().toISOString() 
    };

    if (editingFaculty && editingFaculty.id) {
      const { error } = await supabase.from("about_faculty").update(payload).eq("id", editingFaculty.id);
      if (!error) { setShowFacultyModal(false); loadAllAboutData(); } else alert(error.message);
    } else {
      const { error } = await supabase.from("about_faculty").insert([payload]);
      if (!error) { setShowFacultyModal(false); loadAllAboutData(); } else alert(error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Manage About Page Content</h2>
          <p className="text-sm text-slate-500 mt-1">Edit all text sections, ethics points, core values, and faculty members.</p>
        </div>
        <div className="flex gap-1 bg-slate-100 p-1.5 rounded-xl flex-wrap">
          <button onClick={() => setSubTab("sections")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "sections" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
            Page Sections ({sections.length})
          </button>
          <button onClick={() => setSubTab("ethics")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "ethics" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
            Ethics Points ({ethics.length})
          </button>
          <button onClick={() => setSubTab("values")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "values" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
            Core Values ({values.length})
          </button>
          <button onClick={() => setSubTab("faculty")} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${subTab === "faculty" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
            Elite Faculty ({faculty.length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 font-medium bg-white rounded-2xl border border-slate-200">Loading About content...</div>
      ) : subTab === "sections" ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-5 w-20 text-center">Order</th>
                <th className="p-5">Section Key & Title</th>
                <th className="p-5">Content Preview</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sections.map((sec) => (
                <tr key={sec.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-5 text-center font-bold text-slate-400">{sec.display_order}</td>
                  <td className="p-5">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md block w-fit mb-1">{sec.section_key}</span>
                    <p className="font-bold text-slate-900 text-sm">{sec.title || "No Title"}</p>
                  </td>
                  <td className="p-5 text-xs text-slate-500 max-w-md truncate">{sec.body_html || sec.subtitle || "No preview"}</td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { setEditingSection(sec); setShowSectionModal(true); }} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl transition-colors cursor-pointer"><Pencil className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : subTab === "ethics" ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm">Commitment to Research Ethics</h3>
            <button onClick={() => { setEditingEthics(null); setEthicsForm({ point_number: ethics.length + 1, title: "", description: "" }); setShowEthicsModal(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Add Ethics Point
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-5 w-20 text-center">No.</th>
                <th className="p-5">Title & Description</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ethics.length === 0 ? (
                <tr><td colSpan={3} className="p-8 text-center text-slate-400 text-xs">No ethics points found. Click &ldquo;Add Ethics Point&rdquo; above.</td></tr>
              ) : ethics.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-5 text-center font-bold text-slate-400">{item.point_number}</td>
                  <td className="p-5">
                    <p className="font-bold text-slate-900 text-sm">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                  </td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { setEditingEthics(item); setEthicsForm(item as EthicsPoint); setShowEthicsModal(true); }} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl transition-colors cursor-pointer"><Pencil className="w-4 h-4" /></button>
                    <button
                      onClick={async () => {
                        if (window.confirm(`Delete ethics point "${item.title}"?`)) {
                          await supabase.from("about_ethics").delete().eq("id", item.id);
                          loadAllAboutData();
                        }
                      }}
                      className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : subTab === "values" ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm">Core Values</h3>
            <button onClick={() => { setEditingValue(null); setValueForm({ title: "", description: "", display_order: values.length + 1 }); setShowValueModal(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Add Core Value
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-5 w-20 text-center">Order</th>
                <th className="p-5">Value Title & Description</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {values.length === 0 ? (
                <tr><td colSpan={3} className="p-8 text-center text-slate-400 text-xs">No core values found. Click &ldquo;Add Core Value&rdquo; above.</td></tr>
              ) : values.map((val) => (
                <tr key={val.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-5 text-center font-bold text-slate-400">{val.display_order}</td>
                  <td className="p-5">
                    <p className="font-bold text-slate-900 text-sm">{val.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{val.description}</p>
                  </td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { setEditingValue(val); setValueForm(val as CoreValue); setShowValueModal(true); }} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl transition-colors cursor-pointer"><Pencil className="w-4 h-4" /></button>
                    <button
                      onClick={async () => {
                        if (window.confirm(`Delete value "${val.title}"?`)) {
                          await supabase.from("about_core_values").delete().eq("id", val.id);
                          loadAllAboutData();
                        }
                      }}
                      className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm">Faculty Team & LinkedIn Profiles</h3>
            <button onClick={() => { setEditingFaculty(null); setFacultyForm({ name: "", title: "", experience: "", specsString: "", linkedin_url: "", display_order: faculty.length + 1 }); setShowFacultyModal(true); }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Add Faculty Member
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-5 w-20 text-center">Order</th>
                <th className="p-5">Faculty Details</th>
                <th className="p-5">LinkedIn URL</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {faculty.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-5 text-center font-bold text-slate-400">{member.display_order}</td>
                  <td className="p-5">
                    <p className="font-bold text-slate-900 text-sm">{member.name}</p>
                    <p className="text-xs text-indigo-600 font-semibold mt-0.5">{member.credentials || member.title}</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wide">{(member.specializations || member.specs)?.join(', ')}</p>
                  </td>
                  <td className="p-5 text-xs text-slate-600 font-medium max-w-xs truncate">
                    {member.linkedin_url ? <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center gap-1">{member.linkedin_url} <ExternalLink className="w-3 h-3" /></a> : <span className="text-slate-400">Not specified</span>}
                  </td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => { 
                      setEditingFaculty(member); 
                      setFacultyForm({ 
                        name: member.name, 
                        title: member.credentials || member.title || "", 
                        experience: member.experience, 
                        specsString: (member.specializations || member.specs)?.join(', ') || "", 
                        linkedin_url: member.linkedin_url || "", 
                        display_order: member.display_order || 1 
                      }); 
                      setShowFacultyModal(true); 
                    }} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl transition-colors cursor-pointer"><Pencil className="w-4 h-4" /></button>
                    <button onClick={async () => {
                      if (window.confirm(`Delete faculty member "${member.name}"?`)) {
                        await supabase.from("about_faculty").delete().eq("id", member.id);
                        loadAllAboutData();
                      }
                    }}
                      className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-colors cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* --- MODALS --- */}
      {/* SECTION MODAL */}
      {showSectionModal && editingSection && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveSection} className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[92vh] overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">Edit Section: <span className="text-indigo-600">{editingSection.section_key}</span></h2>
              <button type="button" onClick={() => setShowSectionModal(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-8 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Badge Text</label>
                <input value={editingSection.badge || ""} onChange={e => setEditingSection({...editingSection, badge: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Title</label>
                <input value={editingSection.title || ""} onChange={e => setEditingSection({...editingSection, title: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Subtitle</label>
                <input value={editingSection.subtitle || ""} onChange={e => setEditingSection({...editingSection, subtitle: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold uppercase text-slate-400">Body Content (HTML)</label>
                  <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                    <button type="button" onClick={() => insertFormatting("body_html", editingSection, setEditingSection, "<strong>", "</strong>")} title="Bold" className="p-1.5 hover:bg-white rounded"><Bold className="w-3.5 h-3.5 text-slate-600"/></button>
                    <button type="button" onClick={() => insertFormatting("body_html", editingSection, setEditingSection, "<em>", "</em>")} title="Italic" className="p-1.5 hover:bg-white rounded"><Italic className="w-3.5 h-3.5 text-slate-600"/></button>
                    <button type="button" onClick={() => insertLink("body_html", editingSection, setEditingSection)} title="Hyperlink" className="p-1.5 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5 text-slate-600"/></button>
                  </div>
                </div>
                <textarea rows={6} value={editingSection.body_html || ""} onChange={e => setEditingSection({...editingSection, body_html: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600 font-mono" />
              </div>
            </div>
            <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
              <button type="button" onClick={() => setShowSectionModal(false)} className="px-5 py-2.5 text-sm text-slate-600 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">Save Section</button>
            </div>
          </form>
        </div>
      )}

      {/* ETHICS MODAL */}
      {showEthicsModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveEthics} className="bg-white rounded-3xl shadow-2xl w-full max-w-md flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">{editingEthics ? "Edit Ethics Point" : "Add Ethics Point"}</h2>
              <button type="button" onClick={() => setShowEthicsModal(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Point Number</label>
                <input type="number" required value={ethicsForm.point_number} onChange={e => setEthicsForm({...ethicsForm, point_number: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Title</label>
                <input required value={ethicsForm.title} onChange={e => setEthicsForm({...ethicsForm, title: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description</label>
                <textarea rows={4} required value={ethicsForm.description} onChange={e => setEthicsForm({...ethicsForm, description: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
            </div>
            <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
              <button type="button" onClick={() => setShowEthicsModal(false)} className="px-5 py-2.5 text-sm text-slate-600 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">Save Point</button>
            </div>
          </form>
        </div>
      )}

      {/* CORE VALUES MODAL */}
      {showValueModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveValue} className="bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">{editingValue ? "Edit Core Value" : "Add Core Value"}</h2>
              <button type="button" onClick={() => setShowValueModal(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Title</label>
                <input required value={valueForm.title} onChange={e => setValueForm({...valueForm, title: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description</label>
                <textarea rows={3} required value={valueForm.description} onChange={e => setValueForm({...valueForm, description: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Display Order</label>
                <input type="number" required value={valueForm.display_order} onChange={e => setValueForm({...valueForm, display_order: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
            </div>
            <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
              <button type="button" onClick={() => setShowValueModal(false)} className="px-5 py-2.5 text-sm text-slate-600 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">Save Value</button>
            </div>
          </form>
        </div>
      )}

      {/* FACULTY MODAL */}
      {showFacultyModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveFaculty} className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-900">{editingFaculty ? "Edit Faculty Member" : "Add Faculty Member"}</h2>
              <button type="button" onClick={() => setShowFacultyModal(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-8 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Full Name</label>
                <input required value={facultyForm.name} onChange={e => setFacultyForm({...facultyForm, name: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Academic Credentials</label>
                <input required value={facultyForm.title} onChange={e => setFacultyForm({...facultyForm, title: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Experience</label>
                  <input required value={facultyForm.experience} onChange={e => setFacultyForm({...facultyForm, experience: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Display Order</label>
                  <input type="number" required value={facultyForm.display_order} onChange={e => setFacultyForm({...facultyForm, display_order: parseInt(e.target.value)})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Specializations (Comma separated)</label>
                <input required value={facultyForm.specsString} onChange={e => setFacultyForm({...facultyForm, specsString: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" placeholder="e.g. Data Science, AI, Machine Learning" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">LinkedIn Profile URL</label>
                <input type="url" value={facultyForm.linkedin_url || ""} onChange={e => setFacultyForm({...facultyForm, linkedin_url: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
              </div>
            </div>
            <div className="p-6 border-t bg-slate-50 flex justify-end gap-3">
              <button type="button" onClick={() => setShowFacultyModal(false)} className="px-5 py-2.5 text-sm text-slate-600 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700">Save Faculty</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}