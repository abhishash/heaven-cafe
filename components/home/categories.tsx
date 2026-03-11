'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useBreakpoint } from '../hooks/useBreakpoint';
import Link from 'next/link';
import { Category } from '@/lib/types';
import { SafeImage } from '../shared/safe-image';
import { motion } from 'framer-motion';

export default function Categories({ title, categories }: { title: string, categories: Category[] }) {

  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  let itemsPerPage = 12;

  if (isMobile) {
    itemsPerPage = 4;
  } else if (isTablet) {
    itemsPerPage = 8;
  } else if (isDesktop) {
    itemsPerPage = 12;
  }
  const scrollRef = useRef<HTMLDivElement>(null);

  const pages = [];
  for (let i = 0; i < categories.length; i += itemsPerPage) {
    pages.push(categories.slice(i, i + itemsPerPage));
  }

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -1200,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 1200,
      behavior: 'smooth',
    });
  };

  return (
    <section className="px-0 sm:px-0 py-4 sm:py-12 bg-background">

      <div className="mx-auto container px-0 sm:px-6 lg:px-8 py-2 sm:py-20">

        {/* Header */}
        <div className="mb-6 px-2 sm:px-0 sm:mb-10 flex justify-between items-center">
          <h2 className="text-2xl sm:text-3xl text-primary font-bold">
            {title}
          </h2>

          <div className="hidden sm:flex gap-2">
            <Button variant="outline" size="icon" onClick={scrollLeft}>
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button variant="outline" size="icon" onClick={scrollRight}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Slider Wrapper */}
        <div className="relative">

          {/* Left Shadow */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-background to-transparent z-[9]" />

          {/* Right Shadow */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-background to-transparent z-[9]" />

          {/* Slider */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scroll-smooth gap-6 scrollbar-hide"
          >



            {pages.map((page, index) => (

              <div
                key={index}
                className="grid grid-cols-2 sm:grid-cols-6 grid-rows-2 gap-4 sm:gap-6 min-w-full"
              >

                {page.map((category) => (
                  <motion.div
                    key={category.url}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className=" transition-shadow duration-300 overflow-hidden cursor-pointer h-full"
                  >
                    <Link
                      href={`/menu/${category.url}"`}
                      className="flex flex-col items-center hover:scale-105 transition"
                    >
                      <div className="h-40 w-40 overflow-hidden rounded-xl shadow-lg">
                        <SafeImage
                          src={category.image}
                          alt={category.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <h3 className="mt-2 text-lg text-center font-medium">
                        {category.name}
                      </h3>
                    </Link>
                  </motion.div>

                ))}

              </div>

            ))}


          </div>
        </div>
      </div>
    </section>
  );
}