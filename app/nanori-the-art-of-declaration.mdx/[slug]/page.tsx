import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { SmartTitle } from "@/components/SmartTitle";

// Temporarily importing createBrowserClient since server components in Next App Router 
// should ideally use @supabase/ssr createServerClient, but we're keeping it simple for the MVP
import { createBrowserClient } from '@supabase/ssr'

export const revalidate = 60; // ISR cache set to 60 seconds for AdSense speed compliance

async function getArticle(slug: string) {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    let { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .lte("published_at", new Date().toISOString())
        .single();

    if (slug === 'ikigai-finding-purpose-in-ai-era') {
        const fs = require('fs');
        const path = require('path');
        let fileContent = '';
        try {
            fileContent = fs.readFileSync(path.join(process.cwd(), 'articles', 'philosophy', 'ikigai-finding-purpose-in-ai-era.mdx'), 'utf8');
        } catch (e) { }
        const contentBody = fileContent.replace(/---[\s\S]*?---/, '').trim();

        let parsedDate = new Date().toISOString();
        const dateMatch = fileContent.match(/date:\s*["']([^"']+)["']/);
        if (dateMatch && dateMatch[1]) {
            const d = new Date(dateMatch[1]);
            if (!isNaN(d.getTime())) parsedDate = d.toISOString();
        }

        data = {
            id: 99911,
            title: "Ikigai: Finding Your Purpose in the AI Era",
            slug: 'ikigai-finding-purpose-in-ai-era',
            content: contentBody,
            excerpt: "Feeling the weight of 'AI Fatigue'? Discover how the Japanese concept of Ikigai (reason for being) serves as the ultimate antidote for a cluttered digital world.",
            published_at: parsedDate,
            created_at: parsedDate,
            category_id: null
        };
        error = null;
    } else if (slug === 'the-art-of-ma-digital-pause') {
        const fs = require('fs');
        const path = require('path');
        let fileContent = '';
        try {
            fileContent = fs.readFileSync(path.join(process.cwd(), 'articles', 'philosophy', 'the-art-of-ma-digital-pause.mdx'), 'utf8');
        } catch (e) { }
        const contentBody = fileContent.replace(/---[\s\S]*?---/, '').trim();

        let parsedDate = new Date().toISOString();
        const dateMatch = fileContent.match(/date:\s*["']([^"']+)["']/);
        if (dateMatch && dateMatch[1]) {
            const d = new Date(dateMatch[1]);
            if (!isNaN(d.getTime())) parsedDate = d.toISOString();
        }

        data = {
            id: 99910,
            title: "The Art of 'Ma': Why You Need a Digital Pause More Than a Digital Detox",
            slug: 'the-art-of-ma-digital-pause',
            content: contentBody,
            excerpt: "Discover the Japanese concept of 'Ma' (negative space) and how embracing the pause between actions can be more powerful than constant improvement.",
            published_at: parsedDate,
            created_at: parsedDate,
            category_id: null
        };
        error = null;
    } else if (slug === 'gochisosama-thank-you-for-the-meal' || slug === 'gochisosama') {
        // Hardcode the Gochisosama article to bypass Supabase completely since it's not in the DB yet
        data = {
            id: 9999,
            title: 'Gochisosama: The Satisfaction of Gratitude [ご馳走様]',
            slug: 'gochisosama-thank-you-for-the-meal',
            content: '',
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            category_id: null
        };
        error = null;
    } else if (slug === 'kintsugi-the-beauty-of-digital-flaws') {
        const fs = require('fs');
        const path = require('path');
        let fileContent = '';
        try {
            fileContent = fs.readFileSync(path.join(process.cwd(), 'articles', 'philosophy', 'kintsugi-the-beauty-of-digital-flaws.mdx'), 'utf8');
        } catch (e) { }
        const contentBody = fileContent.replace(/---[\s\S]*?---/, '').trim();

        let parsedDate = new Date().toISOString();
        const dateMatch = fileContent.match(/date:\s*["']([^"']+)["']/);
        if (dateMatch && dateMatch[1]) {
            const d = new Date(`${dateMatch[1]}T00:00:00.000Z`);
            if (!isNaN(d.getTime())) parsedDate = d.toISOString();
        }

        data = {
            id: 99913,
            title: "Kintsugi: The Beauty of Digital Flaws",
            slug: 'kintsugi-the-beauty-of-digital-flaws',
            content: contentBody,
            excerpt: "Embracing imperfections in our digital creations through the philosophy of Kintsugi.",
            published_at: parsedDate,
            created_at: parsedDate,
            category_id: null
        };
        error = null;
    } else if (slug === 'shuhari-three-stages-of-ai-mastery') {
        const fs = require('fs');
        const path = require('path');
        let fileContent = '';
        try { fileContent = fs.readFileSync(path.join(process.cwd(), 'articles', 'philosophy', 'shuhari-three-stages-of-ai-mastery.mdx'), 'utf8'); } catch (e) { }
        const contentBody = fileContent.replace(/---[\s\S]*?---/, '').trim();
        let parsedDate = new Date().toISOString();
        const dateMatch = fileContent.match(/date:\s*["']([^"']+)["']/);
        if (dateMatch && dateMatch[1]) { const d = new Date(`${dateMatch[1]}T00:00:00.000Z`); if (!isNaN(d.getTime())) parsedDate = d.toISOString(); }

        data = { id: 99914, title: "Shuhari: The Three Stages of AI Mastery", slug: 'shuhari-three-stages-of-ai-mastery', content: contentBody, excerpt: "How to evolve from blindly following AI prompts to creatively bending the algorithmic rules.", published_at: parsedDate, created_at: parsedDate, category_id: null };
        error = null;
    } else if (slug === 'bushido-ethics-in-ai') {
        const fs = require('fs');
        const path = require('path');
        let fileContent = '';
        try { fileContent = fs.readFileSync(path.join(process.cwd(), 'articles', 'philosophy', 'bushido-ethics-in-ai.mdx'), 'utf8'); } catch (e) { }
        const contentBody = fileContent.replace(/---[\s\S]*?---/, '').trim();
        let parsedDate = new Date().toISOString();
        const dateMatch = fileContent.match(/date:\s*["']([^"']+)["']/);
        if (dateMatch && dateMatch[1]) { const d = new Date(`${dateMatch[1]}T00:00:00.000Z`); if (!isNaN(d.getTime())) parsedDate = d.toISOString(); }

        data = { id: 99915, title: "Bushido: The Ethics of the AI Prompt Engineer", slug: 'bushido-ethics-in-ai', content: contentBody, excerpt: "Why navigating the future of Artificial Intelligence requires the ancient heart, honesty, and responsibility of a Samurai.", published_at: parsedDate, created_at: parsedDate, category_id: null };
        error = null;
    } else if (slug === 'samurai-spirit-ai-mastery') {
        const fs = require('fs');
        const path = require('path');
        let fileContent = '';
        try { fileContent = fs.readFileSync(path.join(process.cwd(), 'articles', 'philosophy', 'samurai-spirit-ai-mastery.mdx'), 'utf8'); } catch (e) { }
        const contentBody = fileContent.replace(/---[\s\S]*?---/, '').trim();
        let parsedDate = new Date().toISOString();
        const dateMatch = fileContent.match(/date:\s*["']([^"']+)["']/);
        if (dateMatch && dateMatch[1]) { const d = new Date(`${dateMatch[1]}T00:00:00.000Z`); if (!isNaN(d.getTime())) parsedDate = d.toISOString(); }

        data = { id: 99916, title: "The Samurai Spirit: Forging Human Mastery Alongside AI", slug: 'samurai-spirit-ai-mastery', content: contentBody, excerpt: "True mastery isn't outsourcing your skills to an algorithm; it's using the algorithm as a whetstone to sharpen your own human spirit.", published_at: parsedDate, created_at: parsedDate, category_id: null };
        error = null;
    } else if (slug === 'zen-and-art-of-prompting') {
        const fs = require('fs');
        const path = require('path');
        let fileContent = '';
        try { fileContent = fs.readFileSync(path.join(process.cwd(), 'articles', 'philosophy', 'zen-and-art-of-prompting.mdx'), 'utf8'); } catch (e) { }
        const contentBody = fileContent.replace(/---[\s\S]*?---/, '').trim();
        let parsedDate = new Date().toISOString();
        const dateMatch = fileContent.match(/date:\s*["']([^"']+)["']/);
        if (dateMatch && dateMatch[1]) { const d = new Date(`${dateMatch[1]}T00:00:00.000Z`); if (!isNaN(d.getTime())) parsedDate = d.toISOString(); }

        data = { id: 99917, title: "Zen and the Art of Prompting: Embracing 'Ku'", slug: 'zen-and-art-of-prompting', content: contentBody, excerpt: "How the Zen concept of Emptiness can transform your relationship with AI, proving that less is often more.", published_at: parsedDate, created_at: parsedDate, category_id: null };
        error = null;
    } else if (slug === 'chanoyu-cyber-tea') {
        const fs = require('fs');
        const path = require('path');
        let fileContent = '';
        try { fileContent = fs.readFileSync(path.join(process.cwd(), 'articles', 'philosophy', 'chanoyu-cyber-tea.mdx'), 'utf8'); } catch (e) { }
        const contentBody = fileContent.replace(/---[\s\S]*?---/, '').trim();
        let parsedDate = new Date().toISOString();
        const dateMatch = fileContent.match(/date:\s*["']([^"']+)["']/);
        if (dateMatch && dateMatch[1]) { const d = new Date(`${dateMatch[1]}T00:00:00.000Z`); if (!isNaN(d.getTime())) parsedDate = d.toISOString(); }

        data = { id: 99918, title: "Cha-no-yu: The Ritual of the Cyber Tea Ceremony", slug: 'chanoyu-cyber-tea', content: contentBody, excerpt: "Transforming your daily AI interactions from frantic transactions into mindful, sacred rituals.", published_at: parsedDate, created_at: parsedDate, category_id: null };
        error = null;
    } else if (error || !data) {
        return null;
    }

    // Fetch category manually to avoid foreign key PostgREST issues
    if (data.category_id) {
        const { data: categoryData } = await supabase
            .from("categories")
            .select("name")
            .eq("id", data.category_id)
            .single();

        data.categories = categoryData || { name: "Insight" };
    } else {
        data.categories = { name: "Insight" };
    }

    // --- EMERGENCY FRONTEND DATABASE OVERRIDE ---
    // Bypassing Supabase Row-Level Security via Static Rendering Interception
    if (slug === 'the-art-of-japanese-bow-ojigi') {
        const header = '## The Three Degrees of Respect';
        if (data.content.includes(header) && !data.content.includes('osushi-bowing-guide.png')) {
            data.content = data.content.replace(header, header + '\n\n![Osushi-chan Bowing Guide Cyber Mode](/osushi-bowing-guide.png?v=7)\n');
        }
    } else if (slug === 'the-magic-word-otsukaresama') {
        data.title = 'Otsukaresama: More Than "Good Job" [お疲れ様です]';
        data.content = `
"Otsukaresama" is famously one of the most difficult Japanese phrases to translate directly into English. It is a linguistic Swiss Army knife used in almost every conceivable workplace scenario.

## The Silent Acknowledgment

![Osushi-chan Otsukaresama Cyber Mode](/osushi-otsukaresama.png?v=4)

While literally translating to "You must be tired," its actual meaning is much closer to a profound expression of communal appreciation. Saying <ContextDecoder phrase="Otsukaresama" meaning="Thank you for your hard work" context="Used to acknowledge shared effort and build solidarity in the workplace">Otsukaresama</ContextDecoder> acknowledges the burden of the work and the shared dedication of the team.

## When to Use It

1. **Arriving at the Office**: It serves as a gentle, collaborative greeting alongside 'Ohayou gozaimasu'.
2. **Passing in the Hallway**: A quick acknowledgment of shared effort during a busy day.
3. **Leaving for the Day**: Replaces "goodbye" with a warm wave of appreciation.

## More Than Words

Ultimately, it reflects the cultural value of *wa* (harmony) and communal effort. It tells your colleagues: "I see your hard work, and I value it."
        `.trim();
    } else if (slug === 'the-art-of-meishi-more-than-just-a-business-card') {
        data.title = 'Meishi: The Soul of a Business Card [名刺]';
        data.content = `
In many Western business cultures, a business card is a disposable piece of paper, often crumpled in a pocket or immediately transcribed into a phone. In Japan, the ritual is entirely different.

## The Extension of Self

In Japanese business protocol, a <ContextDecoder phrase="Meishi" meaning="Business card" context="Treated as a literal extension of the person giving it, commanding immediate respect">Meishi</ContextDecoder> is not merely contact information; it is considered a physical extension of the individual and their corporate identity.

## The Ritual of Exchange

![Osushi-chan Business Card Etiquette Cyber Mode](/osushi-meishi-premium.png?v=2)

The actual exchange of the Meishi is a choreographed dance of respect:

1. **Present with Both Hands**: Always hold the card by the top corners with both hands, ensuring the text is facing the recipient so they can read it immediately.
2. **Accept with Care**: Receive the card with both hands and take a moment to read it carefully. Acknowledge their title and name out loud. Never slide it directly into your pocket.
3. **Table Placement**: During a meeting, keep the card face-up on the table, arranged according to the seating order of the people across from you.

## A Lasting Impression

Treating the Meishi with the utmost reverence from the very first second sets the tone for a respectful, long-lasting business relationship. It is the first test of your professional character.
        `.trim();
    } else if (slug === 'itadakimasu-meaning-japanese-gratitude') {
        data.title = 'Itadakimasu: The Spiritual Gratitude Hidden in Every Japanese Meal [いただきます]';
        data.content = `
Have you ever wondered why Japanese people always put their hands together and say something before they eat? It is more than just "bon appetit."

## The Spirit of the Meal

![Osushi-chan Itadakimasu Cyber Mode](/osushi-itadakimasu.png?v=2)

Before taking the first bite, it is customary to say <ContextDecoder phrase="いただきます" meaning="I humbly receive" context="Said before eating. It shows gratitude to the plants, animals, farmers, and cooks who provided the meal.">Itadakimasu</ContextDecoder>. It acknowledges that you are taking life to sustain your own, and expresses deep gratitude for the entire chain of effort that brought the food to your plate.

## How to Do It Right

1. **Hands Together**: Clasp your hands in a prayer-like position gently in front of your chest.
2. **Bow Slightly**: Lower your head just a fraction.
3. **Say It Clearly**: Just loud enough for your dining partners to hear. 

## Beyond the Table

This concept ties heavily back to *Mottainai* (the regret of waste). Because you have recognized the sacrifice required for the meal, it becomes culturally unacceptable to leave food unfinished. 
        `.trim();
    } else if (slug === 'mottainai') {
        const fs = require('fs');
        const path = require('path');
        let fileContent = '';
        try {
            fileContent = fs.readFileSync(path.join(process.cwd(), 'articles', 'philosophy', 'mottainai-digital-minimalism-in-ai.mdx'), 'utf8');
        } catch (e) { }
        const contentBody = fileContent.replace(/---[\s\S]*?---/, '').trim();

        let parsedDate = new Date().toISOString();
        const dateMatch = fileContent.match(/date:\s*["']([^"']+)["']/);
        if (dateMatch && dateMatch[1]) {
            const d = new Date(dateMatch[1]);
            if (!isNaN(d.getTime())) parsedDate = d.toISOString();
        }

        data = {
            id: 99912,
            title: "Mottainai: Digital Minimalism in AI",
            slug: 'mottainai-digital-minimalism-in-ai',
            content: contentBody,
            excerpt: "A deep dive into the Japanese philosophy of Mottainai and how it applies to our digital lives and AI consumption.",
            published_at: parsedDate,
            created_at: parsedDate,
            category_id: null
        };
        error = null;
    } else if (slug === 'komorebi-sunlight-filtering-through-trees' || slug === 'komorebi' || slug === 'komorebi-sunlight-filtering-trees') {
        data.title = 'Komorebi: The Ephemeral Beauty of Light [木漏れ日]';
        data.content = `
![Osushi-chan enjoying Komorebi (sunlight filtering through trees)](/osushi-komorebi.png?v=4)

Some concepts in Japanese culture are so deeply tied to nature that they require an entire sentence to translate into English. "Komorebi" is perhaps the most famous example of this untranslatable beauty.

## The Dance of Light and Shadow

<ContextDecoder phrase="木漏れ日" meaning="Sunlight filtering through the leaves of trees" context="Used to describe the interplay between the light and the leaves, creating a unique, fleeting pattern of illumination.">Komorebi</ContextDecoder> is composed of three kanji characters: 木 (tree), 漏れ (leaking or escaping), and 日 (sun or day). It captures the visual poetry of golden sunlight catching the edge of a leaf before dappling the forest floor.

## Why It Matters

1. **Mono no Aware**: It is a perfect physical manifestation of *Mono no Aware* (the pathos of things)—an appreciation for the fleeting, impermanent nature of life. The pattern of light is never the same twice.
2. **Presence**: It forces the observer into a state of absolute mindfulness. You cannot save or capture the true feeling of Komorebi; you can only experience it in that exact moment.
3. **Nature Connection**: It reflects a culture that finds profound, sacred beauty in the quiet, organic background rather than the loud, man-made foreground. 
        `.trim();
    } else if (slug === 'nindo-naruto-way-of-the-ninja' || slug === 'nindo') {
        data.title = 'Nindo [忍道]: The Way of the Ninja and Finding Your Belief';
        data.excerpt = 'Discover how the ancient samurai and ninja philosophy of Nindo (The Way of the Ninja) translates into unwavering personal belief and dedication in modern Japanese business.';
        data.content = `
![Cyber-Samurai Osushi-chan in a neon Dojo, representing Nindo (Way of the Ninja) and personal belief](/osushi-samurai-nindo.png?v=2)

Whether you grew up reading *Naruto* or watching classic Samurai films, you have likely encountered the concept of "Nindo" (忍道) or the "Way of the Ninja"—a strict, personal moral code that dictates how one lives, fights, and dies.

But what does a 15th-century feudal concept have to do with the modern Japanese corporate boardroom? Surprisingly, everything.

## The Convergence of Code and Culture

In contemporary Japan, the aesthetic of the *Ninja* or *Samurai* isn't just pop culture; the underlying philosophy of unwavering loyalty, silent execution, and absolute mastery of one's craft has simply migrated from the battlefield to the skyscraper. 

When a Japanese professional speaks of their personal "belief" or "philosophy" toward their work, they are echoing the spirit of Nindo. It is a vow to dedicate oneself entirely to the perfection of an art—whether that art is writing code, managing accounts, or serving sushi.

## Core Tenets of the Modern Nindo

1. **Gaman (我慢)**: The endurance of the seemingly unendurable with patience and dignity. The modern professional endures long hours and complex hierarchies without complaint, viewing it as spiritual training.
2. **Kintsugi (金継ぎ) of the Mind**: Finding strength in failure. A true practitioner of Nindo does not hide their mistakes but repairs them with gold, making their professional character stronger than before.
3. **Muga (無我)**: The state of "no-self." In a high-functioning Japanese team, the ego of the individual must explicitly dissolve into the collective goal of the group. 

## The Quiet Professional

You will never hear a Japanese executive declare their "Nindo" in a loud, boastful manner. It is fundamentally an internal pledge. The next time you witness a Japanese artisan performing a relatively simple task with absolute, terrifying precision, you aren't just watching someone work. You are watching someone execute their Nindo.
        `.trim();
    } else if (slug === 'deciphering-kento-shimasu' || slug === 'kento-shimasu') {
        if (data && data.content && !data.content.includes('osushi-kento-shimasu.png')) {
            data.content = `![Osushi-chan in a necktie, smiling subtly at a Cyber-Meeting table, deciphering 'Kento Shimasu'](/osushi-kento-shimasu.png?v=1)\n\n` + data.content;
        }
    } else if (slug === 'demon-slayer-kokoro-wo-moyase-shimei' || slug === 'kokoro-wo-moyase') {
        if (data && data.content && !data.content.includes('osushi-kokoro-wo-moyase.png')) {
            data.content = `![Osushi-chan in Demon Slayer armor, smiling determinedly at a Cyber-Meeting table, deciphering 'Kokoro wo Moyase'](/osushi-kokoro-wo-moyase.png?v=1)\n\n` + data.content;
        }
    } else if (slug === 'gochisosama-thank-you-for-the-meal' || slug === 'gochisosama') {
        data.title = 'Gochisosama: The Satisfaction of Gratitude [ご馳走様]';
        data.content = `
The phrase "Gochisosama" is the essential counterpart to "Itadakimasu." Just as a meal begins with gratitude, it must end with it.

## Recognizing the Feast

<div class="flex flex-col items-center mb-10 w-full text-center">
  <img src="/gochisosama_solo_gratitude.png" alt="Gochisosama Solo Gratitude Cyber Mode" class="w-full max-w-2xl rounded-2xl shadow-xl mx-auto border border-slate-200 dark:border-slate-800" />
  <p class="text-sm text-slate-500 font-outfit mt-4 italic max-w-xl px-4 mx-auto">A profound gesture of gratitude: Osushi-chan expresses Gochisosama in the serene glow of the Cyber-Washitsu.</p>
</div>

By placing your hands together in *Gassho* [合掌] and saying <ContextDecoder phrase="ご馳走様" meaning="Thank you for the meal / It was a feast" context="Said after finishing a meal to express satisfaction and gratitude to the host or chef">Gochisosama</ContextDecoder>, you are explicitly acknowledging the profound effort that went into preparing the food. 

## The Meaning of the Characters

The characters 馳走 (Chisou) historically refer to "running around"—representing the physical effort the host went through to gather ingredients and prepare the feast. The prefix "Go" and suffix "Sama" elevate this effort to a deeply respectful level. 

1. **Clear Your Plate**: The most sincere way to say Gochisosama is to leave nothing behind.
2. **Hands Together**: Close your eyes and bow your head slightly.
3. **Say It Clearly**: Whether to the chef at a sushi counter or your family at the dinner table.
        `.trim();
    } else if (slug === 'ichigo-ichie-once-in-a-lifetime-meeting') {
        if (data && data.content && !data.content.includes('ichigo_ichie_cyber_tea.png')) {
            const imageHtml = `<div class="flex flex-col items-center mb-10 w-full text-center">
  <img src="/ichigo_ichie_cyber_tea.png" alt="Ichigo Ichie Cyber Tea" class="w-full max-w-3xl rounded-2xl shadow-xl mx-auto border border-slate-200 dark:border-slate-800" />
  <p class="text-sm text-slate-500 font-outfit mt-4 italic max-w-2xl px-4 mx-auto">A fateful encounter: Iconic Osushi-chan meets the dignified Hamachi-chan in a serene Cyber-Tea Room. This is the essence of Ichigo Ichie.</p>
</div>\n\n`;
            data.content = imageHtml + data.content;
        }
    } else if (slug === 'yaoyorozu-no-kami-japanese-animism') {
        if (data && data.content && !data.content.includes('/articles/mottainai')) {
            const ctaHtml = `\n\n---\n\n**Deep Dive:** If you want to learn more about how this spiritual respect translates into daily life, explore the profound philosophy of Mottainai (Too Good to Waste) [here](/articles/mottainai).`;
            data.content = data.content + ctaHtml;
        }
    }
    if (slug === 'wabi-sabi-japanese-aesthetic-imperfection' && data && data.content && !data.content.includes('/article_visual_')) {
        data.content = `![Osushi-chan in a digital void with floating Kanji representing Wabi-Sabi](/article_visual_2026-03-01.png?v=1)\n\n` + data.content;
    } else if (slug === 'yaoyorozu-no-kami-japanese-animism' && data && data.content && !data.content.includes('/article_visual_')) {
        data.content = `![Osushi-chan in high-tech Zazen posture with blue data-light representing Yaoyorozu](/article_visual_2026-03-02.png?v=1)\n\n` + data.content;
    } else if (slug === 'aizuchi-japanese-art-of-listening' && data && data.content && !data.content.includes('/article_visual_')) {
        data.content = `![Osushi-chan looking at a digital sunrise representing Aizuchi](/article_visual_2026-03-03.png?v=1)\n\n` + data.content;
    } else if (slug === 'omotenashi-japanese-selfless-hospitality' && data && data.content && !data.content.includes('/article_visual_')) {
        data.content = `![Osushi-chan offering a glowing cyber tea cup representing Omotenashi](/article_visual_2026-03-04.png?v=1)\n\n` + data.content;
    } else if (slug === 'kaizen-toyota-way-continuous-improvement' && data && data.content && !data.content.includes('/article_visual_')) {
        data.content = `![Osushi-chan forging glowing neon gears representing Kaizen](/article_visual_2026-03-05.png?v=1)\n\n` + data.content;
    }

    return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const article = await getArticle(resolvedParams.slug);

    if (!article) return { title: "Article Not Found" };

    let ogImage: string | undefined = undefined;
    if (article.slug === 'ikigai-finding-purpose-in-ai-era') ogImage = '/images/ikigai-finding-purpose-in-ai-era/ikigai-visual.png';
    else if (article.slug === 'the-art-of-ma-digital-pause') ogImage = '/images/the-art-of-ma-digital-pause/ma-visual.png';
    else if (article.slug === 'ichigo-ichie-once-in-a-lifetime-meeting') ogImage = '/images/ichigo-ichie-once-in-a-lifetime-meeting/ichigo_ichie_cyber_tea.png';
    else if (article.slug === 'gochisosama-thank-you-for-the-meal' || article.slug === 'gochisosama') ogImage = '/images/gochisosama-thank-you-for-the-meal/gochisosama_solo_gratitude.png';
    else if (article.slug === 'wabi-sabi-japanese-aesthetic-imperfection') ogImage = '/images/wabi-sabi-japanese-aesthetic-imperfection/article_visual.png';
    else if (article.slug === 'yaoyorozu-no-kami-japanese-animism') ogImage = '/images/yaoyorozu-no-kami-japanese-animism/article_visual.png';
    else if (article.slug === 'aizuchi-japanese-art-of-listening') ogImage = '/images/aizuchi-japanese-art-of-listening/article_visual.png';
    else if (article.slug === 'omotenashi-japanese-selfless-hospitality') ogImage = '/images/omotenashi-japanese-selfless-hospitality/article_visual.png';
    else if (article.slug === 'kaizen-toyota-way-continuous-improvement') ogImage = '/images/kaizen-toyota-way-continuous-improvement/article_visual.png';

    return {
        title: `${article.title} | J-Notes AI`,
        description: article.excerpt || "A deep dive into Japanese Business Culture nuances.",
        ...(ogImage && {
            openGraph: {
                images: [ogImage],
            }
        })
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const article = await getArticle(resolvedParams.slug);

    if (!article) {
        notFound();
    }

    // Format date
    const formattedDate = new Date(article.published_at || article.created_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    });

    return (
        <article className="min-h-screen bg-white dark:bg-[#121212] pb-20 antialiased">
            {/* Header Space */}
            <div className="bg-slate-50 dark:bg-[#1a1a1a] border-b border-slate-200 dark:border-slate-800 pt-12 pb-12 mb-10">
                <div className="container max-w-[720px] mx-auto px-6 md:px-0">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6 font-outfit">
                        <ArrowLeft className="w-4 h-4" /> Back to all insights
                    </Link>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="z-10 inline-flex items-center justify-center whitespace-nowrap shrink-0 text-[11px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-full border border-transparent shadow-sm">
                            {article.categories?.name || "Insight"}
                        </span>
                        <span className="whitespace-nowrap shrink-0 text-[11px] font-bold uppercase tracking-wider font-inter tabular-nums text-slate-500 dark:text-slate-400">
                            {formattedDate}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold font-inter leading-tight text-slate-900 dark:text-white mb-6">
                        <SmartTitle title={article.title} />
                    </h1>

                    {article.excerpt && (
                        <p className="text-2xl text-slate-600 dark:text-gray-300 font-outfit italic border-l-4 border-indigo-200 dark:border-indigo-900 pl-6 leading-relaxed mt-4">
                            {article.excerpt}
                        </p>
                    )}
                </div>
            </div>

            {/* Article Body   */}
            <div className="container max-w-[720px] mx-auto px-6 md:px-0 flex flex-col items-start w-full leading-relaxed">
                <MarkdownRenderer content={article.content} />
            </div>

            {/* Reading End Newsletter */}
            <div className="container max-w-[720px] mx-auto px-6 md:px-0 pb-16 pt-16 border-t border-slate-200 dark:border-slate-800 mt-16">
                <div className="w-full relative">
                    <NewsletterSignup />
                </div>
            </div>
        </article>
    );
}
