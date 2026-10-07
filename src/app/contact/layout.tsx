import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact E-Clearby Research | PhD Research Guidance in Pune",
  description: "Contact E-Clearby Research for personalized PhD research, thesis, methodology, editing, and academic guidance. Connect with our experienced consultants in Pune.",
  alternates: { canonical: "https://www.clearbyresearch.com/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}