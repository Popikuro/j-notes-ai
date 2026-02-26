import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata: Metadata = {
    title: "The Magic Word: Otsukaresama [お疲れ様です] | J-Notes AI",
    description: "Understanding the most versatile phrase in Japanese business culture."
};

export default function OtsukaresamaPage() {
    const formattedDate = new Date("2026-02-23").toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    });

    const content = `In Japan, the workplace culture relies heavily on mutual recognition. There is one phrase you will hear dozens of times a day that covers almost every social interaction.

---

## What it means
<ContextDecoder phrase="お疲れ様" meaning="Literally 'You look tired,' but used as Hello, Goodbye, or Thank you for your hard work. It recognizes the effort the other person has put in." />

---

## When to use it
1. **Arriving at the office:** It functions as a greeting to colleagues already working.
2. **Passing someone in the hall:** A polite way to acknowledge their presence.
3. **Ending a meeting:** To thank everyone for their time and contribution.

Understanding the "Air" (Kuuki) behind this phrase is the first step to mastering Japanese business manners.

<ContextDecoder phrase="空気を読む" meaning="Reading the air. The ability to understand the unspoken mood or social cues in a situation." />

Give it a try tomorrow!`;

    return (
        <article className="min-h-screen bg-white dark:bg-[#121212] pb-20 antialiased">
            {/* Header Space */}
            <div className="bg-slate-50 dark:bg-[#1a1a1a] border-b border-slate-200 dark:border-slate-800 pt-32 pb-24 mb-20">
                <div className="container max-w-[720px] mx-auto px-6 md:px-0">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-10 font-outfit">
                        <ArrowLeft className="w-4 h-4" /> Back to all insights
                    </Link>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="z-10 inline-flex items-center justify-center whitespace-nowrap shrink-0 text-[11px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-full border border-transparent shadow-sm">
                            Insight
                        </span>
                        <span className="whitespace-nowrap shrink-0 text-[11px] font-bold uppercase tracking-wider font-inter tabular-nums text-slate-500 dark:text-slate-400">
                            {formattedDate}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold font-inter leading-tight text-slate-900 dark:text-white mb-6">
                        The Magic Word: Otsukaresama <span className="font-normal text-slate-500 dark:text-slate-400 inline-block px-1 ml-1"> [お疲れ様です]</span>
                    </h1>

                    <p className="text-2xl text-slate-600 dark:text-gray-300 font-outfit italic border-l-4 border-indigo-200 dark:border-indigo-900 pl-6 leading-relaxed mt-4">
                        Understanding the most versatile phrase in Japanese business culture.
                    </p>
                </div>
            </div>

            {/* Article Body  */}
            <div className="container max-w-[720px] mx-auto px-6 md:px-0 flex flex-col items-start w-full leading-relaxed">
                <MarkdownRenderer content={content} />
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
