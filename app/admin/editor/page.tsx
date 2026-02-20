"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Send, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase";

function EditorForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const articleId = searchParams.get("id");
    const supabase = createClient();

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [published, setPublished] = useState(false);

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [savedSuccess, setSavedSuccess] = useState(false);

    useEffect(() => {
        if (articleId) fetchArticle(articleId);
    }, [articleId]);

    async function fetchArticle(id: string) {
        setLoading(true);
        const { data } = await supabase.from("articles").select("*, categories(name)").eq("id", id).single();
        if (data) {
            setTitle(data.title);
            setSlug(data.slug);
            setExcerpt(data.excerpt || "");
            setContent(data.content);
            setCategoryName(data.categories?.name || "");
            setPublished(data.published);
        }
        setLoading(false);
    }

    // Auto-generate slug from title
    useEffect(() => {
        if (!articleId && title) {
            setSlug(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
        }
    }, [title, articleId]);

    // Helper to get or create category
    async function getOrCreateCategoryId(name: string): Promise<string | null> {
        if (!name.trim()) return null;

        // Check if category exists
        const { data: existingData } = await supabase
            .from("categories")
            .select("id")
            .ilike("name", name.trim())
            .maybeSingle();

        if (existingData) {
            return existingData.id;
        }

        // Create new category if it doesn't exist
        const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const { data: newData, error: insertError } = await supabase
            .from("categories")
            .insert([{ name: name.trim(), slug }])
            .select("id")
            .single();

        if (insertError) {
            console.error("Failed to create category:", insertError);
            return null;
        }

        return newData.id;
    }

    async function handleSave(publishStatus: boolean) {
        if (!title || !slug || !content) {
            alert("Title, slug, and content are required.");
            return;
        }

        setSaving(true);
        setSavedSuccess(false);

        try {
            // First resolve the category ID
            let resolvedCategoryId = null;
            if (categoryName.trim()) {
                resolvedCategoryId = await getOrCreateCategoryId(categoryName);
            }

            const articleData: any = {
                title,
                slug,
                excerpt,
                content,
                published: publishStatus,
            };

            if (resolvedCategoryId) {
                articleData.category_id = resolvedCategoryId;
            } else {
                // If they cleared the category input, set it to null
                articleData.category_id = null;
            }

            if (articleId) {
                // Update
                const { error } = await supabase.from("articles").update(articleData).eq("id", articleId);
                if (error) throw error;
            } else {
                // Insert
                const { data, error } = await supabase.from("articles").insert([articleData]).select("id").single();
                if (error) throw error;

                // If new article, update URL so subsequent saves are updates
                if (data) {
                    router.replace(`/admin/editor?id=${data.id}`);
                }
            }

            // Sync local state
            setPublished(publishStatus);

            // Show success styling momentarily
            setSavedSuccess(true);
            setTimeout(() => setSavedSuccess(false), 3000);

            router.refresh();
        } catch (error: any) {
            console.error("Save error:", error);
            alert(error.message || "Failed to save article");
        } finally {
            setSaving(false);
        }
    }

    if (loading) return <div className="p-12 text-center text-slate-500 font-outfit">Loading editor...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <Link href="/admin" className="text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Library
                </Link>
                <div className="flex items-center gap-4">
                    {savedSuccess && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium font-outfit text-sm flex items-center gap-1 animate-in fade-in slide-in-from-right-4">
                            <CheckCircle2 className="w-4 h-4" /> Saved Successfully!
                        </span>
                    )}
                    <button
                        onClick={() => handleSave(false)}
                        disabled={saving}
                        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors shadow-sm disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" /> {published ? "Revert to Draft" : "Save Draft"}
                    </button>
                    <button
                        onClick={() => handleSave(true)}
                        disabled={saving}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50"
                    >
                        <Send className="w-4 h-4" /> {published ? "Update Live" : "Publish"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 relative">
                        {/* Status badge embedded in editor */}
                        <div className="absolute top-6 right-6">
                            <span className={`inline-flex px-2 py-1 rounded text-xs font-medium uppercase tracking-wider ${published ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'}`}>
                                {published ? 'Published Live' : 'Draft Mode'}
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Article Title..."
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full pr-32 text-4xl font-bold font-inter bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-700 mb-6"
                        />
                        <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-6"></div>

                        <textarea
                            placeholder="Write your markdown content here... Tip: use <ContextDecoder phrase='検討します' meaning='Meaning' context='Context'>Text</ContextDecoder>"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full min-h-[500px] bg-transparent border-none outline-none resize-y font-mono text-sm leading-relaxed text-slate-800 dark:text-slate-300"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 font-outfit">
                        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">Settings</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL Slug</label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
                                <input
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    placeholder="e.g. Business, Etiquette..."
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <p className="text-xs text-slate-500 mt-1">Type a new category and it will be created automatically.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Excerpt (Optional)</label>
                                <textarea
                                    value={excerpt}
                                    onChange={(e) => setExcerpt(e.target.value)}
                                    className="w-full h-24 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                    placeholder="A short summary for the landing page..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function EditorPage() {
    return (
        <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading editor environment...</div>}>
            <EditorForm />
        </Suspense>
    );
}
