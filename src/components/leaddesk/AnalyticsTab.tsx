import { CRM, Lead } from "@/types/crm";

interface AnalyticsTabProps {
  totalLeads: number;
  quotedLeads: number;
  convertedLeads: number;
  conversionRate: string | number;
  leadsBySource: Record<string, number>;
  isAdmin: boolean;
  crms: CRM[];
  leads: Lead[];
}

export default function AnalyticsTab({ totalLeads, quotedLeads, convertedLeads, conversionRate, leadsBySource, isAdmin, crms, leads }: AnalyticsTabProps) {
  return (
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
  );
}