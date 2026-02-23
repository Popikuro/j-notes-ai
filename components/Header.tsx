import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/80">
            <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full border border-indigo-500/20 shadow-sm bg-slate-100 dark:bg-slate-800">
                        <Image src="/j-note1.jpg" alt="J-Notes Mascot" fill className="object-cover" />
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
                </nav>
            </div>
        </header>
    );
}
