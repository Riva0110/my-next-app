"use client";

import { createContext, ReactNode } from "react";

interface ThemeContextType {
  buttonColor: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme: ThemeContextType = {
    buttonColor: "#8A2BE2", // Purple color
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export { ThemeContext }; // Changed to named export
