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

      {/* Featured Article Preview */}
      <section id="featured" className="py-24 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-2 text-neon-purple dark:text-indigo-400 font-semibold mb-6 flex-wrap">
            <Sparkles className="w-5 h-5" />
            <span className="uppercase tracking-widest text-sm font-inter">Featured Insight</span>
            <span className="text-slate-300 dark:text-slate-700 mx-2">•</span>
            <span className="text-slate-500 font-outfit text-sm">Communication</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold font-inter mb-8 text-slate-900 dark:text-white leading-tight">
            Deciphering &quot;Kento-shimasu&quot;: The Polite &quot;No&quot;
          </h2>

          <div className="prose prose-lg dark:prose-invert max-w-none font-outfit text-slate-700 dark:text-slate-300 space-y-6">
            <p className="text-xl leading-relaxed">
              You&apos;ve just pitched a brilliant idea to your Japanese counterpart. They nod thoughtfully, smile politely, and say:
            </p>

            <blockquote className="border-l-4 border-indigo-500 pl-6 py-2 my-8 font-inter text-2xl text-slate-900 dark:text-slate-100 italic bg-slate-50 dark:bg-slate-900/50 rounded-r-lg">
              &quot;It&apos;s an interesting proposal. &quot;
              <ContextDecoder
                phrase="検討します"
                meaning="We will consider it."
                context="In 90% of business cases, this is a polite refusal. It avoids direct confrontation (saving face) while signaling that the discussion is closed."
              >
                検討します (kento-shimasu)
              </ContextDecoder>.&quot;
            </blockquote>

            <p className="text-xl leading-relaxed">
              If you leave the meeting expecting a follow-up email with next steps, you&apos;ll be waiting a long time. This is the essence of Tatemae—the public facade that maintains harmony over directness.
            </p>

            <div className="pt-8">
              <Link href="/articles/deciphering-kento-shimasu" className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors bg-indigo-50 dark:bg-indigo-950/30 px-6 py-3 rounded-full">
                Read full analysis <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <ArticleList articles={articles} categoryNames={categoryNames} />

      {/* Newsletter Section */}
      <section className="py-20 px-6 pb-32">
        <NewsletterSignup />
      </section>
    </div>
  );
}
