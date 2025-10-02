"use client"

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash } from "lucide-react"
import { useCart } from "@/context/cartContext";
import { removeFromCart, removeUserCart ,UpdateQtyCart} from "@/app/apis/cartApi";
import Loading  from '@/app/loading';
import { toast } from 'sonner'
export default function CartPage() {
    const {cartDetails,refreshCart,setCartDetails} = useCart()
    if (!cartDetails) {
  return <Loading/>;
}

  async function  removeCart() {
    const res = await removeUserCart();
    if(res?.message == "success") {
      toast.success("Cart Removed Successfully" ,{position: 'top-center'})
      refreshCart();
  }
  else{
    console.log(res);
    toast.error(res?.message ||"Failed to remove cart" , {position: 'top-center'})
  }
}
async function  removeProductFromCart(productId:string) {
  const res = await removeFromCart(productId);
  if(res && res.success == true) {
    toast.success("item Removed Successfully" ,{position: 'top-center'})
    setCartDetails(res.data)
  }
  else{
    toast.error(res?.message ||"Failed to remove cart" , {position: 'top-center'})
  }
}

  async function  UpdateQtyFromCart(productId:string , quantity:number) {
  const res = await UpdateQtyCart(productId , quantity);
  if(res && res.success == true) {
    toast.success(res.message ,{position: 'top-center'})
    setCartDetails(res.data)
  }
  else{
    toast.error(res?.message , {position: 'top-center'})
  }
}


  return (
    
<>

<section className="py-20">
  <div className="container mx-auto">
    {/* Cart Table */}
<Table className="mb-6">
  <TableHeader>
    <TableRow>
      <TableHead>Product</TableHead>
      <TableHead>Price</TableHead>
      <TableHead>Quantity</TableHead>
      <TableHead className="text-right">Subtotal</TableHead>
      <TableHead className="text-center">Delete </TableHead> {/* New Column */}
    </TableRow>
  </TableHeader>
  <TableBody>
    {
      cartDetails.data.products.map((product)=> (
            <TableRow key={product._id}>
      <TableCell className="font-medium">
        <div className="flex items-center gap-5">
          <Image
            src={product.product.imageCover}
            alt={product.product.title}
            width={54}
            height={54}
          />
          <h2>{product.product.title}</h2>
        </div>
      </TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>
<div className='flex items-center gap-3'>
          <button
      className="px-3 py-2"
      onClick={() => UpdateQtyFromCart(product.product._id, product.count -1)}
    >
      <Minus size={16} />
    </button>
        
        {product.count}
            <button
      className="px-3 py-2"
      onClick={() => UpdateQtyFromCart(product.product._id, product.count +1)}
    >
      <Plus size={16} />
    </button>
</div>
        
        </TableCell>
      <TableCell className="text-right">{product.price * product.count}</TableCell>
      <TableCell className="text-center">
        <button  onClick= {()=> removeProductFromCart(product.product._id)} className="text-red-500 hover:text-red-700">
          <Trash size={18} />
        </button>
      </TableCell>
    </TableRow>
      ))
    }

  </TableBody>
</Table>

    {/* Actions and Cart Summary */}
 <div className="flex justify-between gap-10">
      {/* Left Side: Coupon + Buttons */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Link
            href="/products"
            className="inline-flex h-10 items-center rounded-md border border-gray-200 bg-white shadow-sm px-8 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            Return To Shop
          </Link>
          {/* 🗑 Remove All */}
          <button onClick={() => removeCart()}
            className="inline-flex h-10 items-center rounded-md border text-red-600 px-6 text-sm font-medium transition-colors hover:bg-red-200"
          >
            
            Remove All
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Coupon Code"
            className="border px-4 py-2 rounded-md"
          />
          <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600">
            Apply Coupon
          </button>
        </div>
      </div>

      {/* Right Side: Cart Total */}
      <div className="border p-6 rounded-md w-80">
        <h2 className="font-bold mb-4">Cart Total</h2>
        <div className="flex justify-between border-b py-2">
          <span>Subtotal:</span>
          <span>{cartDetails?.data.totalCartPrice}</span>
        </div>
        <div className="flex justify-between border-b py-2">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between py-2 font-bold">
          <span>Total:</span>
          <span>{cartDetails?.data.totalCartPrice}</span>
        </div>
<button className="mt-4 w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600">
  <Link href="/checkout">Proceed to checkout</Link>
</button>
      </div>
    </div>
  </div>
</section>

</>
  )
}
