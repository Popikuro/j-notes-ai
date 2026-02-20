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
        <div className="w-full max-w-none flex flex-col [&_p]:my-6 [&_p]:text-lg md:[&_p]:text-xl [&_p]:leading-relaxed [&_li]:leading-relaxed [&_h1]:mt-16 [&_h1]:mb-8 [&_h1]:text-4xl [&_h2]:text-3xl [&_h2]:mt-20 [&_h2]:mb-6 [&_h2]:pt-12 [&_h2]:border-t [&_h2]:border-slate-200 dark:[&_h2]:border-slate-800 [&_h3]:text-2xl [&_h3]:mt-12 [&_h3]:mb-4 [&_ul]:list-disc [&_ul]:pl-10 [&_ul]:py-8 [&_ul]:px-6 [&_ul]:my-10 [&_ul]:bg-slate-50 dark:[&_ul]:bg-slate-900/50 [&_ul]:border [&_ul]:border-slate-200 dark:[&_ul]:border-slate-800 [&_ul]:rounded-2xl [&_ul>li]:mb-4 [&_ul>li:last-child]:mb-0 [&_a]:text-indigo-600 dark:[&_a]:text-indigo-400 font-outfit text-slate-700 dark:text-gray-200 [&_h1]:font-inter [&_h1]:font-bold dark:[&_h1]:text-white [&_h2]:font-inter [&_h2]:font-bold dark:[&_h2]:text-white [&_h3]:font-inter [&_h3]:font-bold dark:[&_h3]:text-white text-base md:text-lg font-normal relative antialiased">
            {parse(parsedHtml, options)}
        </div>
    );
}
