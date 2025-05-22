"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ChevronLeft, ChevronRight, Crosshair, Edit, Plus, Settings, Sparkles, Trash2, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { motion } from "framer-motion"

type CropType = {
  id: string
  name: string
  ratio: string
  size: string
}

type FocalPoint = {
  x: number
  y: number
}

export default function CropPage() {
  const [currentImage, setCurrentImage] = useState(0)
  const [selectedCrop, setSelectedCrop] = useState("hero")
  const [focalPoint, setFocalPoint] = useState<FocalPoint>({ x: 50, y: 50 })
  const [adjustingFocalPoint, setAdjustingFocalPoint] = useState(false)
  const [useAI, setUseAI] = useState(true)
  const [aiProcessing, setAiProcessing] = useState(false)
  const [aiDetectedPoints, setAiDetectedPoints] = useState<Record<string, FocalPoint>>({
    hero: { x: 35, y: 42 },
    banner: { x: 30, y: 45 },
    thumbnail: { x: 45, y: 50 },
    square: { x: 50, y: 48 },
    mobile: { x: 52, y: 40 },
  })
  const [approvedCrops, setApprovedCrops] = useState<Record<string, string[]>>({
    "image-1.jpg": ["hero", "banner"],
    "image-2.jpg": ["square"],
    "image-3.jpg": [],
  })
  const [cropTypes, setCropTypes] = useState<CropType[]>([
    { id: "hero", name: "Hero", ratio: "16:9", size: "1920×1080px" },
    { id: "banner", name: "Banner", ratio: "21:9", size: "2100×900px" },
    { id: "thumbnail", name: "Thumbnail", ratio: "4:3", size: "400×300px" },
    { id: "square", name: "Square", ratio: "1:1", size: "1080×1080px" },
    { id: "mobile", name: "Mobile", ratio: "9:16", size: "1080×1920px" },
  ])
  const [newCrop, setNewCrop] = useState<CropType>({ id: "", name: "", ratio: "", size: "" })
  const [editingCrop, setEditingCrop] = useState<CropType | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const images = ["image-1.jpg", "image-2.jpg", "image-3.jpg"]

  // Simulate AI processing when toggling AI mode or changing images
  useEffect(() => {
    if (useAI) {
      setAiProcessing(true)
      const timer = setTimeout(() => {
        // Simulate AI generating slightly different focal points for each image
        const imageOffset = currentImage * 5
        setAiDetectedPoints({
          hero: { x: 35 + imageOffset, y: 42 - imageOffset },
          banner: { x: 30 + imageOffset, y: 45 - imageOffset },
          thumbnail: { x: 45 + imageOffset, y: 50 - imageOffset },
          square: { x: 50 + imageOffset, y: 48 - imageOffset },
          mobile: { x: 52 + imageOffset, y: 40 - imageOffset },
        })
        setAiProcessing(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [useAI, currentImage])

  // Update focal point when AI detects a new point or when crop type changes
  useEffect(() => {
    if (useAI && aiDetectedPoints[selectedCrop]) {
      setFocalPoint(aiDetectedPoints[selectedCrop])
    }
  }, [selectedCrop, useAI, aiDetectedPoints])

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const toggleCropApproval = (cropId: string) => {
    const currentImageName = images[currentImage]
    const currentApprovals = approvedCrops[currentImageName] || []

    if (currentApprovals.includes(cropId)) {
      setApprovedCrops({
        ...approvedCrops,
        [currentImageName]: currentApprovals.filter((id) => id !== cropId),
      })
    } else {
      setApprovedCrops({
        ...approvedCrops,
        [currentImageName]: [...currentApprovals, cropId],
      })
    }
  }

  const isCropApproved = (cropId: string) => {
    const currentImageName = images[currentImage]
    return (approvedCrops[currentImageName] || []).includes(cropId)
  }

  const toggleFocalPointAdjustment = () => {
    if (adjustingFocalPoint) {
      // If we're turning off adjustment, disable AI mode
      setAdjustingFocalPoint(false)
    } else {
      setAdjustingFocalPoint(true)
      setUseAI(false) // Turn off AI when manually adjusting
    }
  }

  const handleFocalPointChange = (values: number[]) => {
    setFocalPoint({ x: values[0], y: values[1] })
  }

  const handleAddCrop = () => {
    if (newCrop.id && newCrop.name && newCrop.ratio && newCrop.size) {
      setCropTypes([...cropTypes, { ...newCrop }])
      setNewCrop({ id: "", name: "", ratio: "", size: "" })
      setIsDialogOpen(false)
    }
  }

  const handleEditCrop = () => {
    if (editingCrop && editingCrop.id && editingCrop.name && editingCrop.ratio && editingCrop.size) {
      setCropTypes(cropTypes.map((crop) => (crop.id === editingCrop.id ? editingCrop : crop)))
      setEditingCrop(null)
      setIsDialogOpen(false)
    }
  }

  const handleDeleteCrop = (id: string) => {
    setCropTypes(cropTypes.filter((crop) => crop.id !== id))
    // Also remove from approvals
    const newApprovals: Record<string, string[]> = {}
    Object.keys(approvedCrops).forEach((imageName) => {
      newApprovals[imageName] = approvedCrops[imageName].filter((cropId) => cropId !== id)
    })
    setApprovedCrops(newApprovals)
  }

  const openEditDialog = (crop: CropType) => {
    setEditingCrop({ ...crop })
    setIsDialogOpen(true)
  }

  const openAddDialog = () => {
    setEditingCrop(null)
    setNewCrop({ id: "", name: "", ratio: "", size: "" })
    setIsDialogOpen(true)
  }

  const toggleAI = () => {
    setUseAI(!useAI)
    if (!useAI) {
      // If turning on AI, turn off manual adjustment
      setAdjustingFocalPoint(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light tracking-tight">Smart Cropping</h1>
          <p className="text-muted-foreground">Review and approve auto-generated crops</p>
        </div>
        <Button onClick={openAddDialog} className="gap-2 whitespace-nowrap">
          <Settings className="h-4 w-4" />
          Manage Crop Sizes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-normal">Original Image</CardTitle>
                <CardDescription>
                  {images[currentImage]} • {currentImage + 1} of {images.length}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePrevImage}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNextImage}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-muted-foreground">Original Image Preview</div>
              </div>

              {/* Only show the focal point for the currently selected crop */}
              {useAI && !aiProcessing && (
                <div
                  className="absolute w-8 h-8 border-2 border-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-100 transition-all"
                  style={{
                    left: `${aiDetectedPoints[selectedCrop]?.x || 50}%`,
                    top: `${aiDetectedPoints[selectedCrop]?.y || 50}%`,
                  }}
                >
                  <Crosshair className="absolute inset-0 m-auto h-4 w-4 text-primary" />
                </div>
              )}

              {/* Manual Focal Point (visible when adjusting) */}
              {adjustingFocalPoint && (
                <div className="absolute inset-0 cursor-crosshair">
                  <div
                    className="absolute w-12 h-12 border-2 border-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${focalPoint.x}%`,
                      top: `${focalPoint.y}%`,
                    }}
                  >
                    <Crosshair className="absolute inset-0 m-auto h-6 w-6 text-primary" />
                  </div>
                </div>
              )}

              {/* AI Processing Indicator */}
              {aiProcessing && (
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                    <p className="text-sm font-medium">AI analyzing image...</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center space-x-2">
                  <Switch id="ai-mode" checked={useAI} onCheckedChange={toggleAI} disabled={adjustingFocalPoint} />
                  <Label htmlFor="ai-mode" className="flex items-center gap-1">
                    <Sparkles className="h-4 w-4 text-primary" />
                    AI Focal Point Detection
                  </Label>
                </div>
              </div>

              <Button
                variant={adjustingFocalPoint ? "default" : "outline"}
                onClick={toggleFocalPointAdjustment}
                className="gap-2 w-full sm:w-auto"
                disabled={useAI && aiProcessing}
              >
                <Crosshair className="h-4 w-4" />
                {adjustingFocalPoint ? "Save Focal Point" : "Manual Adjustment"}
              </Button>
            </div>

            {adjustingFocalPoint && (
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-sm">X: {focalPoint.x}%</span>
                  <span className="text-sm">Y: {focalPoint.y}%</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Slider
                    value={[focalPoint.x]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(values) => setFocalPoint({ ...focalPoint, x: values[0] })}
                  />
                  <Slider
                    value={[focalPoint.y]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(values) => setFocalPoint({ ...focalPoint, y: values[0] })}
                  />
                </div>
              </div>
            )}
          </CardFooter>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-normal">Crop Versions</CardTitle>
            <CardDescription>Review and approve each crop</CardDescription>
          </CardHeader>
          <CardContent className="p-0 flex flex-col">
            <Tabs defaultValue={selectedCrop} onValueChange={setSelectedCrop}>
              <ScrollArea className="w-full">
                <TabsList className="w-full justify-start rounded-none px-6">
                  {cropTypes.map((crop) => (
                    <TabsTrigger key={crop.id} value={crop.id} className="relative">
                      {crop.name}
                      {isCropApproved(crop.id) && (
                        <Badge
                          variant="default"
                          className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center"
                        >
                          <Check className="h-2.5 w-2.5" />
                        </Badge>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>

              <ScrollArea className="h-[600px]">
                {cropTypes.map((crop) => (
                  <TabsContent key={crop.id} value={crop.id} className="m-0 p-0">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="p-6 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{crop.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {crop.ratio} • {crop.size}
                          </p>
                        </div>
                        <Button
                          variant={isCropApproved(crop.id) ? "default" : "outline"}
                          size="sm"
                          className="gap-1"
                          onClick={() => toggleCropApproval(crop.id)}
                        >
                          {isCropApproved(crop.id) ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              Approved
                            </>
                          ) : (
                            "Approve"
                          )}
                        </Button>
                      </div>

                      <div
                        className="bg-muted rounded-md overflow-hidden flex items-center justify-center relative h-[280px]"
                        style={{ aspectRatio: crop.ratio.replace(":", "/") }}
                      >
                        <div className="text-muted-foreground">{crop.name} Preview</div>

                        {/* Show focal point indicator in crop preview - only for the current crop */}
                        {useAI && !aiProcessing && (
                          <div
                            className="absolute w-6 h-6 border-2 border-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                              left: `${aiDetectedPoints[crop.id]?.x || 50}%`,
                              top: `${aiDetectedPoints[crop.id]?.y || 50}%`,
                            }}
                          >
                            <Crosshair className="absolute inset-0 m-auto h-3 w-3 text-primary" />
                          </div>
                        )}

                        {!useAI && (
                          <div
                            className="absolute w-6 h-6 border-2 border-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                              left: `${focalPoint.x}%`,
                              top: `${focalPoint.y}%`,
                            }}
                          >
                            <Crosshair className="absolute inset-0 m-auto h-3 w-3 text-primary" />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit className="h-3.5 w-3.5" />
                          Manual Adjust
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-destructive hover:text-destructive"
                          onClick={() => toggleCropApproval(crop.id)}
                          disabled={!isCropApproved(crop.id)}
                        >
                          <X className="h-3.5 w-3.5" />
                          Reject
                        </Button>
                      </div>
                    </motion.div>
                    <Separator />
                  </TabsContent>
                ))}
              </ScrollArea>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between mt-auto border-t">
            <Button variant="outline">Back</Button>
            <Button>Continue to Export</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Manage Crop Sizes Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="font-normal">{editingCrop ? "Edit Crop Size" : "Manage Crop Sizes"}</DialogTitle>
            <DialogDescription>
              {editingCrop
                ? "Edit the details for this crop size."
                : "Add, edit, or remove crop sizes for your team's workflow."}
            </DialogDescription>
          </DialogHeader>

          {!editingCrop && (
            <div className="max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Ratio</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cropTypes.map((crop) => (
                    <TableRow key={crop.id}>
                      <TableCell className="font-medium">{crop.name}</TableCell>
                      <TableCell>{crop.ratio}</TableCell>
                      <TableCell>{crop.size}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openEditDialog(crop)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteCrop(crop.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {editingCrop ? (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingCrop.name}
                  onChange={(e) => setEditingCrop({ ...editingCrop, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-ratio" className="text-right">
                  Ratio
                </Label>
                <Input
                  id="edit-ratio"
                  value={editingCrop.ratio}
                  onChange={(e) => setEditingCrop({ ...editingCrop, ratio: e.target.value })}
                  placeholder="e.g., 16:9"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-size" className="text-right">
                  Size
                </Label>
                <Input
                  id="edit-size"
                  value={editingCrop.size}
                  onChange={(e) => setEditingCrop({ ...editingCrop, size: e.target.value })}
                  placeholder="e.g., 1920×1080px"
                  className="col-span-3"
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newCrop.name}
                  onChange={(e) =>
                    setNewCrop({
                      ...newCrop,
                      name: e.target.value,
                      id: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    })
                  }
                  placeholder="e.g., Instagram Post"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ratio" className="text-right">
                  Ratio
                </Label>
                <Input
                  id="ratio"
                  value={newCrop.ratio}
                  onChange={(e) => setNewCrop({ ...newCrop, ratio: e.target.value })}
                  placeholder="e.g., 16:9"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="size" className="text-right">
                  Size
                </Label>
                <Input
                  id="size"
                  value={newCrop.size}
                  onChange={(e) => setNewCrop({ ...newCrop, size: e.target.value })}
                  placeholder="e.g., 1920×1080px"
                  className="col-span-3"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            {editingCrop ? (
              <Button onClick={handleEditCrop}>Save Changes</Button>
            ) : (
              <Button onClick={handleAddCrop} className="gap-1">
                <Plus className="h-4 w-4" />
                Add Crop Size
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
