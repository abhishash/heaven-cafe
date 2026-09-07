import { notFound } from 'next/navigation';
import { ProductResponse, ProductTypes } from '@/lib/types';
import { fetchHandler, Methods } from '@/lib/fetch-handler';
import { PRODUCTS_DETAIL } from '@/lib/constants';
import { isArray, isObject } from '@/lib/type-guards';
import ProductCard from '@/components/ProductCard';
import ProductImageGallery from '@/components/product/product-image-gallery';
import ProductInfo from '@/components/product/product-Info';
import SingleBanner from '@/components/pages/menus/Product-details/single-banner';

interface ProductDetailPageProps {
  params: Promise<{
    url: string;
  }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { url } = await params;

  const productResponse = await fetchHandler<ProductResponse>({
    endpoint: `${PRODUCTS_DETAIL.endpoint}/${url}`,
    method: PRODUCTS_DETAIL.method as Methods,
  });

  const product = productResponse?.data as ProductResponse | undefined;
  const relatedProducts = productResponse?.similar_products ?? [];
  const aplusBanner = productResponse?.aplus;

  /*
   * Product not found
   */
  if (!isObject(product)) {
    notFound();
  }



  return (
    <main className="min-h-screen bg-[#fafafa]">
      <section className="px-3 pt-4 pb-16 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-6xl">

          {/* =========================================
              BREADCRUMB
          ========================================== */}
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex min-w-0 items-center gap-2 text-xs sm:mb-6 sm:text-sm"
          >
            <span className="shrink-0 font-medium text-gray-500 transition-colors hover:text-orange-500">
              Heaven Cafe
            </span>

            <span className="shrink-0 text-gray-300">/</span>

            <span className="shrink-0 text-gray-400">
              Product
            </span>

            <span className="shrink-0 text-gray-300">/</span>

            <span
              title={product.name as string}
              className="max-w-[180px] truncate font-semibold text-gray-700 sm:max-w-[300px]"
            >
              {product.name as string}
            </span>
          </nav>

          {/* =========================================
              PRODUCT DETAILS
          ========================================== */}
          <section
            aria-label="Product details"
            className="
              relative
              overflow-hidden
              rounded-2xl
              border border-gray-100
              bg-white
              shadow-[0_8px_35px_rgba(0,0,0,0.06)]
              sm:rounded-3xl
            "
          >
            {/* Background Decoration */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute inset-x-0 top-0
                h-32
                bg-linear-to-b
                from-orange-50/80
                via-orange-50/30
                to-transparent
              "
            />

            <div
              className="
                relative
                grid
                grid-cols-1
                gap-6
                p-4
                sm:gap-4
                sm:p-6
                lg:grid-cols-2
                lg:p-8
              "
            >
              {/* =====================================
                  PRODUCT IMAGE
              ====================================== */}
              <div className="min-w-0">
                <ProductImageGallery
                  thumbnailImg={product.image as string}
                />
              </div>

              {/* =====================================
                  PRODUCT INFORMATION
              ====================================== */}
              <div className="flex min-w-0 flex-col justify-center">
                <ProductInfo
                  product={product as unknown as ProductTypes}
                />
              </div>
            </div>
          </section>

          {/* =========================================
              A+ BANNERS
          ========================================== */}
          {/* A Plus Bannner */}
          {isArray(aplusBanner) ? (
            <div className="my-6 container mx-auto space-y-3">
              <h2 className="text-base tracking-wide sm:text-2xl text-primary font-bold">          Handpicked favourites you’ll love at Heaven Cafe
              </h2>
              {aplusBanner?.map((item: {
                type: "single" | "two" | "three";
                images: string[];
              }, index: number) => (
                <SingleBanner key={index} bannerType={item?.type} bannerImage={item?.images} />
              ))}
            </div>
          ) : null}


          {/* =========================================
              SIMILAR PRODUCTS
          ========================================== */}
          {relatedProducts.length > 0 && (
            <section
              aria-labelledby="similar-products-title"
              className="mt-10 sm:mt-14"
            >
              {/* Section Header */}
              <div className="mb-5 flex items-end justify-between gap-4 sm:mb-7">

                {/* Heading */}
                <div className="min-w-0">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500"
                    />

                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-500 sm:text-[11px]">
                      Heaven Cafe
                    </span>
                  </div>

                  <h2
                    id="similar-products-title"
                    className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl"
                  >
                    You May Also Like
                  </h2>

                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    More delicious choices for you
                  </p>
                </div>

                {/* Similar Badge */}
                <div
                  className="
                    hidden
                    shrink-0
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-orange-100
                    bg-orange-50
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-orange-600
                    sm:flex
                  "
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-orange-500"
                  />

                  Similar
                </div>
              </div>

              {/* Products */}
              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  sm:grid-cols-3
                  sm:gap-5
                  lg:grid-cols-4
                "
              >
                {relatedProducts.map((item: ProductTypes, index: number) => (
                  <ProductCard
                    key={item?.id ?? `similar-product-${index}`}
                    isSingle={false}
                    product={item}
                  />
                ))}
              </div>
            </section>
          )}

          {/* =========================================
              FOOTER BRANDING
          ========================================== */}
          <footer className="mt-4 pb-6 text-center sm:mt-16 sm:pb-8">
            <div
              aria-hidden="true"
              className="
                mx-auto
                mb-3
                h-px
                max-w-xs
                bg-linear-to-r
                from-transparent
                via-gray-200
                to-transparent
              "
            />

            <p className="text-xs font-medium text-gray-400">
              Made with <span aria-label="love">❤️</span> at Heaven Cafe
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}