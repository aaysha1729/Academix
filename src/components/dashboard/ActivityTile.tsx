"use client";

import { Fragment, useMemo } from "react";
import { motion } from "motion/react";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

const DAYS_PER_WEEK = 7;
const TOTAL_WEEKS = 53;

const MONTH_LABELS = [
  { label: "Jan", week: 0 },
  { label: "Feb", week: 5 },
  { label: "Mar", week: 9 },
  { label: "Apr", week: 13 },
  { label: "May", week: 18 },
  { label: "Jun", week: 22 },
  { label: "Jul", week: 26 },
  { label: "Aug", week: 31 },
  { label: "Sep", week: 35 },
  { label: "Oct", week: 40 },
  { label: "Nov", week: 44 },
  { label: "Dec", week: 48 },
];

const DAY_LABELS: Record<number, string> = {
  1: "Mon",
  3: "Wed",
  5: "Fri",
};

const intensityClasses = [
  "bg-white/[0.04]",
  "bg-emerald-500/20",
  "bg-emerald-500/40",
  "bg-emerald-500/[0.65]",
  "bg-emerald-400",
];

function generateYearlyData(): number[][] {
  const data: number[][] = [];
  for (let w = 0; w < TOTAL_WEEKS; w++) {
    const week: number[] = [];
    const isRestWeek = Math.sin(w * 0.8 + 3) > 0.85;
    const isBurstWeek = Math.sin(w * 1.3 + 7) > 0.7;

    for (let d = 0; d < DAYS_PER_WEEK; d++) {
      const seed = Math.sin(w * 7.1 + d * 13.3 + 42) * 0.5 + 0.5;
      const momentum = 0.15 + (w / TOTAL_WEEKS) * 0.55;
      const weekdayBoost = d >= 1 && d <= 5 ? 0.25 : 0;
      const peakDayBoost = d === 2 || d === 4 ? 0.15 : 0;

      let value = seed * momentum + weekdayBoost + peakDayBoost;
      if (isRestWeek) value *= 0.3;
      if (isBurstWeek) value *= 1.5;

      if (value > 0.75) week.push(4);
      else if (value > 0.55) week.push(3);
      else if (value > 0.38) week.push(2);
      else if (value > 0.2) week.push(1);
      else week.push(0);
    }
    data.push(week);
  }
  return data;
}

function countActiveDays(data: number[][]): number {
  return data.flat().filter((v) => v > 0).length;
}

export default function ActivityTile() {
  const yearlyData = useMemo(() => generateYearlyData(), []);
  const activeDays = useMemo(() => countActiveDays(yearlyData), [yearlyData]);

  // Build a flat grid: row-major order for CSS grid (row 0 = month labels, rows 1-7 = days)
  // We use column-based data but CSS grid needs row-major, so we transpose
  const cells: { level: number; week: number; day: number }[] = [];
  for (let d = 0; d < DAYS_PER_WEEK; d++) {
    for (let w = 0; w < TOTAL_WEEKS; w++) {
      cells.push({ level: yearlyData[w][d], week: w, day: d });
    }
  }

  return (
    <motion.article
      variants={itemVariants}
      className="relative col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl bg-[#151820] border border-white/5 p-5 sm:p-6 overflow-hidden"
    >
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">
              Learning Activity
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {activeDays} active days in the past year
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-gray-500 mr-0.5">Less</span>
            {intensityClasses.map((cls, i) => (
              <div
                key={i}
                className={`w-[10px] h-[10px] rounded-[2px] ${cls}`}
              />
            ))}
            <span className="text-[10px] text-gray-500 ml-0.5">More</span>
          </div>
        </div>

        {/* Heatmap — CSS Grid for full-width fill */}
        <div className="overflow-x-auto">
          <div
            className="grid w-full"
            style={{
              /* 1 column for day labels + 53 equal columns for weeks */
              gridTemplateColumns: `24px repeat(${TOTAL_WEEKS}, 1fr)`,
              gridTemplateRows: `14px repeat(${DAYS_PER_WEEK}, 1fr)`,
              gap: "2px",
            }}
          >
            {/* Row 0: Month labels */}
            {/* Empty cell for the day-label column */}
            <div />
            {Array.from({ length: TOTAL_WEEKS }).map((_, w) => {
              const month = MONTH_LABELS.find((m) => m.week === w);
              return (
                <div key={`month-${w}`} className="flex items-end">
                  {month && (
                    <span className="text-[10px] text-gray-500 leading-none whitespace-nowrap">
                      {month.label}
                    </span>
                  )}
                </div>
              );
            })}

            {/* Rows 1-7: Day labels + activity cells */}
            {Array.from({ length: DAYS_PER_WEEK }).map((_, dayIdx) => (
              <Fragment key={`row-${dayIdx}`}>
                {/* Day label cell */}
                <div
                  key={`label-${dayIdx}`}
                  className="flex items-center justify-end pr-1"
                >
                  {DAY_LABELS[dayIdx] && (
                    <span className="text-[9px] text-gray-600 leading-none">
                      {DAY_LABELS[dayIdx]}
                    </span>
                  )}
                </div>

                {/* Week cells for this day */}
                {yearlyData.map((week, weekIdx) => (
                  <motion.div
                    key={`${weekIdx}-${dayIdx}`}
                    className={`rounded-[2px] aspect-square ${intensityClasses[week[dayIdx]]} hover:ring-1 hover:ring-white/25 transition-shadow cursor-pointer`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: weekIdx * 0.005,
                      duration: 0.2,
                    }}
                    title={`${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayIdx]}, Week ${weekIdx + 1}: Level ${week[dayIdx]}`}
                  />
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
