/*
  Warnings:

  - You are about to drop the column `userId` on the `OtpVerify` table. All the data in the column will be lost.
  - Added the required column `expries` to the `OtpVerify` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OtpVerify" DROP CONSTRAINT "OtpVerify_userId_fkey";

-- AlterTable
ALTER TABLE "OtpVerify" DROP COLUMN "userId",
ADD COLUMN     "expries" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "isVerfiyed" BOOLEAN NOT NULL DEFAULT false;
