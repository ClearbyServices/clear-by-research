import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PhD Research Consultation, Thesis & Dissertation Coaching Pune | 5★ Rated | E-Clearby Research",
  description: "As trusted PhD Topics Consultants, we help you select a research direction that is original and achievable; through expert guidance in Thesis Writing, we support you in structuring and strengthening your own work chapter by chapter.",
  alternates: { canonical: "https://www.clearbyresearch.com/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}