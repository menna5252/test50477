"use client";

import { useEffect, useState } from "react";
import { Truck, RotateCcw } from "lucide-react";
import { getProductsDetails } from "@/app/apis/ProductsApi";
import Loading from "@/app/loading";
import AddToWishListBtn from "@/app/whishlist/AddToWishListBtn";
import Image from "next/image";
import AddToCartBtn from "../AddToCartBtn";

// ✅ Product type definition
interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  images?: string[];
  availableColors?: string[];
}

interface ProductDetailsProps {
  params: { ProductId: string };
}

export default function ProductDetails({ params: { ProductId } }: ProductDetailsProps) {
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await getProductsDetails(ProductId);
        setProduct(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    }
    fetchProduct();
  }, [ProductId]);

  if (!product) return <Loading />;

  const images = product.images ?? [];
  const mainImage = images[0] ?? "/placeholder.png";
  const colors = product.availableColors ?? [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-2 gap-10">
      {/* Left - Product Images */}
      <div className="flex gap-6">
        {/* Thumbnails */}
        <div className="flex flex-col gap-3">
          {images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Thumbnail ${i + 1}`}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:border-red-500"
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1">
          <Image
            src={mainImage}
            alt={product.title}
            width={600}
            height={450}
            className="w-full h-[450px] object-contain rounded-xl shadow"
          />
        </div>
      </div>

      {/* Right - Product Info */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <div className="flex items-center gap-3 text-sm mt-2">
            <span className="text-yellow-500">
              {"★".repeat(Math.floor(product.ratingsAverage ?? 0))}
              {"☆".repeat(5 - Math.floor(product.ratingsAverage ?? 0))}
            </span>
            <span className="text-gray-500">
              ({product.ratingsQuantity ?? 0} Reviews)
            </span>
            <span className="text-green-600 font-medium">In Stock</span>
          </div>
          <p className="text-2xl font-bold mt-4">{product.price} EGP</p>
          <p className="text-gray-600 mt-3 leading-relaxed">{product.description}</p>
        </div>

        {/* Colours */}
        {colors.length > 0 && (
          <div>
            <h3 className="text-sm font-medium">Colours:</h3>
            <div className="flex gap-3 mt-2">
              {colors.map((c) => (
                <button
                  key={c}
                  className="w-6 h-6 rounded-full border border-gray-300 hover:ring-2 hover:ring-red-500"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quantity & Buy */}
        <div className="flex items-center gap-4">
          <AddToCartBtn
            className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600"
            productId={product._id}
          />
          <AddToWishListBtn productId={product._id} />
        </div>

        {/* Delivery Info */}
        <div className="border rounded-lg divide-y mt-6">
          <div className="flex items-center gap-3 p-4">
            <Truck size={20} className="text-gray-500" />
            <div>
              <p className="font-medium">Free Delivery</p>
              <p className="text-sm text-gray-500">
                Enter your postal code for Delivery Availability
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4">
            <RotateCcw size={20} className="text-gray-500" />
            <div>
              <p className="font-medium">Return Delivery</p>
              <p className="text-sm text-gray-500">
                Free 30 Days Delivery Returns. Details
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}