import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Clearby Research Consulting Pvt Ltd Pune",
  description: "E-Clearby Research Consulting Pvt. Ltd. provides academic consultation and research assistance to PhD scholars, Master's students, and researchers across different disciplines",
  alternates: { canonical: "https://www.clearbyresearch.com/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}