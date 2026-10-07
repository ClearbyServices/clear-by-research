import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LeadDesk CRM Portal | E-Clearby Research",
  description: "Secure LeadDesk CRM dashboard for E-Clearby Research team members and administrators.",
  alternates: {
    canonical: "https://www.clearbyresearch.com/leaddesk",
  },
  robots: {
    index: false, // Prevents Google from showing your private login page in search results
    follow: false,
  },
};

export default function LeadDeskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}