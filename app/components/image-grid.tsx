"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

type ImageType = {
  id: string
  name: string
  originalUrl: string
  tags: string[]
  createdAt: string
}

export function ImageGrid({ initialImages }: { initialImages: ImageType[] }) {
  const [images, setImages] = useState<ImageType[]>(initialImages)
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  const toggleImageSelection = (id: string) => {
    setSelectedImages((prev) => (prev.includes(id) ? prev.filter((imageId) => imageId !== id) : [...prev, id]))
  }

  const deleteImage = async (id: string) => {
    try {
      const response = await fetch(`/api/images/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setImages(images.filter((image) => image.id !== id))
        setSelectedImages(selectedImages.filter((imageId) => imageId !== id))
      }
    } catch (error) {
      console.error("Error deleting image:", error)
    }
  }

  return (
    <div className="space-y-4">
      {selectedImages.length > 0 && (
        <div className="flex items-center justify-between bg-muted p-2 rounded-md">
          <span>{selectedImages.length} images selected</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedImages([])}>
              Clear Selection
            </Button>
            <Button size="sm">Process Selected</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card
            key={image.id}
            className={`overflow-hidden transition-all ${
              selectedImages.includes(image.id) ? "ring-2 ring-primary" : ""
            }`}
          >
            <div className="relative aspect-square bg-muted">
              {image.originalUrl ? (
                <Image src={image.originalUrl || "/placeholder.svg"} alt={image.name} fill className="object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <ImageIcon className="h-10 w-10 text-muted-foreground" />
                </div>
              )}

              <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                <Button variant="secondary" className="mr-2" onClick={() => toggleImageSelection(image.id)}>
                  Select
                </Button>
                <Button variant="destructive" size="icon" onClick={() => deleteImage(image.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <CardContent className="p-3">
              <div className="truncate text-sm font-medium mb-1">{image.name}</div>
              <div className="flex flex-wrap gap-1 mt-2">
                {image.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
