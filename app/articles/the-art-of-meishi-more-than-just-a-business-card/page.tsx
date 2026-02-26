import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata: Metadata = {
    title: "The Art of Meishi [お辞儀]: More Than Just a Business Card | J-Notes AI",
    description: "Decoding the ritual of Japanese business card exchange."
};

export default function MeishiPage() {
    const formattedDate = new Date("2026-02-22").toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    });

    const content = `In Japan, a business card (Meishi) is considered the "face" of the person. It's not just a piece of paper; it's an extension of their identity.

## The Exchange Ritual
When you receive a card, you are literally receiving a piece of that person's professional soul. The act of <ContextDecoder phrase="名刺交換" meaning="Meishi Koukan: The formal exchange of business cards. There are strict rules on who goes first and how to hold the card.">Meishi Koukan</ContextDecoder> is a formal exchange that sets the tone for your entire professional relationship.

## Key Rules to Remember
The ritual has strict guidelines that must be followed carefully:
1. **The Hand-off:** Always use two hands to present and receive. Never slide the card across a table.
2. **The Hierarchy:** The person of lower status (or the seller) should position their card lower than the other person's, taking the <ContextDecoder phrase="下座" meaning="Gezaza: The 'lower seat' or humble position. In Meishi exchange, it means holding your card slightly lower than your partner's to show respect.">Gezaza</ContextDecoder> position to show respect.
3. **The Aftermath:** Don't put the card away immediately! Leave it on the table in front of you during the meeting.

If you treat a Meishi poorly, you risk <ContextDecoder phrase="顔に泥を塗る" meaning="To smear mud on someone's face. Metaphorically, to humiliate or bring shame to someone—exactly what you do if you treat a Meishi poorly!">smearing mud on someone's face</ContextDecoder>, a metaphor for deep humiliation. 

Mastering this ritual shows you respect the person, not just the deal.`;

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
                            Etiquette
                        </span>
                        <span className="whitespace-nowrap shrink-0 text-[11px] font-bold uppercase tracking-wider font-inter tabular-nums text-slate-500 dark:text-slate-400">
                            {formattedDate}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold font-inter leading-tight text-slate-900 dark:text-white mb-6">
                        The Art of Meishi <span className="font-normal text-slate-500 dark:text-slate-400 inline-block px-1 ml-1">[お辞儀]</span>: More Than Just a Business Card
                    </h1>

                    <p className="text-2xl text-slate-600 dark:text-gray-300 font-outfit italic border-l-4 border-indigo-200 dark:border-indigo-900 pl-6 leading-relaxed mt-4">
                        Decoding the ritual of Japanese business card exchange.
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
