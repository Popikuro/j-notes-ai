"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ArticleList({ articles, categoryNames }: { articles: any[], categoryNames: string[] }) {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredArticles = activeCategory === "All"
        ? articles
        : articles.filter(article => (article.categories?.name || "Insight") === activeCategory);

    return (
        <section id="articles" className="py-20 container max-w-5xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-200 dark:border-slate-800 pb-6 gap-6">
                <div>
                    <h2 className="text-3xl font-bold font-inter mb-2">Latest Insights</h2>
                    <p className="text-slate-500 font-outfit">Decoding the nuances of Japanese work and life.</p>
                </div>
                <div className="w-full overflow-hidden">
                    <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide py-2 px-4 gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {categoryNames.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`flex-shrink-0 shrink-0 snap-start px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${activeCategory === cat
                                    ? "bg-indigo-50 dark:bg-indigo-900/40 shadow-sm text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800"
                                    : "bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles?.map((article) => (
                    <div key={article.id} className="group relative flex flex-col h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <span
                                className="z-10 inline-flex items-center justify-center whitespace-nowrap text-[11px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1 rounded-full border border-transparent shadow-sm"
                            >
                                {article.categories?.name || "Insight"}
                            </span>
                            <span className="text-xs text-slate-400 font-outfit">
                                {new Date(article.published_at || article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold font-inter mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                            <Link href={`/articles/${article.slug}`} className="hover:underline focus:outline-none">
                                {article.title}
                            </Link>
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm font-outfit line-clamp-3 mb-6 flex-1">
                            {article.excerpt}
                        </p>
                        <Link href={`/articles/${article.slug}`} className="flex items-center w-fit text-sm font-medium text-indigo-600 dark:text-indigo-400 opacity-80 hover:opacity-100 transition-opacity">
                            Read Article <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                ))}

                {filteredArticles?.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-500 font-outfit">
                        No articles found in this category. Check back soon!
                    </div>
                )}
            </div>
        </section>
    );
}
