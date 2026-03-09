'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FoodCategory {
    id: number;
    name: string;
    image: string;
}

const foodCategories: FoodCategory[] = [
    { id: 1, name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500' },
    { id: 2, name: 'Pizza', image: 'https://images.unsplash.com/photo-1548365328-9f547fb0953d?w=500' },
    { id: 3, name: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=500' },
    { id: 4, name: 'Burger', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
    { id: 5, name: 'Chinese', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500' },
    { id: 6, name: 'South Indian', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500' },
    { id: 7, name: 'Dosa', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500' },
    { id: 8, name: 'Paratha', image: 'https://images.unsplash.com/photo-1626078299034-7f6d2d7b6b03?w=500' },
    { id: 9, name: 'Pasta', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=500' },
    { id: 10, name: 'Pav Bhaji', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500' },
    { id: 11, name: 'Salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500' },
    { id: 12, name: 'Pastry', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500' },
    { id: 13, name: 'Ice Cream', image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=500' },
    { id: 14, name: 'Sandwich', image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=500' },
    { id: 15, name: 'Rolls', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500' },
    { id: 16, name: 'Momos', image: 'https://images.unsplash.com/photo-1604908177522-402e7d1b4776?w=500' },
];

export default function ProductCarousel({ title }: { title: string }) {

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
        <section className="bg-gradient-to-b from-slate-50 to-white px-2 sm:px-0 py-12">

            <div className="mx-auto container">

                {/* Header */}
                <div className="mb-10 flex items-center justify-between">
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
  <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-background to-transparent z-10" />

  {/* Right Shadow */}
  <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-background to-transparent z-10" />

                <div
                    ref={scrollRef}
                    className="flex gap-4 sm:gap-8 overflow-x-auto scroll-smooth scrollbar-hide"
                >

                    {foodCategories.map((category) => (

                        <div
                            key={category.id}
                            className="min-w-[160px] flex flex-col items-center transition-transform duration-300 hover:scale-105"
                        >

                            <div className="mb-4 h-40 w-40 overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition">

                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-full w-full object-cover"
                                />

                            </div>

                            <h3 className="text-center text-lg font-medium text-slate-800">
                                {category.name}
                            </h3>

                        </div>

                    ))}

                </div>
                </div>
 

            </div>

        </section>
    );
}