'use client';

import { motion } from 'motion/react';
import TopBar from '@/components/layout/TopBar';
import ProfileCard from '@/components/settings/ProfileCard';
import AccountPrefs from '@/components/settings/AccountPrefs';
import AppearanceCard from '@/components/settings/AppearanceCard';
import LearningPrefs from '@/components/settings/LearningPrefs';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function SettingsPage() {
  return (
    <div>
      <TopBar
        title="Settings"
        searchPlaceholder="Search settings..."
        actions={
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-xl px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Discard
            </button>
            <button
              type="button"
              className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        }
      />

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div
          variants={headerVariants}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-white tracking-tight">Settings</h2>
          <p className="mt-1 text-sm text-gray-400">
            Manage your account and learning preferences.
          </p>
        </motion.div>

        {/* Settings grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
          <ProfileCard />
          <AccountPrefs />
          <AppearanceCard />
          <LearningPrefs />
        </div>
      </motion.section>
    </div>
  );
}
