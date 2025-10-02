"use client";

import { useState, useEffect } from "react";
import { addToWishList, removeFromWishList, getUserWishList } from "@/app/apis/wishlistApi";
import { Heart } from "lucide-react"; 
import { toast } from 'sonner';

interface AddToWishlistBtnProps {
  productId: string;
}

interface IWishlistItem {
  _id: string;
  // add other fields if needed
}

export default function AddToWishlistBtn({ productId }: AddToWishlistBtnProps) {
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if this product is already in wishlist
  useEffect(() => {
    async function checkWishlist() {
      const res = await getUserWishList();
      if (res?.data?.some((item: IWishlistItem) => item._id === productId)) {
        setInWishlist(true);
      }
    }
    checkWishlist();
  }, [productId]);

  async function handleToggle() {
    if (loading) return;
    setLoading(true);

    try {
      if (inWishlist) {
        const res = await removeFromWishList(productId);
        if (res?.success) {
          setInWishlist(false);
          toast.success("Removed from Wishlist", { position: "top-center" });
        } else {
          toast.error(res?.message || "Failed to remove", { position: "top-center" });
        }
      } else {
        const res = await addToWishList(productId);
        if (res?.success) {
          setInWishlist(true);
          toast.success("Added to Wishlist", { position: "top-center" });
        } else {
          toast.error(res?.message || "Failed to add", { position: "top-center" });
        }
      }
    } catch (error) {
      toast.error("Something went wrong", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="p-2 rounded-full hover:bg-gray-100 transition"
    >
      <Heart
        className={`w-6 h-6 ${inWishlist ? "fill-red-500 text-red-500" : "text-gray-500"}`}
      />
    </button>
  );
}
