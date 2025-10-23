/*
  Warnings:

  - Added the required column `autoSave` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `saveInterval` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shares` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('VIEW', 'COMMENT', 'EDIT', 'MANAGE');

-- CreateEnum
CREATE TYPE "SaveEvery" AS ENUM ('THIRTY_SECONDS', 'MINUTE', 'FIVE_MINUTES', 'TEN_MINUTES', 'THIRTY_MINUTES', 'HOUR');

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "autoSave" BOOLEAN NOT NULL,
ADD COLUMN     "saveInterval" INTEGER NOT NULL,
ADD COLUMN     "shares" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "DocumentShare" (
    "id" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "permission" "Permission" NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DocumentShare_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentShare_documentId_userId_key" ON "DocumentShare"("documentId", "userId");

-- AddForeignKey
ALTER TABLE "DocumentShare" ADD CONSTRAINT "DocumentShare_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentShare" ADD CONSTRAINT "DocumentShare_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
