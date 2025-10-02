"use client";

import { addToCart } from "@/app/apis/cartApi";
import React from "react";
import { toast } from "sonner";
import { useCart } from "@/context/cartContext";
export default function AddToCartBtn({
  productId,
  ...props
}: { productId: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const {refreshCart} = useCart()
  async function addProductToCart(productId: string) {
    const res = await addToCart(productId);
    console.log(res);
    if(res?.message == "success") {
        toast.success("Product Added to Cart Successfully", {position: 'top-center'});
         await refreshCart()
    }
    else{
        toast.error(res?.message ||"Failed to add product to cart",{position: 'top-center'})
    }
  }
  return (
    <button
      onClick={() => addProductToCart(productId)}
      {...props}
    >
      Add to Cart
    </button>
  );
}
