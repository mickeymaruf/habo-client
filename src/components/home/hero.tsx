"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";

export default function HaboHeader() {
  const containerRef = useRef(null);
  const [hasDragged, setHasDragged] = useState(false);

  // Mouse tracking for subtle parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-15, 15]),
    springConfig,
  );
  const y = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-15, 15]),
    springConfig,
  );

  return (
    <header
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[90vh] cursor-default items-center justify-center overflow-hidden bg-white py-16 font-mono md:py-32 dark:bg-[#09090b]"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        {/* DRAGGABLE BADGE WITH VISUAL CUE */}
        <div className="relative mb-8 inline-block">
          <AnimatePresence>
            {!hasDragged && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 border-2 border-black bg-[#A3E635] px-2 py-0.5 text-[10px] font-bold tracking-widest whitespace-nowrap text-black uppercase shadow-[2px_2px_0px_black] dark:shadow-[2px_2px_0px_rgba(163,230,53,0.3)]"
              >
                Drag Me
              </motion.span>
            )}
          </AnimatePresence>

          <motion.div
            drag
            dragConstraints={containerRef}
            onDragStart={() => setHasDragged(true)}
            whileHover={{ scale: 1.05, rotate: "2deg" }}
            whileDrag={{
              scale: 1.1,
              rotate: "-5deg",
              cursor: "grabbing",
              boxShadow: "20px 20px 0px 0px rgba(0,0,0,0.2)",
            }}
            // Subtle "pick me up" animation
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            }}
            className="inline-block skew-x-[-12deg] cursor-grab border-4 border-black bg-black px-4 py-1 text-white select-none active:cursor-grabbing md:px-6 md:py-2 dark:border-zinc-700 dark:bg-[#09090b]/80"
          >
            <h2 className="flex items-center gap-2 text-lg font-black tracking-tighter uppercase italic md:text-xl">
              <span className="opacity-50">:::</span>
              Social Habit Engineering
              <span className="opacity-50">:::</span>
            </h2>
          </motion.div>
        </div>

        {/* PARALLAX MAIN TEXT */}
        <motion.h1
          style={{ x, y }}
          className="mb-6 text-5xl leading-none font-black tracking-tighter text-black uppercase italic select-none sm:text-7xl md:text-9xl dark:text-zinc-100"
        >
          STOP
          <span className="ml-4 text-white [-webkit-text-stroke:2px_black] sm:ml-12 md:[-webkit-text-stroke:3px_black] dark:text-transparent dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.4)]">
            Dreaming
          </span>
          <br />
          <span className="text-[#A3E635] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:drop-shadow-[4px_4px_0px_rgba(163,230,53,0.15)]">
            Start
            <span className="ml-4 sm:ml-12">Doing</span>
          </span>
        </motion.h1>

        <p className="mx-auto mb-12 max-w-2xl text-lg leading-tight font-bold tracking-tight text-black/60 uppercase md:text-xl dark:text-zinc-500">
          Habo is the ultimate Habit Protocol. Join public missions, track
          streak dynamics, and be top participants.
        </p>

        {/* MAGNETIC-STYLE BUTTONS */}
        <div className="mx-auto flex max-w-lg flex-col justify-center gap-4 sm:flex-row sm:gap-6">
          <motion.button
            whileHover={{
              x: -4,
              y: -4,
              boxShadow: "12px 12px 0px 0px rgba(163,230,53,1)",
            }}
            whileTap={{
              x: 0,
              y: 0,
              boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)",
            }}
            className="flex-1 border-4 border-black bg-black px-6 py-4 text-xl font-black text-[#A3E635] uppercase italic shadow-[6px_6px_0px_0px_rgba(163,230,53,1)] transition-all md:px-10 md:py-5 dark:border-zinc-800 dark:bg-[#A3E635] dark:text-zinc-950 dark:shadow-[6px_6px_0px_0px_rgba(163,230,53,0.2)]"
          >
            Start.Mission
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 border-4 border-black bg-white px-6 py-4 text-xl font-black text-black uppercase italic transition-all md:px-10 md:py-5 dark:border-zinc-800 dark:bg-[#09090b]/80 dark:text-zinc-100 dark:hover:bg-[#A3E635] dark:hover:text-black"
          >
            Learn_More
          </motion.button>
        </div>
      </div>

      {/* INTERACTIVE BACKGROUND ELEMENTS */}
      <motion.div
        style={{
          x: useTransform(x, (v) => v * -0.3),
          y: useTransform(y, (v) => v * -0.3),
        }}
        className="absolute inset-0 z-0 [background-image:radial-gradient(#000_2px,transparent_2px)] [background-size:32px_32px] opacity-10 dark:[background-image:radial-gradient(#27272a_1px,transparent_1px)] dark:opacity-20"
      />

      {/* Draggable Background Circle */}
      <motion.div
        drag
        dragConstraints={containerRef}
        whileHover={{ scale: 1.1, opacity: 0.2, cursor: "grab" }}
        whileDrag={{ cursor: "grabbing" }}
        className="absolute bottom-[-5%] left-[-5%] h-40 w-40 rounded-full border-[12px] border-black opacity-5 blur-[2px] md:h-64 md:w-64 md:border-[20px] dark:border-zinc-800"
      />
    </header>
  );
}
