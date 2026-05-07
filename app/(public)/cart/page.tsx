'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { isArray } from '@/lib/type-guards';
import EmptyCart from '@/components/cart/empty-cart';
import CartItem from '@/components/cart/cart-item';
import { formatPrice } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { fetchHandler } from '@/lib/fetch-handler';
import { clearCart } from '@/lib/redux/slice/cartSlice';
import { AddressResponse } from '@/lib/types';
import TableNumber from '@/components/pop-up/table-number';
import { useState } from 'react';
import { SquarePen } from 'lucide-react';
import AddressPopUp from '@/components/checkout/modal/address-pop';
import { useGetAddressesQuery } from '@/store/services/address-api';

export default function CartPage() {
  const [open, setOpen] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const { items: cart, totalPrice } = useSelector((state: RootState) => state.cart);
  const isDineIn = useSelector((state: RootState) => state.orderType?.isDineIn);
  const tableNumber = useSelector((state: RootState) => state.orderType?.tableNumber);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  //-------Clear the cart mutation---------//
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      fetchHandler({
        endpoint: "cart/clear",
        method: "DELETE",
        token: session?.user?.accessToken,
      })
  });

  //------Get the all customer address-----//
  const { data, isLoading, refetch } = useGetAddressesQuery<{
    data: AddressResponse;
    isLoading: boolean;
  }>(null);

  const defaultAddress = data?.data?.find((item) => item?.is_default === 1);

  const handleClearCart = async () => {
    const response = await mutateAsync();
    if (response?.status) {
      // Optionally, you can also dispatch an action to clear the cart in Redux if needed
      dispatch(clearCart());
    }
  }

  if (!isArray(cart)) {
    return (
      <EmptyCart />
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-4 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl sm:text-4xl font-bold mb-2 sm:mb-8 text-gray-800">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {cart.map((item) => (
                <CartItem key={item.cart_id} item={item} />
              ))}
            </div>

            <div className="mt-4 sm:mt-6 flex gap-4">
              <Link href="/menu" className="flex-1">
                <Button variant="outline" size="lg" className='w-full rounded-full border-2 text-gray-800 hover:border-primary cursor-pointer transition-al hover:bg-primary duration-300 font-bold' >
                  Continue Shopping
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                disabled={isPending}
                onClick={handleClearCart}
                className="inline-flex cursor-pointer items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300 "
              > {isPending ? "Clearing..." : "Clear Cart"}
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
                    {formatPrice(0, "INR")}
                  </span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-xl sm:text-2xl font-bold text-orange-600">
                  {formatPrice(totalPrice, "INR")}
                </span>
              </div>
              {/* Footer section */}
              <div className='flex gap-y-2 flex-col'>
                <div
                  className="w-full relative cursor-pointer text-primary border border-primary rounded-2xl bg-primary/5 font-medium px-4 py-3 flex flex-col items-start gap-1 text-left"
                >
                  {isLoading ? (
                    <p className="text-sm animate-pulse">
                      Fetching your default address...
                    </p>
                  ) : (
                    isDineIn ? <> <p onClick={() => setOpen(true)} className="text-xs flex justify-between text-primary truncate w-full">
                      Table No : {tableNumber}  <button onClick={() => setOpen(true)} className='absolute bottom-2 bg-primary py-1 px-1 rounded-md cursor-pointer right-2'><SquarePen className='size-4 text-white' /> </button>
                    </p></> : <>
                      <p className="text-sm font-semibold truncate w-full">
                        📍 {defaultAddress?.address || "No address found"}
                      </p> <button onClick={() => setShowAddress(true)} className='absolute bottom-2 bg-primary py-1 px-1 rounded-md cursor-pointer right-2'><SquarePen className='size-4 text-white' /> </button>
                      {/* Landmark + Street */}
                      <p className="text-xs text-muted-foreground truncate w-full">
                        {defaultAddress?.landmark}, {defaultAddress?.street}
                      </p>
                      {/* Contact */}
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Contact:</span>{" "}
                        {defaultAddress?.person} - {defaultAddress?.contact}
                      </div>
                    </>
                  )}
                </div>

                {
                  isDineIn ? tableNumber ? <Link href="/checkout">
                    <Button size="lg" className="w-full cursor-pointer bg-primary rounded-full hover:bg-primary/80 text-white font-bold">
                      Proceed to Checkout
                    </Button>
                  </Link> :
                    <Button size="lg" className="w-full cursor-pointer bg-primary/20 hover:bg-primary/20 rounded-full  text-white font-bold">
                      Proceed to Checkout
                    </Button>
                    : data?.data?.length > 0 ? <Link href="/checkout">
                      <Button size="lg" className="w-full cursor-pointer bg-primary rounded-full hover:bg-primary/80 text-white font-bold">
                        Proceed to Checkout
                      </Button>
                    </Link> : <Button size="lg" className="w-full cursor-pointer bg-primary/20 hover:bg-primary/20 rounded-full  text-white font-bold">
                      Proceed to Checkout
                    </Button>
                }

              </div>
              {isDineIn && <TableNumber setOpen={setOpen} open={open} />}
              <AddressPopUp setOpen={setShowAddress} open={showAddress} addresses={data?.data} refetch={refetch} />
            </div>
          </div>
        </div>
      </div>
    </main >
  );
}
