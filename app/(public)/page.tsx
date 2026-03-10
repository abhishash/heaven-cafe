import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import Categpries from '@/components/home/categories';
import ImageCarousel from '@/components/shared/image-carousel';
import { fetchHandler, methods } from '@/lib/fetch-handler';
import { BannerDataTypes, CategoryResponse, HomePageDataTypes, ProductsDataTypes, ProductTypes } from '@/lib/types';
import { CATEGORIES, HOMEPAGE_PRODUCTS, HOMEPAGE_SLIDERS } from '@/lib/constants';
import Image from 'next/image';
import HeroSection from '@/components/home/hero-section';
import FavouriteCategory from '@/components/shared/favourite-category';

export default async function Home() {

  const homePageBanners = await fetchHandler<{
    data: HomePageDataTypes[];
  }>({
    ...(HOMEPAGE_SLIDERS as {
      endpoint: string;
      method: methods;
    }),
  });

  const {
    data: homePageBannerLists,
  }: {
    data: BannerDataTypes[];
  } = homePageBanners;

  const categoryResponse = await fetchHandler<CategoryResponse>({
    ...CATEGORIES as {
      endpoint: string,
      method: methods,
    }
  });

  const res = await fetchHandler<{
    data: ProductsDataTypes[];
  }>({
    ...(HOMEPAGE_PRODUCTS as {
      endpoint: string;
      method: methods;
    }),
  });

  const { data }: { data: ProductsDataTypes[] } = res;

  return (
    <main className="min-h-screen bg-background">
      {/* Featured Products Section */}

      <ImageCarousel options={homePageBannerLists} />
      {/* Hero Section */}

      <Categpries title="Order our best food options" categories={categoryResponse?.data} />

      <HeroSection />
      {/* Favorite And Extra Product Banners */}
      {data?.map((item, index) => (
        <section key={index} className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-12 text-primary text-balance">
              {item?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {item?.products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Categories Banners */}
      <FavouriteCategory />

      {/* Call to Action */}
      <section className="bg-secondary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary">Ready to Order?</h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Browse our complete menu and find exactly what you're craving.
          </p>
          <Link href="/menu">
            <Button size="lg" className="bg-primary cursor-pointer text-primary-foreground hover:opacity-90 font-bold">
              Explore Full Menu
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl flex justify-center mb-4">
                <Image src="/images/delivery-truck.gif" alt='fast-delivery' height={80} width={80} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Get your order delivered in 30 minutes or less
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl flex justify-center mb-4">
                <Image src="/images/burger.gif" alt='fast-delivery' height={80} width={80} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">Fresh Food</h3>
              <p className="text-muted-foreground">
                All items prepared fresh to order
              </p>
            </div>
            <div className="text-center">
            <div className="text-4xl flex justify-center mb-4">
                <Image src="/images/wallet.gif" alt='fast-delivery' height={80} width={80} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">Easy Payment</h3>
              <p className="text-muted-foreground">
                Multiple payment options available
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
