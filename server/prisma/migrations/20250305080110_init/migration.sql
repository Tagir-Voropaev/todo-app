/*
  Warnings:

  - You are about to drop the column `email` on the `UserModel` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `UserModel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[login]` on the table `UserModel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `login` to the `UserModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserModel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserModel_email_key";

-- DropIndex
DROP INDEX "UserModel_name_key";

-- AlterTable
ALTER TABLE "UserModel" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "login" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "TaskModel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_login_key" ON "UserModel"("login");
