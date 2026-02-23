import Image from "next/image";

export default function Footer() {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 py-12 mt-20">
            <div className="container mx-auto max-w-5xl px-6 flex flex-col items-center justify-center text-center text-sm text-slate-500 font-outfit">
                <div className="relative h-16 w-16 mb-6 overflow-hidden rounded-full border border-indigo-500/20 shadow-sm bg-slate-100 dark:bg-slate-800">
                    <Image src="/j-note.jpg" alt="J-Notes Mascot" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <p>© {new Date().getFullYear()} J-Notes AI. All rights reserved.</p>
                <p className="mt-2 text-xs">Mastering Japanese Business Culture, one nuance at a time.</p>
            </div>
        </footer>
    );
}
