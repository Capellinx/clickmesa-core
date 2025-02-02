-- CreateTable
CREATE TABLE "restaurant" (
    "id" CHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "cnpj" INTEGER NOT NULL,
    "owner_restauarnt" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);
