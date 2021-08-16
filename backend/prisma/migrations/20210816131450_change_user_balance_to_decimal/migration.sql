/*
  Warnings:

  - Changed the type of `balance` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "balance",
ADD COLUMN     "balance" DECIMAL(65,30) NOT NULL;
