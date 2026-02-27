"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";
import { ReactNode, useState } from "react";

interface ContextDecoderProps {
    phrase: string;
    meaning: string;
    context: string;
    children: ReactNode;
}

export function ContextDecoder({ phrase, meaning, context, children }: ContextDecoderProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Tooltip.Provider delayDuration={200}>
            <Tooltip.Root open={isOpen} onOpenChange={setIsOpen}>
                <Tooltip.Trigger asChild>
                    <span 
                        onClick={(e) => {
                            e.preventDefault();
                            setIsOpen(!isOpen);
                        }}
                        className="inline-flex items-center gap-1 cursor-help text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors rounded-sm border-b border-dashed border-indigo-400/60 dark:border-indigo-500/60 hover:border-indigo-600 dark:hover:border-indigo-300 pb-[1px]"
                    >
                        {children || phrase}
                        <Info className="w-3.5 h-3.5 text-indigo-500/70" />
                    </span>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        className="z-50 max-w-xs md:max-w-sm bg-slate-900 dark:bg-slate-800 text-slate-100 p-4 rounded-xl shadow-xl shadow-slate-900/20 border border-slate-700/50 animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 font-outfit"
                        sideOffset={8}
                    >
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 border-b border-slate-700 pb-2 mb-2">
                                <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded text-xs font-bold font-inter uppercase tracking-wide">
                                    AI Context
                                </span>
                                <span className="font-bold text-lg">{phrase}</span>
                            </div>
                            <p className="text-sm">
                                <span className="text-slate-400">Meaning:</span>{" "}
                                <span className="font-medium text-white">{meaning}</span>
                            </p>
                            <p className="text-sm">
                                <span className="text-indigo-300">Context:</span>{" "}
                                <span className="italic text-slate-300">{context}</span>
                            </p>
                        </div>
                        <Tooltip.Arrow className="fill-slate-900 dark:fill-slate-800" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}
