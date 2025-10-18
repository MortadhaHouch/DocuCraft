/*
  Warnings:

  - Added the required column `isArchived` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDeleted` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "isArchived" BOOLEAN NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL;
