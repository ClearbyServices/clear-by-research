"use client";

import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  slug: string;
  featured_image?: string;
  excerpt?: string;
}

export default function BlogCarousel() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const { data, error } = await supabase
          .from("blogs") 
          .select("id, title, category, slug, featured_image, excerpt")
          .eq("is_published", true) // Only show published blogs
          .order("published_at", { ascending: false }) // Sort by newest first
          .limit(6);

        if (error) throw error;
        if (data) setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  // Hide the section if it's loading or there are no blogs published yet
  if (loading || blogs.length === 0) return null;

  return (
    <section className="py-20 bg-brand-light border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-3">
              Latest Insights
            </h2>
            <div className="w-20 h-0.5 bg-brand-gold mb-4"></div>
            <p className="text-gray-600 text-sm">
              Expert tips to accelerate your research journey.
            </p>
          </div>
          {/* Navigation Arrows */}
          <div className="hidden sm:flex gap-2">
            <button 
              onClick={() => emblaApi?.scrollPrev()} 
              className="p-2.5 rounded-sm bg-white border border-gray-200 shadow-sm hover:border-brand-purple hover:text-brand-purple text-gray-500 transition-all cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5"/>
            </button>
            <button 
              onClick={() => emblaApi?.scrollNext()} 
              className="p-2.5 rounded-sm bg-white border border-gray-200 shadow-sm hover:border-brand-purple hover:text-brand-purple text-gray-500 transition-all cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5"/>
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="overflow-hidden pb-4" ref={emblaRef}>
          <div className="flex gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="flex-[0_0_100%] md:flex-[0_0_48%] lg:flex-[0_0_31%] min-w-0">
                <div className="bg-white rounded-sm p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all h-full flex flex-col group">
                  
                  {/* Image Placeholder / Actual Image */}
                  <div className="aspect-video bg-gray-100 rounded-sm mb-5 relative overflow-hidden">
                    {blog.featured_image ? (
                      <img 
                        src={blog.featured_image} 
                        alt={blog.title} 
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs font-medium">
                        No Image Available
                      </div>
                    )}
                  </div>

                  {/* Category Badge */}
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-3 block">
                    {blog.category || "Research"}
                  </span>
                  
                  {/* Blog Title */}
                  <h3 className="text-xl font-serif font-bold text-brand-purple mb-3 group-hover:opacity-80 transition-opacity line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  {/* Blog Excerpt */}
                  {blog.excerpt && (
                    <p className="text-xs text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  )}

                  {/* Read More Link */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link 
                      href={`/blog/${blog.slug}`} 
                      className="text-xs font-bold text-brand-purple uppercase tracking-wider hover:text-brand-gold transition-colors inline-flex items-center gap-1"
                    >
                      Read Article <span className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}