import { getBrandsDetails } from "@/app/apis/brandsApi";
import { IBrand } from "@/app/interfaces/BrandInterface";
import Image from "next/image";

export default async function BrandDetailsPage({
  params: { brandId },
}: {
  params: { brandId: string };
}) {
  const { data: brand }: { data: IBrand } = await getBrandsDetails(brandId);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex justify-center mb-8">
        <Image
          src={brand.image}
          alt={brand.name}
          className="w-64 h-64 object-contain rounded-xl shadow-lg"
        />
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold">{brand.name}</h1>
        <p className="text-gray-500 mt-2">Slug: {brand.name}</p>
        <p className="text-sm text-gray-400 mt-1">
                    </p>
      </div>
    </div>
  );
}
