import Link from 'next/link'
import { ChefHat, Home, MapPin } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-linear-to-b from-background to-amber-50 flex items-center justify-center overflow-hidden relative">
      {/* Decorative burger elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '0s' }}>
        🍔
      </div>
      <div className="absolute top-32 right-20 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}>
        🍟
      </div>
      <div className="absolute bottom-20 left-20 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>
        🌮
      </div>
      <div className="absolute bottom-32 right-10 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '1.5s' }}>
        🍕
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Error Code */}
          <div className="mb-8">
            <div className="inline-block relative">
              <h1 className="text-9xl sm:text-[120px] font-black text-transparent bg-clip-text bg-linear-to-r from-primary via-secondary to-accent leading-none">
                404
              </h1>
              <div className="absolute inset-0 blur-2xl bg-linear-to-r from-primary/30 via-secondary/30 to-accent/30 -z-10"></div>
            </div>
          </div>

          {/* Main Message */}
          <div className="mb-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Oops! This Meal Is Out of Stock
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6">
              We can't find the page you're looking for. It seems like this menu item has been discontinued!
            </p>
          </div>

          {/* Decorative Icon */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 bg-linear-to-br from-secondary/20 to-accent/20 rounded-full">
                <ChefHat className="w-16 h-16 sm:w-20 sm:h-20 text-primary animate-pulse" />
              </div>
              <div className="absolute -top-2 -right-2 text-4xl animate-spin" style={{ animationDuration: '3s' }}>
                ⚠️
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-primary to-secondary text-white font-bold rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-base sm:text-lg"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300 text-base sm:text-lg"
            >
              <MapPin className="w-5 h-5" />
              View Menu
            </Link>
          </div>

          {/* Helpful Info */}
          <div className="mt-16 p-8 bg-white rounded-2xl border-2 border-accent shadow-lg">
            <h3 className="text-xl font-bold text-foreground mb-4">Need Help?</h3>
            <ul className="text-muted-foreground space-y-2 text-left inline-block">
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">•</span>
                Check our full menu for available items
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">•</span>
                Visit our contact page if you have questions
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent font-bold">•</span>
                Explore our special deals and combos
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
