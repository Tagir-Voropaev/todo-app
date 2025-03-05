-- AlterTable
ALTER TABLE "TaskModel" ADD COLUMN     "priority" TEXT NOT NULL DEFAULT 'Низкий',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'В процессе';
