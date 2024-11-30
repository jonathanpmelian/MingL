"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./Register.module.scss";
import Link from "next/link";
import api from "@/utils/api";

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

  const onSubmit: SubmitHandler<RegisterFormData> = async (values) => {
    try {
      const response = await api.post("/auth/register", values);

      return response;
    } catch (error: unknown) {
      return error;
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
        <Link href="/auth">Login</Link>
      </span>
    </main>
  );
}

export default RegisterPage;
