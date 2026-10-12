"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-20 right-6 z-50 bg-brand-purple text-white p-3.5 rounded-sm shadow-xl border border-brand-gold/40 hover:bg-brand-purple/90 hover:border-brand-gold hover:-translate-y-1 transition-all duration-300 focus:outline-none group cursor-pointer"
    >
      <ArrowUp className="w-5 h-5 text-brand-gold group-hover:scale-125 transition-transform duration-300" />
    </button>
  );
}