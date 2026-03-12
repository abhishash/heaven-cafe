import { Product } from '@/lib/products';
import { ProductResponse } from '@/lib/types';
import { fetchHandler, methods } from '@/lib/fetch-handler';
import { PRODUCTS_DETAIL } from '@/lib/constants';
import ProductImageGallery from '@/components/product/product-image-gallery';
import ProductInfo from '@/components/product/product-Info';
import BackPath from '@/components/shared/back-path';
import RoutePath from '@/components/shared/route-path';
import { notFound } from 'next/navigation';
import { isObject } from '@/lib/type-guards';

interface ProductDetailPageProps {
  params: Promise<{ url: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { url} = await params;
  
   const productResponse = await fetchHandler<ProductResponse>({
    endpoint: `${PRODUCTS_DETAIL.endpoint}/${url}`,
    method: PRODUCTS_DETAIL?.method as methods,
  });

  const product : Product = productResponse?.data ;
  const relatedProducts = productResponse?.similar_products;
  const aplusBanner = productResponse?.aplus;


  if (!isObject(product)) {
    return notFound();
  }


  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg p-8 shadow-lg">
          {/* Product Image */}
           <ProductImageGallery
            thumbnailImg={product?.image}
            images={productResponse?.gallery}
          />

          {/* Product Details */}
          <ProductInfo product={product} productUrl={url} />
        </div>
      </div>
    </main>
  );
}
