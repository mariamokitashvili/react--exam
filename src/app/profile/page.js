"use client";
import { useEffect, useState } from "react";
import styles from "./Profile.module.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users/3")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1>My Profile</h1>

      <div className={styles.card}>
        <div className={styles.avatar}>
          <img
            src={`https://i.pravatar.cc/150?u=${user.username}`}
            alt={user.username}
          />
        </div>

        <div className={styles.info}>
          <p>
            <strong>Name:</strong> {user.name.firstname} {user.name.lastname}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Address:</strong> {user.address.city}, {user.address.street}{" "}
            {user.address.number}
          </p>
        </div>
      </div>
    </div>
  );
}
