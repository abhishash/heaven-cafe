'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShoppingBag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ProductTypes } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { SafeImage } from './shared/safe-image';
import { useAddToCartProductMutation } from '@/store/services/master-api';
import { toast } from 'sonner';
import { addToCart } from '@/lib/redux/slice/cartSlice';
import { useDispatch } from 'react-redux';

interface ProductCardProps {
  product: ProductTypes;
  isSingle: boolean;
}

export default function ProductCard({
  product,
  isSingle
}: ProductCardProps) {

  const [mutateAsync, { isLoading: isPending }] = useAddToCartProductMutation();
  const dispatch = useDispatch();

  const actualPrice = parseFloat(product.ac_price);
  const sellingPrice = parseFloat(product.price);

  const discountPercentage =
    actualPrice > sellingPrice
      ? Math.round(
        ((actualPrice - sellingPrice) / actualPrice) * 100,
      )
      : 0;

  const isOutOfStock =
    parseInt(product?.in_stock as string) <= 0;

  return (
    <div
      className={`
        group block h-full
        ${isOutOfStock ? 'pointer-events-none' : ''}
      `}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={
          isOutOfStock
            ? {}
            : {
              y: -5,
            }
        }
        transition={{
          duration: 0.25,
          ease: 'easeOut',
        }}
        className={`
          relative
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-slate-100
          bg-white
          shadow-sm
          transition-all
          duration-300
          ${isOutOfStock
            ? 'opacity-60 grayscale'
            : 'hover:border-orange-200 hover:shadow-[0_12px_35px_rgba(0,0,0,0.10)]'
          }
        `}
      >
        {/* ================= IMAGE ================= */}
        <div
          className="
            relative
            h-36
            w-full
            overflow-hidden
            bg-linear-to-t from-primary to-primary/10
            sm:h-52
          "
        >
          <motion.div
            whileHover={
              isOutOfStock
                ? {}
                : {
                  scale: 1.06,
                }
            }
            transition={{
              duration: 0.4,
              ease: 'easeOut',
            }}
            className="relative h-full w-full"
          >
            <Link href={
              isOutOfStock
                ? '#'
                : `/product/${product.url}`
            } >
              <SafeImage
                src={product.image}
                alt={
                  product?.name ??
                  'Product Image'
                }
                fill
                sizes="
                (max-width: 640px) 50vw,
                (max-width: 1024px) 33vw,
                25vw
              "
                className={`
                object-cover
                object-center
                ${isOutOfStock
                    ? 'blur-[2px]'
                    : ''
                  }
              `}
              />
            </Link>
          </motion.div>

          {/* Image Gradient */}
          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-20
              bg-gradient-to-t
              from-black/25
              to-transparent
            "
          />

          {/* Discount */}
          {discountPercentage > 0 &&
            !isOutOfStock && (
              <Badge
                className="
                  absolute
                  left-2
                  top-2
                  rounded-full
                  border
                  border-white/30
                  bg-orange-500/95
                  px-2.5
                  py-1
                  text-[10px]
                  font-bold
                  text-white
                  shadow-sm
                  backdrop-blur-md
                  hover:bg-orange-500
                  sm:left-3
                  sm:top-3
                  sm:text-xs
                "
              >
                {discountPercentage}% OFF
              </Badge>
            )}

          {/* Out Of Stock */}
          {isOutOfStock && (
            <Badge
              className="
                absolute
                left-2
                top-2
                rounded-full
                bg-red-500/95
                px-2.5
                py-1
                text-[10px]
                font-semibold
                text-white
                shadow-sm
                backdrop-blur-md
                sm:left-3
                sm:top-3
                sm:text-xs
              "
            >
              Out of Stock
            </Badge>
          )}

          {/* Quick View Icon */}
          {!isOutOfStock && (
            <div
              className="
                absolute
                right-2
                top-2
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-white/40
                bg-white/80
                text-slate-700
                opacity-0
                shadow-sm
                backdrop-blur-md
                transition-all
                duration-200
                group-hover:opacity-100
                sm:right-3
                sm:top-3
              "
            >
              <ArrowUpRight className="size-4" />
            </div>
          )}
        </div>

        {/* ================= CONTENT ================= */}
        <div
          className="relative
            flex
            flex-1
            flex-col
            p-3
            gap-y-1
            sm:p-4
          "
        >
          {/* Product Name */}
          <h3
            className="
              line-clamp-1
              text-sm
              font-bold
              leading-5
              text-slate-800
              transition-colors
              group-hover:text-primary
              sm:text-base
              sm:leading-6
            "
          >
            {product.name}
          </h3>
          {/* Bottom */}
          <div
            className="
              mt-auto
              flex
              items-end
              justify-between
              gap-2
            "
          >
            {/* Price */}
            <div className="min-w-0 flex items-baseline gap-x-1">
              <div
                className="
                  text-sm
                  font-extrabold
                  tracking-tight
                  text-orange-600
                  sm:text-xl
                "
              >
                {formatPrice(
                  parseInt(product.price),
                  'INR',
                )}
              </div>

              {actualPrice > sellingPrice && (
                <div
                  className="
                    mt-0.5
                    text-[10px]
                    font-medium
                    text-slate-400
                    line-through
                    sm:text-xs
                  "
                >
                  {formatPrice(
                    parseInt(product.ac_price),
                    'INR',
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Add To Cart */}
          {!isOutOfStock && (
            <motion.button
              whileTap={{ scale: 0.92 }}
              type="button"
              onClick={async () => await mutateAsync({
                product_id: product.id,
                qty: 1,
                type: 'add',
              }).then((res) => {
                if (res?.data?.status) {
                  dispatch(addToCart({ ...res?.data?.data }));
                } else {
                  toast.warning(res?.data?.message);
                }
              }).catch((err) => {
                toast.error(err?.message);
              })}
              disabled={isPending}
              className={`${isSingle ? "bottom-3 right-2 bg-primary" : "bottom-18 right-1/2 bg-black/20 translate-x-1/2"} disabled:opacity-80 absolute z-20 flex items-center justify-center gap-1.5 rounded-full border border-white/30 backdrop-blur-2xl backdrop-saturate-150 px-4 py-2 text-xs font-bold tracking-wide text-white shadow-[0_8px_25px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-orange-400/70 hover:bg-orange-500/80 sm:px-5 sm:py-2.5 sm:text-sm`}
            >
              <ShoppingBag className="size-3.5 sm:size-4" />
              <span>ADD</span>
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}