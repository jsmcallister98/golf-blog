import Link from "next/link";
import { useForm } from "react-hook-form";

import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

const VerifyToken = ({ hash }: { hash: string }) => {
  const router = useRouter();
  //   const { data, isLoading } = trpc.useQuery([
  //     "users.verify-otp",
  //     {
  //       hash,
  //     },
  //   ]);

  //   if (isLoading) {
  //     return <p>Verifying...</p>;
  //   }

  //   router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");

  return <p>Redirecting...</p>;
};

const LoginForm = () => {
  //   const { handleSubmit, register } = useForm<CreateUserInput>();
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  //   const { mutate, error } = trpc.useMutation(["users.request-otp"], {
  //     onSuccess: () => {
  //       setSuccess(true);
  //     },
  //   });

  //   const onSubmit = (data: CreateUserInput) => {
  //     mutate({ ...data, redirect: router.asPath });
  //   };

  const hash = router.asPath.split("#token=")[1];

  if (hash) {
    return <VerifyToken hash={hash} />;
  }

  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        {success && <p>Check your email</p>}
        <h1>Login</h1>
        <input type="email" {...register("email")} />
        <button type="submit">Login</button>
      </form> */}

      <Link href={"/register"}>Register</Link>
    </>
  );
};

export default LoginForm;
