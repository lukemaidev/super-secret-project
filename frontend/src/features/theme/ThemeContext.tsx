import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { ConfigProvider, theme } from "antd";

type Mode = "light" | "dark";

interface ThemeContextValue {
  mode: Mode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "theme-mode";

const antTokens = {
  light: {
    colorPrimary: "#595F39",
    colorBgBase: "#E4E4DE",
    colorTextBase: "#1B1B1B",
    borderRadius: 8,
  },
  dark: {
    colorPrimary: "#7A8250",
    colorBgBase: "#1B1B1B",
    colorTextBase: "#E4E4DE",
    borderRadius: 8,
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  const toggleTheme = () => setMode((m) => (m === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ConfigProvider
        theme={{
          algorithm: mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: antTokens[mode],
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
