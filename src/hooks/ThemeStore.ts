import { useContext } from "react";
import { ThemeProviderContext } from "@/providers/theme-provider";

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeProviderContext);
  console.log(theme);
  return {
    theme,
    setTheme,
  };
};
