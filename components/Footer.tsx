import Image from "next/image";

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 py-12 mt-20">
            <div className="container mx-auto max-w-5xl px-6 flex flex-col items-center justify-center text-center text-sm text-slate-500 font-outfit">
                <div className="relative h-16 w-16 mb-6 overflow-hidden rounded-full border border-indigo-500/20 shadow-sm bg-slate-100 dark:bg-slate-800">
                    <img src="/j-note1.jpg?v=2" alt="J-Notes Mascot" className="w-full h-full object-cover" />
                </div>
                <div className="mb-6">
                    <a href="https://x.com/JNotes_AI" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-2.5 mt-2 text-sm font-bold text-white transition-all duration-300 border border-slate-800 hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] dark:bg-black dark:text-white dark:hover:border-indigo-400 dark:hover:shadow-[0_0_20px_rgba(129,140,248,0.6)]">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                        Follow @JNotes_AI
                    </a>
                </div>
                <p>© {new Date().getFullYear()} J-Notes AI. All rights reserved.</p>
                <p className="mt-2 text-xs">Mastering Japanese Business Culture, one nuance at a time.</p>
                <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-400 dark:text-slate-500 font-inter">
                    <a href="https://x.com/messages/compose?recipient_id=1962561585097977856" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        Contact Us
                    </a>
                    <span className="opacity-50">•</span>
                    <a href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </footer>
    );
}
