import { getCategoryDetails } from "@/app/apis/categoriesApi";
import { ICategory } from "@/app/interfaces/categoryInterface";
import Image from "next/image";

export default async function CategoryDetailsPage({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) {
  const { data: category }: { data: ICategory } = await getCategoryDetails(categoryId);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex justify-center mb-8">
        <Image
          src={category.image}
          alt={category.name}
          className="w-64 h-64 object-contain rounded-xl shadow-lg"
        />
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-gray-500 mt-2">Slug: {category.name}</p>
        <p className="text-sm text-gray-400 mt-1">
                    </p>
      </div>
    </div>
  );
}
