/*
  Warnings:

  - You are about to drop the `TaskModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TaskModel";

-- CreateTable
CREATE TABLE "MainTaskModel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'В процессе',
    "priority" TEXT NOT NULL DEFAULT 'Низкий',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MainTaskModel_pkey" PRIMARY KEY ("id")
);
