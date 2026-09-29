import { createClient } from "@supabase/supabase-js";
import HeaderClient from "./HeaderClient";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default async function Header() {
  const { data: services } = await supabase
    .from('services')
    .select('slug, h1, category, sub_menu, menu_order')
    .order('menu_order', { ascending: true });

  const serviceList = services || [];

  const filterServices = (keyword: string) => {
    return serviceList.filter((s) => 
      s.category && s.category.toLowerCase().trim().includes(keyword.toLowerCase().trim())
    );
  };

  const mastersServices = serviceList.filter((s) => {
    const cat = s.category?.toLowerCase().replace(/['\s]/g, "") || "";
    return cat.includes("master");
  });

  const researchPlanning = filterServices("research planning");
  const researchDevelopment = filterServices("research development");
  const researchExecution = filterServices("research execution");
  const thesisCat = filterServices("thesis");

  const researchPaper = filterServices("Research Paper");
  const dataAnalysis = filterServices("Data Analysis");
  const implementation = filterServices("Implementation");
  const academicSupport = filterServices("Academic Support");

  return (
    <HeaderClient 
      services={serviceList}
      mastersServices={mastersServices}
      researchPlanning={researchPlanning}
      researchDevelopment={researchDevelopment}
      researchExecution={researchExecution}
      thesisCat={thesisCat}
      researchPaper={researchPaper}
      dataAnalysis={dataAnalysis}
      implementation={implementation}
      academicSupport={academicSupport}
    />
  );
}