'use client';

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
