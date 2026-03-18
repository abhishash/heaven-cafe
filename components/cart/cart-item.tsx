import { fetchHandler } from "@/lib/fetch-handler";
import { addToCart, removeFromCart } from "@/lib/redux/slice/cartSlice";
import { CartItem as CartItemTypes } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { SafeImage } from "../shared/safe-image";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2 } from "lucide-react";
import Spinner from "../shared/spinner";
import { useState } from "react";

const CartItem = ({ item }: { item: CartItemTypes }) => {
    const dispatch = useDispatch();
    const { data: session } = useSession();
    const [type, setType] = useState("");

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: {
            product_id: string;
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

    const updateQuantity = async (type: "add" | "remove", id: string) => {
        setType(type);
        try {
            await mutateAsync({
                product_id: id,
                qty: 1,
                type: type,
            }).then((res) => {
                if (res?.status) {
                    dispatch(addToCart({ ...res?.data })); // ✅ Redux update
                } else {
                    toast.warning(res?.message);
                }
            });
        } catch (error) {
            toast.warning("Error adding to cart");
        }
        setType("");
    }

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
                } else {
                    toast.warning(res?.message);
                }
            });
        } catch (error) {
            toast.error("Error adding to cart");
        }
    }
    return (
        <div
            key={item.id}
            className="border-b border-gray-200 p-6 flex gap-4"
        >
            {/* Product Image */}
            <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <SafeImage
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="object-cover"
                />
            </div>

            {/* Product Details */}
            <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>

                {item?.customization && (
                    <p className="text-sm text-orange-600 mt-2 italic">
                        Note: {item.customization}
                    </p>
                )}

                <div className="flex items-center gap-x-2 justify-between mt-4">
                    <span className="font-bold text-orange-600">
                        {formatPrice(item.price, "INR")}
                    </span>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                        <div className='flex py-0.5 px-0.5 items-center border border-gray-700 rounded-full gap-x-2'>
                            <button
                                onClick={() => { item?.qty === 1 ? removeItem(item?.cart_id) : updateQuantity("remove", item.product_id) }}
                                disabled={type === "remove" && isPending}
                                className="p-1 cursor-pointer hover:bg-gray-100 rounded-full"
                            > {
                                    type === "remove" && isPending ? <Spinner width={16} height={16} /> : <Minus size={16} />
                                }

                            </button>
                            <span className="w-8 text-center font-semibold">{item.qty}</span>
                            <button
                                onClick={() => updateQuantity("add", item?.product_id)}
                                disabled={type === "add" && isPending}
                                className="p-1 cursor-pointer hover:bg-gray-100 rounded-full"
                            > {
                                    type === "add" && isPending ? <Spinner width={16} height={16} /> : <Plus size={16} />
                                }
                            </button>
                        </div>
                        {/* Remove Button */}
                        {
                            isRemoveCartLoading ? <button
                                disabled={isRemoveCartLoading}
                                className="sm:ml-4 ml-0 cursor-not-allowed p-2 text-red-500 hover:bg-transparent rounded"
                            >
                                <Spinner width={20} height={20} />
                            </button> : <button
                                onClick={() => removeItem(item.cart_id)}
                                disabled={isRemoveCartLoading}
                                className="sm:ml-4 ml-0 p-2 cursor-pointer text-red-500 hover:bg-transparent rounded"
                            >
                                <Trash2 size={18} />

                            </button>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}


export default CartItem