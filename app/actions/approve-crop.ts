"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

export async function approveCrop(cropId: string, approved: boolean) {
  try {
    const session = await auth()
    if (!session?.user) {
      return { error: "Unauthorized" }
    }

    // Update the crop approval status
    await db.imageCrop.update({
      where: { id: cropId },
      data: { approved },
    })

    revalidatePath("/crop")
    return { success: true }
  } catch (error) {
    console.error("Error approving crop:", error)
    return { error: "Failed to update crop" }
  }
}
