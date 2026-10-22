import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Blog Posts
      {
        source: "/post/finalizing-your-phd-paper-with-expert-proofreading",
        destination: "/blog/finalizing-your-phd-paper-with-expert-proofreading",
        permanent: true,
      },
      {
        source: "/post/thesis-statements-5-weak-examples-transformed-into-strong-ones-before-after-guide",
        destination: "/blog/thesis-statements-5-weak-examples-transformed-into-strong-ones-before-after-guide",
        permanent: true,
      },
      {
        source: "/post/how-to-choose-the-right-phd-topic-a-step-by-step-guide-for-2026",
        destination: "/blog/how-to-choose-the-right-phd-topic-a-step-by-step-guide-for-2026",
        permanent: true,
      },

      // Services & SEO pages
      {
        source: "/sample-view-research-manuscript",
        destination: "/services/research-manuscript-development-guidance",
        permanent: true,
      },
      {
        source: "/phdtopicconsultation",
        destination: "/services/phd-topic-consultation",
        permanent: true,
      },
      {
        source: "/seo/statistics-experts",
        destination: "/services/phd-thesis-data-analysis-service",
        permanent: true,
      },
      // Add any other desired redirect objects right below here...
    ];
  },
};

export default nextConfig;