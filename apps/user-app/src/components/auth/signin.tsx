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

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const formSchema = z.object({
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  password: z.string(),
});

export function Signin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });
  const { register } = form;

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    console.log(value);
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
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Phone Number</FormLabel>
                      <FormControl className="w-full">
                        <PhoneInput
                          defaultCountry={"IN"}
                          countries={["US", "IN"]}
                          placeholder="Enter a phone number"
                          {...field}
                        />
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
            </CardContent>
            <CardFooter className=" flex flex-col gap-3  ">
              <Button type="submit" className="w-full">
                Sign In
              </Button>
              <FormDescription className="dark:text-white text-black">
                ddafafas
              </FormDescription>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
