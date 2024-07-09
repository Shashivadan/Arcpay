"use client";

// import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidPhoneNumber } from "react-phone-number-input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { PhoneInput } from "../Phone-input";
import { signIn } from "next-auth/react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "enter a vaild email" }),
  password: z.string(),
});

export function Signin() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    register,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: value.email,
        password: value.password,
      });
      if (result.error) {
        setError("root", { message: result.error });
        return;
      }
      if (result?.url) {
        router.replace("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setError("root", { message: error });
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="border-none md:border-solid">
            <CardHeader className="">
              <CardTitle className="text-2xl">Signin to your account</CardTitle>
              <CardDescription>
                Enter your phone number below to log into your account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Email</FormLabel>
                      <FormControl className="w-full">
                        <Input type="text" id="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Password</FormLabel>
                      <FormControl className="w-full">
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {errors.root && (
                <div className=" text-sm  text-red-900 text-center">
                  {errors.root.message}
                </div>
              )}
            </CardContent>
            <CardFooter className=" flex flex-col gap-3  ">
              <Button type="submit" className="w-full">
                Sign In
              </Button>
              <FormDescription className="dark:text-white text-black  underline">
                Create an account Here
              </FormDescription>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
