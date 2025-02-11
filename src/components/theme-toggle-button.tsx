"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggleButton({ isCollapsed }: { isCollapsed: boolean }) {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`w-full rounded-lg gap-3 px-7 py-2.5 text-lg font-medium stext-muted-foreground hover:bg-secondary hover:text-primary focus:bg-secondary focus:text-primary focus:outline-none transition-colors flex items-center ${
        isCollapsed ? "justify-center" : "text-left gap-2"
      }`}
    >
      <div className="flex-shrink-0 w-8 h-8 relative">
        <Sun className="h-8 w-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute top-0 h-8 w-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
      {!isCollapsed && <span>Toggle theme</span>}
    </button>
  );
}
