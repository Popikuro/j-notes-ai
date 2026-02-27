import React from 'react';

// Comprehensive dictionary mapping Romanized keywords to their Japanese counterparts
const dictionary: Record<string, string> = {
    "Kaizen": "改善",
    "Omotenashi": "おもてなし",
    "Aizuchi": "相槌",
    "Yaoyorozu no Kami": "八百万の神",
    "Wabi-Sabi": "侘び寂び",
    "Itadakimasu": "いただきます",
    "Ichigo Ichie": "一期一会",
    "Ojigi": "お辞儀",
    "Shimei": "使命",
    "Nindo": "忍道",
    "Kento Shimasu": "検討します",
    "Komorebi": "木漏れ日",
    "Otsukaresama": "お疲れ様です",
    "Mottainai": "もったいない",
    "Meishi": "名刺",
    "Kokoro wo Moyase": "心を燃やせ"
};

export function SmartTitle({ title }: { title: string }) {
    // 1. Clean the title of any previously hardcoded bracketed Japanese text 
    // to prevent double-rendering if the DB already has it
    const cleanTitle = title.replace(/\s*\[.*?\]/g, '');

    // 2. Find the first matching keyword from the dictionary
    let matchedKeyword = null;
    let matchedJapanese = null;

    for (const [key, jp] of Object.entries(dictionary)) {
        // Use word boundaries to ensure we only match the full keyword
        const regex = new RegExp(`\\b${key}\\b`, 'i');
        if (regex.test(cleanTitle)) {
            matchedKeyword = key;
            matchedJapanese = jp;
            break;
        }
    }

    // If no keyword is found, just return the clean text
    if (!matchedKeyword) {
        return <>{cleanTitle}</>;
    }

    // 3. Inject the Japanese characters in an elegant span right after the keyword
    const splitRegex = new RegExp(`(\\b${matchedKeyword}\\b)`, 'i');
    const parts = cleanTitle.split(splitRegex);

    return (
        <>
            {parts.map((part, index) => {
                if (part.toLowerCase() === matchedKeyword?.toLowerCase()) {
                    return (
                        <span key={index}>
                            {part}
                            <span className="font-normal text-slate-500 dark:text-slate-400 inline-block px-1 ml-1">
                                [{matchedJapanese}]
                            </span>
                        </span>
                    );
                }
                return <React.Fragment key={index}>{part}</React.Fragment>;
            })}
        </>
    );
}
