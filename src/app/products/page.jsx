import Link from "next/link";
import styles from "./Products.module.css";

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

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
