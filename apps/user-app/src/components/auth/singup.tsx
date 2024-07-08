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
import { useRouter } from "next/navigation";
import { signUpFormSchema } from "@/types/authTypes";
import axios from "axios";

export function Signup() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      phoneNumber: "",
      email: "",
      password: "",
      username: "",
    },
  });
  const { register, setError } = form;

  const onSubmit = async (value: z.infer<typeof signUpFormSchema>) => {
    try {
      const response = await axios.post("/api/signup", { ...value });
      console.log("susses", response.data);
      router.push("/verify/" + encodeURIComponent(value.email));
    } catch (error) {
      console.log("getting error", error);
      setError("root", { message: "Soming Thing went worng" });
    }

    // router.replace("/verify/" + value.phoneNumber);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="border-none md:border-solid">
            <CardHeader className="">
              <CardTitle className="text-2xl">Create an account</CardTitle>
              <CardDescription>
                Enter your email below to create your account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Username</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          {...register("username")}
                          id="username"
                          type="username"
                          placeholder="xxxxxxxxx"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start">
                      <FormLabel className="text-left">Email</FormLabel>
                      <FormControl className="w-full">
                        <Input
                          {...register("email")}
                          id="email"
                          type="email"
                          placeholder="mail@example.com"
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
                Create account
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
