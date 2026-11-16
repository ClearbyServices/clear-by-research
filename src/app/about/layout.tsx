import type { Metadata } from "next";

export const metadata: Metadata = {
  // Brand name removed, root layout will append it automatically
  title: "About Our Expert PhD Consultants", 
  description: "E-Clearby Research Consulting Pvt. Ltd. provides academic consultation and research assistance to PhD scholars, Master's students, and researchers across different disciplines.",
  alternates: { canonical: "https://www.clearbyresearch.com/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}