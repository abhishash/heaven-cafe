'use client';

import { mockOrders } from '@/lib/mockData';
import { CustomerLayout } from '@/components/customer/CustomerLayout';
import { ArrowLeft, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useGetOrderByIdQuery } from '@/store/services/order-api';
import { decodeId, encodeId } from '@/lib/utils';
import OrderDetailsPage from '@/components/customer/orderDetails';

interface OrderDetailsPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function Page({ params }: OrderDetailsPageProps) {
  const { orderId } = await params;
  
  return (
    <OrderDetailsPage orderId={decodeURIComponent(orderId)} />
  );
}
