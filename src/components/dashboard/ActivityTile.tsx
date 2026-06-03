"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

function generateActivityData(): number[][] {
  const weeks = 20;
  const daysPerWeek = 7;
  const data: number[][] = [];

  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < daysPerWeek; d++) {
      const recencyBoost = w / weeks;
      const weekdayBoost = d >= 1 && d <= 5 ? 0.3 : 0;
      const random = Math.sin(w * 7 + d * 13 + 42) * 0.5 + 0.5;
      const value = random * recencyBoost + weekdayBoost;

      if (value > 0.7) week.push(3);
      else if (value > 0.45) week.push(2);
      else if (value > 0.25) week.push(1);
      else week.push(0);
    }
    data.push(week);
  }
  return data;
}

const intensityColors = [
  "bg-white/[0.04]",
  "bg-emerald-500/20",
  "bg-emerald-500/40",
  "bg-emerald-500/70",
  "bg-emerald-400",
];

const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

export default function ActivityTile() {
  const activityData = useMemo(() => generateActivityData(), []);

  return (
    <motion.article
      variants={itemVariants}
      className="relative col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl bg-[#151820] border border-white/5 p-6 overflow-hidden"
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-white">
            Learning Activity
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">
              Less
            </span>
            {[0, 1, 2, 3].map((level) => (
              <div
                key={level}
                className={`w-2.5 h-2.5 rounded-sm ${intensityColors[level]}`}
              />
            ))}
            <span className="text-[10px] text-gray-500 uppercase tracking-wider">
              More
            </span>
          </div>
        </div>

        {/* Contribution graph */}
        <div className="flex gap-1 overflow-x-auto pb-1">
          <div className="flex flex-col gap-1 mr-1 shrink-0">
            {dayLabels.map((label, i) => (
              <div key={i} className="h-2.5 flex items-center">
                <span className="text-[9px] text-gray-600 w-6 text-right">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {activityData.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {week.map((level, dayIdx) => (
                <motion.div
                  key={dayIdx}
                  className={`w-2.5 h-2.5 rounded-sm ${intensityColors[level]} hover:ring-1 hover:ring-white/20 transition-shadow cursor-pointer`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: weekIdx * 0.02 + dayIdx * 0.005,
                    duration: 0.3,
                  }}
                  title={`Week ${weekIdx + 1}, Day ${dayIdx + 1}: ${level} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
