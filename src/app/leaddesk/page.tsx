"use client";

import { useState, useEffect, useMemo, useCallback, useSyncExternalStore } from "react";
import { LayoutDashboard, List as ListIcon, Kanban, Users, Layers, FileText, Download, X, MessageCircle, Mail, RefreshCcw, LogOut, Lock, Mail as MailIcon, AlertTriangle, MessageSquare, ExternalLink, Award, Home } from "lucide-react";

// Types & Config
import { CRM, Lead, SOURCES, STATUSES, PRIORITIES } from "../../types/crm";

// UI Components
import AnalyticsTab from "@/components/leaddesk/AnalyticsTab";
import KanbanTab from "@/components/leaddesk/KanbanTab";
import TeamTab from "@/components/leaddesk/TeamTab";
import LeadListTab from "@/components/leaddesk/LeadListTab";
import ServicesTab from "@/components/leaddesk/ServicesTab";
import BlogTab from "@/components/leaddesk/BlogTab";
import AboutTab from "@/components/leaddesk/AboutTab";
import HomeTab from "@/components/leaddesk/HomeTab";

import { supabase } from "@/lib/supabaseClient";

export default function LeadDesk() {
  const isMounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [loading, setLoading] = useState(true);

  // Auth State
  const [currentUser, setCurrentUser] = useState<CRM | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const savedUser = sessionStorage.getItem("ld_current_user");
      return savedUser ? JSON.parse(savedUser) as CRM : null;
    } catch {
      return null;
    }
  });
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

  // --- SECURITY FEATURE 1: AUTO LOGOUT ---
  const handleLogout = useCallback((force = false) => {
    if (force || window.confirm("SECURITY: Are you sure you want to sign out of the CRM?")) {
      setCurrentUser(null);
      sessionStorage.removeItem("ld_current_user");
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (currentUser) {
          alert("Your session has expired due to inactivity for security reasons. Please sign in again.");
          handleLogout(true);
        }
      }, 15 * 60 * 1000); // 15 mins
    };
    if (currentUser) {
      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keypress", resetTimer);
      window.addEventListener("scroll", resetTimer);
      resetTimer();
    }
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [currentUser, handleLogout]);

  // --- SECURITY FEATURE 2: PREVENT ACCIDENTAL EXIT ---
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (showLeadModal || showCrmModal) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [showLeadModal, showCrmModal]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: leadData } = await supabase.from("leads").select("*");
      const { data: adsData } = await supabase.from("google_ads_leads").select("*");
      const combinedLeads = [
        ...(leadData || []).map(l => ({ ...l, table_name: "leads" as const })),
        ...(adsData || []).map(l => ({ ...l, table_name: "google_ads_leads" as const }))
      ];
      combinedLeads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setLeads(combinedLeads);

      const { data: crmData } = await supabase.from("crms").select("*");
      if (crmData && crmData.length > 0) {
        setCrms(crmData);
      } else {
        setCrms([{ id: "CRM-ADMIN", name: "Admin User", email: "admin@clearby.com", password: "admin123", phone: "9999999999", role: "Administrator" }]);
      }
    } catch (error) {
      console.error("Error fetching LeadDesk data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setTimeout(() => {
        fetchData();
      }, 0);
    }
    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const found = crms.find(c => c.email.toLowerCase() === loginEmail.toLowerCase() && c.password === loginPassword);
    if (found) {
      setCurrentUser(found);
      sessionStorage.setItem("ld_current_user", JSON.stringify(found));
    } else {
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  const addLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newLeadData = Object.fromEntries(fd.entries());
    const targetTable = newLeadData.source === "Google Ads" ? "google_ads_leads" : "leads";
    const { data, error } = await supabase.from(targetTable).insert([newLeadData]).select();
    if (error) alert("Failed to add lead.");
    else if (data) {
      setLeads([{ ...data[0], table_name: targetTable }, ...leads]);
      setShowLeadModal(false);
    }
  };

  const updateLeadStatus = async (id: string, newStatus: string, tableName: "leads" | "google_ads_leads" = "leads") => {
    if (newStatus === "Converted" || newStatus === "Not Interested") {
      if (!window.confirm(`Are you sure you want to mark this lead as ${newStatus}?`)) return;
    }
    setLeads(leads.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
    await supabase.from(tableName).update({ status: newStatus }).eq("id", id);
  };

  const reassignLead = async (id: string, newCrmId: string, tableName: "leads" | "google_ads_leads" = "leads") => {
    if (window.confirm("Are you sure you want to reassign this lead?")) {
      setLeads(leads.map(l => l.id === id ? { ...l, assigned_to: newCrmId } : l));
      await supabase.from(tableName).update({ assigned_to: newCrmId }).eq("id", id);
    }
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
    await supabase.from(lead.table_name || "leads").update(updatePayload).eq("id", lead.id);
  };

  const saveCrm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const crmData = Object.fromEntries(fd.entries()) as unknown as CRM;
    if (window.confirm(editingCrm ? "Save changes to this team member?" : "Add this new team member to the CRM?")) {
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
    }
  };

  const deleteCrm = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this team member?")) return;
    setCrms(crms.filter(crm => crm.id !== id));
    await supabase.from("crms").delete().eq("id", id);
  };

  const exportCSV = () => {
    if (!window.confirm("Export all lead data to CSV? Keep this file secure.")) return;
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
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50 px-4 z-50 animate-fadeIn">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8 transform transition-all duration-300 scale-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">LeadDesk Portal</h1>
            <p className="text-sm text-gray-600 mt-2">Sign in to access your dashboard and tasks</p>
          </div>
          {loginError && <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> {loginError}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Email Address</label>
              <div className="relative">
                <MailIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input id="login-email" required type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="admin@clearby.com" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-indigo-600 outline-none transition" />
              </div>
            </div>
            <div>
              <label htmlFor="login-password" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                <input id="login-password" required type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:border-indigo-600 outline-none transition" />
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-sm transition-all shadow-sm transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex bg-gray-50 text-slate-800 font-sans overflow-hidden z-50">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6 text-2xl font-bold tracking-wider flex items-center gap-2 text-indigo-600 border-b border-gray-100">
          LeadDesk
        </div>
        <div className="p-4 mx-4 mt-4 bg-indigo-50/60 rounded-xl border border-indigo-100/50">
          <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Signed in as</p>
          <p className="font-bold text-slate-800 text-sm truncate mt-0.5">{currentUser.name}</p>
          <p className="text-[11px] text-gray-600 capitalize">{currentUser.role}</p>
        </div>
        <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto">
          {[
            { id: "dashboard", label: "Analytics", icon: <LayoutDashboard className="w-5 h-5" /> },
            { id: "list", label: "Lead Tickets", icon: <ListIcon className="w-5 h-5" /> },
            { id: "kanban", label: "Pipeline", icon: <Kanban className="w-5 h-5" /> },
            { id: "chat", label: "Live Chat Inbox", icon: <MessageSquare className="w-5 h-5" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab === item.id ? "bg-indigo-600 text-white shadow-sm scale-[1.02]" : "text-slate-600 hover:bg-gray-100 hover:text-slate-900"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}

          {isAdmin && (
            <>
              <div className="my-3 border-t border-gray-200" />
              <div className="px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-400">Content Management</div>
              {[
                { id: "home_page", label: "Manage Home", icon: <Home className="w-5 h-5" /> },
                { id: "crm", label: "Team & CRMs", icon: <Users className="w-5 h-5" /> },
                { id: "services", label: "Manage Services", icon: <Layers className="w-5 h-5" /> },
                { id: "blog", label: "Manage Blog", icon: <FileText className="w-5 h-5" /> },
                { id: "about", label: "Manage About Faculty", icon: <Award className="w-5 h-5" /> }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    activeTab === item.id ? "bg-indigo-600 text-white shadow-sm scale-[1.02]" : "text-slate-600 hover:bg-gray-100 hover:text-slate-900"
                  }`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </>
          )}
        </nav>
        <div className="p-4 border-t border-gray-100 space-y-2">
          {isAdmin && (
            <button onClick={exportCSV} className="w-full flex items-center justify-center gap-2 py-2 bg-gray-100 hover:bg-gray-200 text-xs rounded-lg text-slate-700 font-semibold transition-all cursor-pointer">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          )}
          <button onClick={() => handleLogout(false)} className="w-full flex items-center justify-center gap-2 py-2 bg-red-50 hover:bg-red-100 text-xs rounded-lg text-red-600 font-semibold transition-all cursor-pointer">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center w-1/3">
            <input
              type="text"
              placeholder="Search leads by name, phone, email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-100 border-transparent px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-600 outline-none text-sm transition"
            />
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => fetchData()} aria-label="Refresh live data" className="text-gray-400 hover:text-indigo-600 transition-colors cursor-pointer" title="Refresh Live Data">
              <RefreshCcw className={`w-5 h-5 ${loading ? "animate-spin text-indigo-600" : ""}`} />
            </button>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              aria-label="Filter leads by status"
              className="bg-gray-100 border-transparent px-4 py-2 rounded-lg outline-none text-sm cursor-pointer"
            >
              <option value="All">All Statuses</option>
              {STATUSES.map((s) => (<option key={s} value={s}>{s}</option>))}
            </select>
            {isAdmin && !["services", "blog", "about", "home_page", "chat"].includes(activeTab) && (
              <button
                onClick={() => setShowLeadModal(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                + New Lead
              </button>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 animate-fadeIn">
          {loading && leads.length === 0 ? (
            <div className="flex justify-center items-center h-full text-gray-600 font-medium">
              <RefreshCcw className="w-6 h-6 animate-spin mr-2 text-indigo-600" /> Syncing with Supabase...
            </div>
          ) : (
            <>
              {activeTab === "dashboard" && <AnalyticsTab totalLeads={totalLeads} quotedLeads={quotedLeads} convertedLeads={convertedLeads} conversionRate={conversionRate} leadsBySource={leadsBySource} isAdmin={isAdmin} crms={crms} leads={leads} />}
              {activeTab === "list" && <LeadListTab filteredLeads={filteredLeads} crms={crms} isAdmin={isAdmin} updateLeadStatus={updateLeadStatus} reassignLead={reassignLead} setActionModal={setActionModal} />}
              {activeTab === "kanban" && <KanbanTab filteredLeads={filteredLeads} crms={crms} updateLeadStatus={updateLeadStatus} />}
              {activeTab === "home_page" && isAdmin && <HomeTab />}
              {activeTab === "chat" && (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Live Chat & Visitor Inbox</h2>
                  <p className="text-sm text-gray-600 max-w-md mb-6">
                    Manage real-time scholar conversations, monitor active website visitors, and reply instantly from your dedicated Crisp support dashboard.
                  </p>
                  <a
                    href="https://app.crisp.chat/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md transition transform hover:-translate-y-0.5"
                  >
                    Launch Crisp Agent Dashboard <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-xs text-gray-500 mt-4">
                    Tip: You can also download the Crisp mobile app on your office phone for instant push notifications!
                  </p>
                </div>
              )}
              {activeTab === "crm" && isAdmin && <TeamTab crms={crms} leads={leads} setEditingCrm={setEditingCrm} setShowCrmModal={setShowCrmModal} deleteCrm={deleteCrm} />}
              {activeTab === "services" && isAdmin && <ServicesTab />}
              {activeTab === "blog" && isAdmin && <BlogTab />}
              {activeTab === "about" && isAdmin && <AboutTab />}
            </>
          )}
        </div>
      </main>

      {/* MODALS */}
      {showLeadModal && isAdmin && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <form onSubmit={addLead} className="bg-white rounded-xl shadow-2xl w-full max-w-xl flex flex-col max-h-[90vh] transform transition-all animate-scaleUp">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold">Add New Lead</h2>
              <button type="button" onClick={() => { if(window.confirm("Discard unsaved lead data?")) setShowLeadModal(false) }} aria-label="Close lead modal" className="text-gray-400 hover:text-gray-800 cursor-pointer"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-name" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Client Name *</label>
                  <input id="lead-name" required name="name" type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600 transition" />
                </div>
                <div>
                  <label htmlFor="lead-phone" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Phone / WhatsApp *</label>
                  <input id="lead-phone" required name="phone" type="tel" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600 transition" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="lead-email" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Email</label>
                  <input id="lead-email" name="email" type="email" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600 transition" />
                </div>
                <div>
                  <label htmlFor="lead-service" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Service / Requirement *</label>
                  <input id="lead-service" required name="service" type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600 transition" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="lead-source" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Source</label>
                  <select id="lead-source" name="source" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600 bg-white cursor-pointer">
                    {SOURCES.map((s) => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
                <div>
                  <label htmlFor="lead-priority" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Priority</label>
                  <select id="lead-priority" name="priority" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600 bg-white cursor-pointer">
                    {PRIORITIES.map((s) => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
                <div>
                  <label htmlFor="lead-assign" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Assign Team Member</label>
                  <select id="lead-assign" name="assigned_to" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600 bg-white cursor-pointer">
                    <option value="">Unassigned</option>
                    {crms.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                  </select>
                </div>
              </div>
              <input type="hidden" name="status" value="Fresh" />
              <div>
                <label htmlFor="lead-notes" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Notes / Message</label>
                <textarea id="lead-notes" name="notes" rows={3} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600 transition"></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button type="button" onClick={() => { if(window.confirm("Discard unsaved lead data?")) setShowLeadModal(false) }} className="px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-200 rounded-lg font-semibold cursor-pointer transition">Cancel</button>
              <button type="submit" className="px-5 py-2.5 text-sm bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 cursor-pointer transition">Save Lead</button>
            </div>
          </form>
        </div>
      )}

      {showCrmModal && isAdmin && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <form onSubmit={saveCrm} className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col transform transition-all animate-scaleUp">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold">{editingCrm ? "Edit Team Member" : "Add Team Member"}</h2>
              <button type="button" onClick={() => { if(window.confirm("Discard unsaved team member changes?")) { setShowCrmModal(false); setEditingCrm(null); } }} aria-label="Close team member modal" className="text-gray-400 hover:text-gray-800 cursor-pointer"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label htmlFor="crm-name" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Full Name *</label>
                <input id="crm-name" required name="name" defaultValue={editingCrm?.name || ""} type="text" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600 transition" />
              </div>
              <div>
                <label htmlFor="crm-email" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Login Email (ID) *</label>
                <input id="crm-email" required name="email" defaultValue={editingCrm?.email || ""} type="email" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600 transition" />
              </div>
              <div>
                <label htmlFor="crm-pass" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Login Password *</label>
                <input id="crm-pass" required name="password" defaultValue={editingCrm?.password || ""} type="text" placeholder="e.g. secret123" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600 transition" />
              </div>
              <div>
                <label htmlFor="crm-phone" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Phone *</label>
                <input id="crm-phone" required name="phone" defaultValue={editingCrm?.phone || ""} type="tel" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600 transition" />
              </div>
              <div>
                <label htmlFor="crm-role" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Role *</label>
                <input id="crm-role" required name="role" defaultValue={editingCrm?.role || "Sales Rep"} type="text" placeholder="e.g. Sales Rep, Support" className="w-full border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-indigo-600 transition" />
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button type="button" onClick={() => { if(window.confirm("Discard unsaved team member changes?")) { setShowCrmModal(false); setEditingCrm(null); } }} className="px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-200 rounded-lg font-semibold cursor-pointer transition">Cancel</button>
              <button type="submit" className="px-5 py-2.5 text-sm bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 cursor-pointer transition">{editingCrm ? "Update Member" : "Add Member"}</button>
            </div>
          </form>
        </div>
      )}

      {actionModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <form onSubmit={performAction} className="bg-white rounded-xl shadow-2xl w-full max-w-lg flex flex-col transform transition-all animate-scaleUp">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                {actionModal.type === "whatsapp" ? <span className="text-green-600 flex items-center gap-2"><MessageCircle/> Send WhatsApp</span> : <span className="text-blue-600 flex items-center gap-2"><Mail/> Send Email</span>}
              </h2>
              <button type="button" onClick={() => setActionModal(null)} aria-label="Close action modal" className="text-gray-400 hover:text-gray-800 cursor-pointer"><X className="w-5 h-5"/></button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm font-medium">To: {actionModal.lead.name} ({actionModal.type === 'whatsapp' ? actionModal.lead.phone : actionModal.lead.email})</p>
              {actionModal.type === "email" && (
                <div>
                  <label htmlFor="email-subject" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Subject</label>
                  <input id="email-subject" required name="subject" type="text" defaultValue={`Regarding your inquiry for ${actionModal.lead.service}`} className="w-full border border-gray-200 rounded-lg p-2.5 text-sm font-medium outline-none focus:border-indigo-600 transition" />
                </div>
              )}
              <div>
                <label htmlFor="email-body" className="block text-xs font-bold uppercase text-gray-600 tracking-wider mb-1">Message Body</label>
                <textarea id="email-body" required name="message" rows={6} className="w-full border border-gray-200 rounded-lg p-3 text-sm outline-none focus:border-indigo-600 transition" defaultValue={`Hi ${actionModal.lead.name},\n\nThank you for your interest in ${actionModal.lead.service}. I would love to connect and discuss how we can help you.\n\nBest regards,\n[Your Name]`}></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button type="button" onClick={() => setActionModal(null)} className="px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-200 rounded-lg font-semibold cursor-pointer transition">Cancel</button>
              <button type="submit" className={`px-5 py-2.5 text-sm text-white rounded-lg font-semibold cursor-pointer transition transform hover:-translate-y-0.5 ${actionModal.type === "whatsapp" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}>
                Open & Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}