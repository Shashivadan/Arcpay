import z from "zod";

import { isValidPhoneNumber } from "react-phone-number-input";

export const signUpFormSchema = z.object({
  email: z.string().email({ message: "Invalid value email" }),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  password: z
    .string()
    .min(4, { message: "Password must be more then 4 letters" }),
  username: z
    .string()
    .min(4, { message: "Username must be more then 4 letters" }),
});
