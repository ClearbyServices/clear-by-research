import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next"; // Added Metadata import

const supabase = createClient(
  process.env.SUPABASE_URL || "https://ltywtxqwuzhtovbqyaiv.supabase.co",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0eXd0eHF3dXpodG92YnF5YWl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1NTU3OTEsImV4cCI6MjEwNTEzMTc5MX0.EnssZKc3C9AkkGgiI7MQdl8Xd8rW5fTX2gqRd2VM65I"
);

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featured_image?: string; 
  created_at?: string;
  read_time?: string;
}

// =========================================================================
// ADDED SEO DYNAMIC METADATA GENERATOR
// =========================================================================
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).trim();

  // Fetch only the fields needed for SEO
  const { data: post } = await supabase
    .from("blogs")
    .select("title, meta_description")
    .eq("slug", decodedSlug)
    .single();

  if (!post) {
    return { title: "Blog Post Not Found | E-Clearby Research" };
  }

  return {
    title: post.title,
    description: post.meta_description || post.title, // Fallback to title if no description exists
    alternates: { 
      canonical: `https://www.clearbyresearch.com/blog/${decodedSlug}` 
    },
  };
}
// =========================================================================

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const decodedSlug = decodeURIComponent(slug).trim();

  let { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", decodedSlug)
    .single();

  if (error || !data) {
    const { data: fallbackData } = await supabase
      .from("blogs")
      .select("*")
      .ilike("slug", `%${decodedSlug}%`)
      .limit(1);

    if (fallbackData && fallbackData.length > 0) {
      data = fallbackData[0];
    }
  }

  if (!data) {
    return null;
  }

  return data;
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex flex-col w-full bg-brand-light text-brand-dark py-20 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto w-full bg-white p-8 md:p-12 border border-gray-200 rounded-sm shadow-sm">
        
        {/* Breadcrumb Navigation */}
        <div className="mb-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          <Link href="/" className="hover:text-brand-purple">Home</Link> <span className="text-brand-gold">›</span> <Link href="/blog" className="hover:text-brand-purple">Insights</Link> <span className="text-brand-gold">›</span> <span className="text-brand-purple truncate">{post.title}</span>
        </div>

        <span className="text-xs font-bold text-brand-gold uppercase tracking-widest block mb-3">
          {post.category}
        </span>
        
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-purple mb-4 leading-tight">
          {post.title}
        </h1>
        
        <p className="text-gray-500 text-xs mb-6 pb-6 border-b border-gray-200 font-medium">
          Published via E-Clearby Research Consulting
        </p>

        {/* Featured Image Banner */}
        {post.featured_image && (
          <div className="mb-10 w-full h-[350px] md:h-[450px] bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
            <img 
              src={post.featured_image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Render content using ReactMarkdown with custom styling classes */}
        <div className="prose prose-purple max-w-none text-sm text-gray-700 leading-relaxed space-y-4">
          <ReactMarkdown
            components={{
              h2: ({node, ...props}) => <h2 className="text-2xl font-serif font-bold text-brand-purple mt-8 mb-4" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-serif font-bold text-brand-purple mt-6 mb-3" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 mb-4" {...props} />,
              li: ({node, ...props}) => <li className="text-gray-700" {...props} />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Bottom Back Button */}
        <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center">
          <Link 
            href="/blog" 
            className="bg-brand-purple text-white font-bold py-3.5 px-8 rounded-sm hover:bg-brand-purple/90 transition text-xs uppercase tracking-wider shadow-sm"
          >
            ← Back to All Insights
          </Link>
        </div>

      </article>
    </main>
  );
}