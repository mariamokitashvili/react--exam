import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <span>Conditions of Use</span>
        <span>Privacy Notice</span>
        <span>Interest-Based Ads</span>
      </div>
      <div className={styles.right}>
        <span>© 1996-2021, Amazon.com, Inc. or its affiliates</span>
      </div>
    </footer>
  );
}
