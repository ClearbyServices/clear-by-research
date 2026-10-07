import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

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
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
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
      </body>
    </html>
  );
}