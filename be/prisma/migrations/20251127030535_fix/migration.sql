/*
  Warnings:

  - Added the required column `userID` to the `Reminder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reminder" ADD COLUMN     "userID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reminder" ADD CONSTRAINT "Reminder_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
