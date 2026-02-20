import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { NewsletterSignup } from "@/components/NewsletterSignup";

// Temporarily importing createBrowserClient since server components in Next App Router 
// should ideally use @supabase/ssr createServerClient, but we're keeping it simple for the MVP
import { createBrowserClient } from '@supabase/ssr'

export const dynamic = 'force-dynamic';

async function getArticle(slug: string) {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error || !data) {
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
    const formattedDate = new Date(article.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <article className="min-h-screen bg-white dark:bg-[#121212] pb-20 antialiased">
            {/* Header Space */}
            <div className="bg-slate-50 dark:bg-[#1a1a1a] border-b border-slate-200 dark:border-slate-800 pt-20 pb-16 mb-16">
                <div className="container max-w-[720px] mx-auto px-6 md:px-0">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-10 font-outfit">
                        <ArrowLeft className="w-4 h-4" /> Back to all insights
                    </Link>

                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-full">
                            {article.categories?.name || "Insight"}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500 font-outfit">
                            <Calendar className="w-3 h-3" /> {formattedDate}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold font-inter leading-tight text-slate-900 dark:text-white mb-6">
                        {article.title}
                    </h1>

                    {article.excerpt && (
                        <p className="text-2xl text-slate-600 dark:text-gray-300 font-outfit italic border-l-4 border-indigo-200 dark:border-indigo-900 pl-6 leading-relaxed mt-10">
                            {article.excerpt}
                        </p>
                    )}
                </div>
            </div>

            {/* Article Body */}
            <div className="container max-w-[720px] mx-auto px-6 md:px-0 flex flex-col items-start w-full">
                <MarkdownRenderer content={article.content} />
            </div>

            {/* Reading End Newsletter */}
            <div className="container max-w-[720px] mx-auto px-6 md:px-0 mt-20 pt-16 border-t border-slate-200 dark:border-slate-800">
                <NewsletterSignup />
            </div>
        </article>
    );
}
