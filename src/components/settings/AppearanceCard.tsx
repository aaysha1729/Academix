'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Moon } from 'lucide-react';
import Toggle from '@/components/ui/Toggle';

type Density = 'Default' | 'Compact' | 'Relaxed';

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const densityOptions: Density[] = ['Default', 'Compact', 'Relaxed'];

export default function AppearanceCard() {
  const [darkMode, setDarkMode] = useState(true);
  const [density, setDensity] = useState<Density>('Default');

  return (
    <motion.article
      variants={cardVariants}
      className="bg-[#151820] rounded-2xl border border-white/5 p-6"
    >
      <h3 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-5">
        Appearance
      </h3>

      {/* Dark Mode */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Moon size={16} className="text-gray-400" />
          <span className="text-sm text-white">Dark Mode</span>
        </div>
        <Toggle enabled={darkMode} onToggle={() => setDarkMode(!darkMode)} label="Dark mode" />
      </div>

      {/* Interface Density */}
      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-3">
        Interface Density
      </p>
      <div className="flex gap-2">
        {densityOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setDensity(option)}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
              density === option
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-white/5 text-gray-400 border border-transparent hover:bg-white/10'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </motion.article>
  );
}
