/*
  Warnings:

  - Added the required column `stripePaymentLinkUrl` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "stripePaymentLinkUrl" VARCHAR(255) NOT NULL;
