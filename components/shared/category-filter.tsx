"use client";

import Link from "next/link";
import { Category } from "@/lib/types";
import { SafeImage } from "./safe-image";
import { Button } from "../ui/button";

type Props = {
  categories: Category[];
};

export default function CategoryFilter({ categories }: Props) {

  return (
    categories.map((category) => {

        return (
          <Link key={category.url} href={`/menu/${category?.url}`}>
            {/* Category */}
            <Button
              variant="outline"
              className="cursor-pointer !py-5 text-primary border border-primary"
            >
              <div className="flex items-center gap-3">
                <SafeImage
                  src={`${category.image}`}
                  alt={category.name}
                  width={32}
                  height={32}
                  className="rounded-md h-8 bg-gray-100 border border-gray-100 max-w-8 object-cover object-center"
                />
                <span className="text-base  font-bold">{category.name}</span>
              </div>
            </Button>
          </Link>
        );
      })
  );
}