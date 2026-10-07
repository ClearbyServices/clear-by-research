import { CRM, Lead } from "@/types/crm";
import { Pencil, Trash2 } from "lucide-react";

interface TeamTabProps {
  crms: CRM[];
  leads: Lead[];
  setEditingCrm: (crm: CRM | null) => void;
  setShowCrmModal: (show: boolean) => void;
  deleteCrm: (id: string, name: string) => void;
}

export default function TeamTab({ crms, leads, setEditingCrm, setShowCrmModal, deleteCrm }: TeamTabProps) {
  return (
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
                    <button onClick={() => deleteCrm(crm.id, crm.name)} className="text-gray-400 hover:text-red-600 p-1" title="Delete CRM">
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
  );
}