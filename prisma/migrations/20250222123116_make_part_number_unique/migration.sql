/*
  Warnings:

  - A unique constraint covering the columns `[part_number]` on the table `ItemCost` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ItemCost_part_number_key" ON "ItemCost"("part_number");
