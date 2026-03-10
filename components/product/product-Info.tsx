"use client";

import { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import HtmlRender from "../shared/html-render";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface ProductInfoProps {
  product: Product;
  productUrl: string;
}



const ProductInfo = ({ product, productUrl }: ProductInfoProps) => {
 const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState('');
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem(product, quantity, customization);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
    return (

        <div className="flex flex-col">
            <div className="mb-6">
              <span className="text-sm font-semibold text-orange-500 bg-orange-50 px-3 py-1 rounded">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold mt-4 text-gray-800">{product.name}</h1>
              <p className="text-2xl font-bold text-orange-600 mt-2">
                {formatPrice(product.price, "INR")}
              </p>
            </div>
            <HtmlRender html={product?.description}  />
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
                  className="p-2 hover:bg-gray-100 cursor-pointer"
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
                <span className="font-semibold">{ formatPrice(product.price, "INR" )}</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-6"
            >
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push('/menu')}
              className="w-full mt-3 text-lg cursor-pointer"
            >
              Continue Shopping
            </Button>
          </div>
    )

}

export default ProductInfo