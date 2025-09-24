"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

const ThemeContext = createContext({
  theme: "light",
  toggle: () => {},
})

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light")

  // initialize theme from system or localStorage
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null
    if (stored === "dark" || stored === "light") {
      setTheme(stored)
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
    }
  }, [])

  // apply to <html> element for Tailwind .dark styles
  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
    localStorage.setItem("theme", theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeToggleButton({ className = "" }) {
  const { theme, toggle } = useTheme()
  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className={`rounded-md px-3 py-2 bg-primary text-primary-foreground hover:opacity-90 transition ${className}`}
    >
      <span className="text-sm">{theme === "dark" ? "☀️ Light" : "🌙 Dark"}</span>
    </button>
  )
}
