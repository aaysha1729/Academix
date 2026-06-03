'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import Toggle from '@/components/ui/Toggle';

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function AccountPrefs() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [learningReminders, setLearningReminders] = useState(true);

  return (
    <motion.article
      variants={cardVariants}
      className="bg-[#151820] rounded-2xl border border-white/5 p-6"
    >
      <h3 className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-5">
        Account Preferences
      </h3>

      {/* Email Notifications */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-medium text-white">Email Notifications</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Weekly progress reports and course updates
          </p>
        </div>
        <Toggle
          enabled={emailNotifications}
          onToggle={() => setEmailNotifications(!emailNotifications)}
          label="Email notifications"
        />
      </div>

      {/* Learning Reminders */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-sm font-medium text-white">Learning Reminders</p>
          <p className="text-xs text-gray-500 mt-0.5">
            Push notifications for daily study goals
          </p>
        </div>
        <Toggle
          enabled={learningReminders}
          onToggle={() => setLearningReminders(!learningReminders)}
          label="Learning reminders"
        />
      </div>

      {/* Divider + Change Password */}
      <div className="border-t border-white/5 pt-4">
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors"
        >
          <Lock size={14} />
          Change Security Password
        </button>
      </div>
    </motion.article>
  );
}
