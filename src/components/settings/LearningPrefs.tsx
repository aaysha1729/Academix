'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const defaultTopics = ['React', 'Machine Learning', 'Systems Design'];

export default function LearningPrefs() {
  const [hours, setHours] = useState(12);

  return (
    <motion.article
      variants={cardVariants}
      className="bg-[#151820] rounded-2xl border border-white/5 p-6"
    >
      <h3 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-5">
        Learning Preferences
      </h3>

      {/* Topics */}
      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-3">
        Preferred Learning Topics
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {defaultTopics.map((topic) => (
          <span
            key={topic}
            className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20"
          >
            {topic}
          </span>
        ))}
        <button
          type="button"
          className="rounded-full border border-dashed border-white/20 px-3 py-1 text-xs text-gray-400 hover:text-white hover:border-white/40 transition-colors flex items-center gap-1"
        >
          <Plus size={12} />
          Add Topic
        </button>
      </div>

      {/* Weekly Goal Slider */}
      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-3">
        Weekly Learning Goal
      </p>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Study hours per week</span>
          <span className="text-sm font-semibold text-emerald-400">{hours} Hours</span>
        </div>

        <input
          type="range"
          min={1}
          max={40}
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          aria-label="Weekly learning goal in hours"
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/10
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-emerald-500
            [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(16,185,129,0.4)]
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-emerald-400
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-emerald-500
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-emerald-400"
        />

        <div className="flex justify-between">
          <span className="text-[10px] text-gray-600">1 hr</span>
          <span className="text-[10px] text-gray-600">40 hrs</span>
        </div>
      </div>
    </motion.article>
  );
}
