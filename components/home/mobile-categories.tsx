'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Category } from '@/lib/types';
import { SafeImage } from '../shared/safe-image';
import { isArray } from '@/lib/type-guards';
import { useGetCategoriesQuery } from '@/store/services/master-api';
import CategorySkeleton from './placeholder/category-skeleton';

export default function Categories({
    title,
    categories,
}: {
    title: string;
    categories: Category[];
}) {
    const pathname = usePathname();

    return (
        <aside
            className="
                mt-3
                w-[92px]
                overflow-hidden
                rounded-r-[28px]
                bg-primary
                shadow-[4px_0_20px_rgba(0,0,0,0.08)]
            "
        >
            {/* Category Scroll Area */}
            <div
                className="
                    flex
                    max-h-[calc(100dvh-160px)]
                    flex-col
                    gap-3
                    overflow-y-auto
                    px-2
                    py-4
                    scrollbar-hide
                "
            >
                {categories.map((category) => {
                    const isActive =
                        pathname === `/menu/${category.url}`;

                    return (
                        <Link
                            key={category.url}
                            href={`/menu/${category.url}`}
                            className={`
                                group
                                relative
                                flex
                                w-full
                                shrink-0
                                flex-col
                                items-center
                                justify-center
                                rounded-2xl
                                p-1.5
                                transition-all
                                duration-200
                                active:scale-95

                                ${
                                    isActive
                                        ? 'bg-white shadow-md'
                                        : 'bg-white/85 hover:bg-white hover:shadow-sm'
                                }
                            `}
                        >
                            {/* Active Indicator */}
                            {isActive && (
                                <span
                                    className="
                                        absolute
                                        -left-[6px]
                                        top-1/2
                                        h-10
                                        w-1
                                        -translate-y-1/2
                                        rounded-r-full
                                        bg-primary
                                    "
                                />
                            )}

                            {/* Image */}
                            <div
                                className={`
                                    flex
                                    h-[64px]
                                    w-[64px]
                                    items-center
                                    justify-center
                                    overflow-hidden
                                    rounded-xl
                                    bg-slate-50
                                    transition-transform
                                    duration-200
                                    ${
                                        isActive
                                            ? 'scale-[1.02]'
                                            : 'group-hover:scale-105'
                                    }
                                `}
                            >
                                <SafeImage
                                    src={category.image}
                                    alt={category.name}
                                    width={80}
                                    height={80}
                                    className="
                                        h-full
                                        w-full
                                        object-contain
                                    "
                                />
                            </div>

                            {/* Category Name */}
                            <span
                                className={`
                                    mt-1.5
                                    w-full
                                    truncate
                                    px-1
                                    text-center
                                    text-[10px]
                                    font-semibold
                                    leading-4
                                    ${
                                        isActive
                                            ? 'text-primary'
                                            : 'text-slate-700'
                                    }
                                `}
                            >
                                {category.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}

export function MobileCategoryComponent({
    title,
}: {
    title?: string;
}) {
    const {
        data: categoryResponse,
        isLoading,
    } = useGetCategoriesQuery();

    if (isLoading) {
        return (
            <CategorySkeleton
                length={6}
                title={title ?? ''}
            />
        );
    }

    if (!isArray(categoryResponse)) {
        return null;
    }

    return (
        <Categories
            title={title ?? ''}
            categories={categoryResponse ?? []}
        />
    );
}