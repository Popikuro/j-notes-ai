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
                <div className="flex gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-full overflow-x-auto hide-scrollbar">
                    {categoryNames.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat
                                ? "bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400"
                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles?.map((article) => (
                    <div key={article.id} className="group relative flex flex-col h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <Link
                                href={`/category/${(article.categories?.name || "Insight").toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                className="z-10 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 px-3 py-1 rounded-full border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors cursor-pointer block"
                            >
                                {article.categories?.name || "Insight"}
                            </Link>
                            <span className="text-xs text-slate-400 font-outfit">
                                {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
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
