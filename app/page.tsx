import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ContextDecoder } from "@/components/ContextDecoder";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ArticleList } from "@/components/ArticleList";
import { createBrowserClient } from '@supabase/ssr'

export const revalidate = 0; // Force dynamic rendering, bypass cache
export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch published articles
  const { data: articlesData } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .lte("published_at", new Date().toISOString())
    .order("published_at", { ascending: false });

  // Fetch categories
  const { data: categories } = await supabase
    .from("categories")
    .select("*");

  const categoryNames = ["All", ...(categories?.map(c => c.name) || [])];

  // Manually map categories to articles
  const categoryMap = new Map(categories?.map(c => [c.id, c.name]) || []);
  const articles = articlesData?.map(article => ({
    ...article,
    categories: { name: article.category_id ? categoryMap.get(article.category_id) || "Insight" : "Insight" }
  })) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[45vh] min-h-[400px] max-h-[500px] overflow-hidden bg-slate-950 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Futuristic Nano Banana Hero"
            fill
            className="object-cover opacity-60 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        </div>

        <div className="relative z-10 container max-w-5xl mx-auto px-6 text-center text-white mt-8">
          <h1 className="text-5xl md:text-7xl font-bold font-inter tracking-tight mb-4 drop-shadow-lg">
            Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Unspoken</span>.
          </h1>
          <p className="text-lg md:text-xl font-outfit text-slate-300 max-w-2xl mx-auto mb-6 drop-shadow-md">
            Dive deep into Japanese Business Culture, decipher Honne (true feelings) vs Tatemae (public facade), and navigate nuances with AI-powered insights.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="#featured" className="bg-white text-slate-950 px-8 py-3 rounded-full font-medium hover:bg-slate-200 transition-colors shadow-lg">
              Start Reading
            </Link>
          </div>
        </div>
      </section>



      {/* Main Content */}
      <ArticleList articles={articles} categoryNames={categoryNames} />

      {/* Newsletter Section */}
      <section className="py-10 px-6 pb-10">
        <NewsletterSignup />
      </section>
    </div>
  );
}
