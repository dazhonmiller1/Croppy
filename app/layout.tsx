import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AbstractBackground } from "@/components/abstract-background"
import { MotionProvider } from "@/components/motion-provider"
import { PricingModalProvider } from "@/components/pricing-modal-provider"
import { FontReset } from "@/lib/font-reset"
import { SidebarProvider } from "@/components/sidebar-context"

// Load Inter with all weights we need
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "croppy",
  description: "Smart image cropping, tagging, and tracking workflows",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <MotionProvider>
            <PricingModalProvider>
              <SidebarProvider>
                <FontReset />
                <AbstractBackground />
                <div className="flex h-screen overflow-hidden">
                  <Sidebar />
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
                  </div>
                </div>
              </SidebarProvider>
            </PricingModalProvider>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
