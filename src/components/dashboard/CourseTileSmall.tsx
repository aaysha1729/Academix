"use client";

import { motion } from "motion/react";
import type { Course } from "@/types/database";
import DynamicIcon from "@/components/ui/DynamicIcon";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

interface CourseTileSmallProps {
  course: Course;
  index?: number;
}

export default function CourseTileSmall({ course, index = 0 }: CourseTileSmallProps) {
  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
      className="group relative rounded-2xl bg-[#151820] border border-white/5 p-5 cursor-pointer overflow-hidden hover:border-emerald-500/20 transition-[border-color] duration-300"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-transparent" />

      <div className="relative z-10">
        {/* Header: Icon + Badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10">
            <DynamicIcon
              name={course.icon_name}
              size={18}
              className="text-emerald-400"
            />
          </div>
          <Badge label={course.level} />
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-white mb-4 leading-snug">
          {course.title}
        </h3>

        {/* Progress */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs font-semibold text-white tabular-nums">
            {course.progress}%
          </span>
        </div>
        <ProgressBar percentage={course.progress} delay={0.3 + index * 0.15} />
      </div>
    </motion.article>
  );
}
