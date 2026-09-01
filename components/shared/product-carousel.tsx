"use client";

import Link from "next/link";
import { useGetProductsQuery } from "@/store/services/master-api";
import { Suspense } from "react";
import ProductCard from "../ProductCard";

const ProductCarousel = () => {
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {data?.map((item, index) => (
        <section
          key={index}
          className="px-4 pt-2 pb-6 sm:px-6 sm:pt-6 sm:pb-12 md:pt-10"
        >
          <div className="container mx-auto">
            {/* Header */}
            <div className="mb-3 flex items-center justify-between sm:mb-6">
              <h2 className="text-xl font-bold text-primary sm:text-2xl md:text-3xl">
                {item?.name}
              </h2>

              <div className="flex items-center gap-2">
                {/* View All */}
                <Link
                  href={`/menu/${item?.url}`}
                  className="
                    text-sm
                    font-semibold
                    text-primary
                    hover:underline
                    sm:text-base
                  "
                >
                  View All
                </Link>
              </div>
            </div>

            {/* Product Carousel */}
            <div
              id={`products-${index}`}
              className="
                flex
                gap-3
                overflow-x-auto
                scroll-smooth
                scrollbar-hide
                sm:gap-5
              "
            >
              {item?.products?.map((product) => (
                <div
                  key={product.id}
                  className="
                    min-w-[calc(50%-6px)]
                    w-[calc(50%-6px)]
                    sm:min-w-[220px]
                    sm:w-[220px]
                    md:min-w-[240px]
                    md:w-[240px]
                    lg:min-w-[260px]
                    lg:w-[260px]
                  "
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </Suspense>
  );
};

export default ProductCarousel;