'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { isArray } from '@/lib/type-guards';
import EmptyCart from '@/components/cart/empty-cart';
import CartItem from '@/components/cart/cart-item';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {

  const { items: cart, totalPrice } = useSelector((state: RootState) => state.cart);

  if (!isArray(cart)) {
    return (
      <EmptyCart />
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
              {cart.map((item) => (
                <CartItem key={item.cart_id} item={item} />
              ))}
            </div>

            <div className="mt-6 flex gap-4">
              <Link href="/menu" className="flex-1">
                <Button variant="outline" size="lg" className='w-full rounded-full border-2 text-gray-800 hover:border-primary cursor-pointer transition-al hover:bg-primary duration-300 font-bold' >
                  Continue Shopping
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                // onClick={clearCart}
                className="inline-flex cursor-pointer items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300 "
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
                  <span className="font-semibold"> {formatPrice(totalPrice, "INR")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold text-gray-600">Calculate in Checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">
                    {
                      formatPrice(0, "INR")
                    }
                  </span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-orange-600">
                  {formatPrice(totalPrice, "INR")}
                </span>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full cursor-pointer bg-primary rounded-full hover:bg-primary/80 text-white font-bold">
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
