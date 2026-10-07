import { CRM, Lead, STATUSES } from "@/types/crm";

interface KanbanTabProps {
  filteredLeads: Lead[];
  crms: CRM[];
  updateLeadStatus: (id: string, status: string, tableName?: "leads" | "google_ads_leads") => void;
}

export default function KanbanTab({ filteredLeads, crms, updateLeadStatus }: KanbanTabProps) {
  return (
    <div className="flex gap-6 overflow-x-auto h-full pb-4 scrollbar-hide">
      {STATUSES.map((status) => (
        <div
          key={status}
          className="bg-gray-100 rounded-xl p-4 w-80 shrink-0 flex flex-col border border-gray-200/60"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            const id = e.dataTransfer.getData("id");
            const targetLead = filteredLeads.find((l) => l.id === id);
            if (id && targetLead) updateLeadStatus(id, status, targetLead.table_name);
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
  );
}