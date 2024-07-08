-- CreateTable
CREATE TABLE "OtpVerify" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "otp" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "OtpVerify_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OtpVerify_number_key" ON "OtpVerify"("number");

-- AddForeignKey
ALTER TABLE "OtpVerify" ADD CONSTRAINT "OtpVerify_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
