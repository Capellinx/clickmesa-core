/*
  Warnings:

  - Changed the type of `status` on the `restaurant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ATIVO', 'INATIVO', 'DESATIVADO');

-- AlterTable
ALTER TABLE "restaurant" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL;
