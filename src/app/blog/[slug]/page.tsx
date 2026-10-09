import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
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
  meta_description?: string;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).trim();

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
    description: post.meta_description || post.title,
    alternates: { 
      canonical: `https://www.clearbyresearch.com/blog/${decodedSlug}` 
    },
  };
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const decodedSlug = decodeURIComponent(slug).trim();

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", decodedSlug)
    .single();

  let resolvedData = data;

  if (error || !resolvedData) {
    const { data: fallbackData } = await supabase
      .from("blogs")
      .select("*")
      .ilike("slug", `%${decodedSlug}%`)
      .limit(1);

    if (fallbackData && fallbackData.length > 0) {
      resolvedData = fallbackData[0];
    }
  }

  if (!resolvedData) {
    return null;
  }

  return resolvedData;
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
          <div className="mb-10 w-full h-87.5 md:h-112.5 bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
            <img 
              src={post.featured_image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Render HTML content safely using dangerouslySetInnerHTML */}
        <div 
          className="prose prose-purple max-w-none text-sm text-gray-700 leading-relaxed [&_p]:mb-4 [&_h2]:text-2xl [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-brand-purple [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:font-serif [&_h3]:font-bold [&_h3]:text-brand-purple [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_ol]:mb-4 [&_li]:text-gray-700 [&_a]:text-brand-purple [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

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