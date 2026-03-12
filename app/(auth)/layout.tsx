import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen grid md:grid-cols-2 bg-secondary">

            <div className="hidden md:flex relative flex-col justify-center items-center text-white p-10 overflow-hidden">

                {/* Background Image */}
                <Image
                    src="/images/fast-food-bg.png"
                    alt="Fast Food"
                    fill
                    priority
                    className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-primary"></div>

                {/* Content */}
                <div className="relative z-10 text-center">
                    <Link href="/" className="flex justify-center items-center gap-2">
                        <div className="text-primary-foreground font-bold text-2xl">
                            <Image src="/logo/final-logo.png" className='' priority={true} alt='main-logo' width={160} height={120} />
                        </div>
                    </Link>
                    <h1 className="text-4xl font-bold mb-4">
                        The Heaven Fast Food & Café
                    </h1>

                    <p className="text-lg opacity-90 max-w-md">
                        Fresh burgers, crispy fries and delicious coffee delivered to your table.
                    </p>
                </div>

            </div>

            {/* Right Side Form */}
            <div className="flex items-center justify-center p-2 sm:p-6">
                {children}
            </div>

        </div>
    );
}