/*
  Warnings:

  - Added the required column `reservationId` to the `AvailableDateTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AvailableDateTime" ADD COLUMN     "reservationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AvailableDateTime" ADD CONSTRAINT "AvailableDateTime_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
