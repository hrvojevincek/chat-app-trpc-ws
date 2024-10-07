import { useTheme } from "next-themes";

export function useThemeToggle() {
  const { setTheme } = useTheme();

  const toggleTheme = (theme: "light" | "dark") => {
    setTheme(theme);
  };

  return toggleTheme;
}
