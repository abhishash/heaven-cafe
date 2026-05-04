'use client'

import HtmlRender from "@/components/shared/html-render"

interface OrderItemProps {
  item: any
}

export function OrderItem({ item }: OrderItemProps) {
  const product = item.product

  return (
    <div className="flex gap-4 items-start">
      {/* Product Image */}
      <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img
            src={`/images/${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23d1d5db" width="100" height="100"/%3E%3C/svg%3E'
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-base">
              {product.name}
            </h3>
            <HtmlRender html={product.description || product.brand_name} />
            <p className="text-sm text-gray-600 mt-2">
              Rs. {parseFloat(item.price).toFixed(2)} x {item.qty}
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="font-bold text-gray-900">
              ₹{parseFloat(item.final_price).toFixed(2)}/-
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
