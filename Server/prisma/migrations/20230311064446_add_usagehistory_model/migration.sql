-- CreateTable
CREATE TABLE "usageHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "translateBtnCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usageHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usageHistory_id_key" ON "usageHistory"("id");

-- CreateIndex
CREATE INDEX "usageHistory_userId_idx" ON "usageHistory"("userId");

-- CreateIndex
CREATE INDEX "todos_userId_idx" ON "todos"("userId");

-- AddForeignKey
ALTER TABLE "usageHistory" ADD CONSTRAINT "usageHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
