"use client";

import ThemeContext from "@/context/ThemeContext";
import { ReactNode, useEffect, useState } from "react";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <html className={theme} lang="vi">
        {children}
      </html>
    </ThemeContext.Provider>
  );
};
