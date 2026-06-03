'use client';

import { motion } from 'motion/react';
import { Camera, Pencil } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function ProfileCard() {
  return (
    <motion.article
      variants={cardVariants}
      className="bg-[#151820] rounded-2xl border border-white/5 p-6"
    >
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="relative mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-cyan-400 text-lg font-bold text-white select-none">
            A
          </div>
          <button
            type="button"
            aria-label="Change avatar"
            className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#1a1f2e] border border-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <Camera size={10} />
          </button>
        </div>

        {/* Name & email */}
        <h3 className="text-xl font-semibold text-white">Aaysha</h3>
        <p className="mt-1 text-sm text-gray-400">aaysha.academic@platform.edu</p>

        {/* Badge */}
        <span className="mt-3 inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400 border border-emerald-500/20">
          Student Pro
        </span>

        {/* Edit button */}
        <button
          type="button"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 transition-colors"
        >
          <Pencil size={14} />
          Edit Profile Details
        </button>
      </div>
    </motion.article>
  );
}
