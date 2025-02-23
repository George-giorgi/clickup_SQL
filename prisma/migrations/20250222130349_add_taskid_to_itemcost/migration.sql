/*
  Warnings:

  - A unique constraint covering the columns `[taskId]` on the table `ItemCost` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taskId` to the `ItemCost` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ItemCost_part_number_key";

-- AlterTable
ALTER TABLE "ItemCost" ADD COLUMN     "taskId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ItemCost_taskId_key" ON "ItemCost"("taskId");
