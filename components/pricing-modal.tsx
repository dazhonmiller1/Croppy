"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import { CropIcon } from "@/components/crop-icon"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { usePricingModal } from "@/hooks/use-pricing-modal"

type PricingOption = "trial" | "freemium"
type PricingTier = "free" | "starter" | "pro" | "team" | "enterprise"

export function PricingModal() {
  const { isOpen, setIsOpen, selectedPlan, setSelectedPlan } = usePricingModal()
  const [pricingOption, setPricingOption] = useState<PricingOption>("trial")
  const [selectedTier, setSelectedTier] = useState<PricingTier>("free")

  const handleClose = () => {
    localStorage.setItem("croppy-pricing-modal-seen", "true")
    setIsOpen(false)
  }

  const handleSelectTier = (tier: PricingTier) => {
    setSelectedTier(tier)
  }

  const handleContinue = () => {
    setSelectedPlan(selectedTier)
    handleClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[800px] md:max-w-[900px] p-0 gap-0 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col">
          {/* Header */}
          <div className="bg-primary/10 p-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CropIcon className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-2xl font-light">Welcome to croppy</h2>
                <p className="text-sm text-muted-foreground">Choose how you'd like to get started</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Option Selector */}
          <Tabs
            defaultValue={pricingOption}
            onValueChange={(value) => setPricingOption(value as PricingOption)}
            className="w-full"
          >
            <div className="px-6 pt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="trial">Free Trial</TabsTrigger>
                <TabsTrigger value="freemium">Freemium</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="trial" className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-light mb-2">14-Day Free Trial</h3>
                <p className="text-muted-foreground">Experience all features for 14 days. No credit card required.</p>
              </div>
            </TabsContent>

            <TabsContent value="freemium" className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-light mb-2">Free Forever Plan</h3>
                <p className="text-muted-foreground">
                  5 free uploads/crops per month. Upgrade anytime for more features.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 pt-0">
            {/* Starter */}
            <Card
              className={`cursor-pointer transition-all ${selectedTier === "starter" ? "ring-2 ring-primary" : ""}`}
              onClick={() => handleSelectTier("starter")}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-light">Starter</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-light">$19</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <CardDescription>For freelancers and individuals</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>50 image crops/month</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>3 preset export sizes</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Manual metadata input</span>
                  </li>
                  <li className="flex items-center opacity-50">
                    <X className="h-4 w-4 mr-2" />
                    <span>No DAM integration</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={selectedTier === "starter" ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleSelectTier("starter")}
                >
                  {selectedTier === "starter" ? "Selected" : "Select"}
                </Button>
              </CardFooter>
            </Card>

            {/* Pro */}
            <Card
              className={`cursor-pointer transition-all ${selectedTier === "pro" ? "ring-2 ring-primary" : ""}`}
              onClick={() => handleSelectTier("pro")}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-light">Pro</CardTitle>
                  <Badge variant="secondary">Popular</Badge>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-light">$79</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <CardDescription>For small marketing teams</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Unlimited image crops</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Custom export presets</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Auto-metadata generation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>1 DAM integration</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={selectedTier === "pro" ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleSelectTier("pro")}
                >
                  {selectedTier === "pro" ? "Selected" : "Select"}
                </Button>
              </CardFooter>
            </Card>

            {/* Team */}
            <Card
              className={`cursor-pointer transition-all ${selectedTier === "team" ? "ring-2 ring-primary" : ""}`}
              onClick={() => handleSelectTier("team")}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-light">Team</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-light">$249</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <CardDescription>For mid-size creative teams</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Everything in Pro, plus:</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Multi-user access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Multiple DAM integrations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Role-based permissions</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={selectedTier === "team" ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleSelectTier("team")}
                >
                  {selectedTier === "team" ? "Selected" : "Select"}
                </Button>
              </CardFooter>
            </Card>

            {/* Enterprise */}
            <Card
              className={`cursor-pointer transition-all ${selectedTier === "enterprise" ? "ring-2 ring-primary" : ""}`}
              onClick={() => handleSelectTier("enterprise")}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-light">Enterprise</CardTitle>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-light">Custom</span>
                </div>
                <CardDescription>For large organizations</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Everything in Team, plus:</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>On-premise hosting</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>SSO/SAML support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  variant={selectedTier === "enterprise" ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleSelectTier("enterprise")}
                >
                  {selectedTier === "enterprise" ? "Selected" : "Select"}
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Add padding to prevent content from being hidden behind the footer */}
          <div className="pb-4"></div>

          {/* Footer */}
          <div className="border-t p-6 flex justify-between items-center sticky bottom-0 bg-background">
            <Button variant="ghost" onClick={handleClose}>
              Skip for now
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClose}>
                Learn more
              </Button>
              <Button onClick={handleContinue}>{selectedTier === "enterprise" ? "Contact Sales" : "Continue"}</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
