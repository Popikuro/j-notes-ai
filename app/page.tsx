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

  const overrideThumbnails: Record<string, string> = {
    'ikigai-finding-purpose-in-ai-era': '/images/ikigai-finding-purpose-in-ai-era/ikigai-visual.png',
    'the-art-of-ma-digital-pause': '/images/the-art-of-ma-digital-pause/ma-visual.png',
    'ichigo-ichie-once-in-a-lifetime-meeting': '/images/ichigo-ichie-once-in-a-lifetime-meeting/ichigo_ichie_cyber_tea.png',
    'gochisosama-thank-you-for-the-meal': '/images/gochisosama-thank-you-for-the-meal/gochisosama_solo_gratitude.png',
    'wabi-sabi-japanese-aesthetic-imperfection': '/images/wabi-sabi-japanese-aesthetic-imperfection/article_visual.png',
    'yaoyorozu-no-kami-japanese-animism': '/images/yaoyorozu-no-kami-japanese-animism/article_visual.png',
    'aizuchi-japanese-art-of-listening': '/images/aizuchi-japanese-art-of-listening/article_visual.png',
    'omotenashi-japanese-selfless-hospitality': '/images/omotenashi-japanese-selfless-hospitality/article_visual.png',
    'kaizen-toyota-way-continuous-improvement': '/images/kaizen-toyota-way-continuous-improvement/article_visual.png',
    'uwabaki-and-the-art-of-cleanliness': '/images/articles/uwabaki-top.png',
    'dashi-and-umami': '/osushi-dashi-umami-v3.png',
    'ichiju-sansai-dining-os': '/osushi-ichiju-sansai.png',
    'deciphering-kento-shimasu': '/osushi-kento-shimasu.png',
    'demon-slayer-kokoro-wo-moyase-shimei': '/osushi-kokoro-wo-moyase.png',
    'itadakimasu-meaning-japanese-gratitude': '/osushi-itadakimasu.png',
    'the-art-of-meishi-more-than-just-a-business-card': '/osushi-meishi-premium.png',
    'the-magic-word-otsukaresama': '/osushi-otsukaresama.png',
    'the-art-of-japanese-bow-ojigi': '/osushi-bowing-guide.png',
    'komorebi-sunlight-filtering-through-trees': '/osushi-komorebi.png',
    'nindo-naruto-way-of-the-ninja': '/osushi-samurai-nindo.png'
  };

  const mappedArticles = articlesData?.map(article => ({
    ...article,
    title: overrideTitles[article.slug] || article.title,
    thumbnail: overrideThumbnails[article.slug] || article.thumbnail,
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
    {
      id: 99919,
      title: "Uwabaki and the Art of Cleanliness: Why Japan Takes Its Shoes Off",
      slug: "uwabaki-and-the-art-of-cleanliness",
      excerpt: "From ancient tatami rooms to modern schools, discover the profound philosophy behind Japan's shoe-removal culture and how the world is catching on.",
      published_at: new Date().toISOString(),
      category_id: null,
      categories: { name: "Insight" }
    },
    {
      id: 99920,
      title: "The Architecture of Umami: How Japanese Dashi Engineered the Fifth Taste",
      slug: "dashi-and-umami",
      excerpt: "Western stock adds layers; Japanese dashi extracts essence. Discover the ancient 'subtraction algorithm' behind dashi, the molecular synergy of Umami, and how savoring pure broth recalibrates the human operating system.",
      published_at: new Date("2026-08-25T00:00:00.000Z").toISOString(),
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

    let updatedArticle = { ...article };

    try {
      const filePath = path.join(process.cwd(), 'articles', 'philosophy', `${slugToCheck}.mdx`);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const dateMatch = content.match(/date:\s*["']([^"']+)["']/);
        if (dateMatch && dateMatch[1]) {
          const parsedDate = new Date(`${dateMatch[1]}T00:00:00.000Z`); // Set to JST 9:00 AM (UTC midnight)
          if (!isNaN(parsedDate.getTime())) {
            updatedArticle.published_at = parsedDate.toISOString();
          }
        }
        const thumbnailMatch = content.match(/thumbnail:\s*["']([^"']+)["']/);
        if (thumbnailMatch && thumbnailMatch[1]) {
          updatedArticle.thumbnail = thumbnailMatch[1];
        }
      }
    } catch (e) {
      // Ignore missing files or read errors, fallback to default
    }

    // Apply override thumbnails to raw articles as well just in case
    updatedArticle.thumbnail = overrideThumbnails[updatedArticle.slug] || updatedArticle.thumbnail;

    return updatedArticle;
  }).filter(article => new Date(article.published_at).getTime() <= Date.now()) // Filter out future articles
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-slate-950 flex items-center justify-center border-b border-slate-800">
        <div className="absolute inset-0 z-0">
          <Image
            src="/site_header_neon_dojo.png"
            alt="Neo-Edo Cyberpunk Sushi-ya Header"
            fill
            className="object-cover opacity-30 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/90" />
        </div>

        <div className="relative z-10 container max-w-6xl mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center justify-between gap-12 text-white">
          {/* Left Column: Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-bold font-inter tracking-tight mb-6 drop-shadow-lg">
              Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Unspoken Wisdom</span>.
            </h1>
            <p className="text-lg md:text-xl font-outfit text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-8 drop-shadow-md">
              Explore Japanese culture, mindfulness, and the art of subtraction. From business nuances (Honne vs. Tatemae) to culinary architecture (Dashi & Umami), decoded through modern AI insights.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <Link href="#articles" className="bg-white text-slate-950 px-8 py-3 rounded-full font-medium hover:bg-slate-200 transition-colors shadow-lg">
                Start Reading &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Graphic */}
          <div className="flex-1 w-full max-w-lg lg:max-w-xl flex flex-col items-center justify-center relative group mt-12 lg:mt-0">
            {/* Soft Neon Glow Background */}
            <div className="absolute w-3/4 h-3/4 bg-cyan-500/10 blur-3xl rounded-full group-hover:bg-cyan-400/20 transition-all duration-500 pointer-events-none" />
            <div className="absolute w-1/2 h-1/2 bg-amber-500/10 blur-2xl rounded-full pointer-events-none" />
            
            {/* Floating Characters & Title */}
            <div className="relative w-full aspect-[4/3] z-10 flex items-center justify-center">
              {/* Title */}
              <div className="absolute top-[8%] sm:top-[12%] z-20 flex flex-col items-center text-center cursor-default">
                <span className="text-xl md:text-2xl font-bold tracking-wider text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  お寿司ちゃん達
                </span>
                <span className="text-xs md:text-sm font-mono tracking-widest text-cyan-400 font-semibold uppercase mt-1">
                  THE SUSHI GUYS
                </span>
              </div>

              <Image 
                src="/images/sushi-trio.png" 
                alt="Sushi Trio Character" 
                fill 
                className="object-contain hover:-translate-y-2 hover:scale-105 transition-all duration-300 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                priority 
              />
            </div>
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
