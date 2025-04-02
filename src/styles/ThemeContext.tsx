"use client";

import { createContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactNode } from "react";

export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export default function ThemeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#1E3A8A",
      },
      secondary: {
        main: "#0F9D58",
      },
      background: {
        default: "#F0F0F0",
        paper: "#FFFFFF",
      },
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ darkMode: false, toggleDarkMode: () => {} }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
