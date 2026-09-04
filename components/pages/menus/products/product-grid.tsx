"use client";

import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { isArray } from "@/lib/type-guards";
import { useGetAllProductQuery } from "@/store/services/master-api";
import { productNotFound } from "@/lib/constants";
import NotFound from "@/components/shared/not-found";

const ProductGrid = () => {
  const { data: products, isLoading } = useGetAllProductQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-11 w-11 animate-spin rounded-full border-[3px] border-orange-100 border-t-orange-500" />
          <p className="text-sm font-medium text-gray-500">
            Finding delicious items...
          </p>
        </div>
      </div>
    );
  }

  const hasProducts = isArray(products);

  if (!hasProducts) {
    return (
      <NotFound />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {products?.map((product: any) => (
        <ProductCard
          key={product.id}
          product={product}
          isSingle
        />
      ))}
    </div>
  );
};

export default ProductGrid;
