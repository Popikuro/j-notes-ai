"use client";

import { useMemo } from "react";
import { marked } from "marked";
import parse, { attributesToProps, Element, domToReact } from "html-react-parser";
import { ContextDecoder } from "./ContextDecoder";

export function MarkdownRenderer({ content }: { content: string }) {
    const parsedHtml = useMemo(() => {
        return marked.parse(content) as string;
    }, [content]);

    const options = {
        replace: (domNode: any) => {
            if (domNode instanceof Element && domNode.name && domNode.name.toLowerCase() === 'contextdecoder') {
                const props = attributesToProps(domNode.attribs);
                return (
                    <ContextDecoder
                        phrase={typeof props.phrase === 'string' ? props.phrase : ""}
                        meaning={typeof props.meaning === 'string' ? props.meaning : ""}
                        context={typeof props.context === 'string' ? props.context : ""}
                    >
                        {domToReact(domNode.children as any, options)}
                    </ContextDecoder>
                );
            }
        }
    };

    return (
        <div className="prose prose-lg dark:prose-invert max-w-none font-outfit text-slate-700 dark:text-slate-300 prose-headings:font-inter prose-headings:font-bold prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:text-indigo-700">
            {parse(parsedHtml, options)}
        </div>
    );
}
