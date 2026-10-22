"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Pencil, Trash2, X, Plus, FileText, User, Globe } from "lucide-react";
import RichTextEditor from "@/components/leaddesk/RichTextEditor";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface Blog {
  id?: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category?: string;
  author_name?: string;
  author_title?: string;
  author_photo?: string;
  author_bio?: string;
  featured_image?: string;
  tags: string[];
  author_links: { platform: string; url: string }[];
  read_time_minutes?: number;
  published_at: string;
  views?: number;
  is_published: boolean;
  meta_title?: string;
  meta_description?: string;
}

export default function BlogsTab() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [modalTab, setModalTab] = useState<"general" | "author" | "seo">("general");
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<Blog>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Academic Research",
    author_name: "",
    author_title: "",
    author_photo: "",
    author_bio: "",
    featured_image: "",
    tags: [],
    author_links: [],
    read_time_minutes: 5,
    published_at: new Date().toISOString().slice(0, 16),
    is_published: true,
    meta_title: "",
    meta_description: ""
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchBlogs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("published_at", { ascending: false });

      if (!isMounted) return;

      if (error) {
        console.error("Error fetching blogs:", error.message);
      } else if (data) {
        setBlogs(data);
      }
      setLoading(false);
    };

    void fetchBlogs();

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-generate slug from title if creating a new post
  const handleTitleChange = (val: string) => {
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: !editingBlog ? val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : prev.slug
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof Blog) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(fieldName as string);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const result = await res.json();
      if (result.success) {
        setFormData(prev => ({ ...prev, [fieldName]: result.url }));
      } else {
        alert("Image upload failed: " + result.error);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload failed due to network error.");
    } finally {
      setUploadingField(null);
    }
  };

  const openModal = (blog?: Blog) => {
    setModalTab("general");
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title || "",
        slug: blog.slug || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        category: blog.category || "Academic Research",
        author_name: blog.author_name || "",
        author_title: blog.author_title || "",
        author_photo: blog.author_photo || "",
        author_bio: blog.author_bio || "",
        featured_image: blog.featured_image || "",
        tags: Array.isArray(blog.tags) ? blog.tags : [],
        author_links: Array.isArray(blog.author_links) ? blog.author_links : [],
        read_time_minutes: blog.read_time_minutes || 5,
        published_at: blog.published_at ? blog.published_at.slice(0, 16) : new Date().toISOString().slice(0, 16),
        is_published: blog.is_published ?? true,
        meta_title: blog.meta_title || "",
        meta_description: blog.meta_description || ""
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "Academic Research",
        author_name: "",
        author_title: "",
        author_photo: "",
        author_bio: "",
        featured_image: "",
        tags: [],
        author_links: [],
        read_time_minutes: 5,
        published_at: new Date().toISOString().slice(0, 16),
        is_published: true,
        meta_title: "",
        meta_description: ""
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { id, ...rest } = formData;
    const payload = {
      ...rest,
      published_at: new Date(formData.published_at).toISOString(),
      updated_at: new Date().toISOString()
    };

    if (editingBlog && editingBlog.id) {
      const { error } = await supabase.from("blogs").update(payload).eq("id", editingBlog.id);
      if (!error) {
        setBlogs(blogs.map(b => b.id === editingBlog.id ? { ...payload, id: editingBlog.id } as Blog : b));
        setShowModal(false);
      } else {
        console.error("Supabase Update Error:", error);
        alert(`Error updating blog: ${error.message}`);
      }
    } else {
      const { data, error } = await supabase.from("blogs").insert([payload]).select();
      if (!error && data) {
        setBlogs([data[0] as Blog, ...blogs]);
        setShowModal(false);
      } else {
        console.error("Supabase Insert Error:", error);
        alert(`Error creating blog: ${error?.message || "Unknown error"}`);
      }
    }
    setSaving(false);
  };

  const handleDelete = async (id?: string, title?: string) => {
    if (!id) return;
    if (window.confirm(`Delete blog post "${title}"?`)) {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (!error) {
        setBlogs(blogs.filter(b => b.id !== id));
      } else {
        console.error("Supabase Delete Error:", error);
        alert(`Error deleting blog: ${error.message}`);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Manage Blog Posts</h2>
          <p className="text-sm text-slate-600 mt-1">Create, edit, and optimize your publication articles and research guides.</p>
        </div>
        <button onClick={() => openModal()} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer">
          <Plus className="w-4 h-4" /> Add Blog Post
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-500 font-medium bg-white rounded-2xl border border-slate-200">Loading blogs...</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-5">Post Details</th>
                <th className="p-5">Category</th>
                <th className="p-5">Author</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-5">
                    <p className="font-bold text-slate-900 text-sm">{blog.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">/blog/{blog.slug}</p>
                  </td>
                  <td className="p-5">
                    <span className="bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-full text-xs">{blog.category || "Uncategorized"}</span>
                  </td>
                  <td className="p-5 text-sm text-slate-800 font-medium">{blog.author_name || "Admin"}</td>
                  <td className="p-5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${blog.is_published ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {blog.is_published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-5 flex gap-2 justify-end">
                    <button onClick={() => openModal(blog)} aria-label={`Edit ${blog.title}`} className="p-2.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-xl transition-colors cursor-pointer" title="Edit"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(blog.id, blog.title)} aria-label={`Delete ${blog.title}`} className="p-2.5 bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 rounded-xl transition-colors cursor-pointer" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* BLOG EDIT/CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-100">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</h2>
                <p className="text-xs text-slate-600 mt-1">Manage content, metadata, author details, and publication flags.</p>
              </div>
              <button type="button" onClick={() => setShowModal(false)} aria-label="Close modal" className="p-2.5 bg-white border border-slate-200 rounded-full text-slate-500 hover:text-slate-800 shadow-sm transition-colors cursor-pointer"><X className="w-5 h-5"/></button>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex border-b border-slate-200 px-8 bg-slate-50/30 gap-6 shrink-0">
              {[
                { id: "general", label: "General & Content", icon: <FileText className="w-4 h-4"/> },
                { id: "author", label: "Author Details", icon: <User className="w-4 h-4"/> },
                { id: "seo", label: "SEO & Meta", icon: <Globe className="w-4 h-4"/> },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setModalTab(tab.id as typeof modalTab)}
                  className={`flex items-center gap-2 py-4 text-sm font-bold border-b-2 transition-colors cursor-pointer ${modalTab === tab.id ? "border-indigo-600 text-indigo-600" : "border-transparent text-slate-600 hover:text-slate-900"}`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSave} className="flex flex-col flex-1 overflow-hidden">
              <div className="p-8 overflow-y-auto space-y-6 flex-1 bg-white">
                
                {/* TAB 1: GENERAL & CONTENT */}
                {modalTab === "general" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="blog-title" className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">Blog Title *</label>
                        <input id="blog-title" required value={formData.title} onChange={e => handleTitleChange(e.target.value)} type="text" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                      </div>
                      <div>
                        <label htmlFor="blog-slug" className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">URL Slug *</label>
                        <input id="blog-slug" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <label htmlFor="blog-category" className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">Category</label>
                        <input id="blog-category" value={formData.category || ""} onChange={e => setFormData({...formData, category: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                      </div>
                      <div>
                        <label htmlFor="blog-read-time" className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">Read Time (Minutes)</label>
                        <input id="blog-read-time" value={formData.read_time_minutes || 5} onChange={e => setFormData({...formData, read_time_minutes: parseInt(e.target.value) || 5})} type="number" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                      </div>
                      <div>
                        <label htmlFor="blog-pub-date" className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">Published Date & Time</label>
                        <input id="blog-pub-date" value={formData.published_at} onChange={e => setFormData({...formData, published_at: e.target.value})} type="datetime-local" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">Featured Image</label>
                      <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <div className="flex items-center gap-4">
                          {formData.featured_image && (
                            <img src={formData.featured_image} alt="Featured Preview" className="w-20 h-20 object-cover rounded-xl border shadow-sm" />
                          )}
                          <div className="flex-1">
                            <input 
                              type="file" 
                              aria-label="Upload featured image file"
                              accept="image/*" 
                              onChange={e => handleImageUpload(e, "featured_image")}
                              className="w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" 
                            />
                            {uploadingField === "featured_image" && <p className="text-xs text-indigo-600 mt-1 font-semibold animate-pulse">Uploading to public folder...</p>}
                          </div>
                        </div>
                        <input value={formData.featured_image || ""} onChange={e => setFormData({...formData, featured_image: e.target.value})} type="text" placeholder="Or paste image URL (/uploads/...)" className="w-full border border-slate-200 rounded-xl p-3 text-xs bg-white outline-none focus:border-indigo-600" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="blog-excerpt" className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">Excerpt (Short Summary)</label>
                      <textarea id="blog-excerpt" rows={3} value={formData.excerpt || ""} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">Full Content (Rich Text)</label>
                      <RichTextEditor content={formData.content} onChange={(html) => setFormData({...formData, content: html})} />
                    </div>

                    {/* Tags Section */}
                    <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <label htmlFor="tag-input" className="block text-xs font-bold uppercase text-slate-600 tracking-wider">Tags</label>
                      <div className="flex gap-2">
                        <input id="tag-input" value={tagInput} onChange={e => setTagInput(e.target.value)} placeholder="Add a tag..." className="flex-1 border rounded-xl p-3 text-sm bg-white" />
                        <button type="button" onClick={() => {
                          if (tagInput.trim()) {
                            setFormData({...formData, tags: [...formData.tags, tagInput.trim()]});
                            setTagInput("");
                          }
                        }} className="bg-indigo-600 text-white px-5 rounded-xl font-semibold text-sm cursor-pointer">Add Tag</button>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {formData.tags?.map((tag, idx) => (
                          <span key={idx} className="bg-white border px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
                            {tag}
                            <button type="button" aria-label={`Remove tag ${tag}`} onClick={() => {
                              const updated = [...formData.tags];
                              updated.splice(idx, 1);
                              setFormData({...formData, tags: updated});
                            }} className="text-red-500 font-bold cursor-pointer">&times;</button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <input type="checkbox" id="is_published" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} className="w-5 h-5 accent-indigo-600 rounded cursor-pointer" />
                      <label htmlFor="is_published" className="text-sm font-bold text-slate-800 cursor-pointer">Publish this article immediately</label>
                    </div>
                  </div>
                )}

                {/* TAB 2: AUTHOR DETAILS */}
                {modalTab === "author" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="author-name" className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">Author Name</label>
                        <input id="author-name" value={formData.author_name || ""} onChange={e => setFormData({...formData, author_name: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                      </div>
                      <div>
                        <label htmlFor="author-title" className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">Author Title / Designation</label>
                        <input id="author-title" value={formData.author_title || ""} onChange={e => setFormData({...formData, author_title: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">Author Photo</label>
                      <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <div className="flex items-center gap-4">
                          {formData.author_photo && (
                            <img src={formData.author_photo} alt="Author Preview" className="w-16 h-16 object-cover rounded-full border shadow-sm" />
                          )}
                          <div className="flex-1">
                            <input 
                              type="file" 
                              aria-label="Upload author photo file"
                              accept="image/*" 
                              onChange={e => handleImageUpload(e, "author_photo")}
                              className="w-full text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" 
                            />
                            {uploadingField === "author_photo" && <p className="text-xs text-indigo-600 mt-1 font-semibold animate-pulse">Uploading to public folder...</p>}
                          </div>
                        </div>
                        <input value={formData.author_photo || ""} onChange={e => setFormData({...formData, author_photo: e.target.value})} type="text" placeholder="Or paste image URL (/uploads/...)" className="w-full border border-slate-200 rounded-xl p-3 text-xs bg-white outline-none focus:border-indigo-600" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="author-bio" className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">Author Bio</label>
                      <textarea id="author-bio" rows={4} value={formData.author_bio || ""} onChange={e => setFormData({...formData, author_bio: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                    </div>
                  </div>
                )}

                {/* TAB 3: SEO & META */}
                {modalTab === "seo" && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="meta-title" className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">Meta Title</label>
                      <input id="meta-title" value={formData.meta_title || ""} onChange={e => setFormData({...formData, meta_title: e.target.value})} type="text" className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                    </div>
                    <div>
                      <label htmlFor="meta-desc" className="block text-xs font-bold uppercase text-slate-600 tracking-wider mb-2">Meta Description</label>
                      <textarea id="meta-desc" rows={4} value={formData.meta_description || ""} onChange={e => setFormData({...formData, meta_description: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3.5 text-sm outline-none focus:border-indigo-600" />
                    </div>
                  </div>
                )}

              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-3xl shrink-0">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 text-sm text-slate-700 hover:bg-slate-200/60 rounded-xl font-semibold transition-colors cursor-pointer">Cancel</button>
                <button type="submit" disabled={saving} className="px-6 py-3 text-sm bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 shadow-sm transition-all cursor-pointer disabled:opacity-50">
                  {saving ? "Saving..." : editingBlog ? "Save Blog Post" : "Create Blog Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}