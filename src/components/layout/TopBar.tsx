import { Search, Bell, HelpCircle } from "lucide-react";

interface TopBarProps {
  title: string;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
}

export default function TopBar({
  title,
  searchPlaceholder = "Search courses...",
  actions,
}: TopBarProps) {
  return (
    <header className="flex items-center justify-between gap-4 mb-8">
      <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
      <div className="flex items-center gap-3">
        {/* Search bar */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/5 w-56 lg:w-64 focus-within:border-emerald-500/30 transition-colors">
          <Search size={14} className="text-gray-500 shrink-0" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="bg-transparent text-sm text-white placeholder:text-gray-600 outline-none w-full"
          />
        </div>

        {actions}

        {/* Notification bell */}
        <button
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.03] border border-white/5 text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={16} />
        </button>

        {/* Help */}
        <button
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.03] border border-white/5 text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Help"
        >
          <HelpCircle size={16} />
        </button>
      </div>
    </header>
  );
}
