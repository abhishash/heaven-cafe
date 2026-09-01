import {
  CategoryComponent,
} from '@/components/home/categories';
import { MobileCategoryComponent } from '@/components/home/mobile-categories';
import CategorySkeleton from '@/components/home/placeholder/category-skeleton';
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
              <div className="min-w-0">
                {/* Products will come here */}
                <h1>Product Info</h1>
              </div>

            </div>
          </Suspense>
        </div>
      </main>
    </>
  );
}