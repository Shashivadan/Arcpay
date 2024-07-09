import crypto from "crypto";
import { Resend } from "resend";
import OTPEmailTemplate from "@/components/email-verify";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function otpGenarater(email: string, username: string) {
  try {
    const otp = crypto.randomInt(100000, 999999);

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "ArcPay OTP",
      react: OTPEmailTemplate({
        userName: username,
        otpCode: JSON.stringify(otp),
      }),
    });
    console.log(data);

    if (error) {
      return { success: false, message: email };
    }
    return { success: true, otp, message: "sussusfully send mail" };
  } catch (error) {
    console.log("error", error);
    return { success: false, message: "Internal Server Error" };
  }
}
