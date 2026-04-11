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
            <div className="min-h-screen flex mt-20 px-10 container mx-auto bg-background">
                <BottomNavigation />
                <main className="w-full">
                    {children}j
                </main>
            </div>
        </>
    );
}