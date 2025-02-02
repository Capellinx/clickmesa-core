/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "restaurant" ALTER COLUMN "cnpj" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_cnpj_key" ON "restaurant"("cnpj");
