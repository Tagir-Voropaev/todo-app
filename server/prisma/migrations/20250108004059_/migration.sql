/*
  Warnings:

  - You are about to drop the column `activationLink` on the `UserModel` table. All the data in the column will be lost.
  - You are about to drop the column `isActivated` on the `UserModel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskModel" DROP CONSTRAINT "TaskModel_userId_fkey";

-- DropForeignKey
ALTER TABLE "TokenModel" DROP CONSTRAINT "TokenModel_userId_fkey";

-- AlterTable
ALTER TABLE "UserModel" DROP COLUMN "activationLink",
DROP COLUMN "isActivated";

-- AddForeignKey
ALTER TABLE "TaskModel" ADD CONSTRAINT "TaskModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenModel" ADD CONSTRAINT "TokenModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
