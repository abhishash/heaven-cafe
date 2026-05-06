'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ProductTypes } from '@/lib/types';
import { imageBaseUrl } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import HtmlRender from './shared/html-render';

interface ProductCardProps {
  product: ProductTypes;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = Math.round(
    ((parseFloat(product.ac_price) - parseFloat(product.price)) /
      parseFloat(product.ac_price)) *
    100,
  );

  const isOutOfStock = parseInt(product?.in_stock as string) <= 0;


  return (
    <Link href={isOutOfStock ? "#" : `/product/${product.url}`}
      className={isOutOfStock ? "pointer-events-none" : ""}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={isOutOfStock ? {} : { y: -6 }}
        transition={{ duration: 0.3 }}
        className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer h-full flex flex-col 
        ${isOutOfStock ? "opacity-60 grayscale" : ""}`}
      >
        {/* Image */}
        <div className="relative w-full h-36 sm:h-50 bg-gray-100 overflow-hidden">
          <motion.div
            whileHover={isOutOfStock ? {} : { scale: 1.08 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              src={`${imageBaseUrl}${product.image}`}
              alt={product.name}
              fill
              className={`object-fill sm:object-cover object-top ${isOutOfStock ? "blur-[1px]" : ""
                }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
          {isOutOfStock && (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Out of Stock
            </Badge>
          )}

          {discountPercentage && !isOutOfStock && (
            <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600">
              {discountPercentage} % Off
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-2 sm:p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-sm sm:text-lg text-gray-800 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-2 sm:mt-4">
            <span className="text-xl sm:text-2xl font-bold text-orange-600">
              {formatPrice(parseInt(product.price), "INR")}
            </span>

            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded">
              {product.brand}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}