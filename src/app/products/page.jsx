export const dynamic = "force-dynamic";
import Link from "next/link";
import styles from "./products.module.css";

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return (
      <div className={styles.container}>
        მონაცემები ვერ მოიძებნა (Vercel API Issue)
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>
      <div className={styles.grid}>
        {products.map((p) => (
          <div key={p.id} className={styles.card}>
            <img src={p.image} alt={p.title} className={styles.image} />
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
