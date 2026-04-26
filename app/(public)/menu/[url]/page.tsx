import { isArray } from '@/lib/type-guards'
import { fetchHandler, methods } from '@/lib/fetch-handler'
import { Category, ProductDataTypesList, ProductResponse, ProductTypes, SubCategory } from '@/lib/types'
import { CATALOG_DETAIL } from '@/lib/constants'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/shared/category-filter'
import { notFound } from 'next/navigation'
import BackPath from '@/components/shared/back-path'
import { isObject } from 'framer-motion'
import { Suspense } from 'react'


export default async function CatalogPage({ params }: {
  params: Promise<{ url: string }>;
}) {

  const { url } = await params;

  const productResponse = await fetchHandler<ProductDataTypesList>({
    endpoint: `${CATALOG_DETAIL.endpoint}/${url}`,
    method: CATALOG_DETAIL?.method as methods,
  });

  const products: ProductTypes[] = productResponse?.data ?? [];

  if (!isArray(products)) {
    return notFound();
  }

  const categories: Category[] = productResponse?.categories ?? [];

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Category Filter */}
        <Suspense fallback="loading...">

          <div className="mb-12">
            <div className='flex items-center gap-4 mb-8'>
              <BackPath />
              <h2 className="text-lg font-semibold text-gray-700">{categories?.[0]?.name}</h2>
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
  )


}