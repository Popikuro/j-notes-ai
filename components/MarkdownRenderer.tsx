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
        <div className="w-full max-w-none flex flex-col space-y-6 [&_p]:mb-6 [&_p]:leading-relaxed [&_li]:leading-relaxed [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:text-3xl [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:text-indigo-600 dark:[&_a]:text-indigo-400 font-outfit text-slate-700 dark:text-slate-300 [&_h1]:font-inter [&_h1]:font-bold [&_h2]:font-inter [&_h2]:font-bold [&_h3]:font-inter [&_h3]:font-bold text-base md:text-lg relative">
            {parse(parsedHtml, options)}
        </div>
    );
}
