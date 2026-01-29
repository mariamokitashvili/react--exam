import styles from "./ProductDetails.module.css";
import AddToCartButton from "@/app/cart/AddToCartButton";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getProduct(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function Page({ params }) {
  const id = params?.id;

  if (!id) return notFound();

  const product = await getProduct(id);
  if (!product) return notFound();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.title}</h1>
      <img
        className={styles.productImage}
        src={product.image}
        alt={product.title}
      />
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating?.rate ?? 0} ⭐</p>
      <p>({product.rating?.count ?? 0} reviews)</p>
      <AddToCartButton product={product} />
    </div>
  );
}
