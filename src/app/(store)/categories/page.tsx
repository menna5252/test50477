import React from "react";
import  Link  from 'next/link';
import SectionTitle from './../../components/shared/SectionTitle';
import { getCategories } from "@/app/apis/categoriesApi";
import { ICategory } from "@/app/interfaces/categoryInterface";
import Image from "next/image";

export default async function categioresPage() {
   const { data: categories }: { data: ICategory[] } = await getCategories();

  return (
    <div>

      <div className=" pt-10">
        <div className="container mx-auto">
        <SectionTitle title="Our Products" subtitle="Explore Our Products" />

        </div>
      </div>
      

<section className="py-10">
<div className="container mx-auto">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
  {categories.map((category) => (
    <div
      key={category._id}
      className="group relative rounded-lg bg-white shadow-md overflow-hidden flex flex-col w-full"
    >



<Link href={`/categories/${category._id}`}>
      <div className="relative flex justify-center items-center h-[200px]">
        <Image
          src={category.image}
          alt={category.name}
          className="h-full object-contain"
        />





      </div>
</Link>



      <div className="p-4 flex flex-col">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {category.name}
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