import styles from "./ProductDetails.module.css";
import AddToCartButton from "@/app/cart/AddToCartButton";
import { notFound } from "next/navigation";

async function getProduct(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    return null;
  }
}

export default async function Page({ params }) {
  const { id } = await params;

  if (!id) return notFound();

  const product = await getProduct(id);
  if (!product) return notFound();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.title}</h1>

      <img
        src={product.image}
        alt={product.title}
        className={styles.productImage}
      />

      <p>{product.description}</p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Rating:</strong> {product.rating?.rate ?? 0} ⭐ (
        {product.rating?.count ?? 0} reviews)
      </p>

      <AddToCartButton product={product} />
    </div>
  );
}
