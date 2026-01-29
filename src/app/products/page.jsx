export const dynamic = "force-dynamic";

import Link from "next/link";
import styles from "./products.module.css";

async function getProducts() {
  // ვიყენებთ try-catch-ს, რომ თუ API-მ HTML დააბრუნა
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    // თუ პასუხი არ არის OK (მაგ. 404 ან 500), გადავდივართ catch-ზე
    if (!res.ok) {
      console.error("API response not ok");
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return []; // აბრუნებს ცარიელ მასივს, რომ map-მა არ დაერორა
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
