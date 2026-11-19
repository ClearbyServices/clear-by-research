import type { Metadata } from "next";
import { supabase } from "@/lib/supabaseClient";
import HomePageClient from "@/components/HomePageClient";

// Revalidate every 60 seconds so SEO updates from LeadDesk go live automatically
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await supabase
    .from("home_hero")
    .select("meta_title, meta_description")
    .limit(1)
    .maybeSingle();

  return {
    title:
      data?.meta_title ||
      "PhD Research Guidance from Expert Consultants | 11+ Yrs of Exp. | E-Clearby Research",
    description:
      data?.meta_description ||
      "Get PhD thesis guidance from experts with 11+ years of experience. Personalized, integrity-first coaching and affordable dissertation consultation for your research.",
    alternates: {
      canonical: "https://www.clearbyresearch.com/",
    },
  };
}

export default function Page() {
  return <HomePageClient />;
}