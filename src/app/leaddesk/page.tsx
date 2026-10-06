"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { 
  LayoutDashboard, List as ListIcon, Kanban, Users, 
  Download, X, MessageCircle, Mail, Flame, RefreshCcw,
  Pencil, Trash2, LogOut, Lock, Mail as MailIcon
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ltywtxqwuzhtovbqyaiv.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY_HERE"
);

type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  source: string;
  priority: string;
  status: string;
  assigned_to: string;
  notes: string;
  whatsapp_contacted: boolean;
  email_sent: boolean;
  created_at: string;
};

type CRM = {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  role: string;
};

const SOURCES = ["Google Ads", "Meta", "Website", "Referral", "Other"];
const STATUSES = ["Fresh", "Contacted", "Quoted", "Follow-up", "Converted", "Not Interested"];
const PRIORITIES = ["High", "Medium", "Low"];

export default function LeadDesk() {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auth State
  const [currentUser, setCurrentUser] = useState<CRM | null>(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // App Data
  const [leads, setLeads] = useState<Lead[]>([]);
  const [crms, setCrms] = useState<CRM[]>([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Modals
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showCrmModal, setShowCrmModal] = useState(false);
  const [editingCrm, setEditingCrm] = useState<CRM | null>(null);
  const [actionModal, setActionModal] = useState<{ type: "whatsapp" | "email"; lead: Lead } | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const savedUser = localStorage.getItem("ld_current_user");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data: leadData } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (leadData) setLeads(leadData);

    const { data: crmData } = await supabase.from("crms").select("*");
    if (crmData && crmData.length > 0) {
      setCrms(crmData);
    } else {
      setCrms([{ id: "CRM-ADMIN", name: "Admin User", email: "admin@clearby.com", password: "admin123", phone: "9999999999", role: "Administrator" }]);
    }
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const found = crms.find(c => c.email.toLowerCase() === loginEmail.toLowerCase() && c.password === loginPassword);
    if (found) {
      setCurrentUser(found);
      localStorage.setItem("ld_current_user", JSON.stringify(found));
    } else {
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("ld_current_user");
  };

  const addLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newLeadData = Object.fromEntries(fd.entries());
    
    const { data, error } = await supabase.from("leads").insert([newLeadData]).select();
    if (error) alert("Failed to add lead.");
    else if (data) {
      setLeads([data[0], ...leads]);
      setShowLeadModal(false);
    }
  };

  const updateLeadStatus = async (id: string, newStatus: string) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    await supabase.from("leads").update({ status: newStatus }).eq("id", id);
  };

  const performAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!actionModal) return;
    const fd = new FormData(e.currentTarget);
    const message = fd.get("message") as string;
    const subject = fd.get("subject") as string;
    const { type, lead } = actionModal;

    const newStatus = lead.status === "Fresh" ? "Contacted" : lead.status;
    const updatePayload = type === "whatsapp" ? { whatsapp_contacted: true, status: newStatus } : { email_sent: true, status: newStatus };

    setLeads(leads.map((l) => (l.id === lead.id ? { ...l, ...updatePayload } : l)));

    if (type === "whatsapp") {
      window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`, "_blank");
    } else {
      window.open(`mailto:${lead.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`, "_blank");
    }
    setActionModal(null);
    await supabase.from("leads").update(updatePayload).eq("id", lead.id);
  };

  const saveCrm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const crmData = Object.fromEntries(fd.entries()) as unknown as CRM;
    
    if (editingCrm) {
      const updated = { ...editingCrm, ...crmData };
      setCrms(crms.map(c => c.id === editingCrm.id ? updated : c));
      await supabase.from("crms").update(updated).eq("id", editingCrm.id);
    } else {
      const newCrm = { ...crmData, id: `CRM-${Math.floor(1000 + Math.random() * 9000)}` };
      setCrms([...crms, newCrm]);
      await supabase.from("crms").insert([newCrm]);
    }
    setEditingCrm(null);
    setShowCrmModal(false);
  };

  const deleteCrm = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      setCrms(crms.filter(c => c.id !== id));
      await supabase.from("crms").delete().eq("id", id);
    }
  };

  const exportCSV = () => {
    const headers = ["Ticket ID", "Client Name", "Phone", "Email", "Service", "Source", "Priority", "Status", "Assigned CRM", "Notes", "Created At"];
    const rows = leads.map((l) => [
      l.id, l.name, l.phone, l.email, l.service, l.source || 'Website', l.priority || 'Medium', l.status || 'Fresh',
      crms.find((c) => c.id === l.assigned_to)?.name || "Unassigned",
      `"${l.notes?.replace(/"/g, '""') || l.message || ""}"`,
      new Date(l.created_at).toLocaleDateString(),
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `LeadDesk_Export_${new Date().toLocaleDateString()}.csv`;
    link.click();
  };

  const isAdmin = currentUser?.role?.toLowerCase().includes("admin") || currentUser?.email === "admin@clearby.com";

  const accessibleLeads = useMemo(() => {
    if (isAdmin) return leads;
    return leads.filter(l => l.assigned_to === currentUser?.id);
  }, [leads, currentUser, isAdmin]);

  const filteredLeads = useMemo(() => {
    return accessibleLeads.filter((l) => {
      const matchesSearch = search === "" || (l.name && l.name.toLowerCase().includes(search.toLowerCase())) || (l.phone && l.phone.includes(search)) || (l.email && l.email.toLowerCase().includes(search.toLowerCase()));
      const matchesStatus = filterStatus === "All" || (l.status || "Fresh") === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [accessibleLeads, search, filterStatus]);

  const totalLeads = accessibleLeads.length;
  const quotedLeads = accessibleLeads.filter((l) => l.status === "Quoted").length;
  const convertedLeads = accessibleLeads.filter((l) => l.status === "Converted").length;
  const conversionRate = totalLeads === 0 ? 0 : ((convertedLeads / totalLeads) * 100).toFixed(1);

  const leadsBySource = SOURCES.reduce((acc, source) => {
    acc[source] = accessibleLeads.filter((l) => (l.source || "Website") === source).length;
    return acc;
  }, {} as Record<string, number>);

  if (!isMounted) return null;

  if (!currentUser) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50 px-4 z-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">LeadDesk Portal</h1>
            <p className="text-sm text-gray-500 mt-2">Sign in to access your dashboard and tasks</p>
          </div>
          {loginError && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">{loginError}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Email Address</label>
              <div className="relative">
                <MailIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input required type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="admin@clearby.com" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-indigo-600 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input required type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-indigo-600 outline-none" />
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex bg-gray-50 text-slate-800 font-sans overflow-hidden z-50">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6 text-2xl font-bold tracking-wider flex items-center gap-2 text-indigo-600 border-b border-gray-100">
          <LayoutDashboard className="w-7 h-7" />
          LeadDesk
        </div>
        
        <div className="p-4 mx-4 mt-4 bg-indigo-50/60 rounded-xl border border-indigo-100/50">
          <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Signed in as</p>
          <p className="font-bold text-slate-800 text-sm truncate mt-0.5">{currentUser.name}</p>
          <p className="text-[11px] text-gray-500 capitalize">{currentUser.role}</p>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-4">
          {[
            { id: "dashboard", label: "Analytics", icon: <LayoutDashboard className="w-5 h-5" /> },
            { id: "list", label: "Lead Tickets", icon: <ListIcon className="w-5 h-5" /> },
            { id: "kanban", label: "Pipeline", icon: <Kanban className="w-5 h-5" /> },
            ...(isAdmin ? [{ id: "crm", label: "Team & CRMs", icon: <Users className="w-5 h-5" /> }] : []),
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id ? "bg-indigo-600 text-white shadow-sm" : "text-slate-600 hover:bg-gray-100 hover:text-slate-900"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-100 space-y-2">
          {isAdmin && (
            <button onClick={exportCSV} className="w-full flex items-center justify-center gap-2 py-2 bg-gray-100 hover:bg-gray-200 text-xs rounded-lg text-slate-700 font-semibold transition-colors">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          )}
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2 bg-red-50 hover:bg-red-100 text-xs rounded-lg text-red-600 font-semibold transition-colors">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center w-1/3">
            <input
              type="text"
              placeholder="Search leads by name, phone, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-100 border-transparent px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchData} className="text-gray-400 hover:text-indigo-600 transition-colors" title="Refresh Live Data">
              <RefreshCcw className={`w-5 h-5 ${loading ? "animate-spin text-indigo-600" : ""}`} />
            </button>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-100 border-transparent px-4 py-2 rounded-lg outline-none text-sm cursor-pointer"
            >
              <option value="All">All Statuses</option>
              {STATUSES.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
            {isAdmin && (
              <button
                onClick={() => setShowLeadModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
              >
                + New Lead
              </button>
            )}
          </div>
        </header>

        {/* View Container */}
        <div className="flex-1 overflow-auto p-8">
          
          {loading && leads.length === 0 ? (
            <div className="flex justify-center items-center h-full text-gray-500 font-medium">
              <RefreshCcw className="w-6 h-6 animate-spin mr-2" /> Syncing with Supabase...
            </div>
          ) : (
            <>
              {activeTab === "dashboard" && (
                <div className="space-y-6 max-w-6xl mx-auto">
                  <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
                  <div className="grid grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <p className="text-xs uppercase font-bold text-gray-400 tracking-wider">Total Leads</p>
                      <p className="text-4xl font-extrabold text-slate-800 mt-2">{totalLeads}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <p className="text-xs uppercase font-bold text-gray-400 tracking-wider">Quoted</p>
                      <p className="text-4xl font-extrabold text-blue-600 mt-2">{quotedLeads}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <p className="text-xs uppercase font-bold text-gray-400 tracking-wider">Converted</p>
                      <p className="text-4xl font-extrabold text-green-600 mt-2">{convertedLeads}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <p className="text-xs uppercase font-bold text-gray-400 tracking-wider">Conversion Rate</p>
                      <p className="text-4xl font-extrabold text-indigo-600 mt-2">{conversionRate}%</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="font-bold text-lg mb-4 text-slate-800">Leads by Source</h3>
                      <div className="space-y-3">
                        {Object.entries(leadsBySource).map(([source, count]) => (
                          <div key={source} className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">{source}</span>
                            <div className="flex items-center gap-3 w-2/3">
                              <div className="flex-1 bg-gray-100 rounded-full h-2">
                                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${totalLeads === 0 ? 0 : (count / totalLeads) * 100}%` }}></div>
                              </div>
                              <span className="font-bold w-8 text-right">{count}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {isAdmin && (
                      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 text-slate-800">Team Workload</h3>
                        <div className="space-y-3">
                          {crms.length === 0 ? (
                            <p className="text-gray-400 text-sm">No team members added yet.</p>
                          ) : (
                            crms.map((crm) => {
                              const count = leads.filter((l) => l.assigned_to === crm.id).length;
                              return (
                                <div key={crm.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                                  <div>
                                    <p className="font-bold text-slate-800 text-sm">{crm.name}</p>
                                    <p className="text-xs text-gray-500">{crm.role}</p>
                                  </div>
                                  <span className="bg-indigo-100 text-indigo-800 py-1 px-3 rounded-full text-xs font-bold">{count} Leads</span>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "list" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                        <th className="p-4 font-semibold">Date</th>
                        <th className="p-4 font-semibold">Client Info</th>
                        <th className="p-4 font-semibold">Service & Source</th>
                        <th className="p-4 font-semibold">Status</th>
                        <th className="p-4 font-semibold">Assigned To</th>
                        <th className="p-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredLeads.length === 0 && (
                        <tr><td colSpan={6} className="p-8 text-center text-gray-400 text-sm">No leads found.</td></tr>
                      )}
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="p-4"><span className="text-xs font-bold text-gray-600">{new Date(lead.created_at).toLocaleDateString()}</span></td>
                          <td className="p-4">
                            <p className="font-bold text-slate-800 text-sm">{lead.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{lead.phone}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{lead.email}</p>
                          </td>
                          <td className="p-4">
                            <p className="font-medium text-slate-800 text-sm">{lead.service}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{lead.source || "Website"}</p>
                            {lead.priority === "High" && (
                              <span className="text-[10px] text-red-600 font-bold mt-1 inline-flex items-center gap-1 uppercase tracking-wider">
                                <Flame className="w-3 h-3" /> High
                              </span>
                            )}
                          </td>
                          <td className="p-4">
                            <select
                              value={lead.status || "Fresh"}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                              className="bg-gray-100 border-none text-xs font-medium rounded-md py-1.5 px-2 outline-none cursor-pointer"
                            >
                              {STATUSES.map((s) => (<option key={s} value={s}>{s}</option>))}
                            </select>
                          </td>
                          <td className="p-4">
                            {isAdmin ? (
                              <select
                                value={lead.assigned_to || ""}
                                onChange={async (e) => {
                                  const newId = e.target.value;
                                  setLeads(leads.map(l => l.id === lead.id ? { ...l, assigned_to: newId } : l));
                                  await supabase.from("leads").update({ assigned_to: newId }).eq("id", lead.id);
                                }}
                                className="bg-gray-100 border-none text-xs font-medium rounded-md py-1.5 px-2 outline-none cursor-pointer text-slate-700"
                              >
                                <option value="">Unassigned</option>
                                {crms.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                              </select>
                            ) : (
                              <span className="text-xs font-medium text-slate-700">{crms.find((c) => c.id === lead.assigned_to)?.name || "Unassigned"}</span>
                            )}
                          </td>
                          <td className="p-4 flex gap-2">
                            <button
                              onClick={() => setActionModal({ type: "whatsapp", lead })}
                              className={`p-2 rounded-full transition-colors ${lead.whatsapp_contacted ? "bg-green-100 text-green-600" : "bg-gray-100 hover:bg-green-600 hover:text-white text-gray-400"}`}
                              title="WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setActionModal({ type: "email", lead })}
                              className={`p-2 rounded-full transition-colors ${lead.email_sent ? "bg-blue-100 text-blue-600" : "bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-400"}`}
                              title="Email"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "kanban" && (
                <div className="flex gap-6 overflow-x-auto h-full pb-4 scrollbar-hide">
                  {STATUSES.map((status) => (
                    <div
                      key={status}
                      className="bg-gray-100 rounded-xl p-4 w-80 shrink-0 flex flex-col border border-gray-200/60"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        const id = e.dataTransfer.getData("id");
                        if (id) updateLeadStatus(id, status);
                      }}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-700 uppercase tracking-wider text-xs">{status}</h3>
                        <span className="bg-white shadow-sm text-slate-600 text-xs py-1 px-2.5 rounded-full font-bold">
                          {filteredLeads.filter((l) => (l.status || "Fresh") === status).length}
                        </span>
                      </div>
                      <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide pb-10">
                        {filteredLeads
                          .filter((l) => (l.status || "Fresh") === status)
                          .map((lead) => (
                            <div
                              key={lead.id}
                              draggable
                              onDragStart={(e) => e.dataTransfer.setData("id", lead.id)}
                              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:border-indigo-400 transition-colors"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] text-gray-400 font-medium">{new Date(lead.created_at).toLocaleDateString()}</span>
                                {lead.priority === "High" && <span className="w-2 h-2 rounded-full bg-red-500" title="High Priority"></span>}
                              </div>
                              <p className="font-bold text-slate-800 text-sm">{lead.name}</p>
                              <p className="text-xs text-gray-500 mt-1 truncate">{lead.service}</p>
                              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-[11px] font-medium text-gray-500">{crms.find((c) => c.id === lead.assigned_to)?.name || "Unassigned"}</span>
                                <span className="text-[10px] uppercase font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">{lead.source || "Website"}</span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === "crm" && isAdmin && (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Team Accounts & Logins</h2>
                  <p className="text-sm text-gray-500">Manage team credentials and system access.</p>
                </div>
                <button
                  onClick={() => { setEditingCrm(null); setShowCrmModal(true); }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
                >
                  + Add Team Member
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {crms.map((crm) => (
                  <div key={crm.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-start gap-4 relative">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl shrink-0">
                      {crm.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-slate-800">{crm.name}</h3>
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingCrm(crm); setShowCrmModal(true); }} className="text-gray-400 hover:text-indigo-600 p-1" title="Edit CRM">
                            <Pencil className="w-4 h-4" />
                          </button>
                          {crm.email !== "admin@clearby.com" && (
                            <button onClick={() => deleteCrm(crm.id)} className="text-gray-400 hover:text-red-600 p-1" title="Delete CRM">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-indigo-600 font-medium mb-2">{crm.role}</p>
                      <p className="text-xs text-gray-500 mt-1">📧 {crm.email}</p>
                      <p className="text-xs text-gray-500 mt-1">📱 {crm.phone}</p>
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs font-medium text-gray-500">Active Leads Assigned</span>
                        <span className="bg-gray-100 text-slate-800 py-1 px-3 rounded-full text-xs font-bold">
                          {leads.filter((l) => l.assigned_to === crm.id).length}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* MODALS */}

      {showLeadModal && isAdmin && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form onSubmit={addLead} className="bg-white rounded-xl shadow-2xl w-full max-w-xl flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold">Add New Lead</h2>
              <button type="button" onClick={() => setShowLeadModal(false)} className="text-gray-400 hover:text-gray-800"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Client Name *</label>
                  <input required name="name" type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Phone / WhatsApp *</label>
                  <input required name="phone" type="tel" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Email</label>
                  <input name="email" type="email" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Service / Requirement *</label>
                  <input required name="service" type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Source</label>
                  <select name="source" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600 bg-white">
                    {SOURCES.map((s) => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Priority</label>
                  <select name="priority" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600 bg-white">
                    {PRIORITIES.map((s) => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Assign Team Member</label>
                  <select name="assigned_to" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600 bg-white">
                    <option value="">Unassigned</option>
                    {crms.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                  </select>
                </div>
              </div>
              <input type="hidden" name="status" value="Fresh" />
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Notes / Message</label>
                <textarea name="notes" rows={3} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600"></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button type="button" onClick={() => setShowLeadModal(false)} className="px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-200 rounded-lg font-semibold">Cancel</button>
              <button type="submit" className="px-5 py-2.5 text-sm bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">Save Lead</button>
            </div>
          </form>
        </div>
      )}

      {showCrmModal && isAdmin && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form onSubmit={saveCrm} className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingCrm ? "Edit Team Member" : "Add Team Member"}</h2>
              <button type="button" onClick={() => setShowCrmModal(false)} className="text-gray-400 hover:text-gray-800"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Full Name *</label>
                <input required name="name" defaultValue={editingCrm?.name || ""} type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Login Email (ID) *</label>
                <input required name="email" defaultValue={editingCrm?.email || ""} type="email" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Login Password *</label>
                <input required name="password" defaultValue={editingCrm?.password || ""} type="text" placeholder="e.g. secret123" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Phone *</label>
                <input required name="phone" defaultValue={editingCrm?.phone || ""} type="tel" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Role *</label>
                <input required name="role" defaultValue={editingCrm?.role || "Sales Rep"} type="text" placeholder="e.g. Sales Rep, Support" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600" />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button type="button" onClick={() => setShowCrmModal(false)} className="px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-200 rounded-lg font-semibold">Cancel</button>
              <button type="submit" className="px-5 py-2.5 text-sm bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">{editingCrm ? "Update Member" : "Add Member"}</button>
            </div>
          </form>
        </div>
      )}

      {actionModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <form onSubmit={performAction} className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                {actionModal.type === "whatsapp" ? <span className="text-green-600 flex items-center gap-2"><MessageCircle/> Send WhatsApp</span> : <span className="text-blue-600 flex items-center gap-2"><Mail/> Send Email</span>}
              </h2>
              <button type="button" onClick={() => setActionModal(null)} className="text-gray-400 hover:text-gray-800"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm font-medium">To: {actionModal.lead.name} ({actionModal.type === 'whatsapp' ? actionModal.lead.phone : actionModal.lead.email})</p>
              
              {actionModal.type === "email" && (
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Subject</label>
                  <input required name="subject" type="text" defaultValue={`Regarding your inquiry for ${actionModal.lead.service}`} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm font-medium outline-none focus:border-indigo-600" />
                </div>
              )}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 tracking-wider mb-1">Message Body</label>
                <textarea required name="message" rows={6} className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-indigo-600" defaultValue={`Hi ${actionModal.lead.name},\n\nThank you for your interest in ${actionModal.lead.service}. I would love to connect and discuss how we can help you.\n\nBest regards,\n[Your Name]`}></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button type="button" onClick={() => setActionModal(null)} className="px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-200 rounded-lg font-semibold">Cancel</button>
              <button type="submit" className={`px-5 py-2.5 text-sm text-white rounded-lg font-semibold ${actionModal.type === "whatsapp" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}>
                Open & Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}