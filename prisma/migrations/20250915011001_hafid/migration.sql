/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Session` table. All the data in the column will be lost.
  - Made the column `email` on table `Attendance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `qrNonce` on table `Session` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Attendance" DROP COLUMN "createdAt",
ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Session" DROP COLUMN "createdAt",
ALTER COLUMN "qrNonce" SET NOT NULL;
