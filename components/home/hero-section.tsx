"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <>
    

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
                <span className="text-primary">Taste Heaven</span> in Every Bite
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Experience the most delicious fast food delivered straight to your door. Fresh ingredients, incredible flavors, and exceptional service.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/menu">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-base w-full sm:w-auto">
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="h-14 text-base w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary/10">
                  Sign In to Account
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-muted">
              <div>
                <p className="text-3xl font-bold text-primary">10K+</p>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-muted-foreground">Menu Items</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">4.9★</p>
                <p className="text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex items-center justify-center">
            <div className="relative w-full h-96">
              {/* Decorative card */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl backdrop-blur-sm"></div>
              <div className="absolute inset-4 bg-card rounded-2xl border-2 oberflow-hidden border-primary/30 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl">🍕</span>
                  <p className="text-2xl font-bold text-foreground mt-4">Fresh & Delicious</p>
                  <p className="text-muted-foreground">Premium quality ingredients</p>
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