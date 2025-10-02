
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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

// ✅ Validation schema
const registerFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    rePassword: z.string().min(6, "Please confirm your password"),
    phone: z
      .string()
      .regex(/^[0-9]{10,15}$/, "Phone must be 10–15 digits"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

type RegisterFormPayload = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(values: RegisterFormPayload) {
    setLoading(true);
    try {
      // Example API call to register user
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || "Registration failed", {
          position: "top-center",
        });
      } else {
        toast.success("Account created successfully!", {
          position: "top-center",
        });
        router.push("/login");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  const form = useForm<RegisterFormPayload>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="grid w-full max-w-6xl grid-cols-1 md:grid-cols-2 bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Left side - image */}
        <div className="hidden md:flex items-center justify-center bg-gray-100">
          <Image
            src={pic1.src}
            alt="Register illustration"
            className="w-full h-full object-contain p-8"
          />
        </div>

        {/* Right side - form */}
        <div className="p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-3">Create Account</h2>
          <p className="text-gray-500 mb-8 text-lg">
            Fill in your details to get started
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12 text-lg"
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
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

              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Confirm Password</FormLabel>
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

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        className="h-12 text-lg"
                        placeholder="0123456789"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 h-12 px-8 text-lg flex items-center gap-2 w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
