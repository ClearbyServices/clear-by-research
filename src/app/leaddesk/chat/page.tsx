"use client";

import { useState } from "react";
import { Sparkles, ExternalLink, RefreshCw } from "lucide-react";

export default function LeadDeskChatPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    const iframe = document.getElementById("crisp-iframe") as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col bg-slate-50 p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-widest mb-1 border border-brand-gold/20">
            <Sparkles className="w-3.5 h-3.5" /> CRM Live Inbox
          </div>
          <h1 className="text-2xl font-serif font-bold text-brand-purple">
            Scholar Live Chat Support
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:bg-slate-50 transition shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Inbox
          </button>
          
          <a
            href="https://app.crisp.chat/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-brand-purple text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-brand-purple/90 transition shadow-sm"
          >
            Open in Crisp App <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Embedded Crisp Agent Dashboard */}
      <div className="flex-1 w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
        <iframe
          id="crisp-iframe"
          src="https://app.crisp.chat/"
          className="w-full h-full border-0"
          title="LeadDesk Live Chat Dashboard"
        />
      </div>
    </div>
  );
}