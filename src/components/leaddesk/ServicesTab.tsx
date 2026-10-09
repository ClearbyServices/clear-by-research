"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Pencil, Trash2, X, Plus, Layers, Sliders, FileText, HelpCircle, Columns } from "lucide-react";
import RichTextEditor from "@/components/leaddesk/RichTextEditor";
import { Service } from "@/types/crm";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function ServicesTab() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [modalTab, setModalTab] = useState<"general" | "content" | "features" | "comparison" | "faqs">("general");

  const [formData, setFormData] = useState<Service>({
    title: "",
    slug: "",
    category: "PhD Services",
    sub_menu: "",
    h1: "",
    menu_order: 0,
    meta_description: "",
    intro_paragraphs: [""],
    features_section: { title: "Key Features", intro: "", list: [], outro: "" },
    sub_services: [],
    comparison_section: { title: "Why Choose Us", data: [] },
    faqs: [],
    cta_section: { title: "Ready to Begin?", text: "Connect with our experts today.", buttonText: "Get Started" },
    internal_links: []
  });

  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("services").select("*").order("menu_order", { ascending: true });

      if (!isMounted) return;

      if (error) {
        console.error("Error fetching services:", error.message);
      } else if (data) {
        setServices(data);
      }
      setLoading(false);
    };

    void fetchServices();

    return () => {
      isMounted = false;
    };
  }, []);

  const openModal = (service?: Service) => {
    setModalTab("general");
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title || "",
        slug: service.slug || "",
        category: service.category || "PhD Services",
        sub_menu: service.sub_menu || "",
        h1: service.h1 || "",
        menu_order: service.menu_order || 0,
        meta_description: service.meta_description || "",
        intro_paragraphs: service.intro_paragraphs?.length ? service.intro_paragraphs : [""],
        features_section: service.features_section || { title: "Key Features", intro: "", list: [], outro: "" },
        sub_services: service.sub_services || [],
        comparison_section: service.comparison_section || { title: "Why Choose Us", data: [] },
        faqs: service.faqs || [],
        cta_section: service.cta_section || { title: "Ready to Begin?", text: "Connect with our experts today.", buttonText: "Get Started" },
        internal_links: service.internal_links || []
      });
    } else {
      setEditingService(null);
      setFormData({
        title: "",
        slug: "",
        category: "PhD Services",
        sub_menu: "",
        h1: "",
        menu_order: services.length + 1,
        meta_description: "",
        intro_paragraphs: [""],
        features_section: { title: "Key Features", intro: "", list: [], outro: "" },
        sub_services: [],
        comparison_section: { title: "Why Choose Us", data: [] },
        faqs: [],
        cta_section: { title: "Ready to Begin?", text: "Connect with our experts today.", buttonText: "Get Started" },
        internal_links: []
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { id, ...rest } = formData;
    const payload = { ...rest, updated_at: new Date().toISOString() };
    
    if (editingService && editingService.id) {
      const { error } = await supabase.from("services").update(payload).eq("id", editingService.id);
      if (!error) {
        setServices(services.map(s => s.id === editingService.id ? { ...payload, id: editingService.id } as Service : s));
        setShowModal(false);
      } else {
        console.error("Supabase Update Error:", error);
        alert(`Error updating service: ${error.message}`);
      }
    } else {
      const { data, error } = await supabase.from("services").insert([payload]).select();
      if (!error && data) {
        setServices([...services, data[0] as Service]);
        setShowModal(false);
      } else {
        console.error("Supabase Insert Error:", error);
        alert(`Error creating service: ${error?.message || "Unknown error"}`);
      }
    }
  };

  const handleDelete = async (id?: string, title?: string) => {
    if (!id) return;
    if (window.confirm(`Delete service "${title}"?`)) {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (!error) {
        setServices(services.filter(s => s.id !== id));
      } else {
        console.error("Supabase Delete Error:", error);
        alert(`Error deleting service: ${error.message}`);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Manage Services & Landing Pages</h2>
          <p className="text-sm text-slate-500 mt-1">Complete control over every column in your Supabase services table.</p>
        </div>
        <button onClick={() => openModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 font-medium bg-white rounded-2xl border border-slate-200">Syncing services...</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-5 w-20 text-center">Order</th>
                <th className="p-5">Service Info</th>
                <th className="p-5">Form Dropdown Name</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-5 text-center font-bold text-slate-400">{service.menu_order}</td>
                  <td className="p-5">
                    <p className="font-bold text-slate-900 text-sm">{service.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">/{service.slug}</p>
                    <span className="inline-block mt-2 bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-full text-xs">{service.category}</span>
                  </td>
                  <td className="p-5 text-sm text-slate-700 font-medium">{service.sub_menu || "—"}</td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => openModal(service)} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl transition-colors cursor-pointer" title="Edit"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(service.id, service.title)} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-colors cursor-pointer" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL WITH FORM WRAPPER */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-100">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{editingService ? "Edit Service" : "Add New Service"}</h2>
                <p className="text-xs text-slate-500 mt-1">Manage all sections, metadata, and JSONB blocks.</p>
              </div>
              <button type="button" onClick={() => setShowModal(false)} className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-slate-700 shadow-sm transition-colors cursor-pointer"><X className="w-5 h-5"/></button>
            </div>

            {/* TAB SELECTOR BAR */}
            <div className="flex border-b border-slate-200 px-8 bg-slate-50/30 gap-6 shrink-0">
              {[
                { id: "general", label: "General & SEO", icon: <Sliders className="w-4 h-4"/> },
                { id: "content", label: "Intro Content", icon: <FileText className="w-4 h-4"/> },
                { id: "features", label: "Features & Sub-services", icon: <Layers className="w-4 h-4"/> },
                { id: "comparison", label: "Comparison Table", icon: <Columns className="w-4 h-4"/> },
                { id: "faqs", label: "FAQs & CTA", icon: <HelpCircle className="w-4 h-4"/> },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setModalTab(tab.id as typeof modalTab)}
                  className={`flex items-center gap-2 py-4 text-sm font-bold border-b-2 transition-colors cursor-pointer ${modalTab === tab.id ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-500 hover:text-slate-900"}`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
            
            <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-8 overflow-y-auto space-y-6 flex-1 bg-white">
                
                {/* TAB 1: GENERAL & SEO */}
                {modalTab === "general" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Page Title *</label>
                        <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">URL Slug *</label>
                        <input required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">H1 Heading</label>
                        <input value={formData.h1 || ""} onChange={e => setFormData({...formData, h1: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Category</label>
                        <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Menu Order</label>
                        <input value={formData.menu_order || 0} onChange={e => setFormData({...formData, menu_order: parseInt(e.target.value) || 0})} type="number" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Form Dropdown Name</label>
                        <input value={formData.sub_menu || ""} onChange={e => setFormData({...formData, sub_menu: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">SEO Meta Description</label>
                        <input value={formData.meta_description || ""} onChange={e => setFormData({...formData, meta_description: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: INTRO CONTENT */}
                {modalTab === "content" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider">Intro Paragraphs (Visual Editor)</label>
                      <button type="button" onClick={() => setFormData({...formData, intro_paragraphs: [...(formData.intro_paragraphs || []), ""]})} className="text-xs text-indigo-600 font-bold hover:underline cursor-pointer">+ Add Paragraph Block</button>
                    </div>
                    {formData.intro_paragraphs?.map((para, idx) => (
                      <div key={idx} className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <div className="flex justify-between items-center text-xs text-slate-500 font-semibold">
                          <span>Paragraph {idx + 1}</span>
                          <button type="button" onClick={() => {
                            const copy = [...(formData.intro_paragraphs || [])];
                            copy.splice(idx, 1);
                            setFormData({...formData, intro_paragraphs: copy});
                          }} className="text-red-500 cursor-pointer">Remove</button>
                        </div>
                        <RichTextEditor content={para} onChange={(html) => {
                          const copy = [...(formData.intro_paragraphs || [])];
                          copy[idx] = html;
                          setFormData({...formData, intro_paragraphs: copy});
                        }} />
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 3: FEATURES & SUB-SERVICES */}
                {modalTab === "features" && (
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider">Features Section</h3>
                      <input placeholder="Section Title (e.g. Key Features)" value={formData.features_section?.title || ""} onChange={e => setFormData({...formData, features_section: { ...formData.features_section!, title: e.target.value }})} className="w-full border border-slate-200 rounded-xl p-3 text-sm bg-white" />
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-xs font-bold uppercase text-slate-400">Feature List Items</span>
                        <button type="button" onClick={() => {
                          const list = formData.features_section?.list || [];
                          setFormData({...formData, features_section: { ...formData.features_section!, list: [...list, { title: "", desc: "" }] }});
                        }} className="text-xs text-indigo-600 font-bold cursor-pointer">+ Add Item</button>
                      </div>

                      {formData.features_section?.list?.map((item, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 relative">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-500">Feature Item #{idx + 1}</span>
                            <button type="button" onClick={() => {
                              const list = [...formData.features_section!.list];
                              list.splice(idx, 1);
                              setFormData({...formData, features_section: { ...formData.features_section!, list }});
                            }} className="text-red-500 text-xs font-semibold cursor-pointer">Delete</button>
                          </div>
                          <input placeholder="Feature Title" value={item.title} onChange={e => {
                            const list = [...formData.features_section!.list];
                            list[idx].title = e.target.value;
                            setFormData({...formData, features_section: { ...formData.features_section!, list }});
                          }} className="w-full border rounded-lg p-2 text-xs font-semibold" />
                          
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Feature Description (Rich Text)</label>
                            <RichTextEditor content={item.desc} onChange={(html) => {
                              const list = [...formData.features_section!.list];
                              list[idx].desc = html;
                              setFormData({...formData, features_section: { ...formData.features_section!, list }});
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Sub-services */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider">Sub-Services List</h3>
                        <button type="button" onClick={() => setFormData({...formData, sub_services: [...(formData.sub_services || []), { title: "", desc: "" }]})} className="text-xs text-indigo-600 font-bold cursor-pointer">+ Add Sub-service</button>
                      </div>
                      {formData.sub_services?.map((sub, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 relative">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-500">Sub-Service #{idx + 1}</span>
                            <button type="button" onClick={() => {
                              const list = [...formData.sub_services!];
                              list.splice(idx, 1);
                              setFormData({...formData, sub_services: list});
                            }} className="text-red-500 text-xs font-semibold cursor-pointer">Delete</button>
                          </div>
                          <input placeholder="Sub-service Title" value={sub.title} onChange={e => {
                            const list = [...formData.sub_services!];
                            list[idx].title = e.target.value;
                            setFormData({...formData, sub_services: list});
                          }} className="w-full border rounded-lg p-2 text-xs font-semibold" />

                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Sub-service Description (Rich Text)</label>
                            <RichTextEditor content={sub.desc} onChange={(html) => {
                              const list = [...formData.sub_services!];
                              list[idx].desc = html;
                              setFormData({...formData, sub_services: list});
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: COMPARISON TABLE */}
                {modalTab === "comparison" && (
                  <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider">Comparison Table Settings</h3>
                    <input placeholder="Section Title (e.g. Why Choose Clearby over Others)" value={formData.comparison_section?.title || ""} onChange={e => setFormData({...formData, comparison_section: { ...formData.comparison_section!, title: e.target.value }})} className="w-full border border-slate-200 rounded-xl p-3 text-sm bg-white" />
                    
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-xs font-bold uppercase text-slate-400">Comparison Rows</span>
                      <button type="button" onClick={() => {
                        const data = formData.comparison_section?.data || [];
                        setFormData({...formData, comparison_section: { ...formData.comparison_section!, data: [...data, { feature: "", generic: "", clearby: "" }] }});
                      }} className="text-xs text-indigo-600 font-bold cursor-pointer">+ Add Row</button>
                    </div>

                    {formData.comparison_section?.data?.map((row, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 relative">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-500">Row #{idx + 1}</span>
                          <button type="button" onClick={() => {
                            const data = [...formData.comparison_section!.data];
                            data.splice(idx, 1);
                            setFormData({...formData, comparison_section: { ...formData.comparison_section!, data }});
                          }} className="text-red-500 text-xs font-semibold cursor-pointer">Delete</button>
                        </div>
                        <input placeholder="Feature / Metric" value={row.feature} onChange={e => {
                          const data = [...formData.comparison_section!.data];
                          data[idx].feature = e.target.value;
                          setFormData({...formData, comparison_section: { ...formData.comparison_section!, data }});
                        }} className="w-full border rounded-lg p-2 text-xs font-semibold" />

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Generic Providers (Rich Text)</label>
                            <RichTextEditor content={row.generic} onChange={(html) => {
                              const data = [...formData.comparison_section!.data];
                              data[idx].generic = html;
                              setFormData({...formData, comparison_section: { ...formData.comparison_section!, data }});
                            }} />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-indigo-500 mb-1">Clearby Research Advantage (Rich Text)</label>
                            <RichTextEditor content={row.clearby} onChange={(html) => {
                              const data = [...formData.comparison_section!.data];
                              data[idx].clearby = html;
                              setFormData({...formData, comparison_section: { ...formData.comparison_section!, data }});
                            }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 5: FAQS & CTA */}
                {modalTab === "faqs" && (
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider">Frequently Asked Questions</h3>
                        <button type="button" onClick={() => setFormData({...formData, faqs: [...(formData.faqs || []), { q: "", a: "" }]})} className="text-xs text-indigo-600 font-bold cursor-pointer">+ Add FAQ</button>
                      </div>
                      {formData.faqs?.map((faq, idx) => (
                        <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 relative">
                          <button type="button" onClick={() => {
                            const copy = [...(formData.faqs || [])];
                            copy.splice(idx, 1);
                            setFormData({...formData, faqs: copy});
                          }} className="absolute right-4 top-4 text-red-500 text-xs font-semibold cursor-pointer">Delete</button>
                          
                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Question</label>
                            <input placeholder="Question" value={faq.q} onChange={e => {
                              const copy = [...(formData.faqs || [])];
                              copy[idx].q = e.target.value;
                              setFormData({...formData, faqs: copy});
                            }} className="w-full border border-slate-200 rounded-xl p-3 text-xs font-bold bg-white" />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Answer (Rich Text with Links)</label>
                            <RichTextEditor content={faq.a} onChange={(html) => {
                              const copy = [...(formData.faqs || [])];
                              copy[idx].a = html;
                              setFormData({...formData, faqs: copy});
                            }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA Section */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                      <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider">Bottom Call-to-Action (CTA)</h3>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">CTA Title</label>
                        <input placeholder="CTA Title" value={formData.cta_section?.title || ""} onChange={e => setFormData({...formData, cta_section: { ...formData.cta_section!, title: e.target.value }})} className="w-full border border-slate-200 rounded-xl p-3 text-sm bg-white" />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">CTA Subtext (Rich Text)</label>
                        <RichTextEditor content={formData.cta_section?.text || ""} onChange={(html) => setFormData({...formData, cta_section: { ...formData.cta_section!, text: html }})} />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Button Text</label>
                        <input placeholder="Button Text" value={formData.cta_section?.buttonText || ""} onChange={e => setFormData({...formData, cta_section: { ...formData.cta_section!, buttonText: e.target.value }})} className="w-full border border-slate-200 rounded-xl p-3 text-sm bg-white" />
                      </div>
                    </div>
                  </div>
                )}

              </div>
              
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-3xl shrink-0">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 text-sm text-slate-600 hover:bg-slate-200/60 rounded-xl font-semibold transition-colors cursor-pointer">Cancel</button>
                <button type="submit" className="px-6 py-3 text-sm bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-sm transition-all cursor-pointer">
                  {editingService ? "Save Service Page" : "Create Service Page"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}