"use client";

import Link from "next/link";
import { Suspense, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import { isArray } from "@/lib/type-guards";
import { SafeImage } from "../shared/safe-image";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

const PermotionBanner = ({
    promotionalsData,
}: {
    promotionalsData: {
        name: string;
        url_link: string;
        image: string;
    }[];
}) => {
    const autoplay = useRef(
        Autoplay({
            delay: 3000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        })
    );

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
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            plugins={[autoplay.current]}
                            className="w-full"
                        >
                            <CarouselContent>
                                {promotionalsData.map((promo, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="basis-full md:basis-1/2 lg:basis-1/3"
                                    >
                                        <Link
                                            href={promo?.url_link || "#"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block overflow-hidden rounded-2xl group relative h-40 md:h-54 shadow-md"
                                        >
                                            <SafeImage
                                                src={promo.image}
                                                width={500}
                                                height={300}
                                                alt={promo.name}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                    </div>
                </section>
            ) : null}
        </Suspense>
    );
};

export default PermotionBanner;