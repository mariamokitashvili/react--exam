"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import AddToCartButton from "@/app/cart/AddToCartButton";
import styles from "./details.module.css";

export default function ProductDetailsPage({ params }) {
  // Next.js 15-ში params-ის ამოღება ხდება use()-ით ან unwrapping-ით
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.container}>
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>იტვირთება...</h2>
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.title}</h1>

      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <img
            src={product.image}
            alt={product.title}
            className={styles.image}
          />
        </div>

        <div className={styles.info}>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>${product.price}</p>

          {product.rating && (
            <p className={styles.rating}>
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </p>
          )}

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
