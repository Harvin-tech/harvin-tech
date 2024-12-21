'use client'
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents SSR mismatches

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed cursor-pointer bottom-8 right-8 m-0 z-[9999] group"
      aria-label="Toggle theme"
    >
      <div className="relative p-2 rounded-xl bg-white dark:bg-gray-800 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transform transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-lg backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
        <div className="relative">
          {/* Moon */}
          <div
            className={`w-5 h-5 dark:opacity-0 transition-all duration-500 scale-50 rotate-90 absolute top-0 dark:rotate-0`}
          >
            🌙
          </div>
          {/* Sun */}
          <div
            className={`w-5 h-5 text-blue-500 transition-all duration-500 rotate-90 scale-0 absolute top-0 dark:rotate-0`}
          >
            ☀️
          </div>
        </div>
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-200 to-amber-100 dark:from-blue-200 dark:to-blue-300 
        opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
        />
      </div>
    </button>
  );
}
