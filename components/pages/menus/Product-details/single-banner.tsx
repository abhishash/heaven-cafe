"use client";

import Image from "next/image";

type Props = {
  bannerType: "single" | "two" | "three";
  bannerImage: string[];
};

const SingleBanner = ({ bannerType, bannerImage }: Props) => {
  return (
    <section className="w-full">

      {/* SINGLE BANNER */}
      {bannerType === "single" && bannerImage[0] && (
        <div className="relative w-full rounded-2xl overflow-hidden shadow-md group">
          <Image
            src={bannerImage[0]}
            alt="banner"
            width={1200}
            height={600}
            priority
            className="w-full h-auto transition-transform duration-500"
          />
        </div>
      )}

      {/* TWO BANNERS */}
      {bannerType === "two" && (
        <div className="grid grid-cols-2 gap-4 my-6">
          {bannerImage.slice(0, 2).map((img, index) => (
            <div
              key={index}
              className="relative w-full rounded-2xl h-[150px] sm:h-[220px] md:h-[300px] overflow-hidden shadow-md group"
            >
              <Image
                src={img}
                alt={`banner-${index}`}
                fill
                className="object-fill transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
            </div>
          ))}
        </div>
      )}

      {/* THREE BANNERS */}
      {bannerType === "three" && (
        <div className="grid grid-cols-3 gap-4">
          {bannerImage.slice(0, 3).map((img, index) => (
            <div
              key={index}
              className="relative w-full h-[140px] sm:h-[200px] md:h-[360px] rounded-2xl overflow-hidden shadow-md group"
            >
              <Image
                src={img}
                alt={`banner-${index}`}
                fill
                className="object-contain transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SingleBanner;