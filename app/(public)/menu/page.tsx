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

        {/* RIGHT PRODUCTS */}
        <div
          className="container mx-auto mt-4 min-w-0 px-4 pb-12 pr-3"
        >
          {/* Menu Introduction */}
          <section className="mb-6 rounded-xl bg-secondary px-6 py-5 shadow-sm ring-1 ring-orange-100">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-orange-500">
                  Welcome to Heaven Cafe
                </p>

                <h1 className="text-2xl font-extrabold text-slate-800">
                  Delicious Food, Made Fresh
                </h1>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                  Explore our delicious selection of freshly prepared meals,
                  snacks, noodles, beverages, sweets, and more. Pick your
                  favorite and enjoy the taste of Heaven Cafe.
                </p>
              </div>

              <div className="hidden shrink-0 rounded-2xl bg-orange-50 px-5 py-3 text-center sm:block">
                <p className="text-xs font-medium text-slate-500">
                  Freshly Prepared
                </p>
                <p className="text-sm font-bold text-orange-600">
                  With Love ❤️
                </p>
              </div>
            </div>
          </section>

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