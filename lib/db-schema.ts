// This is a schema definition that could be used with Prisma ORM

export const schema = `
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  images        Image[]
  teams         TeamUser[]
}

model Team {
  id        String     @id @default(cuid())
  name      String
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
  users     TeamUser[]
  images    Image[]
}

model TeamUser {
  id        String   @id @default(cuid())
  role      String   @default("member") // "owner", "admin", "member"
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String
  team      Team     @relation(fields: [teamId], references: [id], onDelete: Cascade)
  teamId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, teamId])
}

model Image {
  id          String       @id @default(cuid())
  name        String
  description String?
  tags        String[]
  originalUrl String
  width       Int
  height      Int
  fileSize    Int
  fileType    String
  uploadedBy  User         @relation(fields: [userId], references: [id])
  userId      String
  team        Team?        @relation(fields: [teamId], references: [id])
  teamId      String?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  crops       ImageCrop[]
  exports     ImageExport[]
  usageStats  UsageStat[]
}

model CropSize {
  id          String      @id @default(cuid())
  name        String
  ratio       String
  width       Int
  height      Int
  teamId      String?     // null means system default
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  imageCrops  ImageCrop[]
}

model ImageCrop {
  id          String    @id @default(cuid())
  image       Image     @relation(fields: [imageId], references: [id], onDelete: Cascade)
  imageId     String
  cropSize    CropSize  @relation(fields: [cropSizeId], references: [id])
  cropSizeId  String
  url         String?   // URL to the cropped image
  focalPointX Float     @default(50) // percentage
  focalPointY Float     @default(50) // percentage
  approved    Boolean   @default(false)
  aiGenerated Boolean   @default(false)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  exports     ImageExport[]
}

model ImageExport {
  id          String    @id @default(cuid())
  image       Image     @relation(fields: [imageId], references: [id])
  imageId     String
  crop        ImageCrop? @relation(fields: [cropId], references: [id])
  cropId      String?
  format      String    // "jpg", "png", "webp"
  quality     Int       @default(90)
  url         String
  destination String    // "download", "google_drive", "dropbox", "dam"
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model UsageStat {
  id        String   @id @default(cuid())
  image     Image    @relation(fields: [imageId], references: [id])
  imageId   String
  type      String   // "view", "download", "share"
  userId    String?
  createdAt DateTime @default(now())
}
`
