"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Crop, Upload, PackageOpen, BarChart3, Mail, Settings, Home, ChevronLeft, ChevronRight } from "lucide-react"
import { useSidebar } from "@/components/sidebar-context"

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    title: "Upload",
    icon: Upload,
    href: "/upload",
  },
  {
    title: "Crop",
    icon: Crop,
    href: "/crop",
  },
  {
    title: "Exports",
    icon: PackageOpen,
    href: "/exports",
  },
  {
    title: "Usage",
    icon: BarChart3,
    href: "/usage",
  },
  {
    title: "Digest",
    icon: Mail,
    href: "/digest",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { collapsed, setCollapsed } = useSidebar()

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-card border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-border">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="relative h-6 w-6 flex-shrink-0">
            <Crop className="h-6 w-6 text-primary" />
            {/* Smiley face in the middle of the crop icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2.5 w-2.5 rounded-full bg-white flex items-center justify-center">
                <div className="h-2 w-2 rounded-full flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="flex space-x-0.5">
                      <div className="h-0.5 w-0.5 rounded-full bg-primary"></div>
                      <div className="h-0.5 w-0.5 rounded-full bg-primary"></div>
                    </div>
                    <div className="h-[1px] w-1 mt-[1px] border-b border-primary rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!collapsed && <span className="text-xl font-light whitespace-nowrap">croppy</span>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center px-2 py-2 text-sm font-light rounded-md group",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className={cn("h-5 w-5 flex-shrink-0", collapsed ? "mx-auto" : "mr-3")} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="w-full flex justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
