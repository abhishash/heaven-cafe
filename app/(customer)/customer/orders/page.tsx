'use client';

import { useState } from 'react';
import { OrderCard } from '@/components/customer/OrderCard';
import { useGetOrdersQuery } from '@/store/services/order-api';
import { isArray } from '@/lib/type-guards';
import {
  Filter,
  ShoppingBag,
  CheckCircle2,
  Clock3,
  XCircle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

type FilterStatus = 'all' | 'delivered' | 'processing' | 'cancelled';

const filterItems: {
  value: FilterStatus;
  label: string;
  icon: React.ElementType;
}[] = [
    {
      value: 'all',
      label: 'All',
      icon: ShoppingBag,
    },
    {
      value: 'processing',
      label: 'Processing',
      icon: Clock3,
    },
    {
      value: 'delivered',
      label: 'Delivered',
      icon: CheckCircle2,
    },
    {
      value: 'cancelled',
      label: 'Cancelled',
      icon: XCircle,
    },
  ];

export default function OrdersPage() {
  const [filter, setFilter] = useState<FilterStatus>('all');

  const { data, isLoading } = useGetOrdersQuery(
    filter === 'all' ? '' : filter
  );

  const orders = data?.data;

  const stats = {
    all: data?.count?.all ?? 0,
    processing: data?.count?.processing ?? 0,
    delivered: data?.count?.delivered ?? 0,
    cancelled: data?.count?.cancelled ?? 0,
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">

        {/* =====================================================
            STICKY HEADER
        ====================================================== */}
        <div
          className="
            sticky top-16 z-40
            -mx-4 px-4
            border-b
            border-border/60
            bg-background/90
            py-4
            backdrop-blur-xl
            sm:-mx-6 sm:px-6
            lg:-mx-8 lg:px-8
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                My Orders
              </h1>

              <p className="mt-0.5 hidden text-sm text-muted-foreground sm:block">
                Your delicious moments, all in one place.
              </p>
            </div>

            <div
              className="
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-2xl
                border
                border-border/70
                bg-card
                shadow-sm
              "
            >
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>

        {/* =====================================================
            FILTER
        ====================================================== */}
        <section className="mb-7">

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">

              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  bg-primary/10
                  text-primary
                "
              >
                <Filter className="h-4.5 w-4.5" />
              </div>

              <div>
                <h2 className="text-sm font-bold text-foreground sm:text-base">
                  Order History
                </h2>

                <p className="text-xs text-muted-foreground">
                  Filter your orders by status
                </p>
              </div>

            </div>

            <span className="hidden rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground sm:block">
              {isArray(orders) ? orders?.length : 0} orders
            </span>
          </div>

          {/* Premium Segmented Filter */}
          <div
            className="
              flex w-full
              overflow-x-auto
              rounded-2xl
              border
              border-border/70
              bg-card
              p-1
              shadow-sm
              no-scrollbar
            "
          >
            {filterItems.map((item) => {
              const Icon = item.icon;
              const active = filter === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setFilter(item.value)}
                  className={`
                    relative
                    flex min-w-fit
                    flex-1
                    cursor-pointer
                    items-center justify-center
                    gap-2
                    rounded-xl
                    px-2.5
                    py-2
                    text-[10px]
                    font-semibold
                    transition-all
                    duration-200
                    sm:text-sm
                    ${active
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                >
                  <Icon className="h-3.5 w-3.5" />

                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            ORDER SECTION HEADER
        ====================================================== */}
        <section>

          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                {filter === 'all'
                  ? 'All Orders'
                  : `${filter.charAt(0).toUpperCase()}${filter.slice(1)} Orders`}
              </h2>

              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {filter === 'all'
                  ? 'Everything you have ordered from Heaven Cafe'
                  : `Your ${filter} orders`}
              </p>
            </div>
          </div>

          {/* =====================================================
              LOADING SKELETON
          ====================================================== */}
          {isLoading ? (
            <div className="space-y-4">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    overflow-hidden
                    rounded-3xl
                    border
                    border-border/60
                    bg-card
                    p-5
                    shadow-sm
                  "
                >
                  <div className="animate-pulse">

                    <div className="mb-5 flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-muted" />

                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-32 rounded-full bg-muted" />
                        <div className="h-3 w-48 rounded-full bg-muted" />
                      </div>

                      <div className="h-7 w-20 rounded-full bg-muted" />
                    </div>

                    <div className="space-y-3">
                      <div className="h-3 w-full rounded-full bg-muted" />
                      <div className="h-3 w-4/5 rounded-full bg-muted" />
                    </div>

                  </div>
                </div>
              ))}

            </div>
          ) : isArray(orders) ? (

            /* =====================================================
                ORDERS
            ====================================================== */
            <div className="space-y-4">
              {orders?.map((order) => (
                <div
                  key={order.id}
                  className="
                    group
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                  "
                >
                  <OrderCard order={order} />
                </div>
              ))}
            </div>

          ) : (

            /* =====================================================
                EMPTY STATE
            ====================================================== */
            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-dashed
                border-border
                bg-card
                px-6
                py-16
                text-center
                shadow-sm
              "
            >
              {/* Decorative background */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  bg-primary/5
                  blur-3xl
                "
              />

              <div
                className="
                  relative
                  mx-auto
                  mb-5
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-3xl
                  border
                  border-primary/10
                  bg-primary/10
                  text-primary
                "
              >
                <ShoppingBag className="h-8 w-8" />
              </div>

              <h3 className="text-lg font-bold text-foreground">
                No orders found
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                {filter === 'all'
                  ? "You haven't placed any orders yet. Your next delicious meal is waiting for you."
                  : `You don't have any ${filter} orders at the moment.`}
              </p>

              {filter !== 'all' && (
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  className="
                    mt-6
                    cursor-pointer
                    rounded-xl
                    bg-primary
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-primary-foreground
                    shadow-sm
                    transition-all
                    hover:-translate-y-0.5
                    hover:shadow-md
                  "
                >
                  View All Orders
                </button>
              )}
            </div>
          )}

        </section>
      </div>
    </main>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  label,
  value,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        relative
        overflow-hidden
        cursor-pointer
        rounded-2xl
        border
        p-4
        text-left
        transition-all
        duration-300
        ${active
          ? 'border-primary/30 bg-primary/[0.06] shadow-md'
          : 'border-border/70 bg-card shadow-sm hover:-translate-y-0.5 hover:shadow-md'
        }
      `}
    >
      <div className="flex items-start justify-between gap-2">

        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium text-muted-foreground sm:text-xs">
            {label}
          </p>

          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
            {value}
          </p>
        </div>

        <div
          className={`
            flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-xl
            transition-transform
            duration-300
            group-hover:scale-105
            ${active
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
            }
          `}
        >
          <Icon className="h-4 w-4" />
        </div>

      </div>

      {/* Active indicator */}
      {active && (
        <div className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full bg-primary" />
      )}
    </button>
  );
}