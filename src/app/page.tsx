import Mainslider from "./components/home/mainslider";
import CategoriesList from "./components/home/categoriesList";
import CategoriesSection from "./components/home/CategoriesSection";
import { Separator } from "@/components/ui/separator";
import ProductsSection from "./components/home/ProductsSection";

export default function Home() {
  return (
    <>
<section>
  <div className="container mx-auto flex justify-between items-start gap-4 py-10">
    {/* Sidebar Categories */}
    <div className="w-1/4">
      <CategoriesList />
    </div>

    {/* Main Slider */}
    <div className="w-3/4">
      <Mainslider />
    </div>

  </div>
      <Separator className="mt-10"/>
</section>


      <section className="py-10">
        <div className="container mx-auto">
          <CategoriesSection />
        </div>
      </section>

            <section className="py-10">
        <div className="container mx-auto">
          <div >
            <ProductsSection />
          </div>
        </div>
      </section>
    </>
  );
}
