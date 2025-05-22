"use client"

import { create } from "zustand"

interface PricingModalState {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  selectedPlan: string | null
  setSelectedPlan: (plan: string | null) => void
}

export const usePricingModal = create<PricingModalState>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
  selectedPlan: null,
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
}))
