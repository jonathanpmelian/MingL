/*
  Warnings:

  - You are about to drop the column `createdBy` on the `events` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `events` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_createdBy_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "createdBy",
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "events_title_key" ON "events"("title");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
