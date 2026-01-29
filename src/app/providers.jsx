"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { setCart } from "@/redux/cartSlice";

function CartHydration({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) return;

    const parsed = JSON.parse(savedCart);

    const items = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed.items)
        ? parsed.items
        : [];

    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    dispatch(
      setCart({
        items,
        totalQuantity,
        totalPrice,
      }),
    );
  }, [dispatch]);

  return children;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <CartHydration>{children}</CartHydration>
    </Provider>
  );
}
