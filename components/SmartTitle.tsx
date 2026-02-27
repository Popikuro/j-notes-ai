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
    if (!title) return null;

    // 1. If the title ALREADY has explicit [Japanese] brackets from the Database, intercept it here.
    const hasBrackets = /\[(.*?)\]/.exec(title);

    if (hasBrackets) {
        // Split precisely around the brackets
        const parts = title.split(/(\[.*?\])/);
        return (
            <>
                {parts.map((part, index) => {
                    if (part.startsWith('[') && part.endsWith(']')) {
                        return (
                            <span key={index} className="font-bold text-indigo-600 dark:text-indigo-400 inline-block px-1 ml-1">
                                {part}
                            </span>
                        );
                    }
                    return <React.Fragment key={index}>{part}</React.Fragment>;
                })}
            </>
        );
    }

    // 2. Otherwise, check the dictionary for automation
    let matchedKeyword = null;
    let matchedJapanese = null;

    for (const [key, jp] of Object.entries(dictionary)) {
        const regex = new RegExp(`\\b${key}\\b`, 'i');
        if (regex.test(title)) {
            matchedKeyword = key;
            matchedJapanese = jp;
            break;
        }
    }

    if (!matchedKeyword) {
        return <>{title}</>;
    }

    // 3. Inject the Japanese characters dynamically into the string using bold impact formatting
    const splitRegex = new RegExp(`(\\b${matchedKeyword}\\b)`, 'i');
    const parts = title.split(splitRegex);

    return (
        <>
            {parts.map((part, index) => {
                if (part.toLowerCase() === matchedKeyword?.toLowerCase()) {
                    return (
                        <span key={index}>
                            {part}
                            <span className="font-bold text-indigo-600 dark:text-indigo-400 inline-block px-1 ml-1">
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
