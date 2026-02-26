import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/80">
            <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full border border-indigo-500/20 shadow-sm bg-slate-100 dark:bg-slate-800">
                        <img src="/j-note1.jpg?v=2" alt="J-Notes Mascot" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xl font-bold font-inter tracking-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                        J-Notes AI
                    </span>
                </Link>
                <nav className="flex items-center gap-6 text-sm font-medium font-outfit text-slate-600 dark:text-slate-300">
                    <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        Articles
                    </Link>
                    <Link href="/admin" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                        Admin
                    </Link>
                    <a href="https://x.com/JNotes_AI" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ml-2" aria-label="Follow us on X">
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                    </a>
                </nav>
            </div>
        </header>
    );
}
