import {
  CategoryComponent,
} from '@/components/home/categories';
import { MobileCategoryComponent } from '@/components/home/mobile-categories';
import CategorySkeleton from '@/components/home/placeholder/category-skeleton';
import ProductGrid from '@/components/pages/menus/products/product-grid';
import { Suspense } from 'react';

export default function MenuPage() {
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
                <ProductGrid />
              </div>

            </div>
          </Suspense>
        </div>
      </main>
    </>
  );
}