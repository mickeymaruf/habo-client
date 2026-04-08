"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How is accountability enforced?",
    a: "Habo uses public verification logs and squad-based reporting. If your mission requires photographic proof, the community or your squad leaders must validate it.",
  },
  {
    q: "What happens if I break a streak?",
    a: "Your break becomes a permanent part of your mission history. In 'Hard Mode', breaking a streak can result in being locked out of specific high-tier challenges.",
  },
  {
    q: "Can I use Habo for group coaching?",
    a: "Yes. Commanders can create private squads and manage multiple missions for their students or team members with centralized tracking.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-16 space-y-4">
      {faqs.map((f, i) => (
        <div
          key={i}
          className="border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between p-6 text-left"
          >
            <span className="text-lg font-black uppercase italic md:text-xl">
              {f.q}
            </span>
            {openIndex === i ? (
              <Minus className="h-6 w-6" />
            ) : (
              <Plus className="h-6 w-6" />
            )}
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="border-t-4 border-black p-6 text-sm leading-relaxed font-bold text-black/60 uppercase">
                  {f.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
