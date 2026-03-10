"use client";

import { useState } from "react";
import { imageNotFound } from "@/lib/constants";
import Image from "next/image";

interface SafeImageProps {
    src?: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}

export function SafeImage({
    src,
    alt,
    width,
    height,
    className,
}: SafeImageProps) {
    const [imgSrc, setImgSrc] = useState(
        src ? `${process.env.ASSET_ENDPOINS}${src}` : imageNotFound
    );

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            onError={() => setImgSrc(imageNotFound)}
            className={className}
        />
    );
}