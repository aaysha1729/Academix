"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Settings,
  ChevronLeft,
  MoreVertical,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`hidden md:flex flex-col h-screen sticky top-0 border-r border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[200px] lg:w-[240px]"
      }`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 pt-7 pb-2">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10">
          <GraduationCap size={18} className="text-emerald-400" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold text-white tracking-tight">
              Academix
            </h1>
            <p className="text-[10px] text-gray-500 leading-tight">
              Premium Learning
            </p>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex items-center justify-center mx-3 mt-2 mb-4 h-7 rounded-md hover:bg-white/5 text-gray-500 transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <motion.div
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
        >
          <ChevronLeft size={14} />
        </motion.div>
      </button>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-emerald-500/[0.08] rounded-xl border border-emerald-500/[0.15]"
                  transition={{
                    type: "spring" as const,
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}
              <item.icon size={18} className="relative z-10 shrink-0" />
              {!collapsed && (
                <span className="relative z-10">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User profile at bottom */}
      <div className="px-3 pb-5 mt-auto">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white shrink-0">
            A
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  Aaysha
                </p>
                <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
                  Student Pro
                </p>
              </div>
              <button
                className="text-gray-500 hover:text-gray-300 transition-colors"
                aria-label="User menu"
              >
                <MoreVertical size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
