import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ContextDecoder } from "@/components/ContextDecoder";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ArticleList } from "@/components/ArticleList";
import { createBrowserClient } from '@supabase/ssr'

export const dynamic = 'force-dynamic'; // Emergency cache bypass for AdSense validation

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

  // --- EMERGENCY FRONTEND DATABASE OVERRIDE ---
  const overrideTitles: Record<string, string> = {
    'the-magic-word-otsukaresama': 'Otsukaresama: More Than "Good Job" [お疲れ様です]',
    'the-art-of-meishi-more-than-just-a-business-card': 'Meishi: The Soul of a Business Card [名刺]',
    'itadakimasu-meaning-japanese-gratitude': 'Itadakimasu: The Spiritual Gratitude Hidden in Every Japanese Meal [いただきます]',
    'mottainai': 'Mottainai: The Deep Respect for All Things [勿体無い]',
    'nindo-naruto-way-of-the-ninja': 'Nindo [忍道]: The Way of the Ninja and Finding Your Belief'
  };

  const mappedArticles = articlesData?.map(article => ({
    ...article,
    title: overrideTitles[article.slug] || article.title,
    categories: { name: article.category_id ? categoryMap.get(article.category_id) || "Insight" : "Insight" }
  })) || [];

  const rawArticles = [
    {
      id: 99911,
      title: "Ikigai: Finding Your Purpose in the AI Era",
      slug: "ikigai-finding-purpose-in-ai-era",
      excerpt: "Feeling the weight of 'AI Fatigue'? Discover how the Japanese concept of Ikigai (reason for being) serves as the ultimate antidote for a cluttered digital world.",
      published_at: new Date().toISOString(),
      category_id: null,
      categories: { name: "Insight" }
    },
    {
      id: 99910,
      title: "The Art of 'Ma': Why You Need a Digital Pause More Than a Digital Detox",
      slug: "the-art-of-ma-digital-pause",
      excerpt: "Discover the Japanese concept of 'Ma' (negative space) and how embracing the pause between actions can be more powerful than constant improvement.",
      published_at: new Date(Date.now() - 3600000).toISOString(),
      category_id: null,
      categories: { name: "Insight" }
    },
    {
      id: 99913,
      title: "Kintsugi: The Beauty of Digital Flaws",
      slug: "kintsugi-the-beauty-of-digital-flaws",
      excerpt: "Embracing imperfections in our digital creations through the philosophy of Kintsugi.",
      published_at: new Date("2026-03-09T00:00:00.000Z").toISOString(), // 9 AM JST
      category_id: null,
      categories: { name: "Insight" }
    },
    {
      id: 99914,
      title: "Shuhari: The Three Stages of AI Mastery",
      slug: "shuhari-three-stages-of-ai-mastery",
      excerpt: "How to evolve from blindly following AI prompts to creatively bending the algorithmic rules.",
      published_at: new Date("2026-03-10T00:00:00.000Z").toISOString(), // 9 AM JST
      category_id: null,
      categories: { name: "Insight" }
    },
    {
      id: 99915,
      title: "Bushido: The Ethics of the AI Prompt Engineer",
      slug: "bushido-ethics-in-ai",
      excerpt: "Why navigating the future of Artificial Intelligence requires the ancient heart, honesty, and responsibility of a Samurai.",
      published_at: new Date("2026-03-11T00:00:00.000Z").toISOString(), // 9 AM JST
      category_id: null,
      categories: { name: "Insight" }
    },
    {
      id: 99916,
      title: "The Samurai Spirit: Forging Human Mastery Alongside AI",
      slug: "samurai-spirit-ai-mastery",
      excerpt: "True mastery isn't outsourcing your skills to an algorithm; it's using the algorithm as a whetstone to sharpen your own human spirit.",
      published_at: new Date("2026-03-12T00:00:00.000Z").toISOString(), // 9 AM JST
      category_id: null,
      categories: { name: "Insight" }
    },
    {
      id: 99917,
      title: "Zen and the Art of Prompting: Embracing 'Ku'",
      slug: "zen-and-art-of-prompting",
      excerpt: "How the Zen concept of Emptiness can transform your relationship with AI, proving that less is often more.",
      published_at: new Date("2026-03-13T00:00:00.000Z").toISOString(), // 9 AM JST
      category_id: null,
      categories: { name: "Insight" }
    },
    {
      id: 99918,
      title: "Cha-no-yu: The Ritual of the Cyber Tea Ceremony",
      slug: "chanoyu-cyber-tea",
      excerpt: "Transforming your daily AI interactions from frantic transactions into mindful, sacred rituals.",
      published_at: new Date("2026-03-14T00:00:00.000Z").toISOString(), // 9 AM JST
      category_id: null,
      categories: { name: "Insight" }
    },
    ...mappedArticles
  ];

  const fs = require('fs');
  const path = require('path');

  const articles = rawArticles.map(article => {
    let slugToCheck = article.slug;
    if (article.slug === 'mottainai') {
      slugToCheck = 'mottainai-digital-minimalism-in-ai';
    }

    try {
      const filePath = path.join(process.cwd(), 'articles', 'philosophy', `${slugToCheck}.mdx`);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const dateMatch = content.match(/date:\s*["']([^"']+)["']/);
        if (dateMatch && dateMatch[1]) {
          const parsedDate = new Date(`${dateMatch[1]}T00:00:00.000Z`); // Set to JST 9:00 AM (UTC midnight)
          if (!isNaN(parsedDate.getTime())) {
            return { ...article, published_at: parsedDate.toISOString() };
          }
        }
      }
    } catch (e) {
      // Ignore missing files or read errors, fallback to default
    }

    return article;
  }).filter(article => new Date(article.published_at).getTime() <= Date.now()) // Filter out future articles
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[45vh] min-h-[400px] max-h-[500px] overflow-hidden bg-slate-950 flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/site_header_neon_dojo.png"
            alt="Neo-Edo Cyberpunk Sushi-ya Header"
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
