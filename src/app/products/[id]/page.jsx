// 1. ეს ხაზი აუცილებელია Vercel-ისთვის, რომ Build-ის დროს არ გაჭედოს
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import AddToCartButton from "@/app/cart/AddToCartButton";
import styles from "./details.module.css";

async function getProduct(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function Page({ params }) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) return notFound();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.title}</h1>

      <div className={styles.content}>
        <img src={product.image} alt={product.title} className={styles.image} />

        <div className={styles.info}>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>${product.price}</p>

          {product.rating && (
            <p className={styles.rating}>
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </p>
          )}

          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
