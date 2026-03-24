"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function NewsletterSignup() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Client-side validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) return;

        setStatus("loading");
        
        try {
            const res = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            
            if (res.ok) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("idle");
            }
        } catch (error) {
            console.error("Subscription failed:", error);
            setStatus("idle");
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 md:p-10 text-center w-full max-w-3xl mx-auto shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[auto] sm:min-h-[320px]">
            <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 p-32 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

            {/* Absolute Centering Inner Wrapper */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center gap-6 sm:gap-8">
                
                {/* Text Block (Visual Reset: pt-0 mt-0) */}
                <div className="w-full flex flex-col items-center justify-center gap-2 pt-0 mt-0">
                    {/* Negative margin pulling the title up to offset invisible font-padding */}
                    <h3 className="text-3xl sm:text-4xl md:text-[42px] font-black font-inter text-white leading-[1.1] tracking-tight text-balance break-words -mt-2 sm:-mt-6 mb-0">
                        Master the nuance implicitly.
                    </h3>
                    <p className="text-base sm:text-lg md:text-[22px] text-slate-200 font-outfit max-w-2xl mx-auto leading-tight text-balance mt-2 mb-0">
                        Join 2,500+ professionals receiving weekly AI-decoded breakdowns of Japanese business etiquette.
                    </p>
                </div>

                {/* Form Block */}
                <div className="w-full flex justify-center mt-2 sm:mt-0">
                    {status === "success" ? (
                        <div className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 rounded-full px-6 py-3 flex items-center justify-center gap-2 font-medium transition-all animate-in fade-in duration-500">
                            Check your inbox! A welcome gift from J-Notes is on its way. 🍣
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full max-w-md relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                className="flex-1 w-full bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-full px-4 py-3 sm:py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-outfit text-sm"
                                required
                                disabled={status === "loading"}
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full px-6 py-3 sm:py-2 font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70 text-sm tracking-wide w-full sm:w-auto mt-2 sm:mt-0"
                            >
                                {status === "loading" ? "Sending..." : <>Subscribe <Send className="w-3 h-3" /></>}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
