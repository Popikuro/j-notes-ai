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
    'the-magic-word-otsukaresama': 'The Magic Word: Otsukaresama [お疲れ様です]',
    'the-art-of-meishi-more-than-just-a-business-card': 'Meishi [名刺]: The Soul of a Business Card',
    'itadakimasu-meaning-japanese-gratitude': 'Itadakimasu [いただきます]: The Spiritual Gratitude Hidden in Every Japanese Meal',
    'mottainai': 'Mottainai [勿体無い]: The Deep Respect for All Things',
    'nindo-naruto-way-of-the-ninja': 'Nindo [忍道]: The Way of the Ninja and Finding Your Belief',
    'demon-slayer-kokoro-wo-moyase-shimei': '"Set Your Heart Ablaze": What Demon Slayer Teaches Us About Japanese Purpose (Shimei [使命])',
    'the-art-of-japanese-bow-ojigi': 'The Silent Language: Understanding the Depth of the Japanese Bow (Ojigi [お辞儀])',
    'deciphering-kento-shimasu': 'Deciphering "Kento Shimasu" [検討します]: The Art of the Gentle Japanese "No"',
    'komorebi-sunlight-filtering-trees': 'Komorebi [木漏れ日]: The Nostalgic Beauty of Sunlight Filtering Through Trees',
    'wabi-sabi-japanese-aesthetic-imperfection': 'Wabi-Sabi [侘び寂び]: Finding Beauty in Imperfection and the Passing of Time',
    'ichigo-ichie-once-in-a-lifetime-meeting': 'Ichigo Ichie [一期一会]: Why Every Meeting is a Once-in-a-Lifetime Opportunity',
    'yaoyorozu-no-kami-japanese-animism': 'The Spirit of Eight Million Gods: Understanding Japanese Animism (Yaoyorozu no Kami [八百万の神])',
    'aizuchi-japanese-art-of-listening': 'The Art of Listening: Why "Aizuchi" [相槌] is the Key to Smooth Japanese Communication',
    'omotenashi-japanese-selfless-hospitality': 'Omotenashi [おもてなし]: The Japanese Art of Selfless Hospitality',
    'kaizen-toyota-way-continuous-improvement': 'Kaizen [改善]: The Toyota Secret to Continuous Improvement in Work and Life',
    'nanori-the-samurai-roots-of-luffy-s-declaration': 'Nanori [名乗り]: The Samurai Roots of Luffy’s Declaration',
    'gochisosama-desu-the-meaning-behind-japan-s-grateful-ending': 'Gochisosama desu [ご馳走様です]: The Meaning Behind Japan\'s Grateful Ending',
    'ichiju-sansai-dining-os': 'The "Dining OS": How Ichiju-Sansai [一汁三菜] Optimizes the Human System',
    'ikigai-finding-purpose-in-ai-era': 'Ikigai [生き甲斐]: Finding Your Purpose in the AI Era',
    'the-art-of-ma-digital-pause': 'The Art of \'Ma\' [間]: Why You Need a Digital Pause More Than a Digital Detox',
    'kintsugi-the-beauty-of-digital-flaws': 'Kintsugi [金継ぎ]: The Beauty of Digital Flaws',
    'shuhari-three-stages-of-ai-mastery': 'Shuhari [守破離]: The Three Stages of AI Mastery',
    'bushido-ethics-in-ai': 'Bushido [武士道]: The Ethics of the AI Prompt Engineer',
    'samurai-spirit-ai-mastery': 'The Samurai Spirit [侍魂]: Forging Human Mastery Alongside AI',
    'zen-and-art-of-prompting': 'Zen [禅] and the Art of Prompting: Embracing \'Ku\' [空]',
    'chanoyu-cyber-tea': 'Cha-no-yu [茶の湯]: The Ritual of the Cyber Tea Ceremony',
    'uwabaki-and-the-art-of-cleanliness': 'Uwabaki [上履き] and the Art of Cleanliness: Why Japan Takes Its Shoes Off',
    'dashi-and-umami': 'The Architecture of Umami [旨み]: How Japanese Dashi [出汁] Engineered the Fifth Taste'
  };

  const overrideThumbnails: Record<string, string> = {
    'ikigai-finding-purpose-in-ai-era': '/article_visual_2026-03-01.png',
    'the-art-of-ma-digital-pause': '/article_visual_2026-03-02.png',
    'ichigo-ichie-once-in-a-lifetime-meeting': '/ichigo_ichie_cyber_tea.png',
    'gochisosama-thank-you-for-the-meal': '/gochisosama_solo_gratitude.png',
    'gochisosama-desu-the-meaning-behind-japan-s-grateful-ending': '/osushi-gochisosama.png',
    'wabi-sabi-japanese-aesthetic-imperfection': '/article_visual_2026-03-03.png',
    'yaoyorozu-no-kami-japanese-animism': '/article_visual_2026-03-04.png',
    'aizuchi-japanese-art-of-listening': '/article_visual_2026-03-05.png',
    'omotenashi-japanese-selfless-hospitality': '/article_visual_2026-03-01.png',
    'kaizen-toyota-way-continuous-improvement': '/article_visual_2026-03-02.png',
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
    'komorebi-sunlight-filtering-trees': '/osushi-komorebi.png',
    'nindo-naruto-way-of-the-ninja': '/osushi-samurai-nindo.png',
    'nanori-the-samurai-roots-of-luffy-s-declaration': '/osushi-samurai-nindo.png',
    'samurai-spirit-ai-mastery': '/samurai-spirit-ai-mastery.png',
    'zen-and-art-of-prompting': '/zen-emptiness.png',
    'chanoyu-cyber-tea': '/chanoyu-cyber-tea.png',
    'mottainai': '/osushi-mottainai.png',
    'mottainai-digital-minimalism-in-ai': '/osushi-mottainai.png',
    'kintsugi-the-beauty-of-digital-flaws': '/kintsugi-the-beauty-of-digital-flaws.png',
    'kintsugi-digital-flaws': '/kintsugi-the-beauty-of-digital-flaws.png',
    'shuhari-three-stages-of-ai-mastery': '/shuhari-three-stages-of-ai-mastery.png',
    'bushido-ethics-in-ai': '/bushido-ethics-in-ai.png'
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

    // Apply override thumbnails and titles to all articles
    updatedArticle.thumbnail = overrideThumbnails[updatedArticle.slug] || updatedArticle.thumbnail;
    updatedArticle.title = overrideTitles[updatedArticle.slug] || updatedArticle.title;

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
            className="object-cover opacity-40 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
        </div>

        <div className="relative z-10 container max-w-7xl mx-auto px-6 pt-8 pb-8 lg:pt-12 lg:pb-8 flex flex-col lg:flex-row items-center text-white">
          {/* Left Column: Text */}
          <div className="w-full lg:w-[65%] text-center lg:text-left z-20">
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-3 py-1.5 mb-6 text-[11px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 rounded-full shadow-sm backdrop-blur-sm">
              <span className="text-sm leading-none" role="img" aria-label="Japan">🇯🇵</span>
              JAPANESE CULTURE & AI PERSPECTIVES
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-inter tracking-tight leading-[1.1] mb-4 drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
              Master the Unspoken Wisdom, Taste, Mind, and Aesthetics of Japan.
            </h1>
            <p className="text-lg md:text-xl font-outfit text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-6 drop-shadow-md">
              Explore Japanese culture, mindfulness, and the art of subtraction. From business nuances (Honne vs. Tatemae) to culinary architecture (Dashi & Umami), decoded through modern AI insights.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <Link href="#articles" className="bg-white text-slate-950 px-8 py-3 rounded-full font-medium hover:bg-slate-200 transition-colors shadow-lg">
                Start Reading &rarr;
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Graphic */}
          <div className="w-full lg:w-[45%] lg:-ml-[10%] flex items-center justify-center relative group mt-16 lg:mt-0 z-10">
            {/* Soft Neon Glow Background */}
            <div className="absolute w-3/4 h-3/4 top-12 bg-cyan-500/5 blur-3xl rounded-full group-hover:bg-cyan-400/10 transition-all duration-500 pointer-events-none" />
            <div className="absolute w-1/2 h-1/2 top-1/4 bg-amber-500/5 blur-2xl rounded-full pointer-events-none" />
            
            {/* Floating Characters */}
            <div className="relative w-full aspect-[4/3] z-10">
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
