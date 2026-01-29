"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/redux/cartSlice";
import styles from "./Cart.module.css";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const cart = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const items = cart?.items || [];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted) return null;

  if (!isAuthenticated) return null;

  if (items.length === 0) {
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Shopping Cart</h2>
        <p className={styles.empty}>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Shopping Cart</h2>

      <div className={styles.headerRow}>
        <span>Product</span>
        <span>Quantity</span>
        <span>Price</span>
        <span></span>
      </div>

      <div className={styles.cart}>
        {items.map((p) => (
          <div key={p.id} className={styles.item}>
            <div className={styles.product}>
              <img src={p.image} alt={p.title} />
              <h4>{p.title}</h4>
            </div>

            <div className={styles.qty}>
              <button onClick={() => dispatch(decreaseQuantity(p.id))}>
                -
              </button>
              <span>{p.quantity}</span>
              <button onClick={() => dispatch(increaseQuantity(p.id))}>
                +
              </button>
            </div>

            <div className={styles.price}>
              ${(p.price * p.quantity).toFixed(2)}
            </div>

            <button
              className={styles.delete}
              onClick={() => dispatch(removeFromCart(p.id))}
            >
              🗑
            </button>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <p>Total Quantity: {cart.totalQuantity}</p>
        <p>Total Price: ${cart.totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
}
