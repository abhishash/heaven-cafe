'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { products } from '@/lib/products';
import { Plus, Minus } from 'lucide-react';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = params;
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState('');
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  // Get product ID from params
  const getProductId = async () => {
    const { id } = await resolvedParams;
    return id;
  };

  const [productId, setProductId] = useState<string | null>(null);

  if (productId === null) {
    getProductId().then(setProductId);
  }

  const product = productId ? products.find((p) => p.id === productId) : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => router.push('/menu')}>
            Back to Menu
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity, customization);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          className="mb-8"
          onClick={() => router.back()}
        >
          ← Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg p-8 shadow-lg">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="text-sm font-semibold text-orange-500 bg-orange-50 px-3 py-1 rounded">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold mt-4 text-gray-800">{product.name}</h1>
              <p className="text-2xl font-bold text-orange-600 mt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Customization */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Special Instructions (Optional)
              </label>
              <textarea
                value={customization}
                onChange={(e) => setCustomization(e.target.value)}
                placeholder="E.g., Extra sauce, no onions, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={3}
              />
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus size={20} />
                </button>
                <span className="px-6 py-2 font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="mb-8 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal ({quantity}x)</span>
                <span className="font-semibold">${(product.price * quantity).toFixed(2)}</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-6"
            >
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push('/menu')}
              className="w-full mt-3 text-lg"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
