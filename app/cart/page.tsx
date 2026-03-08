'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-lg p-12 shadow">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Add some delicious items to get started!
            </p>
            <Link href="/menu">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                Browse Menu
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-200 p-6 flex gap-4"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.category}</p>

                    {item.customization && (
                      <p className="text-sm text-orange-600 mt-2 italic">
                        Note: {item.customization}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-4">
                      <span className="font-bold text-orange-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus size={16} />
                        </button>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-4">
              <Link href="/menu" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={clearCart}
                className="text-red-500 hover:text-red-600"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h2>

              <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">$3.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">
                    ${((totalPrice + 3.99) * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-orange-600">
                  ${(totalPrice + 3.99 + (totalPrice + 3.99) * 0.08).toFixed(2)}
                </span>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
