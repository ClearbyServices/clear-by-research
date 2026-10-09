"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Pencil, Trash2, X, Plus, Eye, EyeOff, Image as ImageIcon } from "lucide-react";
import RichTextEditor from "./RichTextEditor";
import { Blog } from "@/types/crm";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function BlogTab() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Academic Research",
    author_name: "Clearby Research Team",
    excerpt: "",
    content: "",
    featured_image: "",
    is_published: true,
    meta_title: "",
    meta_description: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (data) setBlogs(data);
    setLoading(false);
  };

  const openModal = (blog?: Blog) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title || "",
        slug: blog.slug || "",
        category: blog.category || "Academic Research",
        author_name: blog.author_name || "Clearby Research Team",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        featured_image: blog.featured_image || "",
        is_published: blog.is_published ?? true,
        meta_title: blog.meta_title || "",
        meta_description: blog.meta_description || "",
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: "",
        slug: "",
        category: "Academic Research",
        author_name: "Clearby Research Team",
        excerpt: "",
        content: "",
        featured_image: "",
        is_published: true,
        meta_title: "",
        meta_description: "",
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBlog) {
      const { error } = await supabase.from("blogs").update({ ...formData, updated_at: new Date() }).eq("id", editingBlog.id);
      if (!error) setBlogs(blogs.map(b => b.id === editingBlog.id ? { ...b, ...formData, id: editingBlog.id } as Blog : b));
      else alert("Error updating blog post.");
    } else {
      const { data, error } = await supabase.from("blogs").insert([formData]).select();
      if (!error && data) setBlogs([data[0] as Blog, ...blogs]);
      else alert("Error creating blog post.");
    }
    setShowModal(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (!error) setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  const togglePublish = async (blog: Blog) => {
    const updatedStatus = !blog.is_published;
    const { error } = await supabase.from("blogs").update({ is_published: updatedStatus }).eq("id", blog.id);
    if (!error) setBlogs(blogs.map(b => b.id === blog.id ? { ...b, is_published: updatedStatus } : b));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Manage Blog Articles</h2>
          <p className="text-sm text-slate-500 mt-1">Publish guides, research tips, and SEO articles with rich formatting.</p>
        </div>
        <button onClick={() => openModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 font-medium bg-white rounded-2xl border border-slate-200">Syncing articles...</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-5">Article & Thumbnail</th>
                <th className="p-5">Category</th>
                <th className="p-5">Author</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.length === 0 && (
                <tr><td colSpan={5} className="p-12 text-center text-slate-400 text-sm">No blog articles found.</td></tr>
              )}
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200">
                      {blog.featured_image ? (
                        <img src={blog.featured_image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{blog.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">/{blog.slug}</p>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                  </td>
                  <td className="p-5 text-xs font-medium text-slate-600">{blog.author_name}</td>
                  <td className="p-5">
                    <button 
                      onClick={() => togglePublish(blog)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        blog.is_published ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                      }`}
                    >
                      {blog.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      {blog.is_published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => openModal(blog)} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl transition-colors" title="Edit">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(blog.id, blog.title)} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SPACIOUS MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-100">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{editingBlog ? "Edit Article" : "Write New Article"}</h2>
                <p className="text-xs text-slate-500 mt-1">Compose content, configure metadata, and set publishing visibility.</p>
              </div>
              <button onClick={() => setShowModal(false)} className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-slate-700 shadow-sm transition-colors"><X className="w-5 h-5"/></button>
            </div>
            
            <div className="p-8 overflow-y-auto space-y-6 flex-1">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Article Title *</label>
                  <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} type="text" placeholder="e.g. How to Choose a PhD Topic" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">URL Slug *</label>
                  <input required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} type="text" placeholder="e.g. how-to-choose-phd-topic" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Category</label>
                  <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Author Name</label>
                  <input value={formData.author_name} onChange={e => setFormData({...formData, author_name: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Publish Status</label>
                  <select value={formData.is_published ? "true" : "false"} onChange={e => setFormData({...formData, is_published: e.target.value === "true"})} className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600 bg-white">
                    <option value="true">Published</option>
                    <option value="false">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Featured Image URL</label>
                <input value={formData.featured_image} onChange={e => setFormData({...formData, featured_image: e.target.value})} type="text" placeholder="https://... or /blog/image.avif" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Short Excerpt / Summary</label>
                <textarea rows={3} value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600 resize-none" placeholder="Brief summary of the article..." />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Article Content (Word-like Rich Text Editor)</label>
                <RichTextEditor 
                  content={formData.content} 
                  onChange={(html) => setFormData({...formData, content: html})} 
                />
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">SEO Meta Title</label>
                  <input value={formData.meta_title} onChange={e => setFormData({...formData, meta_title: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">SEO Meta Description</label>
                  <input value={formData.meta_description} onChange={e => setFormData({...formData, meta_description: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-3xl shrink-0">
              <button onClick={() => setShowModal(false)} className="px-6 py-3 text-sm text-slate-600 hover:bg-slate-200/60 rounded-xl font-semibold transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-6 py-3 text-sm bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-sm transition-all">
                {editingBlog ? "Save Article" : "Publish Article"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}