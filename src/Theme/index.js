import React from "react";

export const useTheme = () => {
  const isDarkTheme = window?.matchMedia("(prefers-color-scheme: dark)").matches
  const defaultTheme = isDarkTheme ? "dark" : "light";

  const [theme, setTheme] = React.useState(
    JSON.parse(localStorage.getItem("app-theme")) || defaultTheme
  );

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", JSON.stringify(theme));
  }, [theme]);

  return { theme, setTheme };
};