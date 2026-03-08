'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer h-full flex flex-col">
        <div className="relative w-full h-40 bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.badge && (
            <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600">
              {product.badge}
            </Badge>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-2">{product.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mt-1 flex-1">{product.description}</p>

          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-orange-600">${product.price.toFixed(2)}</span>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
