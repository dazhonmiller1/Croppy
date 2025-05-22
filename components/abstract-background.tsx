"use client"

import { useEffect, useState } from "react"

export function AbstractBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-background" />

      {/* Large gradient blobs with parallax effect */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-200/30 to-purple-300/20 blur-3xl"
        style={{
          top: `calc(-400px + ${scrollY * -0.05}px)`,
          right: `calc(-200px + ${scrollY * 0.02}px)`,
        }}
      />

      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-300/20 to-purple-400/10 blur-3xl"
        style={{
          bottom: `calc(-300px + ${scrollY * 0.03}px)`,
          left: `calc(-100px + ${scrollY * -0.01}px)`,
        }}
      />

      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-100/20 to-purple-200/10 blur-3xl"
        style={{
          top: `calc(30% + ${scrollY * 0.02}px)`,
          left: `calc(60% + ${scrollY * -0.03}px)`,
        }}
      />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(139, 92, 246, 0.2),
              rgba(139, 92, 246, 0.2) 1px,
              transparent 1px,
              transparent 20px
            )
          `,
          transform: `translateY(${scrollY * -0.05}px)`,
        }}
      />

      {/* Small floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-purple-300/20 dark:bg-purple-400/20"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `translateY(${scrollY * (Math.random() * 0.1) * (i % 2 === 0 ? -1 : 1)}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      ))}

      {/* Radial gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background/70" />
    </div>
  )
}
