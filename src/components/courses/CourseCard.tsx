'use client';

import { motion } from 'motion/react';
import type { Course } from '@/types/database';
import DynamicIcon from '@/components/ui/DynamicIcon';
import Badge from '@/components/ui/Badge';
import ProgressBar from '@/components/ui/ProgressBar';

interface CourseCardProps {
  course: Course;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
};

function formatLastAccessed(dateStr: string | null): string {
  if (!dateStr) return 'Not started';
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

function getActionLabel(progress: number): string {
  if (progress === 100) return 'Review ✓';
  if (progress === 0) return 'Start Course ⊕';
  return 'Continue →';
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const actionLabel = getActionLabel(course.progress);

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative flex flex-col rounded-2xl bg-[#151820] border border-white/5 p-5 cursor-pointer
        hover:border-emerald-500/20 transition-[border-color] duration-300"
    >
      {/* Hover gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
          bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* Top row: icon + level badge */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10">
          <DynamicIcon
            name={course.icon_name}
            size={20}
            className="text-emerald-400"
          />
        </div>
        <Badge label={course.level} />
      </div>

      {/* Title + description */}
      <div className="relative z-10 flex-1">
        <h3 className="text-base font-semibold text-white mb-1.5 leading-snug">
          {course.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
          {course.description ?? 'No description available.'}
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 mt-4 flex items-center gap-3">
        <div className="flex-1">
          <ProgressBar percentage={course.progress} delay={index * 0.08} />
        </div>
        <span className="text-xs font-medium text-gray-400 tabular-nums shrink-0">
          {course.progress}%
        </span>
      </div>

      {/* Footer: last accessed + action button */}
      <div className="relative z-10 mt-3 flex items-center justify-between">
        <time className="text-xs text-gray-600">
          {formatLastAccessed(course.last_accessed)}
        </time>
        <button
          className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
          aria-label={`${actionLabel} ${course.title}`}
        >
          {actionLabel}
        </button>
      </div>
    </motion.article>
  );
}
