import styles from "./ProductDetails.module.css";
import AddToCartButton from "@/app/cart/AddToCartButton";

async function getProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export default async function Page({ params }) {
  const { id } = await params;

  if (!id) return <h2>Product not found </h2>;

  let product;
  try {
    product = await getProduct(id);
  } catch (err) {
    return <h2>Product not found </h2>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.title}</h1>
      <img
        className={styles.productImage}
        src={product.image}
        alt={product.title}
      />
      <p className={styles.description}>{product.description}</p>
      <p className={styles.category}>Category: {product.category}</p>
      <p className={styles.price}>Price: ${product.price}</p>
      <p className={styles.rating}>Rating: {product.rating.rate} ⭐</p>
      <p className={styles.ratingCount}>({product.rating.count} reviews)</p>

      <AddToCartButton product={product} />
    </div>
  );
}
