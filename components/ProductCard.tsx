'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ProductTypes } from '@/lib/types';
import { imageBaseUrl } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: ProductTypes;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.url}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer h-full flex flex-col"
      >
        {/* Image */}
        <div className="relative w-full h-40 bg-gray-100 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              src={`${imageBaseUrl}${product.image}`}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>

          {product?.discount && (
            <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600">
              {product.discount} %
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-2">
            {product.name}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2 mt-1 flex-1">
            {product.name}
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-orange-600">
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