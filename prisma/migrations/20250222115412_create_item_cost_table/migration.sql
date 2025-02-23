-- CreateTable
CREATE TABLE "ItemCost" (
    "id" SERIAL NOT NULL,
    "part_number" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ItemCost_pkey" PRIMARY KEY ("id")
);
