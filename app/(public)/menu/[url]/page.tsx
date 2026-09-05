import { isArray } from '@/lib/type-guards'
import { fetchHandler, Methods } from '@/lib/fetch-handler'
import { Category, ProductDataTypesList, ProductResponse, ProductTypes } from '@/lib/types'
import { CATALOG_DETAIL } from '@/lib/constants'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/shared/category-filter'
import BackPath from '@/components/shared/back-path'
import { isObject } from 'framer-motion'
import { Suspense } from 'react'
import CategorySkeleton from '@/components/home/placeholder/category-skeleton'
import { CategoryComponent } from '@/components/home/categories'
import { MobileCategoryComponent } from '@/components/home/mobile-categories'
import NotFound from '@/components/shared/not-found'
import WelcomeBanner from '@/components/shared/welcome-banner'


export default async function CatalogPage({ params }: {
  params: Promise<{ url: string }>;
}) {

  const { url } = await params;

  const productResponse = await fetchHandler<ProductDataTypesList>({
    endpoint: `${CATALOG_DETAIL.endpoint}/${url}`,
    method: CATALOG_DETAIL?.method as Methods,
  });

  const products: ProductTypes[] = productResponse?.data ?? [];

  const categories: Category[] = productResponse?.categories ?? [];

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <main
        className="
                hidden
                min-h-[calc(100dvh-260px)]
                bg-gradient-to-b
                from-orange-50
                via-white
                to-amber-50
                py-4
                sm:block
              "
      >
        <Suspense
          fallback={<CategorySkeleton title="Our Menu" />}
        >
          <CategoryComponent />
        </Suspense>
        <div
          className="container mx-auto min-w-0 px-4 pb-12 pr-3"
        >
          <WelcomeBanner />
          {/* Products Grid */}
          <div className="grid grid-cols-2 mt-4 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isArray(products) ? (
              products?.map((product: ProductTypes) => (
                <ProductCard isSingle={true} key={product.id} product={product} />
              ))
            ) : (
              <NotFound />
            )}
          </div>
        </div>

      </main>

      <main className="bg-gray-50 py-6 sm:py-12 px-4 hidden">
        <div className="container mx-auto">
          {/* main category section */}
          <Suspense
            fallback={<CategorySkeleton title="Our Menu" />}
          >
            <CategoryComponent />
          </Suspense>

          {/* Category Filter */}
          <Suspense fallback="loading...">
            <div className="mb-5 sm:mb-10">
              <div className='flex items-center gap-4'>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isArray(products) ? (
              products?.map((product: ProductTypes) => (
                <ProductCard isSingle={true} key={product.id} product={product} />
              ))
            ) : (
              <NotFound />
            )}
          </div>
        </div>
      </main>

      {/* ================= MOBILE ================= */}
      <main
        className="
              min-h-[calc(100dvh-260px)]
              bg-gradient-to-b
              from-orange-50
              via-white
              to-amber-50
              sm:hidden
            "
      >
        <div className="mx-auto container">
          <Suspense
            fallback={<CategorySkeleton title="Our Menu" />}
          >
            <div className="grid grid-cols-[90px_1fr] gap-3">

              {/* LEFT CATEGORIES */}
              <MobileCategoryComponent />

              {/* RIGHT PRODUCTS */}
              <div className="min-w-0 mt-4 max-h-[calc(100dvh-160px)] pr-3 overflow-y-scroll">
                {/* Products will come here */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {isArray(products) ? (
                    products?.map((product: ProductTypes) => (
                      <ProductCard key={product.id} product={product} isSingle />
                    ))
                  ) : (
                    <NotFound />
                  )}
                </div>
              </div>

            </div>
          </Suspense>
        </div>
      </main>
    </>
  )
}