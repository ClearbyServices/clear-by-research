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

export type Service = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  sub_menu?: string | null;
  h1?: string | null;
  menu_order?: number | null;
  meta_description?: string | null;
  
  // JSONB Columns
  intro_paragraphs?: string[];
  features_section?: {
    title: string;
    intro?: string;
    list: { title: string; desc: string }[];
    outro?: string;
  };
  sub_services?: { title: string; desc: string }[];
  comparison_section?: {
    title: string;
    data: { feature: string; generic: string; clearby: string }[];
  };
  faqs?: { q: string; a: string }[];
  cta_section?: {
    title: string;
    text: string;
    buttonText: string;
  };
  internal_links?: { anchor_text: string; url: string }[] | Record<string, unknown>;

  created_at?: string;
  updated_at?: string;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  category: string;
  author_name: string;
  excerpt: string;
  content: string;
  featured_image: string;
  is_published: boolean;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
};

export const SOURCES = ["Google Ads", "Meta", "Website", "Referral", "Other"];
export const STATUSES = ["Fresh", "Contacted", "Quoted", "Follow-up", "Converted", "Not Interested"];
export const PRIORITIES = ["High", "Medium", "Low"];