import {
  CategoryComponent,
} from '@/components/home/categories';
import { MobileCategoryComponent } from '@/components/home/mobile-categories';
import CategorySkeleton from '@/components/home/placeholder/category-skeleton';
import ProductGrid from '@/components/pages/menus/products/product-grid';
import WelcomeBanner from '@/components/shared/welcome-banner';
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

        {/* RIGHT PRODUCTS */}
        <div
          className="container mx-auto mt-4 min-w-0 px-4 pb-12 pr-3"
        >
          {/* Menu Introduction */}
          <WelcomeBanner />

          {/* Products */}
          <section>
            <div className="mb-4 px-1 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Our Menu
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose from our delicious food and beverages
                </p>
              </div>
            </div>

            <ProductGrid />
          </section>
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
                <ProductGrid />
              </div>

            </div>
          </Suspense>
        </div>
      </main>
    </>
  );
}