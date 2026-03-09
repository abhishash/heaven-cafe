"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative min-h-[40vh] w-full py-10 sm:py-16 px-4 text-white">
      
      {/* Background Image */}
      <Image
        src="/main-bg.jpg"
        alt="Fast Food"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-balance">
            Fast, Fresh, and Delicious
          </h1>

          <p className="text-xl mb-8 opacity-90">
            Order your favorite fast food items online and get them delivered
            to your door in minutes.
          </p>

          <Link href="/menu">
            <Button
              size="lg"
              className="bg-background cursor-pointer text-primary hover:bg-muted font-bold"
            >
              Order Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;