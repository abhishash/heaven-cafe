"use client";

import { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import HtmlRender from "../shared/html-render";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { fetchHandler } from "@/lib/fetch-handler";
import { signIn, useSession } from "next-auth/react";
import { addToCart, removeFromCart } from "@/lib/redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { isObject } from "@/lib/type-guards";
import LoginModal from "../customer/modal/LoginModal";
import { FieldValues } from "react-hook-form";


interface ProductInfoProps {
  product: Product;
  productUrl: string;
}

const ProductInfo = ({ product, productUrl }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState('');
  const [openLogin, setOpenLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: {
      product_id: number;
      qty: number;
      type: "custom" | "remove" | "add";
    }) =>
      fetchHandler({
        endpoint: "cart/add",
        method: "POST",
        data: payload,
        token: session?.user?.accessToken,
      }),
  });

  const handleAddToCart = async () => {
    if (!isObject(session?.user)) {
      setOpenLogin(true);
      return;
    }
    await mutateAsync({
      product_id: parseInt(product?.id),
      qty: quantity || 1,
      // price: (product?.ac_price),
      type: "custom",
    }).then((res) => {
      if (res?.status) {
        console.log('Add to Cart Response:', res);
        toast.success(res?.message);
        dispatch(addToCart({ ...res?.data, customization }));
      } else {
        toast.warning(res?.message);
      }
    }).catch((err) => {
      toast.error(err?.message);
    })
  };

  const handleLogin = async (data: FieldValues) => {

    setLoading(true);

    try {
      const response = await signIn("credentials", {
        username: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (response?.ok) {
        toast.success("Login successful");
        await handleAddToCart();
      } else {
        toast.warning(response?.error);
      }

    } catch (err) {
      toast.warning("Something went wrong");
    } finally {
      setOpenLogin(false);
      setLoading(false);
    }
  };


  const { mutateAsync: removeCartItem, isPending: isRemoveCartLoading } = useMutation({
    mutationFn: (payload: {
      cart_id: number;
    }) =>
      fetchHandler({
        endpoint: "cart/remove",
        method: "DELETE",
        data: payload,
        token: session?.user?.accessToken,
      }),
  });

  const removeItem = async (id: number) => {
    try {
      await removeCartItem({
        cart_id: id,
      }).then((res) => {
        if (res?.status) {
          dispatch(removeFromCart(res?.remove_cart_id)); // ✅ Redux update
        }
      });
    } catch (error) {
      console.error(error);
      alert("Error adding to cart");
    }
  }
  console.log('Product Info Rendered with product:', product);
  return (
    <>

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
        <HtmlRender html={product?.description} />

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
            <span className="font-semibold">{formatPrice(quantity * product.price, "INR")}</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        {
          parseInt(product?.in_stock as string) <= 0 ? (
            <Button
              size="lg"
              disabled={true}
              className="w-full cursor-not-allowed bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-6"
            >
              Out Of STock
            </Button>
          ) : <Button
            onClick={handleAddToCart}
            size="lg"
            className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-6"
          >
            {isPending ? '✓ Added to Cart!' : 'Add to Cart'}
          </Button>
        }


        <Button
          variant="outline"
          onClick={() => router.push('/menu')}
          className="w-full mt-3 text-lg cursor-pointer"
        >
          Continue Shopping
        </Button>
      </div>
      <LoginModal
        open={openLogin}
        setOpen={setOpenLogin}
        onLogin={handleLogin}
        isLoading={loading}
      />
    </>
  )

}

export default ProductInfo