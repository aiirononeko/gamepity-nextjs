/*
  Warnings:

  - You are about to drop the column `stripePaymentLinkUrl` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `stripePaymentLinkId` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeProductId` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "stripePaymentLinkUrl",
ADD COLUMN     "stripePaymentLinkId" VARCHAR(255) NOT NULL,
ADD COLUMN     "stripeProductId" VARCHAR(255) NOT NULL;
