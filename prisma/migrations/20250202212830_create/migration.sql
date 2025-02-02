/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `restaurant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cnpj]` on the table `restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restaurant" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_email_key" ON "restaurant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_cnpj_key" ON "restaurant"("cnpj");
