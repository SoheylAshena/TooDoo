import { useEffect, useState } from "react";

/**
 * Custom hook for managing theme (dark/light mode)
 * @returns {Object} - Theme state and functions to manipulate it
 */
export default function useTheme() {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme;
      }

      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      return prefersDark ? "dark" : "light";
    }
    return "light"; // Default to light for SSR
  });

  // Update class and localStorage when theme changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;

      // Remove both classes first
      root.classList.remove("dark", "light");

      // Add appropriate class
      root.classList.add(theme);

      // Save to localStorage
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Set theme explicitly
  const setThemeExplicitly = (newTheme) => {
    if (newTheme === "dark" || newTheme === "light") {
      setTheme(newTheme);
    }
  };

  return {
    theme,
    toggleTheme,
    setTheme: setThemeExplicitly,
    isDarkMode: theme === "dark",
  };
}
