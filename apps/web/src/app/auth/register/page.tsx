"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./Register.module.scss";
import Link from "next/link";
import api from "@/utils/api";
import { useState } from "react";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

function RegisterPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<RegisterFormData> = async (values) => {
    try {
      const response = await api.post("/auth/register", values);

      setMessage("Registration successful!");
      return response;
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <main className={styles["register-page"]}>
      <h1>{`Let's get started`}</h1>

      <p>Create your account</p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label className={errors.name && styles["has-error"]}>Name</label>
        <input
          type="text"
          placeholder="First name"
          {...register("name", { required: "Required value" })}
        />
        {errors.name && <p role="alert">{errors.name.message}</p>}

        <label className={errors.email && styles["has-error"]}>Email</label>
        <input
          type="text"
          placeholder="Email"
          {...register("email", { required: "Required value" })}
        />
        {errors.email && <p role="alert">{errors.email.message}</p>}

        <label className={errors.password && styles["has-error"]}>
          Password
        </label>
        <input
          type="text"
          placeholder="Password"
          {...register("password", { required: "Required value" })}
        />
        {errors.password && <p role="alert">{errors.password.message}</p>}

        <button type="submit" aria-label="Create account button">
          Create an account
        </button>
      </form>

      <span>
        {`Have an account? `}
        <Link href="/auth/login">Login</Link>
      </span>

      {message && <p>{message}</p>}
    </main>
  );
}

export default RegisterPage;
