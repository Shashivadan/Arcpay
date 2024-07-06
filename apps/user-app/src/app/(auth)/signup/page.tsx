import { Signup } from "@/components/auth/singup";
import React from "react";

export default function page() {
  return (
    <div className=" h-screen flex items-center justify-center">
      <div className=" md:w-[500px] ">
        <Signup />
      </div>
    </div>
  );
}
