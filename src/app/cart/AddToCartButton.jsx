"use client";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { useState } from "react";

export default function AddToCartButton({ product }) {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setError("Please login first to add items to cart");
      return;
    }

    dispatch(addToCart(product));

    setError("");
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div style={{ marginTop: "12px" }}>
      <button
        onClick={handleAddToCart}
        style={{
          padding: "10px 18px",
          backgroundColor: added ? "#22c55e" : "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
      >
        {added ? "Added to Cart" : "Add to Cart"}
      </button>

      {error && (
        <p style={{ color: "red", marginTop: "6px", fontSize: "14px" }}>
          {error}
        </p>
      )}
    </div>
  );
}
