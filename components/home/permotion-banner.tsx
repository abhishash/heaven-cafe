"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { isArray } from "@/lib/type-guards";
import { SafeImage } from "../shared/safe-image";

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

const PermotionBanner = ({ promotionalsData }: { promotionalsData: { name: string; url_link: string; image: string }[] }) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <Suspense
            fallback={
                <div className="text-center py-10">
                    Loading promotions...
                </div>
            }
        >
            {isArray(promotionalsData) ? (
                <section className="py-2 sm:py-10 px-4 sm:px-6">
                    <div className="container mx-auto">
                        <Carousel
                            setApi={setApi}
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent>
                                {promotionalsData.map((promo, index : number) => (
                                    <CarouselItem
                                        key={index}
                                        className="basis-full md:basis-1/2 lg:basis-1/3"
                                    >
                                        <Link
                                            href={promo?.url_link || "#"}
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

                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

                                            <div className="absolute bottom-4 left-4">
                                                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-bold shadow-sm">
                                                    {promo.name}
                                                </span>
                                            </div>
                                        </Link>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>

                        {/* Pagination Dots */}
                        <div className="flex sm:hidden items-center justify-center gap-2 mt-4 sm:mt-6">
                            {promotionalsData.map((_, index : number) => (
                                <button
                                    key={index}
                                    onClick={() => api?.scrollTo(index)}
                                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${current === index
                                        ? "w-8 bg-primary"
                                        : "w-2.5 bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            ) : null}
        </Suspense>
    );
};

export default PermotionBanner;