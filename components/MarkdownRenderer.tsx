"use client";

import { useMemo } from "react";
import { marked } from "marked";
import parse, { attributesToProps, Element, domToReact, DOMNode } from "html-react-parser";
import { ContextDecoder } from "./ContextDecoder";

export function MarkdownRenderer({ content }: { content: string }) {
    const parsedHtml = useMemo(() => {
        // Force self-closing on any unclosed ContextDecoder tags to prevent catastrophic layout wrapping
        const preProcessed = content.replace(/<ContextDecoder([^>]*[^\/])>/gi, '<ContextDecoder$1 />');
        return marked.parse(preProcessed) as string;
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
        <div className="w-full max-w-none flex flex-col [&_p]:mb-6 [&_p]:mt-0 [&_p]:text-lg md:[&_p]:text-xl [&_p]:leading-relaxed [&_li]:leading-relaxed [&_h1]:mt-16 [&_h1]:mb-8 [&_h1]:text-4xl [&_h2]:text-3xl [&_h2]:mt-20 [&_h2]:mb-6 [&_h2]:pt-10 [&_h2]:border-t [&_h2]:border-slate-200 dark:[&_h2]:border-slate-800 [&_h3]:text-2xl [&_h3]:mt-10 [&_h3]:mb-4 [&_ul]:list-disc [&_ul]:list-outside [&_ul]:ml-4 [&_ul]:pl-4 [&_ul]:my-6 [&_ul>li]:mb-4 [&_ul>li::marker]:text-indigo-600 dark:[&_ul>li::marker]:text-indigo-400 [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:ml-4 [&_ol]:pl-4 [&_ol]:my-6 [&_ol>li]:mb-4 [&_ol>li::marker]:text-indigo-600 dark:[&_ol>li::marker]:text-indigo-400 [&_ol>li::marker]:font-bold [&_p>strong:first-child]:block [&_p>strong:first-child]:mb-2 [&_p>strong:first-child]:mt-4 [&_p>strong:first-child]:text-slate-900 dark:[&_p>strong:first-child]:text-white [&_li>strong:first-child]:block [&_li>strong:first-child]:mb-1 [&_li>strong:first-child]:text-slate-900 dark:[&_li>strong:first-child]:text-white [&_a]:text-indigo-600 dark:[&_a]:text-indigo-400 font-outfit text-slate-700 dark:text-gray-200 [&_h1]:font-inter [&_h1]:font-bold dark:[&_h1]:text-white [&_h2]:font-inter [&_h2]:font-bold dark:[&_h2]:text-white [&_h3]:font-inter [&_h3]:font-bold dark:[&_h3]:text-white text-base md:text-lg font-normal relative antialiased leading-relaxed">
            {parse(parsedHtml, options)}
        </div>
    );
}
