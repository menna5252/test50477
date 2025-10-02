"use client";

import React, { useState } from "react";
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/cartContext";
import Loading from "@/app/loading";
import Image from "next/image";
import { createCashOrder, createBankOrder } from "@/app/apis/ordersApi";
import { useRouter } from "next/navigation";

// ----------------------------
// 1️⃣ Validation schema
// ----------------------------
const checkoutFormSchema = z.object({
  address: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  phone: z.string().regex(/^[0-9]{10,15}$/, "Phone must be 10–15 digits"),
});

type CheckoutFormPayload = z.infer<typeof checkoutFormSchema>;

// ----------------------------
// 2️⃣ Component
// ----------------------------
export default function CheckoutPage() {
  // ✅ Hooks at the top
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("cod");
  const { cartDetails } = useCart();
  const router = useRouter();

  const form = useForm<CheckoutFormPayload>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      address: "",
      city: "",
      phone: "",
    },
  });

  // ----------------------------
  // 3️⃣ Early returns
  // ----------------------------
  if (!cartDetails) return <Loading />;

  const cartId = cartDetails.data._id;

  if (!cartDetails.data.products.length) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty 🛒</h2>
        <p className="text-gray-600">
          Add items to your cart to proceed to checkout.
        </p>
      </div>
    );
  }

  // ----------------------------
  // 4️⃣ Form submit
  // ----------------------------
  const onSubmit = async (values: CheckoutFormPayload) => {
    setLoading(true);
    try {
      const shippingAddress = {
        details: values.address,
        phone: values.phone,
        city: values.city,
      };

      let res;
      if (payment === "cod") {
        res = await createCashOrder(cartId, shippingAddress);
      } else {
        res = await createBankOrder(
          cartId,
          shippingAddress,
          process.env.NEXT_PUBLIC_APP_URL!
        );
      }

      if (res.success) {
        toast.success(res.message, { position: "top-center" });

        if (payment === "bank" && res.data.session?.url) {
          window.location.href = res.data.session.url;
        } else {
          router.push("/allorders");
        }
      } else {
        toast.error(res.message, { position: "top-center" });
      }
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // 5️⃣ Render
  // ----------------------------
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8">Billing Details</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-lg"
          >
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address*</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Town / City*</FormLabel>
                  <FormControl>
                    <Input placeholder="Cairo" {...field} />
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
                  <FormLabel>Phone Number*</FormLabel>
                  <FormControl>
                    <Input placeholder="0123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 h-12 text-lg flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Place Order"}
            </Button>
          </form>
        </Form>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {cartDetails.data.products.map((product) => (
            <div key={product._id} className="flex justify-between items-center">
              <span className="flex items-center gap-3">
                <Image
                  src={product.product.imageCover}
                  alt={product.product.title}
                  width={54}
                  height={54}
                />
                {product.product.title}{" "}
                <span className="text-gray-500 text-sm">(x{product.count})</span>
              </span>
              <span>{product.price} EGP</span>
            </div>
          ))}

          <div className="flex justify-between text-gray-700">
            <span>Subtotal:</span>
            <span>{cartDetails?.data.totalCartPrice} EGP</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>{cartDetails?.data.totalCartPrice} EGP</span>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={payment === "bank"}
                onChange={() => setPayment("bank")}
              />
              Bank
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={payment === "cod"}
                onChange={() => setPayment("cod")}
              />
              Cash on delivery
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
