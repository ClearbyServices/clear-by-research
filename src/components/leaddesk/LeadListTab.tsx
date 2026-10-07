import { CRM, Lead, STATUSES } from "../../types/crm";
import { Flame, MessageCircle, Mail } from "lucide-react";

interface LeadListTabProps {
  filteredLeads: Lead[];
  crms: CRM[];
  isAdmin: boolean;
  updateLeadStatus: (id: string, status: string, tableName?: "leads" | "google_ads_leads") => void;
  reassignLead: (id: string, newCrmId: string, tableName?: "leads" | "google_ads_leads") => void;
  setActionModal: (modal: { type: "whatsapp" | "email"; lead: Lead } | null) => void;
}

export default function LeadListTab({ filteredLeads, crms, isAdmin, updateLeadStatus, reassignLead, setActionModal }: LeadListTabProps) {
  return (
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
                  onChange={(e) => updateLeadStatus(lead.id, e.target.value, lead.table_name)}
                  className="bg-gray-100 border-none text-xs font-medium rounded-md py-1.5 px-2 outline-none cursor-pointer"
                >
                  {STATUSES.map((s: string) => (<option key={s} value={s}>{s}</option>))}
                </select>
              </td>
              <td className="p-4">
                {isAdmin ? (
                  <select
                    value={lead.assigned_to || ""}
                    onChange={(e) => reassignLead(lead.id, e.target.value, lead.table_name)}
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
  );
}