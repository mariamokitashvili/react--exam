export const dynamic = "force-dynamic";
import Link from "next/link";
import styles from "./products.module.css";

async function getProducts() {
  try {
    // ვიყენებთ HTTPS აგენტს და სტანდარტულ ჰედერს
    const res = await fetch("https://fakestoreapi.com/products", {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    if (!res.ok) {
      console.error("API Error:", res.status);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return (
      <div className={styles.container}>
        <h2>მონაცემები ვერ მოიძებნა</h2>
        <p>ბაზასთან კავშირი ვერ დამყარდა. სცადეთ გვერდის განახლება.</p>
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
