import { db } from "@/lib/db"
import { auth } from "@/lib/auth"
import { ImageGrid } from "@/app/components/image-grid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export async function ImageBrowser() {
  const session = await auth()

  if (!session?.user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Unauthorized</CardTitle>
          <CardDescription>Please sign in to view your images</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const images = await db.image.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      originalUrl: true,
      tags: true,
      createdAt: true,
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Images</CardTitle>
        <CardDescription>Browse and manage your uploaded images</CardDescription>
      </CardHeader>
      <CardContent>
        <ImageGrid
          initialImages={images.map((image) => ({
            ...image,
            createdAt: image.createdAt.toISOString(),
          }))}
        />
      </CardContent>
    </Card>
  )
}
