import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

const ThemeToggle = ({ showLabel = false, className = "" }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/80 px-3 py-2 text-xs font-semibold text-foreground shadow-card transition-all hover:border-primary hover:text-primary ${className}`}
    >
      {isDark ? <SunMedium size={15} /> : <Moon size={15} />}
      {showLabel && <span>{isDark ? "Light" : "Dark"} mode</span>}
    </button>
  );
};

export default ThemeToggle;