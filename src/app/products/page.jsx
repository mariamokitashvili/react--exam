"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./products.module.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>იტვირთება...</h2>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.container}>
        <h2>მონაცემები ვერ მოიძებნა.</h2>
        <p>გთხოვთ, შეამოწმოთ ინტერნეტთან კავშირი.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>
      <div className={styles.grid}>
        {products.map((p) => (
          <div key={p.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={p.image} alt={p.title} className={styles.image} />
            </div>
            <h3 className={styles.name}>{p.title}</h3>
            <p className={styles.price}>${p.price}</p>
            <Link href={`/products/${p.id}`} className={styles.button}>
              View details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
