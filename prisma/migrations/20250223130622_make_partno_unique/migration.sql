-- CreateTable
CREATE TABLE "Item" (
    "PartNo" TEXT NOT NULL,
    "Rev" INTEGER NOT NULL,
    "Weight" DOUBLE PRECISION,
    "Length" DOUBLE PRECISION,
    "MaterialStandard" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("PartNo","Rev")
);

-- CreateTable
CREATE TABLE "Material" (
    "PartNo" TEXT NOT NULL,
    "MaterialClass" TEXT NOT NULL,
    "Dim1" DOUBLE PRECISION,
    "Dim2" DOUBLE PRECISION,
    "Dim3" DOUBLE PRECISION,
    "Dim4" DOUBLE PRECISION,
    "MassDensity" DOUBLE PRECISION,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("PartNo")
);

-- CreateIndex
CREATE UNIQUE INDEX "Item_PartNo_key" ON "Item"("PartNo");

-- CreateIndex
CREATE UNIQUE INDEX "Material_PartNo_key" ON "Material"("PartNo");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_MaterialStandard_fkey" FOREIGN KEY ("MaterialStandard") REFERENCES "Material"("PartNo") ON DELETE SET NULL ON UPDATE CASCADE;
