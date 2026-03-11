import ProductCard from '@/components/ProductCard';
import { ALL_PRODUCTS } from '@/lib/constants';
import { fetchHandler, methods } from '@/lib/fetch-handler';
import { ProductDataTypesList, ProductTypes } from '@/lib/types';
import { isArray } from '@/lib/type-guards';
import CategoryFilter from '@/components/shared/category-filter';

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
        <div className="mb-12">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Filter by Category</h2>
          {
            isArray(categories) ? <div className="flex flex-wrap gap-2"> <CategoryFilter categories={categories} />
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
  );
}
