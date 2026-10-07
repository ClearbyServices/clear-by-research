"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ltywtxqwuzhtovbqyaiv.supabase.co",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author_name?: string;
  read_time?: string;
  created_at?: string;
  featured_image?: string; // Corrected column name from database
  is_featured?: boolean;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = ['All', 'Proposal Writing', 'Literature Review', 'Data Analysis', 'Editing Tips', 'PhD Life'];

  useEffect(() => {
    async function fetchBlogs() {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("Error fetching blogs from Supabase:", error);
      } else if (data) {
        setBlogs(data);
      }
      setLoading(false);
    }

    fetchBlogs();
  }, []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(6);
  };

  const featuredPost = blogs.find(p => p.is_featured) || blogs[0];
  const regularBlogs = blogs.filter(p => p.id !== featuredPost?.id);

  const filteredBlogs = activeCategory === "All"
    ? regularBlogs
    : regularBlogs.filter(post => post.category?.trim().toLowerCase() === activeCategory.trim().toLowerCase());

  const displayedBlogs = filteredBlogs.slice(0, visibleCount);
  const hasMorePosts = visibleCount < filteredBlogs.length;

  return (
    <div className="w-full flex flex-col bg-white">
      
      {/* 1. HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-purple mb-4">
          Insights & Guidance
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Expert perspectives on navigating the complexities of PhD research, from initial proposals to the final defense. Your partner in academic excellence.
        </p>
      </section>

      {/* 2. CATEGORY FILTER PILLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={idx}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2 text-xs md:text-sm font-medium border rounded-full transition cursor-pointer ${
                  isActive 
                    ? 'bg-brand-purple text-white border-brand-purple shadow-sm' 
                    : 'bg-white text-gray-600 border-gray-300 hover:border-brand-purple hover:text-brand-purple'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full space-y-12">
        
        {/* 3. FEATURED ARTICLE BANNER */}
        {featuredPost && activeCategory === "All" && (
          <div className="bg-brand-light border border-gray-200 rounded-sm overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            <div className="lg:col-span-7 bg-gray-100 min-h-[280px] relative">
              <img 
                src={featuredPost.featured_image || "/blog-featured.jpg"} 
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="inline-block bg-brand-gold/20 text-brand-gold text-[10px] font-bold tracking-widest px-2.5 py-1 rounded mb-4 uppercase">
                  Featured
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-purple mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200/60 pt-4 text-xs text-gray-500 font-medium">
                <span>{featuredPost.created_at ? new Date(featuredPost.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Oct 24, 2024"} · {featuredPost.read_time || "12 min read"}</span>
                <Link href={`/blog/${featuredPost.slug}`} className="font-bold text-brand-purple hover:text-brand-gold uppercase tracking-wider transition">
                  Read Article →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 4. BLOG GRID CARDS */}
        {loading ? (
          <div className="text-center py-16 text-gray-500 font-medium text-sm">Loading insights...</div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-16 text-gray-500 font-medium text-sm">
            No blog posts found for this category.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedBlogs.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md hover:border-brand-gold transition flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <div className="h-48 bg-gray-100 overflow-hidden">
                      <img 
                        src={post.featured_image || "/blog-placeholder.jpg"} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-bold text-brand-gold tracking-wider mb-2 uppercase block">
                        {post.category || "General"}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-brand-purple mb-3 leading-tight line-clamp-2 group-hover:text-brand-gold transition">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-6 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-auto">
                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center font-bold text-[10px]">
                          {(post.author_name || "E")[0]}
                        </div>
                        <span className="font-medium text-gray-700">{post.author_name || "Dr. Sarah Miller"}</span>
                      </div>
                      <span className="font-bold text-brand-gold uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read Article →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* LOAD MORE BUTTON */}
            {hasMorePosts && (
              <div className="flex justify-center mt-12">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="border border-brand-purple text-brand-purple font-bold py-3 px-8 rounded-sm hover:bg-brand-purple hover:text-white transition cursor-pointer text-sm"
                >
                  Load More Posts ⌄
                </button>
              </div>
            )}
          </>
        )}

      </div>

      {/* 5. NEWSLETTER CTA */}
      <section className="w-full bg-brand-purple text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border-b border-white/20 pb-16">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-4">Stay Ahead in Your Research</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Join 5,000+ researchers and receive our bi-weekly editorial on academic success, funding opportunities, and research methodology.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-md ml-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-brand-gold rounded-sm"
            />
            <button className="bg-brand-gold text-brand-purple font-bold py-3 px-6 rounded-sm hover:opacity-90 transition whitespace-nowrap text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}