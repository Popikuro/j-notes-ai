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
    'dashi-and-umami': 'The Architecture of Umami [旨み]: How Japanese Dashi [出汁] Engineered the Fifth Taste',
    'honne-and-tatemae': 'Honne & Tatemae [本音と建前]: Decoding Japan\'s Social Software for Harmony and Truth'
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
    'bushido-ethics-in-ai': '/bushido-ethics-in-ai.png',
    'honne-and-tatemae': '/honne-tatemae-tamago.png'
  };

  const mappedArticles = articlesData?.map(article => ({
    ...article,
    title: overrideTitles[article.slug] || article.title,
    thumbnail: overrideThumbnails[article.slug] || article.thumbnail,
    categories: { name: article.category_id ? categoryMap.get(article.category_id) || "Insight" : "Insight" }
  })) || [];

  const rawArticles = [
    {
      id: 99921,
      title: "Honne & Tatemae: Decoding Japan's Social Software for Harmony and Truth",
      slug: "honne-and-tatemae",
      thumbnail: "/honne-tatemae-tamago.png",
      excerpt: "Why do Japanese people say one thing and feel another? Decoding the subtle dual-layer communication protocol that preserves collective harmony without erasing personal truth.",
      published_at: new Date("2026-08-26T00:00:00.000Z").toISOString(),
      category_id: null,
      categories: { name: "Insight" }
    },
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
      excerpt: "How to evolve from blindly fol