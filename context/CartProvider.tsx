"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { fetchCart } from "@/lib/redux/slice/cartSlice";
import { useSession } from "next-auth/react";
import { isObject } from "framer-motion";

export default function CartProvider({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const initialized = useSelector(
    (state: RootState) => state.cart.initialized
  );

  useEffect(() => {
    if (!initialized) {
      if (isObject(session?.user)) {
        dispatch(fetchCart(session?.user?.accessToken) as any); // ✅ only once
      } else {
        dispatch({
          items: [],
          totalAmount: 21,
          loading: false,
          initialized: false,
          type: ""
        });
      }
    }
  }, [initialized, dispatch]);

  return children;
}