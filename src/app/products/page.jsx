"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Products.module.css";

function renderStars(rate = 0) {
  const fullStars = Math.round(rate);
  return "★".repeat(fullStars) + "☆".repeat(5 - fullStars);
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p style={{ textAlign: "center" }}>Loading products...</p>;

  return (
    <div className={styles.productsWrapper}>
      <h1 className={styles.title}>Products</h1>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.image}
            />
            <h3 className={styles.productTitle}>{product.title}</h3>
            <p className={styles.category}>
              <strong>Category:</strong> {product.category}
            </p>
            <p className={styles.price}>
              <strong>Price:</strong> ${product.price}
            </p>
            {product.rating && (
              <p className={styles.rating}>
                <span className={styles.stars}>
                  {renderStars(product.rating.rate)}
                </span>{" "}
                ({product.rating.count} reviews)
              </p>
            )}
            <Link
              href={`/products/details/${product.id}`}
              className={styles.detailsLink}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
