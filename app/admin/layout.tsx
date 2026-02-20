export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
            <div className="bg-indigo-600 text-white py-3 px-6 text-sm font-medium flex justify-between items-center shadow-md border-b border-indigo-700">
                <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Admin Dashboard Active
                </span>
                <span className="font-outfit text-indigo-200">J-Notes AI Content Management</span>
            </div>
            <div className="container mx-auto max-w-5xl py-8 px-6">
                {children}
            </div>
        </div>
    );
}
