"use client"

import { useEffect } from "react"

export function useFontReset() {
  useEffect(() => {
    // Apply font reset to ensure consistency
    document.documentElement.style.setProperty("--font-family", "var(--font-inter)")

    // Force all elements to use the Inter font
    const elements = document.querySelectorAll("*")
    elements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.fontFamily = "var(--font-inter)"
      }
    })

    // Apply consistent font weights
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    headings.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.fontWeight = "300"
      }
    })

    const textElements = document.querySelectorAll("p, span, div, button, input, textarea, select, label")
    textElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.fontWeight = "300"
      }
    })
  }, [])
}

export function FontReset() {
  useFontReset()
  return null
}
