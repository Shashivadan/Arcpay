/*
  Warnings:

  - You are about to drop the column `number` on the `OtpVerify` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `OtpVerify` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `OtpVerify` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "OtpVerify_number_key";

-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "amount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "OtpVerify" DROP COLUMN "number",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OtpVerify_email_key" ON "OtpVerify"("email");
