import LandingHeroContent from "@/components/LandingHeroContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dedicated PhD Research Support & Thesis Guidance",
  description: "Comprehensive research support, thesis guidance, and consultation services for PhD scholars. End-to-end assistance from proposal to publication.",
  alternates: { canonical: "https://www.clearbyresearch.com/phd-thesis-guidance-and-research-support" }
};

export default function StandaloneLandingPage() {
  return (
    <main className="w-full flex flex-col">
      <LandingHeroContent />
    </main>
  );
}