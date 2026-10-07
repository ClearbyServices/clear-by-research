import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PhD Research & Thesis Guidance Blog | E-Clearby Research",
  description: "Explore expert insights on PhD research, thesis guidance, research methodology, literature reviews, academic publishing, editing, and research best practices.",
  alternates: { canonical: "https://www.clearbyresearch.com/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}