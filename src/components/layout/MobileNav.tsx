"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { LayoutDashboard, BookOpen, Settings } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/5"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around px-4 py-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center gap-1 py-2 px-4 rounded-xl text-xs font-medium transition-colors ${
                isActive ? "text-emerald-400" : "text-gray-500"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobileActiveNav"
                  className="absolute inset-0 bg-emerald-500/[0.08] rounded-xl"
                  transition={{
                    type: "spring" as const,
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}
              <item.icon size={20} className="relative z-10" />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
