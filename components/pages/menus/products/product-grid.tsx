"use client";

import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { isArray } from "@/lib/type-guards";
import { useGetAllProductQuery } from "@/store/services/master-api";
import { productNotFound } from "@/lib/constants";

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
      <div className="col-span-full">
        <div className="relative flex min-h-[calc(100dvh - 160px)] flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-b from-orange-50/80 via-white to-white px-5 py-10 text-center">

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-orange-100/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-amber-100/50 blur-3xl" />

          {/* Small badge */}
          <div className="relative z-10 mb-2 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 text-xs font-semibold text-orange-600 shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
            Fresh from Heaven Cafe
          </div>

          {/* Empty state image */}
          <div className="relative z-10 mt-6 w-full max-w-[360px] sm:max-w-[420px]">
            <Image
              src={productNotFound}
              alt="No products available"
              width={500}
              height={500}
              priority
              className="h-auto w-full object-contain drop-shadow-sm"
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* CTA */}
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/menu"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/25 active:translate-y-0"
              >
                Explore Our Menu

                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>

              <Link
                href="/"
                className="rounded-full border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      </div>
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
