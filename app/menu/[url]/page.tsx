import { isArray } from '@/lib/type-guards'
import { fetchHandler, methods } from '@/lib/fetch-handler'
import { ProductResponse, ProductTypes } from '@/lib/types'
import { CATALOG_DETAIL } from '@/lib/constants'
import ProductCard from '@/components/ProductCard'
import CategoryFilter from '@/components/shared/category-filter'
import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'


export default async function CatalogPage({ params }: {
    params: Promise<{ url: string }>;
}) {

    const { url } = await params;

    const productResponse = await fetchHandler<ProductResponse>({
        endpoint: `${CATALOG_DETAIL.endpoint}/${url}`,
        method: CATALOG_DETAIL?.method as methods,
    });

    const products: ProductTypes[] = productResponse?.data ?? [];

    const categories = productResponse?.categories ?? [];


    

    return (
        <main className="min-h-screen bg-gray-50 py-12 px-4">
              <div className="max-w-7xl mx-auto">
                
                {/* Category Filter */}
                <div className="mb-12">
                       
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Filter by Category</h2>
                   
                  {
                    isArray(categories) ? <div className="flex flex-wrap gap-2"> <> <Link href='/menu' className='flex border font-semibold rounded-sm px-3 h-fit py-2 border-primary text-primary items-center gap-x-2'><ArrowLeftIcon className='size-4 text-primary' /> Back to Menu</Link>
                    <CategoryFilter categories={categories} />
                    </> 
                  </div> : ""
                  }
                  
                </div>
        
                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  { isArray(products) ? (
                    products?.map((product : ProductTypes) => (
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