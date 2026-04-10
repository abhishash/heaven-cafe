'use client'

import { useState } from 'react'
import { ChevronRight, Check, Star, DownloadIcon } from 'lucide-react'
import Image from 'next/image'
import { OrderProducts } from '@/lib/types'
import { encodeId, formatIndianDateTime, formatPrice } from '@/lib/utils'
import { isArray } from '@/lib/type-guards'
import { imageBaseUrl } from '@/lib/constants'
import Link from 'next/link'
import { Order } from '@/types/order'

export function OrderCard({ order }: { order: Order }) {
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({})
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const handleImageError = (itemId: number) => {
    setImageError((prev) => ({ ...prev, [itemId]: true }))
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {
        isArray(order.products) ? <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {order.products.slice(0, 12).map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-100 overflow-hidden"
              >
                {!imageError[item.id] ? (
                  <Image
                    src={`${imageBaseUrl}${item?.image}`}
                    alt={item?.name}
                    height={120}
                    width={120}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(item.id)}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-400">No image</span>
                  </div>
                )}
              </div>
            ))}
            {order?.products?.length > 12 && (
              <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">+{order.products.length - 12}</span>
              </div>
            )}
          </div>
        </div> : null
      }


      {/* Order Details */}
      <div className="px-6 py-4 space-y-3">
        {/* Status */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
              <Check size={14} className="text-primary" />
            </span>
            <span className="font-semibold text-foreground">{order.status}</span>
          </div>
        </div>

        {/* Date */}
        <p className="text-sm text-gray-500">{formatIndianDateTime(order?.created_at)}</p>

        {/* Rating */}
        <div className="flex gap-1">
          <div className="flex flex-col gap-0.5">
            <div className='flex gap-0.5 items-center'>


              {Array.from({ length: 5 }).map((_, i) => (
                // <span key={i} className="text-primary">★</span>
                <Star
                  key={i}
                  size={16}
                  className={`cursor-pointer ${i <= 4
                    ? "fill-primary text-primary"
                    : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            {
              order?.order_rating &&
              <p className='text-sm text-green-600'>{order?.order_rating}</p>
            }
          </div>
        </div>
      </div>

      {/* Footer */}
      <Link href={`/customer/orders/${encodeId(order?.id)}`} aria-label={`order-details-${order.id}`} >
        <div className="px-6 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <div className='space-x-1.5'>
            <span className="font-semibold text-lg text-primary">{formatPrice(parseInt(order?.final_amount), "INR")}</span>
            <span className="text-sm text-slate-500 line-through">{formatPrice(parseInt(order?.total_amount), "INR")}</span>
          </div>
          <ChevronRight size={20} className="text-primary" />
        </div>
      </Link>
    </div>
  )
}
