import React from "react";
import { IProduct } from "@/app/interfaces/ProductsInterface";
import { getProducts } from "@/app/apis/ProductsApi";
import Link from "next/link";
import SectionTitle from "./../../components/shared/SectionTitle";
import AddToCartBtn from "./AddToCartBtn";
import AddToWishListBtn from "@/app/whishlist/AddToWishListBtn";
import Image from "next/image";

export default async function ProductsPage() {
  const { data: products }: { data: IProduct[] } = await getProducts(999);

  return (
    <div>
      <div className="pt-10">
        <div className="container mx-auto">
          <SectionTitle title="Our Products" subtitle="Explore Our Products" />
        </div>
      </div>

      <section className="py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group relative rounded-lg bg-white shadow-md overflow-hidden flex flex-col w-full"
              >
                <Link href={`/products/${product._id}`}>
                  <div className="relative flex justify-center items-center h-[200px] cursor-pointer">
                    <Image
                      src={product.imageCover}
                      alt={product.title}
                      className="h-full object-contain"
                    />
                  </div>
                </Link>

                <div className="relative flex justify-center items-center h-[50px]">
                  <AddToCartBtn
                    productId={product._id}
                    className="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition"
                  />
                </div>

                <div className="p-4 flex flex-col">
                  <Link href={`/products/${product._id}`}>
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 cursor-pointer">
                      {product.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-red-500 font-semibold">
                      {product.priceAfterDiscount ?? product.price} EGP
                    </span>
                    {product.priceAfterDiscount && (
                      <span className="text-gray-400 line-through text-sm">
                        {product.price} EGP
                      </span>
                    )}
                  </div>

                  <div className="flex items-center mt-2 text-yellow-500">
                    {"★".repeat(Math.round(product.ratingsAverage || 0))}
                    {"☆".repeat(5 - Math.round(product.ratingsAverage || 0))}
                    <span className="ml-2 text-gray-500 text-sm">
                      ({product.ratingsQuantity})
                    </span>
                  </div>

                  <div className="flex justify-end mt-3">
                    <AddToWishListBtn productId={product._id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
