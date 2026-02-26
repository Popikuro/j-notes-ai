"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function NewsletterSignup() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        // Mock API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1000);
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl px-8 py-4 md:px-12 md:py-6 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 p-32 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10">
                <h3 className="text-3xl font-bold font-inter text-white mb-2 mt-2">
                    Master the nuance implicitly.
                </h3>
                <p className="text-slate-300 font-outfit mb-6 max-w-xl mx-auto">
                    Join 2,500+ professionals receiving weekly AI-decoded breakdowns of Japanese business etiquette, slang, and cultural context.
                </p>

                {status === "success" ? (
                    <div className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-full px-6 py-4 flex items-center justify-center gap-2 max-w-md mx-auto font-medium transition-all animate-in zoom-in-95">
                        <span className="text-xl">✨</span> You&apos;re on the list! Expect our next issue soon.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            className="flex-1 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-full px-6 py-3 md:py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-outfit"
                            required
                            disabled={status === "loading"}
                        />
                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-8 py-3 md:py-4 font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            Subscribe <Send className="w-4 h-4" />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
