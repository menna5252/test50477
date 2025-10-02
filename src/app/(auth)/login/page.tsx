"use client";
import pic1 from "@/assets/images/75f394c0a1c7dc5b68a42239311e510f54d8cd59.jpg";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loader2 } from "lucide-react"; 
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";


type loginFormPayLoad = z.infer<typeof loginFormSchema>;






  const loginFormSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().nonempty({message :"Password required"}).min(6, "Password must be at least 6 characters long"),
  })
export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  async function onSubmit(values: loginFormPayLoad) {
  setLoading(true);
  try {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });

    if (res?.error) {
      console.log("Login failed:", res.error);
      toast.error("Incorrect Email or Password",{position:"top-center"});

    } else {
      console.log("Login success:", res);
      toast.success("Login successful!",{position:"top-center"});
      router.push("/");

    }
  } catch (error) {
    console.log("Unexpected error:", error);
  } finally {
    setLoading(false);
  }
}
  
  const form = useForm<loginFormPayLoad>({
resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });



  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="hidden md:flex items-center justify-center bg-gray-100">
          <Image
            src={pic1.src}
            alt="Login illustration"
            className="w-full h-full object-contain p-8"
          />
        </div>

        <div className="p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-3">Log in to Exclusive</h2>
          <p className="text-gray-500 mb-8 text-lg">Enter your details below</p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 text-lg"
                        placeholder="you@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="h-12 text-lg"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
<Button
        type="submit"
        disabled={loading}
        className="bg-red-500 hover:bg-red-600 h-12 px-8 text-lg flex items-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Logging in...
          </>
        ) : (
          "Log In"
        )}
      </Button>
                <Link
                  href="/forget-password"
                  className="text-red-500 hover:underline text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
