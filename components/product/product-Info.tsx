"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { FieldValues } from "react-hook-form";
import {
  ArrowRight,
  Check,
  Flame,
  Minus,
  Plus,
  ShoppingBag,
  Tag,
} from "lucide-react";
import { toast } from "sonner";

import { formatPrice } from "@/lib/utils";
import { isObject } from "@/lib/type-guards";

import HtmlRender from "../shared/html-render";
import Spinner from "../shared/spinner";
import LoginModal from "../customer/modal/LoginModal";
import { Button } from "../ui/button";

import { addToCart } from "@/lib/redux/slice/cartSlice";
import { useAddToCartProductMutation } from "@/store/services/master-api";
import { ProductTypes } from "@/lib/types";

interface ProductInfoProps {
  product: ProductTypes;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const [openLogin, setOpenLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const { data: session } = useSession();

  const [mutateAsync, { isLoading: isPending }] =
    useAddToCartProductMutation();

  /*
   * =========================================
   * PRODUCT PRICE
   * =========================================
   *
   * price    = Selling Price
   * ac_price = Actual / MRP Price
   */

  const sellingPrice = Number(product?.price ?? 0);
  const actualPrice = Number(product?.ac_price ?? 0);

  /*
   * =========================================
   * STOCK
   * =========================================
   *
   * stock    = Actual available quantity
   * in_stock = Availability flag
   */

  const stock = Number(product?.stock ?? 0);
  const inStock = Number(product?.in_stock ?? 0);

  /*
   * =========================================
   * DISCOUNT
   * =========================================
   */

  const discountPercentage =
    actualPrice > sellingPrice && actualPrice > 0
      ? Math.round(
          ((actualPrice - sellingPrice) / actualPrice) * 100
        )
      : 0;

  const discountAmount =
    actualPrice > sellingPrice
      ? actualPrice - sellingPrice
      : 0;

  /*
   * =========================================
   * OUT OF STOCK
   * =========================================
   */

  const isOutOfStock =
    !Number.isFinite(stock) ||
    !Number.isFinite(inStock) ||
    inStock <= 0 ||
    stock <= 0;

  /*
   * =========================================
   * ORDER TOTAL
   * =========================================
   */

  const subtotal = quantity * sellingPrice;

  /*
   * =========================================
   * DECREASE QUANTITY
   * =========================================
   */

  const handleDecrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  /*
   * =========================================
   * INCREASE QUANTITY
   * =========================================
   */

  const handleIncrease = () => {
    if (isPending) {
      return;
    }

    if (quantity >= stock) {
      toast.warning(
        `Only ${stock} ${
          stock === 1 ? "item" : "items"
        } available`
      );

      return;
    }

    setQuantity((current) => current + 1);
  };

  /*
   * =========================================
   * ADD TO CART
   * =========================================
   */

  const handleAddToCart = async () => {
    /*
     * Safety check
     */
    if (isOutOfStock) {
      toast.warning(
        "This product is currently out of stock"
      );

      return;
    }

    /*
     * Make sure quantity doesn't exceed stock
     */
    if (quantity > stock) {
      toast.warning(
        `Only ${stock} ${
          stock === 1 ? "item" : "items"
        } available`
      );

      setQuantity(stock > 0 ? stock : 1);

      return;
    }

    /*
     * Login check
     */
    if (!isObject(session?.user)) {
      setOpenLogin(true);
      return;
    }

    try {
      const response = await mutateAsync({
        product_id: Number(product?.id),
        qty: quantity,
        type: "custom",
      });

      if (response?.data?.status) {
        dispatch(
          addToCart({
            ...response.data.data,
          })
        );

        toast.success("Added to cart", {
          description: `${quantity} × ${product?.name}`,
        });
      } else {
        toast.warning(
          response?.data?.message ||
            "Unable to add product to cart"
        );
      }
    } catch (error: any) {
      toast.error(
        error?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  /*
   * =========================================
   * LOGIN + ADD TO CART
   * =========================================
   */

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

        /*
         * Add product after login.
         */
        await handleAddToCart();
      } else {
        toast.warning(
          response?.error ||
            "Invalid email or password"
        );
      }
    } catch {
      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setOpenLogin(false);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col">

        {/* =====================================================
            PRODUCT HEADER
        ====================================================== */}

        <div className="mb-5 sm:mb-6">

          {/* Category + Fresh */}
          <div className="flex flex-wrap items-center gap-2">

            {product?.category && (
              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  border
                  border-orange-100
                  bg-orange-50
                  px-3
                  py-1.5
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-orange-600
                  sm:text-[11px]
                "
              >
                {product.category}
              </span>
            )}

            <span
              className="
                inline-flex
                items-center
                gap-1
                rounded-full
                bg-gray-50
                px-3
                py-1.5
                text-[10px]
                font-semibold
                text-gray-500
                sm:text-[11px]
              "
            >
              <Flame
                size={13}
                className="text-orange-500"
              />

              Freshly Made
            </span>
          </div>

          {/* Product Name */}
          <h1
            className="
              mt-3
              text-2xl
              font-extrabold
              leading-tight
              tracking-tight
              text-gray-900
              sm:mt-4
              sm:text-4xl
            "
          >
            {product?.name}
          </h1>

          {/* =================================================
              PRICE
          ================================================== */}

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">

            {/* Selling Price */}
            <span
              className="
                text-2xl
                font-extrabold
                tracking-tight
                text-orange-600
                sm:text-3xl
              "
            >
              {formatPrice(
                sellingPrice,
                "INR"
              )}
            </span>

            {/* Actual Price */}
            {discountPercentage > 0 && (
              <span
                className="
                  text-sm
                  font-medium
                  text-gray-400
                  line-through
                  sm:text-base
                "
              >
                {formatPrice(
                  actualPrice,
                  "INR"
                )}
              </span>
            )}

            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <span
                className="
                  inline-flex
                  items-center
                  gap-1
                  rounded-full
                  bg-green-50
                  px-2.5
                  py-1
                  text-xs
                  font-bold
                  text-green-600
                "
              >
                <Tag size={12} />

                {discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Saving */}
          {discountAmount > 0 && (
            <p
              className="
                mt-1.5
                text-xs
                font-semibold
                text-green-600
              "
            >
              You save{" "}
              {formatPrice(
                discountAmount,
                "INR"
              )}
            </p>
          )}

          {/* =================================================
              STOCK STATUS
          ================================================== */}

          {isOutOfStock ? (
            <div
              className="
                mt-3
                flex
                items-center
                gap-1.5
                text-xs
                font-semibold
                text-red-500
              "
            >
              <span className="h-2 w-2 rounded-full bg-red-500" />

              Out of Stock
            </div>
          ) : (
            <div
              className="
                mt-3
                flex
                items-center
                gap-1.5
                text-xs
                font-semibold
                text-green-600
              "
            >
              <span className="h-2 w-2 rounded-full bg-green-500" />

              In Stock

              <span className="font-normal text-gray-400">
                • {stock}{" "}
                {stock === 1
                  ? "available"
                  : "available"}
              </span>
            </div>
          )}
        </div>

        {/* =====================================================
            DESCRIPTION
        ====================================================== */}

        {product?.description && (
          <div
            className="
              mb-2
              border-b
              border-gray-100
              pb-2
              text-sm
              leading-6
              text-gray-600
              sm:mb-7
              sm:pb-7
            "
          >
            <HtmlRender
              html={product.description}
            />
          </div>
        )}

        {/* =====================================================
            QUANTITY
        ====================================================== */}

        {!isOutOfStock && (
          <div className="mb-6 sm:mb-7">

            <div
              className="
                mb-2.5
                flex
                items-end
                justify-between
              "
            >
              <div>
                <p className="text-sm font-bold text-gray-900">
                  Quantity
                </p>

                <p className="mt-0.5 text-xs text-gray-400">
                  Choose how many you want
                </p>
              </div>

              <span className="text-xs font-medium text-gray-400">
                {quantity}{" "}
                {quantity === 1
                  ? "item"
                  : "items"}
              </span>
            </div>

            {/* Quantity Controller */}
            <div
              className="
                flex
                w-fit
                items-center
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                p-1
              "
            >

              {/* Minus */}
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={
                  quantity <= 1 ||
                  isPending
                }
                onClick={handleDecrease}
                className="
                  flex
                  h-10
                  w-10
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-lg
                  bg-white
                  text-gray-600
                  shadow-sm
                  transition-all
                  hover:bg-orange-50
                  hover:text-orange-600
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <Minus
                  size={17}
                  strokeWidth={2.5}
                />
              </button>

              {/* Quantity */}
              <span
                className="
                  flex
                  min-w-[52px]
                  items-center
                  justify-center
                  text-lg
                  font-extrabold
                  text-gray-900
                "
              >
                {quantity}
              </span>

              {/* Plus */}
              <button
                type="button"
                aria-label="Increase quantity"
                disabled={
                  isPending ||
                  quantity >= stock
                }
                onClick={handleIncrease}
                className="
                  flex
                  h-10
                  w-10
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-lg
                  bg-white
                  text-gray-600
                  shadow-sm
                  transition-all
                  hover:bg-orange-50
                  hover:text-orange-600
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <Plus
                  size={17}
                  strokeWidth={2.5}
                />
              </button>
            </div>
          </div>
        )}

        {/* =====================================================
            PRICE SUMMARY
        ====================================================== */}

        {!isOutOfStock && (
          <div
            className="
              mb-5 sm:mb-2
              rounded-2xl
              border
              border-orange-100
              bg-orange-50/60
              p-4
              sm:p-5
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-2 sm:gap-4
              "
            >
              <div>
                <p className="text-sm font-bold text-gray-800">
                  Order Total
                </p>

                <p className="mt-0.5 text-xs text-gray-400">
                  {quantity} ×{" "}
                  {formatPrice(
                    sellingPrice,
                    "INR"
                  )}
                </p>
              </div>

              <div className="text-right">

                <p className="text-xl font-extrabold text-gray-900">
                  {formatPrice(
                    subtotal,
                    "INR"
                  )}
                </p>

                {discountPercentage > 0 && (
                  <p className="text-[11px] font-semibold text-green-600">
                    Discount applied
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =====================================================
            OUT OF STOCK MESSAGE
        ====================================================== */}

        {isOutOfStock ? (
          <div
            className="
              mb-3
              rounded-2xl
              border
              border-red-100
              bg-red-50
              p-4
            "
          >
            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-sm
                  font-extrabold
                  text-red-500
                  shadow-sm
                "
              >
                !
              </div>

              <div>
                <p className="text-sm font-bold text-red-700">
                  Currently unavailable
                </p>

                <p className="mt-0.5 text-xs text-red-500">
                  This item is out of stock right now.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ===================================================
             ADD TO CART
          ==================================================== */

          <Button
            type="button"
            size="lg"
            disabled={isPending}
            onClick={handleAddToCart}
            className="
              group
              h-14
              w-full
              cursor-pointer
              rounded-xl
              border-0
              bg-orange-500
              px-5
              text-base
              font-bold
              text-white
              shadow-[0_8px_20px_rgba(249,115,22,0.22)]
              transition-all
              duration-200
              hover:bg-orange-600
              hover:shadow-[0_10px_25px_rgba(249,115,22,0.28)]
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:opacity-70
              sm:text-lg
            "
          >
            {isPending ? (
              <>
                <Spinner
                  width={20}
                  height={20}
                />

                <span className="ml-2">
                  Adding to Cart...
                </span>
              </>
            ) : (
              <>
                <ShoppingBag
                  size={20}
                  className="
                    mr-2
                    transition-transform
                    group-hover:scale-110
                  "
                />

                <span>
                  Add to Cart
                </span>

                <span
                  className="
                    ml-auto
                    hidden
                    items-center
                    gap-1
                    text-sm
                    font-semibold
                    opacity-90
                    sm:flex
                  "
                >
                  {formatPrice(
                    subtotal,
                    "INR"
                  )}

                  <ArrowRight size={16} />
                </span>
              </>
            )}
          </Button>
        )}

        {/* =====================================================
            CONTINUE SHOPPING
        ====================================================== */}

        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/menu")}
          className="
            mt-3
            h-12
            w-full
            cursor-pointer
            rounded-xl
            border-gray-200
            bg-white
            text-sm
            font-semibold
            text-gray-700
            transition-all
            hover:border-orange-200
            hover:bg-orange-50
            hover:text-orange-600
          "
        >
          Explore Menus

          <ArrowRight
            size={17}
            className="ml-2"
          />
        </Button>

        {/* =====================================================
            TRUST FEATURES
        ====================================================== */}

        {!isOutOfStock && (
          <div
            className="
              mt-5
              grid
              grid-cols-2
              gap-2
              sm:mt-6
            "
          >

            {/* Fresh & Quality */}
            <div
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-gray-50
                px-3
                py-3
              "
            >
              <div
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-green-50
                  text-green-600
                "
              >
                <Check
                  size={14}
                  strokeWidth={3}
                />
              </div>

              <span className="text-[11px] font-semibold text-gray-600 sm:text-xs">
                Fresh & Quality
              </span>
            </div>

            {/* Easy Ordering */}
            <div
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-gray-50
                px-3
                py-3
              "
            >
              <div
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-orange-50
                  text-orange-600
                "
              >
                <ShoppingBag size={14} />
              </div>

              <span className="text-[11px] font-semibold text-gray-600 sm:text-xs">
                Easy Ordering
              </span>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================
          LOGIN MODAL
      ====================================================== */}

      <LoginModal
        open={openLogin}
        setOpen={setOpenLogin}
        onLogin={handleLogin}
        isLoading={loading}
      />
    </>
  );
};

export default ProductInfo;