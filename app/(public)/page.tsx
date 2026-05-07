import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import Categpries from "@/components/home/categories";
import ImageCarousel from "@/components/shared/image-carousel";
import { fetchHandler, methods } from "@/lib/fetch-handler";
import {
  BannerDataTypes,
  CategoryResponse,
  HomePageDataTypes,
  ProductsDataTypes,
  ProductTypes,
} from "@/lib/types";
import {
  CATEGORIES,
  HOMEPAGE_PRODUCTS,
  HOMEPAGE_SLIDERS,
} from "@/lib/constants";
import Image from "next/image";
import HeroSection from "@/components/home/hero-section";
import FavouriteCategory from "@/components/shared/favourite-category";
import { ArrowRight } from "lucide-react";
import { isArray } from "@/lib/type-guards";
import { Suspense } from "react";
import CategorySkeleton from "@/components/home/placeholder/category-skeleton";
import { SafeImage } from "@/components/shared/safe-image";

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
    ...(CATEGORIES as {
      endpoint: string;
      method: methods;
    }),
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

  const promotionalRes = await fetchHandler<{
    data: { name: string; url_link: string; image: string }[];
  }>({
    endpoint: "promotionals",
    method: "GET" as methods,
  });

  const { data: promotionalsData } = promotionalRes;

  return (
    <>
      {/* main image banner Section */}
      {isArray(homePageBannerLists) ? (
        <ImageCarousel options={homePageBannerLists} />
      ) : null}
      {/* main category section */}
      <Suspense
        fallback={<CategorySkeleton title="Order our best food options" />}
      >
        {isArray(categoryResponse?.data) ? (
          <Categpries
            title="Order our best food options"
            categories={categoryResponse?.data}
          />
        ) : null}
      </Suspense>

      {/* Hero Section */}
      <HeroSection />

      {/* Promotional Offers Section */}
      <Suspense
        fallback={
          <div className="text-center py-10">Loading promotions...</div>
        }
      >
        {isArray(promotionalsData) ? (
          <section className="py-6 sm:py-10 px-4 sm:px-6">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {promotionalsData.map((promo, index) => (
                  <Link
                    href={promo?.url_link || "#"}
                    key={index}
                    target="_blank"
                    className="block overflow-hidden rounded-2xl group relative h-40 md:h-54 shadow-md"
                  >
                    <SafeImage
                      src={promo.image}
                      width={500}
                      height={300}
                      alt={promo.name}
                      className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 transition-colors" />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-bold shadow-sm">
                        {promo.name}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </Suspense>

      {/* Favorite And Extra Product Banners */}
      <Suspense fallback={"loading...."}>
        {data?.map((item, index) => (
          <section key={index} className="pb-6 sm:pb-20 pt-6 sm:pt-10 px-4 sm:px-6">
            <div className="container mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-12 text-primary text-balance">
                {item?.name}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {item?.products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        ))}
      </Suspense>

      {/* Call to Action */}
      <section className="sm:px-6 lg:px-8 px-3" >
        <div className="bg-secondary container mx-auto py-6 sm:py-10 rounded-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-primary">
              Ready to Order?
            </h2>
            <p className="text-lg mb-4 sm:mb-8 text-muted-foreground">
              Browse our complete menu and find exactly what you're craving.
            </p>
            <Link href="/menu">
              <Button
                size="lg"
                className="bg-primary cursor-pointer text-primary-foreground hover:opacity-90 font-bold"
              >
                Explore Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Favorite Category */}
      <Suspense
        fallback={
          <CategorySkeleton length={2} title="Favourite Daily Products" />
        }
      >
        <FavouriteCategory />
      </Suspense>

      {/* CTA Section */}

      <section className="px-3 sm:px-0">
        <div className="bg-linear-to-r my-6 px-4 sm:px-6 lg:px-8 sm:my-10 py-10 sm:py-20 container mx-auto from-secondary to-secondary rounded-2xl">
          <div className="max-w-4xl mx-auto px-0 sm:px-6 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
              Ready to Experience Heaven?
            </h3>
            <p className="text-primary/90 mb-6 sm:mb-8 text-lg">
              Sign up today and enjoy exclusive deals on your first order.
            </p>
            <Link href="/register">
              <Button size="lg" className="cursor-pointer h-14 text-lg">
                Create Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl flex justify-center mb-4">
                <Image
                  src="/images/delivery-truck.gif"
                  alt="fast-delivery"
                  height={80}
                  width={80}
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">
                Fast Delivery
              </h3>
              <p className="text-muted-foreground">
                Get your order delivered in 30 minutes or less
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl flex justify-center mb-4">
                <Image
                  src="/images/burger.gif"
                  alt="fast-delivery"
                  height={80}
                  width={80}
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">
                Fresh Food
              </h3>
              <p className="text-muted-foreground">
                All items prepared fresh to order
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl flex justify-center mb-4">
                <Image
                  src="/images/wallet.gif"
                  alt="fast-delivery"
                  height={80}
                  width={80}
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">
                Easy Payment
              </h3>
              <p className="text-muted-foreground">
                Multiple payment options available
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
