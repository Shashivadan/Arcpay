import { Signin } from "@/components/auth/signin";
import React from "react";

export default function page() {
  return (
    <div className=" h-screen flex items-center justify-center">
      <div className=" md:w-[500px] ">
        <Signin />
      </div>
    </div>
  );
}
