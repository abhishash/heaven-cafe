"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 py-4 sm:py-10">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4  sm:space-y-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                <span className="text-primary">Taste Heaven</span> in Every Bite
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Experience the most delicious fast food delivered straight to your door. Fresh ingredients, incredible flavors, and exceptional service.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/menu">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base w-full sm:w-auto">
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-0 justify-between sm:gap-6 pt-4 sm::pt-8 border-t border-muted">
              <div className="flex flex-col items-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">10K+</p>
                <p className="text-muted-foreground text-sm sm:text-base">Happy Customers</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">10+</p>
                <p className="text-muted-foreground text-sm sm:text-base">Menu Items</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary">4.9★</p>
                <p className="text-muted-foreground text-sm sm:text-base">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Premium Cafe Hero Visual */}
          <div className="flex items-center justify-center">
            <div className="relative w-full h-72 sm:h-96 border border-primary overflow-hidden rounded-[2rem]">

              {/* Floating Glow */}
              <div className="absolute -top-10 -right-10 z-0 h-40 w-40 rounded-full bg-primary/30 blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 z-0 h-40 w-40 rounded-full bg-secondary/30 blur-3xl animate-pulse" />

              {/* Outer Glass Frame */}
              <div className="absolute inset-0 rounded-[2rem] border border-white/20 bg-white/5 shadow-2xl backdrop-blur-sm" />

              {/* Video Container */}
              <div className="absolute inset-3 sm:inset-4 overflow-hidden rounded-[1.5rem] border border-white/20">

                {/* Food Video */}
                <video
                  className="
          absolute inset-0
          h-full w-full
          object-cover
          scale-105
          animate-cafe-zoom
        "
                  src="/videos/fast-food.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />

                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Soft Color Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/20" />

                {/* Glass Content Card */}
                <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7">

                  <div className="
          rounded-2xl
          border border-white/20
          bg-white/10
          px-5 py-4
          backdrop-blur-xl
          shadow-xl
        ">

                    <div className="flex items-center gap-3">

                      {/* Food Icon */}
                      <div className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-xl
              bg-white/15
              border border-white/20
              backdrop-blur-md
            ">
                        <span className="text-xl">🍔</span>
                      </div>

                      <div>
                        <p className="text-lg font-bold text-white">
                          Fresh & Delicious
                        </p>

                        <p className="text-sm text-white/70">
                          Premium quality ingredients
                        </p>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Top Badge */}
                <div className="
        absolute top-4 left-4
        rounded-full
        border border-white/20
        bg-black/20
        px-3 py-1.5
        text-xs font-medium
        text-white
        backdrop-blur-md
      ">
                  ✨ Heaven Cafe
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  );
};

export default HeroSection;