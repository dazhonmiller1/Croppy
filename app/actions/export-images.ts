"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function exportImages(formData: FormData) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    const cropIds = formData.getAll("cropIds") as string[]
    const format = formData.get("format") as string
    const quality = Number.parseInt(formData.get("quality") as string) || 90
    const destination = formData.get("destination") as string

    if (!cropIds.length) {
      return { error: "No crops selected" }
    }

    // In a real app, you'd process the crops and export them
    // For this example, we'll just create export records

    for (const cropId of cropIds) {
      const crop = await db.imageCrop.findUnique({
        where: { id: cropId },
        include: { image: true },
      })

      if (!crop) continue

      // In a real app, you'd generate the cropped image and upload it
      // For this example, we'll use a placeholder URL
      const exportUrl = crop.image.originalUrl

      await db.imageExport.create({
        data: {
          imageId: crop.imageId,
          cropId,
          format,
          quality,
          url: exportUrl,
          destination,
        },
      })
    }

    revalidatePath("/exports")
    return { success: true }
  } catch (error) {
    console.error("Error exporting images:", error)
    return { error: "Failed to export images" }
  }
}
