"use client";

import { useRouter } from "next/navigation";

export default function AddToCartButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/cart")}
      style={{
        padding: "10px",
        backgroundColor: "lightblue",
        borderRadius: "5px",
      }}
    >
      Add to Cart
    </button>
  );
}
