"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { useEffect, useState } from "react";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link href="/products" className={styles.navLink}>
            Products
          </Link>
        </li>

        {/* Profile და Cart — მხოლოდ ლოგინზე */}
        {isAuthenticated && (
          <>
            <li>
              <Link href="/profile" className={styles.navLink}>
                Profile
              </Link>
            </li>

            <li>
              <Link href="/cart" className={styles.navLink}>
                Cart
              </Link>
            </li>
          </>
        )}

        {/* Login / Register */}
        {!isAuthenticated && (
          <>
            <li>
              <Link href="/register" className={styles.navLink}>
                Register
              </Link>
            </li>

            <li>
              <Link href="/login" className={styles.navLink}>
                Login
              </Link>
            </li>
          </>
        )}

        {isAuthenticated && (
          <li>
            <button
              onClick={() => dispatch(logout())}
              className={styles.navLink}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
