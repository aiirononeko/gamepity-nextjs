-- DropForeignKey
ALTER TABLE "AvailableDateTime" DROP CONSTRAINT "AvailableDateTime_reservationId_fkey";

-- AlterTable
ALTER TABLE "AvailableDateTime" ALTER COLUMN "reservationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AvailableDateTime" ADD CONSTRAINT "AvailableDateTime_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
