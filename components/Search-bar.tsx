"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { Search, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchHandler, methods } from "@/lib/fetch-handler";
import { SEARCH_PRODUCTS } from "@/lib/constants";
import { ProductDataTypesList } from "@/lib/types";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export function SearchBar({
  placeholder = "Search products...",
}: { placeholder?: string; }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ==============================
     Debounce Logic
  ============================== */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  /* ==============================
     TanStack Query
  ============================== */
  const { data, isPending } = useQuery<ProductDataTypesList>({
    queryKey: ["search", debouncedQuery],
    queryFn: () =>
      fetchHandler({
        endpoint: `${SEARCH_PRODUCTS.endpoint}?q=${debouncedQuery}`,
        method: SEARCH_PRODUCTS.method as methods,
      }),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60,
  });

  const results = data?.data ?? [];

  /* ==============================
     Handlers
  ============================== */
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
        setIsOpen(true);
    },
    [],
  );

  const handleClear = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setIsOpen(false);
  };

  /* ==============================
     Close Dropdown on Outside Click
  ============================== */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sm:min-w-sm w-full relative" ref={dropdownRef}>
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

        <Input
          type="text"
          placeholder={placeholder}
          className="pl-10 pr-10 !bg-white"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsOpen(true)}
        />

        {isPending && searchQuery?.length > 1 && (
          <Loader2 className="absolute right-3 h-5 w-5 animate-spin" />
        )}

        {searchQuery && !isPending && (
          <button
            onClick={handleClear}
            className="absolute right-3 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && searchQuery.length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="h-80 overflow-auto py-4">
            {results.length > 0 ? (
              <div className="divide-y">
                {results.map((product) => (
                  <Link
                    href={`/product/${product?.url}`}
                    key={product.url}
                    onClick={handleClear}
                  >
                    <div className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer" >
                      <Image
                        src={`${process.env.ASSET_ENDPOINS}${product?.image}` || "/placeholder.svg"}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm font-semibold">
                          {formatPrice(parseInt(product.price), "INR")}
                        </p>
                      </div>
                    </div>

                  </Link>
                ))}
              </div>
            ) : (
              !isPending && (
                <div className="h-60 flex flex-col items-center justify-center text-sm text-gray-500 text-center gap-2">
                  <Image
                    src="/image.png"
                    alt="No products found"
                    width={80}
                    height={80}
                  />
                  <span>No products found</span>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}