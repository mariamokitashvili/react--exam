export const dynamic = "force-dynamic";

import Link from "next/link";
import styles from "./products.module.css";

async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      // ვაიძულებთ Vercel-ს ყოველთვის ახალი მონაცემები წამოიღოს
      next: { revalidate: 0 },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0", // ზოგჯერ API ბლოკავს სერვერულ მოთხოვნებს ამის გარეშე
      },
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error on Vercel:", error);
    return [];
  }
}
export default async function ProductsPage() {
  const products = await getProducts();

  // თუ პროდუქტები ვერ წამოიღო
  if (!products || products.length === 0) {
    return <div className={styles.container}>მონაცემები ვერ მოიძებნა...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>
      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.image}
            />
            <h3 className={styles.name}>{product.title}</h3>
            <p className={styles.price}>${product.price}</p>
            <Link href={`/products/${product.id}`} className={styles.button}>
              View details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
