'use client';

import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({
      left: direction === 'left' ? -500 : 500,
      behavior: 'smooth',
    });
  };

  // Auto scroll
  useEffect(() => {
    const container = scrollRef.current;

    if (!container || categories.length === 0) return;

    const startAutoScroll = () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }

      autoScrollRef.current = setInterval(() => {
        const maxScroll =
          container.scrollWidth - container.clientWidth;

        // If reached the end, go back to beginning
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({
            left: 0,
            behavior: 'smooth',
          });
        } else {
          container.scrollBy({
            left: 300,
            behavior: 'smooth',
          });
        }
      }, 3000);
    };

    startAutoScroll();

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [categories.length]);

  // Pause auto-scroll
  const pauseAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  // Resume auto-scroll
  const resumeAutoScroll = () => {
    if (autoScrollRef.current) return;

    const container = scrollRef.current;

    if (!container) return;

    autoScrollRef.current = setInterval(() => {
      const maxScroll =
        container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      } else {
        container.scrollBy({
          left: 300,
          behavior: 'smooth',
        });
      }
    }, 3000);
  };

  return (
    <section className="container mx-auto px-4 py-3 sm:py-5">
      {/* Carousel */}
      <div
        ref={scrollRef}
        onMouseEnter={pauseAutoScroll}
        onMouseLeave={resumeAutoScroll}
        onTouchStart={pauseAutoScroll}
        onTouchEnd={resumeAutoScroll}
        className="
          flex
          gap-3
          overflow-x-auto
          scrollbar-hide
          scroll-smooth
        "
      >
        {categories.map((category) => (
          <Link
            key={category.url}
            href={`/menu/${category.url}`}
            className="
              flex-none
              w-[calc(35%-6px)]
              sm:w-[160px]
              md:w-[180px]
              overflow-hidden
              rounded-xl
              bg-gradient-to-t
              from-secondary
              to-primary
              transition-transform
              hover:scale-105
            "
          >
            {/* Image */}
            <div className="h-20 w-full sm:h-32 md:h-36">
              <SafeImage
                src={category.image}
                alt={category.name}
                width={180}
                height={180}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Name */}
            <h3 className="truncate px-2 py-2 text-center text-sm font-medium sm:text-base">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CategoryComponent({ title }: { title?: string }) {
  const { data: categoryResponse, isLoading } = useGetCategoriesQuery();

  if (isLoading) {
    return <CategorySkeleton length={2} title={title ?? ""} />
  }

  return (
    isArray(categoryResponse) ? (
      <Categories
        title={title ?? ""}
        categories={categoryResponse ?? []}
      />
    ) : null
  )
}