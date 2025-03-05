/*
  Warnings:

  - The primary key for the `Avaliacao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Avaliacao` table. All the data in the column will be lost.
  - The primary key for the `Campanha` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Campanha` table. All the data in the column will be lost.
  - The primary key for the `Doacao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Doacao` table. All the data in the column will be lost.
  - The primary key for the `ONG` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `ONG` table. All the data in the column will be lost.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Usuario` table. All the data in the column will be lost.
  - The required column `id` was added to the `Avaliacao` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Campanha` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Doacao` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `cnpj` was added to the `ONG` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Usuario` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `senha` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Avaliacao" DROP CONSTRAINT "Avaliacao_cnpj_fkey";

-- DropForeignKey
ALTER TABLE "Campanha" DROP CONSTRAINT "Campanha_cnpjOng_fkey";

-- DropForeignKey
ALTER TABLE "Doacao" DROP CONSTRAINT "Doacao_IDcampanha_fkey";

-- DropForeignKey
ALTER TABLE "Doacao" DROP CONSTRAINT "Doacao_cnpj_fkey";

-- AlterTable
ALTER TABLE "Avaliacao" DROP CONSTRAINT "Avaliacao_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Campanha" DROP CONSTRAINT "Campanha_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL,
ALTER COLUMN "datacriacao" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Campanha_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Doacao" DROP CONSTRAINT "Doacao_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Doacao_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ONG" DROP CONSTRAINT "ONG_pkey",
DROP COLUMN "_id",
ADD COLUMN     "cnpj" TEXT NOT NULL,
ADD CONSTRAINT "ONG_pkey" PRIMARY KEY ("cnpj");

-- AlterTable
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "senha" TEXT NOT NULL,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL,
ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Campanha" ADD CONSTRAINT "Campanha_cnpjOng_fkey" FOREIGN KEY ("cnpjOng") REFERENCES "ONG"("cnpj") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_cnpj_fkey" FOREIGN KEY ("cnpj") REFERENCES "ONG"("cnpj") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doacao" ADD CONSTRAINT "Doacao_IDcampanha_fkey" FOREIGN KEY ("IDcampanha") REFERENCES "Campanha"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_cnpj_fkey" FOREIGN KEY ("cnpj") REFERENCES "ONG"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;
