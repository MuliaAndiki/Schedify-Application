/*
  Warnings:

  - You are about to drop the column `startAt` on the `Task` table. All the data in the column will be lost.
  - Made the column `endAt` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "startAt",
ALTER COLUMN "endAt" SET NOT NULL;
