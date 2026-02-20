"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
            <div className="bg-indigo-600 text-white py-3 px-6 text-sm font-medium flex justify-between items-center shadow-md border-b border-indigo-700">
                <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        Admin Dashboard Active
                    </span>
                    <span className="hidden md:inline font-outfit text-indigo-200">J-Notes AI Content Management</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-indigo-100 hover:text-white bg-indigo-700/50 hover:bg-indigo-700 px-3 py-1.5 rounded-md transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign Out</span>
                </button>
            </div>
            <div className="container mx-auto max-w-5xl py-8 px-6">
                {children}
            </div>
        </div>
    );
}
