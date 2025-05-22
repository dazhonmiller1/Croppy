"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button variant="outline" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </Button>
  )
}
