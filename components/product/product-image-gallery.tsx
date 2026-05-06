"use client";

import { useState } from "react";
import { GalleryImage } from "@/lib/types";
import Image from "next/image";
import { imageBaseUrl } from "@/lib/constants";

export default function ProductImageGallery({ images, thumbnailImg }: { images: GalleryImage[], thumbnailImg: string }) {

  const [isLoading, setIsLoading] = useState(true);

  return (

    <div className="flex items-start justify-center">
      <div className="relative w-full h-72 sm:h-96 bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={`${imageBaseUrl}/${thumbnailImg}`}
          alt="Product image"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          onLoadingComplete={() => setIsLoading(false)}
          priority
        />
        {isLoading && (
          <div className="absolute inset-0 animate-pulse bg-muted" />
        )}
      </div>
    </div>

  );
}