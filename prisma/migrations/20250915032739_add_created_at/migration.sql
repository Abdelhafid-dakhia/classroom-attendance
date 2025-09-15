/*
  Warnings:

  - A unique constraint covering the columns `[qrNonce]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Session_qrNonce_key" ON "public"."Session"("qrNonce");
