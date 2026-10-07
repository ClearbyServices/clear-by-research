export type Lead = {
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
  table_name?: "leads" | "google_ads_leads"; 
};

export type CRM = {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  role: string;
};

export const SOURCES = ["Google Ads", "Meta", "Website", "Referral", "Other"];
export const STATUSES = ["Fresh", "Contacted", "Quoted", "Follow-up", "Converted", "Not Interested"];
export const PRIORITIES = ["High", "Medium", "Low"];