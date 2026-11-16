import type { Metadata } from "next";

export const metadata: Metadata = {
  // Brand name removed, root layout handles the suffix
  title: "PhD Research & Thesis Guidance Blog",
  description: "Explore expert insights on PhD research, thesis guidance, research methodology, literature reviews, academic publishing, editing, and research best practices.",
  // Removed static canonical URL so individual blog posts can index properly
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}