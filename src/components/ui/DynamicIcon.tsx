import {
  Braces,
  Monitor,
  Brain,
  GitMerge,
  Database,
  Cpu,
  BookOpen,
  Code,
  FileCode,
  Layers,
  Terminal,
  Laptop,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Braces,
  Monitor,
  Brain,
  GitMerge,
  Database,
  Cpu,
  BookOpen,
  Code,
  FileCode,
  Layers,
  Terminal,
  Laptop,
};

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function DynamicIcon({
  name,
  size = 24,
  className = "",
}: DynamicIconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-white/5 ${className}`}
        style={{ width: size + 16, height: size + 16 }}
      >
        <Code size={size} className="text-gray-500" />
      </div>
    );
  }

  return <IconComponent size={size} className={className} />;
}
