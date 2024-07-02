import crypto from "crypto";

export function tokenGenerater(length: number = 32) {
  return crypto.randomBytes(length).toString("hex");
}
