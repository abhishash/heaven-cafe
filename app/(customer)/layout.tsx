import CustomerHeader from "@/components/customer/layout/CustomerHeader";
import { Footer } from "@/components/footer";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function CustomerLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <CustomerHeader />
            <main className="min-h-screen mt-22 sm:mt-20.5 bg-background">
                {children}
            </main>
        </>
    );
}