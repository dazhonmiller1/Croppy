"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { put } from "@vercel/blob"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function uploadImage(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const file = formData.get("file") as File
    if (!file) {
      return { error: "No file provided" }
    }

    // Upload to Vercel Blob
    const blob = await put(`images/${Date.now()}-${file.name}`, file, {
      access: "public",
    })

    // Get image dimensions
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // In a real app, you'd use a library like sharp to get image dimensions
    // For this example, we'll use placeholder values
    const width = 1920
    const height = 1080

    // Save to database
    const image = await db.image.create({
      data: {
        name: file.name,
        originalUrl: blob.url,
        width,
        height,
        fileSize: file.size,
        fileType: file.type,
        userId: session.user.id,
        tags: [],
      },
    })

    // Generate AI tags
    const tags = await generateImageTags(blob.url)

    // Update image with tags
    await db.image.update({
      where: { id: image.id },
      data: { tags },
    })

    // Generate crops with AI
    await generateCrops(image.id, blob.url)

    revalidatePath("/upload")
    return { success: true, imageId: image.id }
  } catch (error) {
    console.error("Error uploading image:", error)
    return { error: "Failed to upload image" }
  }
}

async function generateImageTags(imageUrl: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate 5-7 relevant tags for this image: ${imageUrl}. Return only the tags as a comma-separated list with no additional text.`,
    })

    return text.split(",").map((tag) => tag.trim())
  } catch (error) {
    console.error("Error generating tags:", error)
    return []
  }
}

async function generateCrops(imageId: string, imageUrl: string) {
  try {
    // Get default crop sizes
    const cropSizes = await db.cropSize.findMany({
      where: { teamId: null },
    })

    // For each crop size, generate a crop with AI focal point
    for (const cropSize of cropSizes) {
      // In a real app, you'd call your AI service to detect focal points
      // For this example, we'll use placeholder values
      const focalPointX = 50
      const focalPointY = 50

      await db.imageCrop.create({
        data: {
          imageId,
          cropSizeId: cropSize.id,
          focalPointX,
          focalPointY,
          aiGenerated: true,
        },
      })
    }
  } catch (error) {
    console.error("Error generating crops:", error)
  }
}
