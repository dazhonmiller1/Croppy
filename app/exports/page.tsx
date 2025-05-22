"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileDown, HardDriveIcon, DropletsIcon as DropboxIcon } from "lucide-react"

export default function ExportsPage() {
  const [fileFormat, setFileFormat] = useState("jpg")
  const [namingConvention, setNamingConvention] = useState("original")
  const [exportDestination, setExportDestination] = useState("download")
  const [selectedCrops, setSelectedCrops] = useState<string[]>(["hero", "thumbnail", "square"])
  const [selectedDam, setSelectedDam] = useState<string>("none")

  const handleCropToggle = (cropId: string) => {
    if (selectedCrops.includes(cropId)) {
      setSelectedCrops(selectedCrops.filter((id) => id !== cropId))
    } else {
      setSelectedCrops([...selectedCrops, cropId])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-light tracking-tight">Export + Delivery</h1>
        <p className="text-muted-foreground">Configure export settings and delivery options</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Export Settings</CardTitle>
              <CardDescription>Configure file formats and naming conventions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>File Format</Label>
                  <RadioGroup defaultValue={fileFormat} onValueChange={setFileFormat} className="flex gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="jpg" id="jpg" />
                      <Label htmlFor="jpg" className="cursor-pointer">
                        JPG
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="png" id="png" />
                      <Label htmlFor="png" className="cursor-pointer">
                        PNG
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="webp" id="webp" />
                      <Label htmlFor="webp" className="cursor-pointer">
                        WebP
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quality">Quality</Label>
                  <Select defaultValue="90">
                    <SelectTrigger id="quality">
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100">Maximum (100%)</SelectItem>
                      <SelectItem value="90">High (90%)</SelectItem>
                      <SelectItem value="80">Medium (80%)</SelectItem>
                      <SelectItem value="70">Low (70%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Naming Convention</Label>
                  <RadioGroup
                    defaultValue={namingConvention}
                    onValueChange={setNamingConvention}
                    className="space-y-2 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="original" id="original" />
                      <Label htmlFor="original" className="cursor-pointer">
                        Original filename + crop type (image-1-hero.jpg)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom" className="cursor-pointer">
                        Custom prefix + sequence number
                      </Label>
                    </div>
                  </RadioGroup>

                  {namingConvention === "custom" && (
                    <div className="mt-2 pl-6">
                      <div className="flex gap-2">
                        <Input placeholder="Prefix (e.g., product)" />
                        <Select defaultValue="dash">
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Separator" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dash">Dash (-)</SelectItem>
                            <SelectItem value="underscore">Underscore (_)</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Options</CardTitle>
              <CardDescription>Choose where to deliver your exported images</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={exportDestination} onValueChange={setExportDestination}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="download">Download ZIP</TabsTrigger>
                  <TabsTrigger value="drive">Google Drive</TabsTrigger>
                  <TabsTrigger value="dropbox">Dropbox</TabsTrigger>
                  <TabsTrigger value="dam">DAM API</TabsTrigger>
                </TabsList>
                <TabsContent value="download" className="space-y-4 pt-4">
                  <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg">
                    <div className="text-center">
                      <FileDown className="mx-auto h-10 w-10 text-muted-foreground" />
                      <h3 className="mt-2 text-lg font-medium">Download as ZIP</h3>
                      <p className="text-sm text-muted-foreground">All selected crops will be packaged in a ZIP file</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="drive" className="space-y-4 pt-4">
                  <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg">
                    <div className="text-center">
                      <HardDriveIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                      <h3 className="mt-2 text-lg font-medium">Export to Google Drive</h3>
                      <p className="text-sm text-muted-foreground">Connect your Google Drive account</p>
                      <Button className="mt-4">Connect Google Drive</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="dropbox" className="space-y-4 pt-4">
                  <div className="flex items-center justify-center p-6 border-2 border-dashed rounded-lg">
                    <div className="text-center">
                      <DropboxIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                      <h3 className="mt-2 text-lg font-medium">Export to Dropbox</h3>
                      <p className="text-sm text-muted-foreground">Connect your Dropbox account</p>
                      <Button className="mt-4">Connect Dropbox</Button>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="dam" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dam-system">Select DAM System</Label>
                      <Select value={selectedDam} onValueChange={setSelectedDam}>
                        <SelectTrigger id="dam-system">
                          <SelectValue placeholder="Select DAM system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Select a DAM system</SelectItem>
                          <SelectItem value="adobe">Adobe Experience Manager</SelectItem>
                          <SelectItem value="bynder">Bynder</SelectItem>
                          <SelectItem value="widen">Widen</SelectItem>
                          <SelectItem value="canto">Canto</SelectItem>
                          <SelectItem value="brandfolder">Brandfolder</SelectItem>
                          <SelectItem value="custom">Custom API</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {selectedDam !== "none" && (
                      <div className="space-y-4 border rounded-lg p-4">
                        {selectedDam === "custom" ? (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="api-endpoint">API Endpoint</Label>
                              <Input id="api-endpoint" placeholder="https://api.yourdamservice.com/v1/assets" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="api-key">API Key</Label>
                              <Input id="api-key" type="password" placeholder="Enter your API key" />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">
                                  {
                                    {
                                      adobe: "Adobe Experience Manager",
                                      bynder: "Bynder",
                                      widen: "Widen",
                                      canto: "Canto",
                                      brandfolder: "Brandfolder",
                                    }[selectedDam]
                                  }
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedDam === "adobe" || selectedDam === "bynder" ? "Connected" : "Not connected"}
                                </p>
                              </div>
                              <Button variant="outline" size="sm">
                                {selectedDam === "adobe" || selectedDam === "bynder" ? "Reconnect" : "Connect"}
                              </Button>
                            </div>

                            {(selectedDam === "adobe" || selectedDam === "bynder") && (
                              <div className="space-y-2 mt-4">
                                <Label htmlFor="dam-folder">Destination Folder</Label>
                                <Input id="dam-folder" placeholder="e.g., /marketing/campaigns/spring2025" />
                              </div>
                            )}
                          </>
                        )}

                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="include-metadata" />
                            <Label htmlFor="include-metadata">Include image metadata</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="create-folders" defaultChecked />
                            <Label htmlFor="create-folders">Create folders for each crop type</Label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Selected Crops</CardTitle>
              <CardDescription>Choose which crops to export</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: "hero", name: "Hero (16:9)", count: 3 },
                  { id: "banner", name: "Banner (21:9)", count: 2 },
                  { id: "thumbnail", name: "Thumbnail (4:3)", count: 3 },
                  { id: "square", name: "Square (1:1)", count: 3 },
                  { id: "mobile", name: "Mobile (9:16)", count: 1 },
                ].map((crop) => (
                  <div key={crop.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`crop-${crop.id}`}
                      checked={selectedCrops.includes(crop.id)}
                      onCheckedChange={() => handleCropToggle(crop.id)}
                    />
                    <Label
                      htmlFor={`crop-${crop.id}`}
                      className="flex-1 flex items-center justify-between cursor-pointer"
                    >
                      <span>{crop.name}</span>
                      <span className="text-sm text-muted-foreground">{crop.count} images</span>
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Summary</CardTitle>
              <CardDescription>Review your export settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">File Format:</span>
                  <span className="text-sm font-medium">{fileFormat.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Selected Crops:</span>
                  <span className="text-sm font-medium">{selectedCrops.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Files:</span>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Delivery Method:</span>
                  <span className="text-sm font-medium">
                    {exportDestination === "download"
                      ? "ZIP Download"
                      : exportDestination === "drive"
                        ? "Google Drive"
                        : exportDestination === "dropbox"
                          ? "Dropbox"
                          : "DAM API"}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full gap-2">
                <Download className="h-4 w-4" />
                Export Images
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
