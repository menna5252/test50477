import React from "react";
import  Link  from 'next/link';
import SectionTitle from './../../components/shared/SectionTitle';
import { IBrand } from "@/app/interfaces/BrandInterface";
import { getBrands } from "@/app/apis/brandsApi";
import Image from "next/image";

export default async function brandsPage() {
   const { data: brands }: { data: IBrand[] } = await getBrands(999);

  return (
    <div>

      <div className=" pt-10">
        <div className="container mx-auto">
        <SectionTitle title="Our Brands" subtitle="Explore Our Brands" />

        </div>
      </div>
      

<section className="py-10">
<div className="container mx-auto">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
  {brands.map((brand) => (
    <div
      key={brand._id}
      className="group relative rounded-lg bg-white shadow-md overflow-hidden flex flex-col w-full"
    >


<Link href={`/brands/${brand._id}`}>
      <div className="relative flex justify-center items-center h-[200px]">
        <Image
          src={brand.image}
          alt={brand.name}
          className="h-full object-contain"
        />





      </div>
</Link>



      <div className="p-4 flex flex-col">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {brand.name}
        </h3>



      </div>
    </div>
  ))}
</div>

<div>

</div>
</div>
</section>



    </div>
  );
}