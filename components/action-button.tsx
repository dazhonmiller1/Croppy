"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface ActionButtonProps extends ButtonProps {
  href: string
  icon?: LucideIcon
}

export function ActionButton({ href, icon: Icon, className, children, ...props }: ActionButtonProps) {
  return (
    <Link href={href} className="contents">
      <Button className={cn("gap-2", className)} {...props}>
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </Button>
    </Link>
  )
}
