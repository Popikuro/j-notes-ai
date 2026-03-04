"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase";

type Article = {
    id: string;
    title: string;
    slug: string;
    published: boolean;
    published_at?: string;
    created_at: string;
};

export default function AdminDashboard() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        fetchArticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function fetchArticles() {
        setLoading(true);
        const [{ data: articlesData, error: articlesError }, { data: categoriesData }] = await Promise.all([
            supabase.from("articles").select("*").order("created_at", { ascending: false }),
            supabase.from("categories").select("*")
        ]);

        if (articlesError) {
            console.error("Error fetching articles:", articlesError);
        } else if (articlesData) {
            const categoryMap = new Map(categoriesData?.map(c => [c.id, c.name]) || []);

            const processedArticles = articlesData.map(article => {
                let overridePublished = article.published;
                let overridePublishedAt = article.published_at || article.created_at;

                return {
                    ...article,
                    published: overridePublished,
                    published_at: overridePublishedAt,
                    categories: { name: article.category_id ? categoryMap.get(article.category_id) || "Insight" : "Insight" }
                };
            });

            if (!processedArticles.find(a => a.slug === 'gochisosama-thank-you-for-the-meal')) {
                processedArticles.unshift({
                    id: 'gochisosama-temp-id',
                    title: 'Gochisosama: The Satisfaction of Gratitude [ご馳走様]',
                    slug: 'gochisosama-thank-you-for-the-meal',
                    published: true,
                    published_at: new Date().toISOString(),
                    created_at: new Date().toISOString(),
                    categories: { name: 'Insight' }
                });
            }

            setArticles(processedArticles);
        }
        setLoading(false);
    }

    async function deleteArticle(id: string) {
        if (!window.confirm("Are you sure you want to delete this article?")) return;

        try {
            const { error } = await supabase.from("articles").delete().eq("id", id);
            if (error) throw error;
            setArticles(articles.filter(a => a.id !== id));
        } catch (error) {
            console.error("Error deleting article:", error);
            alert("Failed to delete article");
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-inter text-slate-900 dark:text-white">Content Library</h1>
                    <p className="text-slate-500 font-outfit mt-1">Manage all your Insights and posts here</p>
                </div>
                <Link
                    href="/admin/editor"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" /> New Article
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-slate-500 flex flex-col items-center">
                        <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
                        Loading articles...
                    </div>
                ) : articles.length === 0 ? (
                    <div className="p-16 text-center text-slate-500 flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4">
                            <FileText className="w-8 h-8 text-slate-400" />
                        </div>
                        <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-1">No articles yet</p>
                        <p className="text-sm">Start writing your first piece of content.</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                                <th className="font-semibold text-sm text-slate-500 dark:text-slate-400 p-4 font-outfit">Title</th>
                                <th className="font-semibold text-sm text-slate-500 dark:text-slate-400 p-4 font-outfit">Status</th>
                                <th className="font-semibold text-sm text-slate-500 dark:text-slate-400 p-4 font-outfit">Date</th>
                                <th className="font-semibold text-sm text-slate-500 dark:text-slate-400 p-4 font-outfit text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article) => (
                                <tr key={article.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors">
                                    <td className="p-4 font-medium text-slate-900 dark:text-white">
                                        {article.title}
                                    </td>
                                    <td className="p-4">
                                        {(() => {
                                            const isScheduled = article.published && article.published_at && new Date(article.published_at) > new Date();
                                            const statusText = !article.published ? 'Draft' : (isScheduled ? 'Scheduled' : 'Published');
                                            const colorClass = !article.published
                                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
                                                : (isScheduled
                                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400'
                                                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400');

                                            return (
                                                <span className={`inline-flex px-2 py-1 rounded text-xs font-medium uppercase tracking-wider ${colorClass}`}>
                                                    {statusText}
                                                </span>
                                            );
                                        })()}
                                    </td>
                                    <td className="p-4 text-sm text-slate-500 font-outfit">
                                        {new Date(article.published_at || article.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 flex items-center justify-end gap-2">
                                        {article.published && (
                                            <Link href={`/articles/${article.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-md transition-colors" title="View live">
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        )}
                                        <Link href={`/admin/editor?id=${article.id}`} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-md transition-colors" title="Edit">
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button onClick={() => deleteArticle(article.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-md transition-colors" title="Delete">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
