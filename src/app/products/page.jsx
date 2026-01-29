export const dynamic = "force-dynamic";

import Link from "next/link";
import styles from "./products.module.css"; // დარწმუნდი, რომ ფაილსაც პატარა p ჰქვია

async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    if (!res.ok) {
      return { error: `API-მ დააბრუნა სტატუსი: ${res.status}` };
    }

    const data = await res.json();
    return { data };
  } catch (err) {
    return { error: err.message };
  }
}

export default async function ProductsPage() {
  const result = await getProducts();

  if (result.error) {
    return (
      <div className={styles.container}>
        <h2 style={{ color: "red" }}>შეცდომა: {result.error}</h2>
        <p>სცადეთ გვერდის დარეფრეშება</p>
      </div>
    );
  }

  const products = result.data || [];

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
