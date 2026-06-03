"use client";

import { motion } from "motion/react";

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
  label?: string;
}

export default function Toggle({ enabled, onToggle, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        enabled ? "bg-emerald-500" : "bg-white/10"
      }`}
    >
      <motion.span
        className="inline-block h-4 w-4 rounded-full bg-white shadow-sm"
        animate={{ x: enabled ? 22 : 4 }}
        transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
      />
    </button>
  );
}
