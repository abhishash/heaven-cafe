"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { fetchHandler, Methods } from "@/lib/fetch-handler";
import { imageBaseUrl, productNotFound, SEARCH_PRODUCTS } from "@/lib/constants";
import { ProductDataTypesList } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryFromUrl = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(queryFromUrl);
  const [debouncedQuery, setDebouncedQuery] = useState(queryFromUrl);

  /* =========================
     Sync URL → Input
  ========================= */
  useEffect(() => {
    setSearchQuery(queryFromUrl);
    setDebouncedQuery(queryFromUrl);
  }, [queryFromUrl]);

  /* =========================
     Debounce
  ========================= */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  /* =========================
     Search API
  ========================= */
  const { data, isPending, isFetching } =
    useQuery<ProductDataTypesList>({
      queryKey: ["search-products", debouncedQuery],

      queryFn: () =>
        fetchHandler({
          endpoint: `${SEARCH_PRODUCTS.endpoint}?q=${encodeURIComponent(
            debouncedQuery
          )}`,
          method: SEARCH_PRODUCTS.method as Methods,
        }),

      enabled: debouncedQuery.trim().length >= 2,

      staleTime: 1000 * 60,
    });

  const products = data?.data ?? [];

  /* =========================
     Update URL
  ========================= */
  useEffect(() => {
    const query = searchQuery.trim();

    if (query.length >= 2) {
      router.replace(`/search?q=${encodeURIComponent(query)}`, {
        scroll: false,
      });
    }

    if (!query) {
      router.replace("/search", {
        scroll: false,
      });
    }
  }, [debouncedQuery, router, searchQuery]);

  /* =========================
     Clear Search
  ========================= */
  const handleClear = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    router.replace("/search");
  };

  return (
    <main className="min-h-[calc(100vh-120px)] bg-gray-50">
      {/* =========================
          Header
      ========================= */}
      <section className="border-b bg-linear-to-b from-primary to-primary/50">
        <div className="container mx-auto px-4 py-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            {/* Search Input */}
            <div className="relative">
              <Search
                className="
                  absolute
                  left-4
                  top-1/2
                  h-5
                  w-5
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <Input
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="
                  h-12
                  rounded-xl
                  border-none outline-none
                  bg-gray-50
                  pl-12
                  pr-12
                  text-base
                  shadow-sm
                  focus:bg-white
                "
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    rounded-full
                    p-1
                    text-gray-400
                    transition
                    hover:bg-gray-200
                    hover:text-gray-700
                  "
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          Results
      ========================= */}
      <section className="container mx-auto px-4 py-4 sm:px-6">
        {/* Search heading */}
        {debouncedQuery.length >= 2 && (
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="mt-1 text-sm text-gray-500">
                Search Results for{" "}
                <span className="font-medium text-gray-800">
                  "{debouncedQuery}"
                </span>
              </p>
            </div>

            {!isPending && (
              <span className="text-sm text-gray-500">
                {products.length} products
              </span>
            )}
          </div>
        )}

        {/* =========================
            Initial State
        ========================= */}
        {debouncedQuery.length < 2 && (
          <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Search className="h-7 w-7 text-primary" />
            </div>

            <h2 className="text-lg font-semibold text-gray-900">
              Start searching
            </h2>

            <p className="mt-1 max-w-md text-sm text-gray-500">
              Search for products by name, category, or keyword.
            </p>
          </div>
        )}

        {/* =========================
            Loading
        ========================= */}
        {debouncedQuery.length >= 2 &&
          (isPending || isFetching) && (
            <div className="flex flex-col gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="flex gap-4 overflow-hidden rounded-xl border bg-white p-3"
                >
                  <div className="h-24 w-24 shrink-0 animate-pulse rounded-lg bg-gray-200" />

                  <div className="flex flex-1 flex-col justify-center gap-3">
                    <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

        {/* =========================
            Products
        ========================= */}

        {debouncedQuery.length >= 2 &&
          !isPending &&
          !isFetching &&
          products.length > 0 && (
            <div className="divide-y">
              {products.map((product) => (
                <Link
                  key={product.url}
                  href={`/product/${product.url}`}
                  className="group flex items-center gap-3 py-3 transition hover:bg-gray-50"
                >
                  {/* Image */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-20 sm:w-20">
                    <Image
                      src={`${imageBaseUrl}${product?.image}`}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-primary sm:text-base">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-sm font-bold text-primary sm:text-base">
                      {formatPrice(parseInt(product.price), "INR")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

        {/* =========================
            No Results
        ========================= */}
        {debouncedQuery.length >= 2 &&
          !isPending &&
          !isFetching &&
          products.length === 0 && (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <Image
                src={productNotFound}
                alt="No products found"
                width={260}
                height={260}
                className="mb-4 opacity-80"
              />

              <h2 className="text-xl font-semibold text-gray-900">
                No products found
              </h2>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                We couldn't find anything matching{" "}
                <span className="font-medium">
                  "{debouncedQuery}"
                </span>
                .
              </p>

              <button
                onClick={handleClear}
                className="
                  mt-5
                  rounded-lg
                  bg-primary
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:opacity-90
                "
              >
                Clear Search
              </button>
            </div>
          )}
      </section>
    </main>
  );
}