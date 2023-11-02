/*
  Warnings:

  - You are about to drop the column `time` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "time";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "time";
