"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Download, ExternalLink, Filter, ImageIcon, Search, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ImageDetails = {
  id: number
  name: string
  user: {
    name: string
    avatar: string
    initials: string
  }
  project: string
  sizes: string[]
  uploadDate: string
  source: string
  usage: {
    views: number
    downloads: number
    shares: number
  }
  metadata: {
    dimensions: string
    fileSize: string
    fileType: string
    tags: string[]
  }
  exports: {
    date: string
    format: string
    size: string
    destination: string
  }[]
}

export default function UsagePage() {
  const [date, setDate] = useState<Date>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<ImageDetails | null>(null)

  const handleViewImage = (image: ImageDetails) => {
    setSelectedImage(image)
    setIsDialogOpen(true)
  }

  // Sample image data
  const images: ImageDetails[] = [
    {
      id: 1,
      name: "product-image-1.jpg",
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=24&width=24",
        initials: "JD",
      },
      project: "Marketing",
      sizes: ["Hero", "Banner", "Thumbnail"],
      uploadDate: "Apr 12, 2025",
      source: "Portfolio",
      usage: {
        views: 245,
        downloads: 32,
        shares: 18,
      },
      metadata: {
        dimensions: "3840 × 2160 px",
        fileSize: "2.4 MB",
        fileType: "JPEG",
        tags: ["product", "marketing", "featured", "hero"],
      },
      exports: [
        {
          date: "Apr 13, 2025",
          format: "JPG",
          size: "Hero (1920×1080)",
          destination: "Google Drive",
        },
        {
          date: "Apr 13, 2025",
          format: "WebP",
          size: "Thumbnail (400×300)",
          destination: "Website CMS",
        },
      ],
    },
    {
      id: 2,
      name: "product-image-2.jpg",
      user: {
        name: "Alex Kim",
        avatar: "/placeholder.svg?height=24&width=24",
        initials: "AK",
      },
      project: "Website",
      sizes: ["Banner", "Square"],
      uploadDate: "Apr 10, 2025",
      source: "Getty Images",
      usage: {
        views: 187,
        downloads: 24,
        shares: 9,
      },
      metadata: {
        dimensions: "4000 × 3000 px",
        fileSize: "3.1 MB",
        fileType: "JPEG",
        tags: ["website", "banner", "product"],
      },
      exports: [
        {
          date: "Apr 11, 2025",
          format: "PNG",
          size: "Banner (2100×900)",
          destination: "ZIP Download",
        },
      ],
    },
    {
      id: 3,
      name: "product-image-3.jpg",
      user: {
        name: "Taylor Moore",
        avatar: "/placeholder.svg?height=24&width=24",
        initials: "TM",
      },
      project: "Social Media",
      sizes: ["Square", "Thumbnail"],
      uploadDate: "Apr 8, 2025",
      source: "Shutterstock",
      usage: {
        views: 312,
        downloads: 47,
        shares: 28,
      },
      metadata: {
        dimensions: "2000 × 2000 px",
        fileSize: "1.8 MB",
        fileType: "JPEG",
        tags: ["social", "product", "campaign"],
      },
      exports: [
        {
          date: "Apr 9, 2025",
          format: "JPG",
          size: "Square (1080×1080)",
          destination: "DAM API",
        },
      ],
    },
    {
      id: 4,
      name: "product-image-4.jpg",
      user: {
        name: "Rachel Wong",
        avatar: "/placeholder.svg?height=24&width=24",
        initials: "RW",
      },
      project: "Email Campaign",
      sizes: ["Hero", "Thumbnail", "Mobile"],
      uploadDate: "Apr 5, 2025",
      source: "Internal",
      usage: {
        views: 178,
        downloads: 21,
        shares: 12,
      },
      metadata: {
        dimensions: "3200 × 1800 px",
        fileSize: "2.2 MB",
        fileType: "JPEG",
        tags: ["email", "campaign", "product"],
      },
      exports: [
        {
          date: "Apr 6, 2025",
          format: "JPG",
          size: "Hero (1920×1080)",
          destination: "Email Platform",
        },
        {
          date: "Apr 6, 2025",
          format: "JPG",
          size: "Mobile (9:16)",
          destination: "Email Platform",
        },
      ],
    },
    {
      id: 5,
      name: "product-image-5.jpg",
      user: {
        name: "Chris Lee",
        avatar: "/placeholder.svg?height=24&width=24",
        initials: "CL",
      },
      project: "Product Catalog",
      sizes: ["Square", "Thumbnail"],
      uploadDate: "Apr 3, 2025",
      source: "Unsplash",
      usage: {
        views: 203,
        downloads: 35,
        shares: 8,
      },
      metadata: {
        dimensions: "2400 × 2400 px",
        fileSize: "1.9 MB",
        fileType: "JPEG",
        tags: ["catalog", "product", "featured"],
      },
      exports: [
        {
          date: "Apr 4, 2025",
          format: "PNG",
          size: "Square (1080×1080)",
          destination: "ZIP Download",
        },
      ],
    },
    {
      id: 6,
      name: "product-image-6.jpg",
      user: {
        name: "Sam Brown",
        avatar: "/placeholder.svg?height=24&width=24",
        initials: "SB",
      },
      project: "Print Materials",
      sizes: ["Banner", "Hero"],
      uploadDate: "Mar 29, 2025",
      source: "Adobe Stock",
      usage: {
        views: 156,
        downloads: 19,
        shares: 5,
      },
      metadata: {
        dimensions: "4500 × 3000 px",
        fileSize: "4.2 MB",
        fileType: "JPEG",
        tags: ["print", "high-resolution", "product"],
      },
      exports: [
        {
          date: "Mar 30, 2025",
          format: "TIFF",
          size: "Original (4500×3000)",
          destination: "ZIP Download",
        },
      ],
    },
    {
      id: 7,
      name: "product-image-7.jpg",
      user: {
        name: "Morgan Jones",
        avatar: "/placeholder.svg?height=24&width=24",
        initials: "MJ",
      },
      project: "Ads",
      sizes: ["Banner", "Square", "Mobile"],
      uploadDate: "Mar 25, 2025",
      source: "Custom",
      usage: {
        views: 289,
        downloads: 42,
        shares: 23,
      },
      metadata: {
        dimensions: "3600 × 1800 px",
        fileSize: "2.8 MB",
        fileType: "JPEG",
        tags: ["ads", "campaign", "product"],
      },
      exports: [
        {
          date: "Mar 26, 2025",
          format: "JPG",
          size: "Banner (21:9)",
          destination: "Ad Platform",
        },
        {
          date: "Mar 26, 2025",
          format: "JPG",
          size: "Square (1:1)",
          destination: "Ad Platform",
        },
      ],
    },
    {
      id: 8,
      name: "product-image-8.jpg",
      user: {
        name: "Kelly Park",
        avatar: "/placeholder.svg?height=24&width=24",
        initials: "KP",
      },
      project: "Blog",
      sizes: ["Hero", "Thumbnail"],
      uploadDate: "Mar 20, 2025",
      source: "Pexels",
      usage: {
        views: 176,
        downloads: 28,
        shares: 14,
      },
      metadata: {
        dimensions: "2800 × 1600 px",
        fileSize: "1.7 MB",
        fileType: "JPEG",
        tags: ["blog", "article", "featured"],
      },
      exports: [
        {
          date: "Mar 21, 2025",
          format: "WebP",
          size: "Hero (16:9)",
          destination: "CMS",
        },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-light tracking-tight">Image Usage Dashboard</h1>
        <p className="text-muted-foreground">Track and analyze how your images are being used</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="font-normal">Image Usage</CardTitle>
              <CardDescription>View and filter image usage across your organization</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search images..." className="pl-8 w-full sm:w-[200px] md:w-[300px]" />
              </div>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Calendar className="h-4 w-4" />
                      {date ? format(date, "MMM dd, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Used By</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Export Sizes</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {images.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell>
                      <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{image.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={image.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{image.user.initials}</AvatarFallback>
                        </Avatar>
                        <span>{image.user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{image.project}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {image.sizes.map((size) => (
                          <Badge key={size} variant="outline" className="text-xs">
                            {size}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{image.uploadDate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Badge variant="secondary" className="text-xs">
                          {image.source}
                        </Badge>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewImage(image)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>1-8</strong> of <strong>24</strong> images
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          {selectedImage && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl font-normal">{selectedImage.name}</DialogTitle>
                  <Button variant="ghost" size="icon" onClick={() => setIsDialogOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <DialogDescription>
                  Uploaded on {selectedImage.uploadDate} by {selectedImage.user.name}
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="details" className="mt-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="exports">Exports</TabsTrigger>
                  <TabsTrigger value="metadata">Metadata</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 pt-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="md:w-1/2 space-y-4">
                      <div>
                        <h3 className="text-sm font-medium">File Information</h3>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div className="text-sm text-muted-foreground">Dimensions</div>
                          <div className="text-sm">{selectedImage.metadata.dimensions}</div>
                          <div className="text-sm text-muted-foreground">File Size</div>
                          <div className="text-sm">{selectedImage.metadata.fileSize}</div>
                          <div className="text-sm text-muted-foreground">File Type</div>
                          <div className="text-sm">{selectedImage.metadata.fileType}</div>
                          <div className="text-sm text-muted-foreground">Source</div>
                          <div className="text-sm">{selectedImage.source}</div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium">Tags</h3>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {selectedImage.metadata.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium">Project</h3>
                        <p className="text-sm mt-1">{selectedImage.project}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="usage" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium">Views</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0">
                        <div className="text-2xl font-bold">{selectedImage.usage.views}</div>
                        <p className="text-xs text-muted-foreground">Last 30 days</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0">
                        <div className="text-2xl font-bold">{selectedImage.usage.downloads}</div>
                        <p className="text-xs text-muted-foreground">Last 30 days</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium">Shares</CardTitle>
                      </CardHeader>
                      <CardContent className="py-0">
                        <div className="text-2xl font-bold">{selectedImage.usage.shares}</div>
                        <p className="text-xs text-muted-foreground">Last 30 days</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm font-medium">Usage Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-md">
                        <p className="text-sm text-muted-foreground">Usage timeline visualization</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="exports" className="space-y-4 pt-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Format</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead>Destination</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedImage.exports.map((export_, index) => (
                          <TableRow key={index}>
                            <TableCell>{export_.date}</TableCell>
                            <TableCell>{export_.format}</TableCell>
                            <TableCell>{export_.size}</TableCell>
                            <TableCell>{export_.destination}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="metadata" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm font-medium">Technical Metadata</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-y-2">
                        <div className="text-sm text-muted-foreground">Dimensions</div>
                        <div className="text-sm">{selectedImage.metadata.dimensions}</div>
                        <div className="text-sm text-muted-foreground">File Size</div>
                        <div className="text-sm">{selectedImage.metadata.fileSize}</div>
                        <div className="text-sm text-muted-foreground">File Type</div>
                        <div className="text-sm">{selectedImage.metadata.fileType}</div>
                        <div className="text-sm text-muted-foreground">Color Profile</div>
                        <div className="text-sm">sRGB</div>
                        <div className="text-sm text-muted-foreground">Resolution</div>
                        <div className="text-sm">72 DPI</div>
                        <div className="text-sm text-muted-foreground">Created</div>
                        <div className="text-sm">{selectedImage.uploadDate}</div>
                        <div className="text-sm text-muted-foreground">Modified</div>
                        <div className="text-sm">{selectedImage.uploadDate}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm font-medium">Custom Metadata</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-y-2">
                        <div className="text-sm text-muted-foreground">Project</div>
                        <div className="text-sm">{selectedImage.project}</div>
                        <div className="text-sm text-muted-foreground">Source</div>
                        <div className="text-sm">{selectedImage.source}</div>
                        <div className="text-sm text-muted-foreground">Tags</div>
                        <div className="text-sm">
                          <div className="flex flex-wrap gap-1">
                            {selectedImage.metadata.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">Owner</div>
                        <div className="text-sm">{selectedImage.user.name}</div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <DialogFooter className="flex justify-between">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Original
                </Button>
                <Button>View in Crop Editor</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
