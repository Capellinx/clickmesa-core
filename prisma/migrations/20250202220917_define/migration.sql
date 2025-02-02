-- DropIndex
DROP INDEX "restaurant_cnpj_key";

-- AlterTable
ALTER TABLE "restaurant" ALTER COLUMN "cnpj" SET DATA TYPE BIGINT;
