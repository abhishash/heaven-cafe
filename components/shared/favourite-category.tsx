'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Category, CategoryResponse, CmsResponse, FavCategoryResponse, SubCategory } from '@/lib/types';
import { fetchHandler, methods } from '@/lib/fetch-handler';
import { FAVOURITE_CATEGORIES, HOME_CATEGORIES } from '@/lib/constants';
import Link from 'next/link';
import { SafeImage } from './safe-image';
import { isObject } from '@/lib/type-guards';
import CategorySkeleton from '../home/placeholder/category-skeleton';

interface FoodCategory {
    id: number;
    name: string;
    image: string;
}


interface ProductCarouselProps {
    title: string;
    subCategories: SubCategory[];
}

export default function FavouriteCategory() {
    const { data: categoriesResponse, isPending } = useQuery<FavCategoryResponse>({
        queryKey: [`favourite-category`],
        queryFn: () =>
            fetchHandler({
                ...(FAVOURITE_CATEGORIES as {
                    endpoint: string;
                    method: methods;
                }),
            }),
    });

    const categories = categoriesResponse?.data;

    return (
        isPending ? <CategorySkeleton length={2} title="Favourite Daily Products" /> :
            isObject(categories) ? < CategoriesCarousel
                title={categories?.name}
                subCategories={categories?.subCategories ?? []}
            /> : null
    );
}


export const CategoriesCarousel = ({ title, subCategories }: ProductCarouselProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({
            left: -400,
            behavior: 'smooth',
        });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({
            left: 400,
            behavior: 'smooth',
        });
    };
    return (
        <section className="bg-linear-to-b from-slate-50 to-white px-0 sm:px-4 py-6 sm:py-10">

            <div className="mx-auto container">
                {/* Header */}
                <div className="mb-6 sm:mb-10 px-3 flex items-center justify-between">
                    <h2 className="text-2xl sm:text-3xl text-primary font-bold">
                        {title}
                    </h2>

                    <div className="hidden sm:flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-md"
                            onClick={scrollLeft}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>

                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-md"
                            onClick={scrollRight}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Scroll Container */}
                <div className='relative'>
                    {/* Left Shadow */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-linear-to-r from-background to-transparent z-[9]" />

                    {/* Right Shadow */}
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-linear-to-l from-background to-transparent z-[9]" />

                    <div
                        ref={scrollRef}
                        className="flex gap-4 sm:gap-8 overflow-x-auto scroll-smooth scrollbar-hide"
                    >

                        {subCategories?.map((category) => (

                            <Link
                                href={`/menu/${category?.url}`}
                                key={category.url}
                                className="min-w-[160px] flex flex-col items-center transition-transform duration-300 hover:scale-105"
                            >

                                <div className="mb-4 h-40 w-40 overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition">

                                    <SafeImage
                                        src={category.image}
                                        alt={category.name}
                                        width={40}
                                        height={40}
                                        className="h-full w-full object-fill"
                                    />
                                </div>

                                <h3 className="text-center text-lg font-medium text-slate-800">
                                    {category.name}
                                </h3>

                            </Link>

                        ))}

                    </div>
                </div>


            </div>

        </section>
    )
}
