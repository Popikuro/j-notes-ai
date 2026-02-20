export default function Footer() {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 py-12 mt-20">
            <div className="container mx-auto max-w-5xl px-6 text-center text-sm text-slate-500 font-outfit">
                <p>© {new Date().getFullYear()} J-Notes AI. All rights reserved.</p>
                <p className="mt-2 text-xs">Mastering Japanese Business Culture, one nuance at a time.</p>
            </div>
        </footer>
    );
}
