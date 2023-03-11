/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `usageHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "usageHistory_userId_key" ON "usageHistory"("userId");
