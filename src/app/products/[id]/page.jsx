export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import styles from "./productDetails.module.css"; // დარწმუნდი, რომ ფაილსაც პატარა p ჰქვია

async function getProduct(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err);
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
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
