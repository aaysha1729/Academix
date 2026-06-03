"use client";

import { motion } from "motion/react";
import { Flame, Zap } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

interface HeroTileProps {
  name?: string;
  streak?: number;
}

export default function HeroTile({
  name = "Aaysha",
  streak = 12,
}: HeroTileProps) {
  return (
    <motion.article
      variants={itemVariants}
      className="relative col-span-1 md:col-span-2 rounded-2xl bg-[#151820] border border-white/5 p-7 lg:p-9 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.06] via-transparent to-cyan-500/[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.04] rounded-full blur-[80px] pointer-events-none" />

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10">
        {/* Streak badge — BIG */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-500/[0.12] border border-emerald-500/[0.25] mb-6 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
        >
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20">
            <Flame size={16} className="text-emerald-400" />
          </div>
          <span className="text-sm font-semibold text-emerald-300 tracking-wide uppercase">
            Daily Learning Streak: {streak} Days
          </span>
          <Zap size={14} className="text-emerald-400" />
        </motion.div>

        {/* Greeting */}
        <motion.h2
          variants={itemVariants}
          className="text-3xl lg:text-4xl font-bold text-white mb-3 tracking-tight"
        >
          Welcome back, {name}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-sm text-gray-400 leading-relaxed max-w-lg"
        >
          You&apos;re making incredible progress! You&apos;ve completed 4
          lessons this week. Keep the momentum going to reach your monthly goal.
        </motion.p>
      </motion.div>
    </motion.article>
  );
}
