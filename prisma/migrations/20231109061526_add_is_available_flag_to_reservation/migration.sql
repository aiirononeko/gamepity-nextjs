/*
  Warnings:

  - Added the required column `isAvailable` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "isAvailable" BOOLEAN NOT NULL;
