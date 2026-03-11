import ProductCard from '@/components/ProductCard';
import { ALL_PRODUCTS } from '@/lib/constants';
import { fetchHandler, methods } from '@/lib/fetch-handler';
import { Category, ProductDataTypesList, ProductTypes } from '@/lib/types';
import { isArray, isObject } from '@/lib/type-guards';
import CategoryFilter from '@/components/shared/category-filter';
import BackPath from '@/components/shared/back-path';
import { Suspense } from 'react';

export default async function MenuPage() {

  const productResponse = await fetchHandler<ProductDataTypesList>({
    ...ALL_PRODUCTS as {
      endpoint: string,
      method: methods,
    }
  });

  const products = productResponse?.data ?? [];
  const categories = productResponse?.categories ?? [];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-balance">Our Menu</h1>

        {/* Category Filter */}
        <Suspense fallback="loading...">

          <div className="mb-12">
            <div className='flex items-center gap-4 mb-8'>
              <BackPath />
              <h2 className="text-lg font-semibold text-gray-700">Our Menus</h2>
            </div>
            {
              isObject(categories?.[0]) ? <div className="flex flex-nowrap no-scrollbar hide-scrollbar scrollbar-none overflow-x-auto gap-2"> <>
                <CategoryFilter categories={categories?.[0]?.subcategories as Category[]} />
              </>
              </div> : ""
            }
          </div>
        </Suspense>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isArray(products) ? (
            products?.map((product: ProductTypes) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No products found in this category</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
