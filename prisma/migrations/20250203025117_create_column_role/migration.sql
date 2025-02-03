-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'OWNER', 'USER', 'COSTUMER');

-- AlterTable
ALTER TABLE "restaurant" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
