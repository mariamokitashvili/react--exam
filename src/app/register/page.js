"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./Page.module.css";

const schema = yup.object({
  firstName: yup
    .string()
    .required("სახელი სავალდებულოა")
    .min(4, "მინ. 4 სიმბოლო")
    .max(20, "მაქს. 20 სიმბოლო"),

  lastName: yup
    .string()
    .required("გვარი სავალდებულოა")
    .min(4, "მინ. 4 სიმბოლო")
    .max(20, "მაქს. 20 სიმბოლო"),

  age: yup
    .number()
    .typeError("ასაკი უნდა იყოს რიცხვი")
    .required("ასაკი სავალდებულოა")
    .min(13, "მინ. 13 წელი")
    .max(120, "მაქს. 120 წელი"),

  email: yup
    .string()
    .required("იმეილი სავალდებულოა")
    .email("არასწორი იმეილის ფორმატი"),

  password: yup
    .string()
    .required("პაროლი სავალდებულოა")
    .min(6, "მინ. 6 სიმბოლო")
    .max(12, "მაქს. 12 სიმბოლო")
    .matches(/[A-Z]/, "მინ. 1 დიდი ასო")
    .matches(/[a-z]/, "მინ. 1 პატარა ასო")
    .matches(/[0-9]/, "მინ. 1 ციფრი"),

  phone: yup
    .string()
    .required("ტელეფონი სავალდებულოა")
    .matches(/^\d+$/, "მხოლოდ ციფრები")
    .min(10, "მინ. 10 ციფრი")
    .max(100, "მაქს. 100 ციფრი"),
});

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      alert("რეგისტრაცია წარმატებით დასრულდა ");
      reset();
    } catch {
      alert("შეცდომა დაფიქსირდა ");
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.title}>რეგისტრაცია</h2>

        <div className={styles.field}>
          <input
            className={styles.input}
            placeholder="სახელი"
            {...register("firstName")}
          />
          <p className={styles.error}>{errors.firstName?.message}</p>
        </div>

        <div className={styles.field}>
          <input
            className={styles.input}
            placeholder="გვარი"
            {...register("lastName")}
          />
          <p className={styles.error}>{errors.lastName?.message}</p>
        </div>

        <div className={styles.field}>
          <input
            className={styles.input}
            placeholder="ასაკი"
            {...register("age")}
          />
          <p className={styles.error}>{errors.age?.message}</p>
        </div>

        <div className={styles.field}>
          <input
            className={styles.input}
            placeholder="იმეილი"
            {...register("email")}
          />
          <p className={styles.error}>{errors.email?.message}</p>
        </div>

        <div className={styles.field}>
          <input
            type="password"
            className={styles.input}
            placeholder="პაროლი"
            {...register("password")}
          />
          <p className={styles.error}>{errors.password?.message}</p>
        </div>

        <div className={styles.field}>
          <input
            className={styles.input}
            placeholder="ტელეფონი"
            {...register("phone")}
          />
          <p className={styles.error}>{errors.phone?.message}</p>
        </div>

        <button className={styles.btn} disabled={isSubmitting}>
          {isSubmitting ? "იგზავნება..." : "რეგისტრაცია"}
        </button>
      </form>
    </div>
  );
}
