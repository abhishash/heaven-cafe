"use client";

import { useState } from "react";
import { imageNotFound, placeholderImg } from "@/lib/constants";
import Image from "next/image";

interface SafeImageProps {
    src?: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    sizes?: string;
    fill?: boolean;
}

export function SafeImage({
    src,
    alt,
    width,
    height,
    className,
    sizes,
    fill = false,
}: SafeImageProps) {
    const [imgSrc, setImgSrc] = useState(
        src ? `${process.env.ASSET_ENDPOINS}${src}` : placeholderImg
    );

    return (fill ? <Image
        src={imgSrc}
        alt={alt}
        onError={() => setImgSrc(placeholderImg)}
        className={className}
        sizes={sizes}
        fill
    /> :
        <Image
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            onError={() => setImgSrc(placeholderImg)}
            className={className}
            sizes={sizes}
        />
    );
}