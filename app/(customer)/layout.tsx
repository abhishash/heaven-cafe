import { BottomNavigation } from "@/components/customer/BottomNavigation";
import { CustomerLayout } from "@/components/customer/CustomerLayout";
import CustomerHeader from "@/components/customer/layout/CustomerHeader";
import { Footer } from "@/components/footer";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
            <CustomerHeader />
            <div className="min-h-screen sticky top-20 mb-16 mt-20 sm:mt-20 gap-x-6 flex max-w-6xl mx-auto bg-background">
                <BottomNavigation />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </>
    );
}