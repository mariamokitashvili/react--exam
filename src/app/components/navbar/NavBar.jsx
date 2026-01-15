"use client";

import Link from "next/link";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link href="/products" className={styles.navLink}>
            Products
          </Link>
        </li>
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
        <li>
          <Link href="/register" className={styles.navLink}>
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}
