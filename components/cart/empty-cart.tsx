import Link from 'next/link'
import { ChefHat, Home, MapPin } from 'lucide-react'

export default function EmptyCart() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-background to-amber-50 flex items-center justify-center overflow-hidden relative">
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
                            <h1 className="text-9xl sm:text-[120px] font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent leading-none">
                                🛒
                            </h1>
                            <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 -z-10"></div>
                        </div>
                    </div>

                    {/* Main Message */}
                    <div className="mb-8">
                        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                            Your Cart is Empty
                        </h2>
                        <p className="text-lg sm:text-xl text-muted-foreground mb-6">
                            Add some delicious items to get started!
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/menu"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-base sm:text-lg"
                        >
                            <Home className="w-5 h-5" />
                            Browse Menu
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
