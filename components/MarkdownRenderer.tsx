"use client";

import { useMemo } from "react";
import { marked } from "marked";
import parse, { attributesToProps, Element, domToReact, DOMNode } from "html-react-parser";
import { ContextDecoder } from "./ContextDecoder";

export function MarkdownRenderer({ content }: { content: string }) {
    const parsedHtml = useMemo(() => {
        return marked.parse(content) as string;
    }, [content]);

    const options = {
        replace: (domNode: DOMNode) => {
            if (domNode instanceof Element && domNode.name && domNode.name.toLowerCase() === 'contextdecoder') {
                const props = attributesToProps(domNode.attribs);
                return (
                    <ContextDecoder
                        phrase={typeof props.phrase === 'string' ? props.phrase : ""}
                        meaning={typeof props.meaning === 'string' ? props.meaning : ""}
                        context={typeof props.context === 'string' ? props.context : ""}
                    >
                        {domToReact(domNode.children as DOMNode[], options)}
                    </ContextDecoder>
                );
            }
        }
    };

    return (
        <div className="w-full max-w-none flex flex-col [&_p]:my-6 [&_p]:text-lg md:[&_p]:text-xl [&_p]:leading-relaxed [&_li]:leading-relaxed [&_h1]:mt-20 [&_h1]:mb-8 [&_h1]:text-4xl [&_h2]:text-3xl [&_h2]:mt-24 [&_h2]:mb-8 [&_h2]:pt-12 [&_h2]:border-t [&_h2]:border-slate-200 dark:[&_h2]:border-slate-800 [&_h3]:text-2xl [&_h3]:mt-16 [&_h3]:mb-6 [&_ul]:list-outside [&_ul]:ml-4 [&_ul]:pl-4 [&_ul]:py-8 [&_ul]:px-6 md:[&_ul]:px-10 [&_ul]:my-10 [&_ul]:bg-slate-50 dark:[&_ul]:bg-white/5 [&_ul]:border [&_ul]:border-slate-200 dark:[&_ul]:border-white/10 [&_ul]:rounded-2xl [&_ul>li]:mb-6 [&_ul>li:last-child]:mb-0 [&_ul>li::marker]:text-indigo-600 dark:[&_ul>li::marker]:text-indigo-400 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-6 [&_ol]:my-16 [&_ol]:list-decimal [&_ol]:list-inside [&_ol>li]:bg-slate-50 dark:[&_ol>li]:bg-[#161616] [&_ol>li]:border [&_ol>li]:border-slate-200 dark:[&_ol>li]:border-slate-800 [&_ol>li]:rounded-xl [&_ol>li]:p-6 md:[&_ol>li]:p-8 [&_ol>li::marker]:text-indigo-600 dark:[&_ol>li::marker]:text-indigo-400 [&_ol>li::marker]:font-bold [&_ol>li::marker]:text-xl md:[&_ol>li::marker]:text-2xl [&_p>strong:first-child]:block [&_p>strong:first-child]:mb-2 [&_p>strong:first-child]:mt-8 [&_p>strong:first-child]:text-slate-900 dark:[&_p>strong:first-child]:text-white dark:[&_p>strong:first-child]:drop-shadow-sm [&_li>strong:first-child]:block [&_li>strong:first-child]:mb-2 [&_li>strong:first-child]:text-slate-900 dark:[&_li>strong:first-child]:text-white dark:[&_li>strong:first-child]:drop-shadow-sm [&_a]:text-indigo-600 dark:[&_a]:text-indigo-400 font-outfit text-slate-700 dark:text-gray-200 [&_h1]:font-inter [&_h1]:font-bold dark:[&_h1]:text-white dark:[&_h1]:drop-shadow-sm [&_h2]:font-inter [&_h2]:font-bold dark:[&_h2]:text-white dark:[&_h2]:drop-shadow-sm [&_h3]:font-inter [&_h3]:font-bold dark:[&_h3]:text-white dark:[&_h3]:drop-shadow-sm text-base md:text-lg font-normal relative antialiased leading-relaxed">
            {parse(parsedHtml, options)}
        </div>
    );
}
