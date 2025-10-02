"use client"

import { getUserCart } from "@/app/apis/cartApi";
import { ICartResponse } from "@/app/interfaces/cartInterface";
import { createContext, useContext, useEffect, useState } from "react";
import React from 'react'


interface ICartContext{
cartDetails: ICartResponse | null
  refreshCart: () => Promise<void>;
fetchCart:() => Promise<void>
setCartDetails: React.Dispatch<React.SetStateAction<ICartResponse | null>>
}

 const CartContext = createContext<ICartContext | null>(null);




export function CartContextProvider({children}: {children: React.ReactNode}) {
const [cartDetails, setCartDetails] = useState<ICartResponse | null>(null);


  async function fetchCart() {
    const data = await getUserCart();
    console.log("Fetched data in provider:", data); // 👈 check this
    if (data) {
      setCartDetails(data);
    }
  }

  async function refreshCart() {
    try {
      const res = await getUserCart();
      setCartDetails(res);
    } catch (err) {
      console.error("Failed to refresh cart:", err);
      setCartDetails(null);
    }
  }
useEffect(() => {
  fetchCart();
}, []);

  return (
    <div>
      <CartContext.Provider value={{cartDetails ,setCartDetails, fetchCart,refreshCart}}>{children}</CartContext.Provider>
    </div>
  )
}

export function useCart(){
    const context = useContext(CartContext)

    if(!context) throw new Error("useCart must be used within CartContextProvider")

    return context
}