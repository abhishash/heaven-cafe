'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Category, CategoryResponse, CmsResponse, FavCategoryResponse, SubCategory } from '@/lib/types';
import { fetchHandler, Methods } from '@/lib/fetch-handler';
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
                    method: Methods;
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
                                className="flex-none w-[calc(35%-6px)] sm:w-[160px] md:w-[180px] overflow-hidden rounded-xl transition-transform hover:scale-105"
                            >

                                <div className="h-20 w-full  bg-gradient-to-t from-secondary to-primary py-1 sm:h-32 md:h-36">
                                    <SafeImage
                                        src={category.image}
                                        alt={category.name}
                                        width={180}
                                        height={180}
                                        className="h-full w-full object-contain"
                                    />
                                </div>

                                {/* Name */}
                                <h3 className="px-2 py-2 text-center text-sm font-medium sm:text-base">
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
