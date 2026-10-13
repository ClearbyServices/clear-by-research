import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import CrispChat from "@/components/CrispChat";

// Load the modern Sans font for body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Load the elegant Serif font for headings
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PhD Research Guidance from Expert Consultants | 11+ Yrs of Exp. | E-Clearby Research",
  description: "Get PhD thesis guidance from experts with 11+ years of experience. Personalized, integrity-first coaching and affordable dissertation consultation for your research.",
  alternates: { canonical: "https://www.clearbyresearch.com/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "Organization"],
        "@id": "https://www.clearbyresearch.com/#organization",
        "name": "E-Clearby Research Consulting Pvt. Ltd.",
        "legalName": "E-Clearby Research Consulting Pvt. Ltd.",
        "alternateName": ["Clearby Research", "E-Clearby Research"],
        "url": "https://www.clearbyresearch.com/",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://www.clearbyresearch.com/favcon.png",
          "url": "https://www.clearbyresearch.com/favcon.png",
          "caption": "E-Clearby Research Consulting"
        },
        "image": "https://www.clearbyresearch.com/favcon.png",
        "description": "Advisory-only PhD, Master's and research paper guidance in Pune, India: topic consultation, proposal development, literature review, methodology, data analysis, thesis support, defence preparation and journal publication guidance. Scholars retain full authorship of their work.",
        "slogan": "You drive the research. We guide you to excellence.",
        "telephone": "+91-7020112146",
        "email": "contact@clearbyresearch.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "VJ Indilife, Sus-Pashan Road, Vardayani Society, Sutarwadi, Pashan",
          "addressLocality": "Pune",
          "addressRegion": "Maharashtra",
          "postalCode": "411021",
          "addressCountry": "IN"
        },
        "hasMap": "https://maps.app.goo.gl/FLBdZ5kPNpmFqYFT7",
        "areaServed": [
          { "@type": "City", "name": "Pune" },
          { "@type": "Country", "name": "India" }
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "telephone": "+91-7020112146",
            "email": "contact@clearbyresearch.com",
            "areaServed": "IN",
            "availableLanguage": ["English"]
          }
        ],
        "sameAs": [
          "https://www.linkedin.com/company/clearbyresearch/",
          "https://www.facebook.com/share/19QAdaiSpy/",
          "https://www.instagram.com/clearbyresearch",
          "https://in.pinterest.com/0yz8vbtp9coatnn6btjos1aqmuxcmg/"
        ],
        "knowsAbout": [
          "PhD research guidance",
          "Research topic consultation",
          "Research proposal development",
          "Literature review",
          "Systematic literature review",
          "Research methodology",
          "Questionnaire design",
          "Quantitative and qualitative data analysis",
          "SPSS, AMOS, SmartPLS, STATA and NVivo",
          "Thesis and dissertation guidance",
          "Thesis defence preparation",
          "Journal publication guidance"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Academic research guidance services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "PhD Topic Consultation",
                "url": "https://www.clearbyresearch.com/services/phd-topic-consultation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "PhD Thesis Problem Statement Guidance",
                "url": "https://www.clearbyresearch.com/services/thesis-problem-statement"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Research Proposal Development",
                "url": "https://www.clearbyresearch.com/services/research-proposal-development"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Literature Review Guidance",
                "url": "https://www.clearbyresearch.com/services/literature-review-writing-service"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Systematic Literature Review Consultation",
                "url": "https://www.clearbyresearch.com/services/systematic-literature-review-writing-service"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Research Methodology Consultation",
                "url": "https://www.clearbyresearch.com/services/research-methodology-consultation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Questionnaire Design",
                "url": "https://www.clearbyresearch.com/services/research-paper-questionnaire-designing"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "PhD Thesis Data Analysis",
                "url": "https://www.clearbyresearch.com/services/phd-thesis-data-analysis-service"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "SPSS Data Analysis",
                "url": "https://www.clearbyresearch.com/services/spss-data-analysis-service"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Software Implementation Help for PhD Research",
                "url": "https://www.clearbyresearch.com/services/software-implementation-help-for-phd-research"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "PhD Thesis Writing Guidance",
                "url": "https://www.clearbyresearch.com/services/phd-thesis-writing-services"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "PhD Thesis Editing and Proofreading",
                "url": "https://www.clearbyresearch.com/services/phd-thesis-editing-&-proofreading-services"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "PhD Thesis Defence Preparation",
                "url": "https://www.clearbyresearch.com/services/phd-thesis-defence-preparation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Master's Dissertation Topic Selection Help",
                "url": "https://www.clearbyresearch.com/services/dissertation-topic-consultation"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Master's Dissertation Writing Guidance",
                "url": "https://www.clearbyresearch.com/services/masters-dissertation-writing"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Research Manuscript Development Guidance",
                "url": "https://www.clearbyresearch.com/services/research-manuscript-development-guidance"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Journal Publication Support",
                "url": "https://www.clearbyresearch.com/services/journal-publication-support"
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.clearbyresearch.com/#website",
        "url": "https://www.clearbyresearch.com/",
        "name": "E-Clearby Research",
        "inLanguage": "en-IN",
        "publisher": { "@id": "https://www.clearbyresearch.com/#organization" }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        {/* Organization and Service Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NT8PS984');
          `}
        </Script>
      </head>
      <body 
        className="min-h-full flex flex-col bg-brand-light text-brand-dark font-sans"
        suppressHydrationWarning={true}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-NT8PS984"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <BackToTop />
        <CrispChat />
      </body>
    </html>
  );
}