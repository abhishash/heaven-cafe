"use client";

import ProductCard from "@/components/ProductCard";
import { isArray } from "@/lib/type-guards";
import { ProductTypes } from "@/lib/types";
import { useGetAllProductQuery } from "@/store/services/master-api";

const ProductGrid = () => {
    const { data: products, isLoading } = useGetAllProductQuery();

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {isArray(products) ? (
                products?.map((product: any) => (
                    <ProductCard key={product.id} product={product} isSingle />
                ))
            ) : (
                <div className="col-span-full text-center py-12">
                    <p className="text-gray-500 text-lg">No products found in this category</p>
                </div>
            )}
        </div>
    )
}

export default ProductGrid;