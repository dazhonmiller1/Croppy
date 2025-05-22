"use client"

import type React from "react"

import { useEffect } from "react"
import { usePricingModal } from "@/hooks/use-pricing-modal"
import { PricingModal } from "@/components/pricing-modal"

export function PricingModalProvider({ children }: { children: React.ReactNode }) {
  const { setIsOpen } = usePricingModal()

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("croppy-pricing-modal-seen")
    if (!hasSeenModal) {
      setIsOpen(true)
    }
  }, [setIsOpen])

  return (
    <>
      {children}
      <PricingModal />
    </>
  )
}
