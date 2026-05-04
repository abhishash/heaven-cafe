'use client';

import { mockOrders } from '@/lib/mockData';
import { CustomerLayout } from '@/components/customer/CustomerLayout';
import { ArrowLeft, MapPin, Clock, CheckCircle, XCircle, Info, User, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useGetOrderByIdQuery } from '@/store/services/order-api';
import { decodeId, encodeId } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { OrderItem } from './OrderItem';
import { isObject } from '@/lib/type-guards';

interface OrderDetailsPageProps {
    orderId: string;
}

export default function OrderDetailsPage({ orderId }: OrderDetailsPageProps) {
    const { data: order, isLoading } = useGetOrderByIdQuery(Number(decodeId(orderId)))

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (!isObject(order)) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                <p className="text-center text-muted-foreground text-lg">Order not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="">
                {/* Header */}
                <div className="bg-white border-b">
                    <Link href="/customer/orders" className="px-6 py-4 flex items-center gap-3">
                        <ArrowLeft className="w-6 h-6 text-gray-900" />
                        <h1 className="text-2xl font-bold text-gray-900">ORDER #{order.order_no}</h1>
                    </Link>
                </div>

                {/* Order Details Section */}
                <div className="bg-white border-b">
                    <div className="px-6 py-6 space-y-6">
                        {/* Location */}
                        <div className="flex gap-4">
                            <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="text-sm text-gray-600">Restaurant Dine-in at</div>
                                <div className="text-lg font-semibold text-gray-900">
                                    {order.location || 'Sector-63, Noida'}
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="flex gap-4">
                            <Wallet className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="text-sm text-gray-600">Payment Method</div>
                                <div className="text-lg font-semibold text-gray-900">
                                    {order.payment_method}
                                </div>
                            </div>
                        </div>

                        {/* Customer Info */}
                        <div className="flex gap-4">
                            <User className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="text-sm text-gray-600">Ordered for</div>
                                <div className="text-lg font-semibold text-gray-900">
                                    {order.customer_name || 'Abhishek Kumar'}
                                </div>
                                <div className="text-sm text-gray-600 mt-0.5">
                                    {order.customer_phone || '7906948573'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white border-b">
                    <div className="px-6 py-6 space-y-4">
                        {order?.items?.map((item: any, index: number) => (
                            <div key={item.id}>
                                <OrderItem item={item} />
                                {index < order.items.length - 1 && <Separator className="mt-4" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Optional Add-ons Section */}
                {order.optional_items && order.optional_items.length > 0 && (
                    <div className="bg-gray-50 border-b">
                        <div className="px-6 py-6">
                            {order.optional_items.map((item: any) => (
                                <div key={item.id} className="bg-white p-4 rounded-lg flex items-start gap-4">
                                    <div className="w-20 h-20 bg-gray-300 rounded flex-shrink-0" />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                        <p className="text-sm text-gray-600 mt-2">{item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-gray-900">₹{item.price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Order Summary */}
                <div className="bg-white px-6 py-8">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">Order Total</span>
                            <span className="font-semibold text-gray-900">
                                ₹{parseFloat(order.total_amount).toFixed(2)}
                            </span>
                        </div>

                        {parseFloat(order.total_discount) > 0 ? (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Discount</span>
                                <span className="font-semibold text-red-600">
                                    -₹{parseFloat(order.total_discount).toFixed(2)}
                                </span>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Discount</span>
                                <span className="font-semibold text-red-600">-₹0</span>
                            </div>
                        )}

                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 flex items-center gap-2">
                                Taxes and Charges
                                <Info className="w-4 h-4 text-gray-400" />
                            </span>
                            <span className="font-semibold text-gray-900">
                                ₹{order.tax_charges || '15.84'}
                            </span>
                        </div>

                        <Separator className="my-6" />

                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-gray-900">TOTAL PAYABLE</span>
                            <span className="text-2xl font-bold text-gray-900">
                                ₹{parseFloat(order.final_amount).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* View Receipt Button */}
                    <Button
                        variant="outline"
                        className="w-full mt-8 h-12 text-base font-semibold border-2 border-gray-800 text-gray-800 hover:bg-gray-50"
                    >
                        VIEW RECEIPT
                    </Button>
                </div>
            </div>
        </div>
    );
}
