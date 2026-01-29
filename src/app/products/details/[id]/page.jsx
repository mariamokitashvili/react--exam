export const dynamic = "force-dynamic";

import styles from "./ProductDetails.module.css";
import AddToCartButton from "@/app/cart/AddToCartButton";
import { notFound } from "next/navigation";

async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function Page({ params }) {
  const { id } = await params;

  const product = await getProduct(id);
  if (!product) return notFound();

  return (
    <div className={styles.container}>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <AddToCartButton product={product} />
    </div>
  );
}
