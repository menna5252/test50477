"use client";

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

const verifyCodeSchema = z.object({
  resetCode: z.string().length(6, "Code must be 6 digits"),
});

type VerifyCodePayload = z.infer<typeof verifyCodeSchema>;

export default function VerifyCodePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<VerifyCodePayload>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: { resetCode: "" }, 
  });

  async function onSubmit(values: VerifyCodePayload) {
    setLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (!res.ok) {
        toast.error("Invalid or expired code", { position: "top-center" });
      } else {
        toast.success("Code verified!", { position: "top-center" });
        router.push("/forget-password/reset");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-3">Verify Code</h2>
        <p className="text-gray-500 mb-8 text-lg">
          Enter the 6-digit code we sent to your email
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12 text-lg tracking-widest text-center"
                      placeholder="123456"
                      maxLength={6}
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
                  Verifying...
                </>
              ) : (
                "Verify Code"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
