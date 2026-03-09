"use client";

import { FC, useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { imageBaseUrl } from "@/lib/constants";
import { BannerDataTypes } from "@/lib/types";
import { Shimmer } from "./shimmer";

interface ImageCarouselProps {
  options: BannerDataTypes[];
}

const ImageCarousel: FC<ImageCarouselProps> = ({ options: images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (!images || images.length <= 1) return;

    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
  }, [images]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const handleDotClick = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      setIsPaused(true);
      stopAutoplay();

      setTimeout(() => {
        setIsPaused(false);
      }, 10000);
    },
    [stopAutoplay],
  );

  useEffect(() => {
    if (!isPaused && images && images.length > 1) {
      startAutoplay();
    }
    return () => stopAutoplay();
  }, [isPaused, images, startAutoplay, stopAutoplay]);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const mouseEndX = useRef<number | null>(null);

  if (!Array.isArray(images) || images.length === 0) return null;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 50) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (distance < -50) {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseStartX.current = e.clientX;
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseEndX.current = e.clientX;
    if (mouseStartX.current !== null && mouseEndX.current !== null) {
      const distance = mouseStartX.current - mouseEndX.current;
      if (distance > 50) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else if (distance < -50) {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
    mouseStartX.current = null;
    mouseEndX.current = null;
  };

  return (
    <section className="w-full pb-8 px-0 sm:px-0 sm:pb-12">
      <div
        className="group relative w-full overflow-hidden bg-green-50 h-[180px] sm:h-[240px] md:h-[320px] lg:h-[420px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {images.map((img, index) => {
          const isActive = index === currentIndex;

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="relative h-full w-full">
                <Shimmer className="h-full w-full" />

                <Image
                  src={`${imageBaseUrl}${img.image}`}
                  alt={img.name || `Banner ${index + 1}`}
                  fill
                  className="object-fill object-center"
                  priority={index === 0}
                  sizes="(max-width: 640px) 100vw, 
                     (max-width: 1024px) 100vw, 
                     100vw"
                />
              </div>
            </div>
          );
        })}

        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 z-0 flex -translate-x-1/2 gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-sm md:bottom-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/50 hover:bg-white/80 hover:w-4"
                }`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageCarousel;
