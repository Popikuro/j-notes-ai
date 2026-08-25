import React from 'react';

interface AffiliateLinkProps {
    title: string;
    desc: string;
    url: string;
    icon?: string;
    cta?: string;
}

export const AffiliateLink: React.FC<AffiliateLinkProps> = ({ title, desc, url, icon = "📦", cta = "View on Amazon →" }) => {
    return (
        <div className="my-8 p-6 rounded-xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-sm w-full max-w-xl text-left">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{icon}</span>
                <h4 className="text-lg font-bold text-sky-400 m-0">{title}</h4>
            </div>
            <p className="text-sm text-slate-300 mb-4 leading-relaxed m-0">
                {desc}
            </p>
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors duration-200 no-underline"
            >
                {cta}
            </a>
        </div>
    );
};
