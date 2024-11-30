"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import Link from "next/link";
import api from "@/utils/api";

type UserCredentials = {
  email: string;
  password: string;
};

function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserCredentials>();

  const onSubmit: SubmitHandler<UserCredentials> = async (values) => {
    const token = await api.post("/auth/login", values);

    return token;
  };

  return (
    <main className={styles["login-page"]}>
      <h1>{`Welcome to MingL`}</h1>

      <p>Enter your account details</p>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
          type="password"
          placeholder="Password"
          {...register("password", { required: "Required value" })}
        />
        {errors.password && <p role="alert">{errors.password.message}</p>}

        <button type="submit" aria-label="Login button">
          Login
        </button>
      </form>

      <span>
        {`Don't you have an account? `}
        <Link href="/auth/register">Signup</Link>
      </span>
    </main>
  );
}

export default LoginPage;
