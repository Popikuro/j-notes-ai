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

export const dynamic = 'force-dynamic';

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

    if (slug === 'gochisosama-thank-you-for-the-meal' || slug === 'gochisosama') {
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
            data.content = data.content.replace(header, header + '\n\n![Osushi-chan Bowing Guide](/osushi-bowing-guide.png?v=5)\n');
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

![Itadakimasu Infographic](/osushi-itadakimasu.png?v=1)

Before taking the first bite, it is customary to say <ContextDecoder phrase="いただきます" meaning="I humbly receive" context="Said before eating. It shows gratitude to the plants, animals, farmers, and cooks who provided the meal.">Itadakimasu</ContextDecoder>. It acknowledges that you are taking life to sustain your own, and expresses deep gratitude for the entire chain of effort that brought the food to your plate.

## How to Do It Right

1. **Hands Together**: Clasp your hands in a prayer-like position gently in front of your chest.
2. **Bow Slightly**: Lower your head just a fraction.
3. **Say It Clearly**: Just loud enough for your dining partners to hear. 

## Beyond the Table

This concept ties heavily back to *Mottainai* (the regret of waste). Because you have recognized the sacrifice required for the meal, it becomes culturally unacceptable to leave food unfinished. 
        `.trim();
    } else if (slug === 'mottainai') {
        data.title = 'Mottainai: The Deep Respect for All Things [勿体無い]';
        data.content = `
At its core, "Mottainai" is often translated as "What a waste," but this captures only a fraction of its true spiritual depth. It is a philosophy of gratitude.

## The Philosophy of Value

![Osushi-chan Mottainai Cyber Mode](/osushi-mottainai.png?v=2)

Rooted in Buddhist and Shinto animism, <ContextDecoder phrase="勿体無い" meaning="A sense of regret concerning waste" context="Used when something's intrinsic value is not properly utilized">Mottainai</ContextDecoder> acknowledges that every object—from a single grain of rice to a piece of paper—contains a spirit or was created through immense effort and sacrifice.

## How It Manifests

1. **Food**: Eating every single grain of rice in your bowl to honor the farmers and the life given.
2. **Objects**: Repairing broken items (like the art of *Kintsugi*) instead of discarding them.
3. **Time & Effort**: Not wasting the time or hard work someone dedicates to you.

## A Global Mindset

Wangari Maathai, the Nobel Peace Prize laureate, famously adopted "Mottainai" as a global environmental slogan, proving that this ancient Japanese concept holds the key to modern sustainability.
        `.trim();
    } else if (slug === 'gochisosama-thank-you-for-the-meal' || slug === 'gochisosama') {
        data.title = 'Gochisosama: The Satisfaction of Gratitude [ご馳走様]';
        data.content = `
The phrase "Gochisosama" is the essential counterpart to "Itadakimasu." Just as a meal begins with gratitude, it must end with it.

## Recognizing the Feast

![Osushi-chan Gochisosama Cyber Mode](/osushi-gochisosama.png?v=1)

By placing your hands together in *Gassho* [合掌] and saying <ContextDecoder phrase="ご馳走様" meaning="Thank you for the meal / It was a feast" context="Said after finishing a meal to express satisfaction and gratitude to the host or chef">Gochisosama</ContextDecoder>, you are explicitly acknowledging the profound effort that went into preparing the food. 

## The Meaning of the Characters

The characters 馳走 (Chisou) historically refer to "running around"—representing the physical effort the host went through to gather ingredients and prepare the feast. The prefix "Go" and suffix "Sama" elevate this effort to a deeply respectful level. 

1. **Clear Your Plate**: The most sincere way to say Gochisosama is to leave nothing behind.
2. **Hands Together**: Close your eyes and bow your head slightly.
3. **Say It Clearly**: Whether to the chef at a sushi counter or your family at the dinner table.
        `.trim();
    }

    return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const article = await getArticle(resolvedParams.slug);

    if (!article) return { title: "Article Not Found" };

    return {
        title: `${article.title} | J-Notes AI`,
        description: article.excerpt || "A deep dive into Japanese Business Culture nuances.",
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
