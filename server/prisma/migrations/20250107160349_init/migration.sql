-- CreateTable
CREATE TABLE "TaskModel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "timetask" TEXT NOT NULL,
    "datetask" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TaskModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "TaskModel" ADD CONSTRAINT "TaskModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
