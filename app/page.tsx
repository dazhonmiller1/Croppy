"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, ImageIcon, Upload } from "lucide-react"
import { CropIcon } from "@/components/crop-icon"
import { ActionButton } from "@/components/action-button"

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-light tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to croppy. Manage your image workflows efficiently.</p>
        </div>
        <ActionButton href="/upload" icon={Upload}>
          Upload Images
        </ActionButton>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-light">Total Images</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light">1,248</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-light">Pending Crops</CardTitle>
            <CropIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light">24</div>
            <p className="text-xs text-muted-foreground">8 new since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-light">Exports</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light">573</div>
            <p className="text-xs text-muted-foreground">+42 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-light">Usage</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light">89%</div>
            <p className="text-xs text-muted-foreground">Of monthly quota</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-light">Recent Activity</CardTitle>
            <CardDescription>Your team's image processing activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-light leading-none">product-image-{i}.jpg</p>
                    <p className="text-xs text-muted-foreground">
                      Processed • 5 crops • {i} hour{i !== 1 ? "s" : ""} ago
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-light">Quick Actions</CardTitle>
            <CardDescription>Common tasks and workflows</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ActionButton href="/upload" icon={Upload} variant="outline" className="w-full justify-start">
              Upload New Images
            </ActionButton>
            <ActionButton href="/crop" icon={CropIcon} variant="outline" className="w-full justify-start">
              Review Pending Crops
            </ActionButton>
            <ActionButton href="/usage" icon={BarChart3} variant="outline" className="w-full justify-start">
              View Usage Reports
            </ActionButton>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

