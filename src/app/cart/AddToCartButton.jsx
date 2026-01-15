"use client";

import { useState } from "react";

export default function AddToCartButton({ product }) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((item) => item.id === product.id);
    if (!exists) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    setAdded(true);

    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        style={{
          padding: "10px 20px",
          backgroundColor: added ? "green" : "lightblue",
          borderRadius: "5px",
          color: added ? "#fff" : "#000",
          cursor: "pointer",
        }}
      >
        {added ? "Added to cart!" : "Add to Cart"}
      </button>
    </div>
  );
}
