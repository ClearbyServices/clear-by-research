"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, X, Plus, ExternalLink, /* other icons */ } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type FacultyRecord = {
  id: string;
  name?: string | null;
  credentials?: string | null;
  experience?: string | null;
  specializations?: string[] | string | null;
  linkedin_url?: string | null;
  display_order?: number | null;
};

export default function AboutTab() {
  const [facultyList, setFacultyList] = useState<FacultyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<FacultyRecord | null>(null);

  // Page Header State & Modal
  const [showPageHeaderModal, setShowPageHeaderModal] = useState(false);
  const [pageHeader, setPageHeader] = useState({ badge: "", title: "", description: "" });

  const [formData, setFormData] = useState({
    name: "",
    credentials: "",
    experience: "",
    specializations: "", // comma separated or text
    linkedin_url: "",
    display_order: 1,
  });

  useEffect(() => {
    let isActive = true;

    const loadFaculty = async () => {
      const { data } = await supabase.from("about_faculty").select("*").order("display_order", { ascending: true });
      if (!isActive) return;
      if (data) setFacultyList(data);
      setLoading(false);
    };

    void loadFaculty();
    return () => {
      isActive = false;
    };
  }, []);

  const openHeaderModal = async () => {
    const { data } = await supabase
      .from("page_settings")
      .select("*")
      .eq("page_key", "about_page")
      .maybeSingle();

    if (data) {
      setPageHeader({
        badge: data.badge || "ELITE FACULTY",
        title: data.title || "Elite Research Faculty",
        description: data.description || "Our consultants are not just advisors; they are seasoned researchers, peer-reviewers, and academic pioneers."
      });
    } else {
      setPageHeader({
        badge: "ELITE FACULTY",
        title: "Elite Research Faculty",
        description: "Our consultants are not just advisors; they are seasoned researchers, peer-reviewers, and academic pioneers."
      });
    }

    setShowPageHeaderModal(true);
  };

  const handleSaveHeader = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("page_settings")
      .upsert({
        page_key: "about_page",
        badge: pageHeader.badge,
        title: pageHeader.title,
        description: pageHeader.description,
        updated_at: new Date().toISOString()
      }, { onConflict: "page_key" });

    if (!error) {
      alert("About page header updated successfully!");
      setShowPageHeaderModal(false);
    } else {
      alert(`Error updating header: ${error.message}`);
    }
  };

  const openModal = (faculty?: {
    id: string;
    name?: string | null;
    credentials?: string | null;
    experience?: string | null;
    specializations?: string[] | string | null;
    linkedin_url?: string | null;
    display_order?: number | null;
  }) => {
    if (faculty) {
      setEditingFaculty(faculty);
      setFormData({
        name: faculty.name || "",
        credentials: faculty.credentials || "",
        experience: faculty.experience || "",
        specializations: Array.isArray(faculty.specializations) ? faculty.specializations.join(", ") : faculty.specializations || "",
        linkedin_url: faculty.linkedin_url || "",
        display_order: faculty.display_order || 1,
      });
    } else {
      setEditingFaculty(null);
      setFormData({
        name: "",
        credentials: "",
        experience: "",
        specializations: "",
        linkedin_url: "",
        display_order: facultyList.length + 1,
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const specsArray = formData.specializations.includes(",") 
      ? formData.specializations.split(",").map(s => s.trim()).filter(Boolean)
      : [formData.specializations];

    const payload = {
      ...formData,
      specializations: specsArray,
      updated_at: new Date()
    };

    if (editingFaculty) {
      const { error } = await supabase.from("about_faculty").update(payload).eq("id", editingFaculty.id);
      if (!error) {
        setFacultyList(facultyList.map(f => f.id === editingFaculty.id ? { ...f, ...payload, id: editingFaculty.id } : f));
      } else {
        alert("Error updating faculty member.");
      }
    } else {
      const { data, error } = await supabase.from("about_faculty").insert([payload]).select();
      if (!error && data) {
        setFacultyList([...facultyList, data[0]]);
      } else {
        alert("Error adding faculty member.");
      }
    }
    setShowModal(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove ${name}?`)) {
      const { error } = await supabase.from("about_faculty").delete().eq("id", id);
      if (!error) setFacultyList(facultyList.filter(f => f.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Manage About Page & Faculty</h2>
          <p className="text-sm text-slate-500 mt-1">Configure your elite faculty profiles, credentials, specializations, and page headers.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={openHeaderModal} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer">
            Edit Page Header
          </button>
          <button onClick={() => openModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer">
            <Plus className="w-4 h-4" /> Add Faculty Member
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 font-medium bg-white rounded-2xl border border-slate-200">Syncing faculty profiles...</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-5 w-20 text-center">Order</th>
                <th className="p-5">Faculty Member & Credentials</th>
                <th className="p-5">Experience</th>
                <th className="p-5">Specializations</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {facultyList.length === 0 && (
                <tr><td colSpan={5} className="p-12 text-center text-slate-400 text-sm">No faculty members found.</td></tr>
              )}
              {facultyList.map((faculty) => (
                <tr key={faculty.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-5 text-center font-bold text-slate-400">{faculty.display_order}</td>
                  <td className="p-5">
                    <p className="font-bold text-slate-900 text-base">{faculty.name}</p>
                    <p className="text-xs text-indigo-600 font-medium mt-0.5">{faculty.credentials}</p>
                    {faculty.linkedin_url && (
                      <a href={faculty.linkedin_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-600 mt-1">
                        LinkedIn Profile <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </td>
                  <td className="p-5 text-xs font-semibold text-slate-700">{faculty.experience}</td>
                  <td className="p-5">
                    <div className="flex flex-wrap gap-1.5 max-w-xs">
                      {Array.isArray(faculty.specializations) && faculty.specializations.map((spec: string, idx: number) => (
                        <span key={idx} className="text-[11px] bg-indigo-50 text-indigo-700 font-medium px-2.5 py-0.5 rounded-full">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => openModal(faculty)} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl transition-colors cursor-pointer" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(faculty.id, faculty.name ?? "this faculty member")} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-colors cursor-pointer" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ABOUT PAGE HEADER EDIT MODAL */}
      {showPageHeaderModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <form onSubmit={handleSaveHeader} className="bg-white rounded-3xl shadow-2xl w-full max-w-xl p-8 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-xl font-bold text-slate-900">Edit About Page Header</h2>
              <button type="button" onClick={() => setShowPageHeaderModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Badge Text</label>
              <input value={pageHeader.badge} onChange={e => setPageHeader({...pageHeader, badge: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Main H1 Title</label>
              <input value={pageHeader.title} onChange={e => setPageHeader({...pageHeader, title: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Introductory Description</label>
              <textarea rows={4} value={pageHeader.description} onChange={e => setPageHeader({...pageHeader, description: e.target.value})} className="w-full border rounded-xl p-3 text-sm outline-none focus:border-indigo-600" />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <button type="button" onClick={() => setShowPageHeaderModal(false)} className="px-5 py-2.5 text-sm text-slate-600 font-semibold">Cancel</button>
              <button type="submit" className="px-6 py-2.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-sm">Save Changes</button>
            </div>
          </form>
        </div>
      )}

      {/* FACULTY EDIT / CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-100">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{editingFaculty ? "Edit Faculty Profile" : "Add Faculty Member"}</h2>
                <p className="text-xs text-slate-500 mt-1">Configure academic credentials, experience, and specializations.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-slate-700 shadow-sm transition-colors"><X className="w-5 h-5"/></button>
            </div>
            
            <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-8 overflow-y-auto space-y-6 flex-1 bg-white">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Faculty Full Name *</label>
                    <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" placeholder="e.g. Dr. Ramkrishnan Raman" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Credentials / Degree *</label>
                    <input required value={formData.credentials} onChange={e => setFormData({...formData, credentials: e.target.value})} type="text" placeholder="e.g. PhD in Quantitative Analysis, Stanford University" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Experience Badge *</label>
                    <input required value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} type="text" placeholder="e.g. 14+ Years Academic Experience" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Display Order</label>
                    <input type="number" required value={formData.display_order} onChange={e => setFormData({...formData, display_order: parseInt(e.target.value)})} className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">LinkedIn URL</label>
                    <input value={formData.linkedin_url} onChange={e => setFormData({...formData, linkedin_url: e.target.value})} type="text" placeholder="https://linkedin.com/in/..." className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Specializations (Comma-separated)</label>
                  <textarea rows={3} value={formData.specializations} onChange={e => setFormData({...formData, specializations: e.target.value})} placeholder="e.g. Qualitative Research Design, Literature Synthesis & Analysis, Theoretical Framework Development" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-3xl shrink-0">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 text-sm text-slate-600 hover:bg-slate-200/60 rounded-xl font-semibold transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-3 text-sm bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-sm transition-all">
                  {editingFaculty ? "Save Changes" : "Add Faculty"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}