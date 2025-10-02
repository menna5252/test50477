


import { getCategories } from "@/app/apis/categoriesApi";
import { ICategory } from "@/app/interfaces/categoryInterface";
import React from "react";
import SectionTitle from "../shared/SectionTitle";
import { Separator } from "@/components/ui/separator";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { Autoplay } from "swiper/modules";
import CategoriesSwiper from "./CategoriesSwiper";
const swiperOptions = {
  slidesPerView: 1,
  loop: true,
  pagination: {
    clickable: true,
    bulletClass: "swiper-pagination-bullet !size-3 ",
    bulletActiveClass: "swiper-pagination-bullet-active !bg-red-500",
  },
  modules: [Pagination, Autoplay],
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
};

export default async function CategoriesSection() {
  const { data: categories }: { data: ICategory[] } = await getCategories();

  return (
    <div className="py-10">
      <div className="container mx-auto">
        <SectionTitle title={"Categories"} subtitle={"Browse By Category"} />
        <CategoriesSwiper categories={categories}/>
        <Separator className="mt-10"/>
      </div>
    </div>
  );
}
