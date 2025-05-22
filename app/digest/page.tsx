"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, ImageIcon, Mail, X, Crop } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function DigestPage() {
  const [frequency, setFrequency] = useState("weekly")
  const [recipients, setRecipients] = useState([
    "john.doe@example.com",
    "alex.kim@example.com",
    "taylor.moore@example.com",
  ])
  const [newRecipient, setNewRecipient] = useState("")

  const addRecipient = () => {
    if (newRecipient && !recipients.includes(newRecipient)) {
      setRecipients([...recipients, newRecipient])
      setNewRecipient("")
    }
  }

  const removeRecipient = (email: string) => {
    setRecipients(recipients.filter((r) => r !== email))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addRecipient()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-light tracking-tight">Digest Email Settings</h1>
        <p className="text-muted-foreground">Configure automated email digests for image usage tracking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Digest Configuration</CardTitle>
              <CardDescription>Set up automated email reports for your team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>Digest Frequency</Label>
                  <RadioGroup defaultValue={frequency} onValueChange={setFrequency} className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly" className="cursor-pointer">
                        Weekly
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="biweekly" id="biweekly" />
                      <Label htmlFor="biweekly" className="cursor-pointer">
                        Biweekly
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly" className="cursor-pointer">
                        Monthly
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="send-day">Send On</Label>
                    <span className="text-sm text-muted-foreground">
                      {frequency === "weekly" ? "Every" : frequency === "biweekly" ? "Every other" : "First"}
                    </span>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                      <Button key={day} variant={i === 1 ? "default" : "outline"} className="h-10 w-full">
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {recipients.map((email) => (
                      <Badge key={email} variant="secondary" className="gap-1">
                        {email}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeRecipient(email)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      id="recipients"
                      placeholder="Add email address"
                      value={newRecipient}
                      onChange={(e) => setNewRecipient(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    <Button onClick={addRecipient}>Add</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Digest Content</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="include-usage" defaultChecked />
                      <Label htmlFor="include-usage">Include image usage statistics</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="include-new" defaultChecked />
                      <Label htmlFor="include-new">Include new uploads</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="include-pending" defaultChecked />
                      <Label htmlFor="include-pending">Include pending approvals</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="include-team" defaultChecked />
                      <Label htmlFor="include-team">Include team activity</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Digest Preview</CardTitle>
              <CardDescription>Preview your upcoming digest email</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border rounded-md mx-4 mb-4 overflow-hidden">
                <div className="bg-muted p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Crop className="h-5 w-5 text-primary" />
                        <span className="font-bold">AutoCropFlow</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Apr 13, 2025</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold">Weekly Image Digest</h3>
                    <p className="text-sm text-muted-foreground">Your weekly summary of image activity</p>
                  </div>
                </div>

                <ScrollArea className="h-[400px]">
                  <div className="p-4 space-y-6">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">New Uploads</h4>
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                              <ImageIcon className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">product-image-{i}.jpg</p>
                              <p className="text-xs text-muted-foreground">Uploaded by Alex Kim • 2 days ago</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Usage Statistics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-md border p-3">
                          <div className="text-2xl font-bold">24</div>
                          <p className="text-xs text-muted-foreground">Images Used</p>
                        </div>
                        <div className="rounded-md border p-3">
                          <div className="text-2xl font-bold">8</div>
                          <p className="text-xs text-muted-foreground">Team Members Active</p>
                        </div>
                        <div className="rounded-md border p-3">
                          <div className="text-2xl font-bold">12</div>
                          <p className="text-xs text-muted-foreground">Pending Approvals</p>
                        </div>
                        <div className="rounded-md border p-3">
                          <div className="text-2xl font-bold">5</div>
                          <p className="text-xs text-muted-foreground">Projects Updated</p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Team Activity</h4>
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                              <AvatarFallback>{["JD", "AK", "TM"][i - 1]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{["John Doe", "Alex Kim", "Taylor Moore"][i - 1]}</p>
                              <p className="text-xs text-muted-foreground">
                                {
                                  ["Uploaded 5 new images", "Approved 12 crops", "Exported 8 images to Google Drive"][
                                    i - 1
                                  ]
                                }
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2">
                <Mail className="h-4 w-4" />
                Send Test Email
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
