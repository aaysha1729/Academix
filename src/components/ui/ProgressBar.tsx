"use client";

import { motion } from "motion/react";

interface ProgressBarProps {
  percentage: number;
  delay?: number;
}

export default function ProgressBar({
  percentage,
  delay = 0,
}: ProgressBarProps) {
  return (
    <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: percentage / 100 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: delay,
        }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}
