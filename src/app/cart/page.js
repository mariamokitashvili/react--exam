"use client";

import { useEffect, useState } from "react";
import styles from "./Cart.module.css";

export default function CartPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setProducts(storedCart);
  }, []);

  const increase = (index) => {
    const updated = [...products];
    updated[index].quantity += 1;
    setProducts(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const decrease = (index) => {
    const updated = [...products];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      setProducts(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
    }
  };

  const remove = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

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
        {products.length === 0 && (
          <p className={styles.empty}>Your cart is empty</p>
        )}

        {products.map((p, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.product}>
              <img src={p.image} alt={p.title} />
              <h4>{p.title}</h4>
            </div>

            <div className={styles.qty}>
              <button onClick={() => decrease(i)}>-</button>
              <span>{p.quantity}</span>
              <button onClick={() => increase(i)}>+</button>
            </div>

            <div className={styles.price}>
              ${(p.price * p.quantity).toFixed(2)}
            </div>

            <button className={styles.delete} onClick={() => remove(i)}>
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
