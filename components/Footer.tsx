import Image from "next/image";

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 py-12 mt-20">
            <div className="container mx-auto max-w-5xl px-6 flex flex-col items-center justify-center text-center text-sm text-slate-500 font-outfit">
                <div className="relative h-16 w-16 mb-6 overflow-hidden rounded-full border border-indigo-500/20 shadow-sm bg-slate-100 dark:bg-slate-800">
                    <img src="/j-note1.jpg?v=2" alt="J-Notes Mascot" className="w-full h-full object-cover" />
                </div>
                <div className="mb-6">
                    <a href="https://x.com/JNotes_AI" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 mt-2 text-sm font-medium transition-all hover:bg-slate-50 hover:text-indigo-600 dark:hover:bg-slate-800 dark:hover:text-indigo-400 shadow-sm hover:shadow-md">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                        Follow @JNotes_AI
                    </a>
                </div>
                <p>© {new Date().getFullYear()} J-Notes AI. All rights reserved.</p>
                <p className="mt-2 text-xs">Mastering Japanese Business Culture, one nuance at a time.</p>
            </div>
        </footer>
    );
}
