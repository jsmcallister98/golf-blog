import Link from "next/link";
import { useForm } from "react-hook-form";

import React from "react";
import { trpc } from "../utils/trpc";
// import { CreateUserInput } from "../schema/user.schema";
import { useRouter } from "next/router";

const RegisterPage = () => {
  //   const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();

  //   const { mutate, error } = trpc.useMutation(["users.register"], {
  //     onSuccess: () => {
  //       router.push("/login");
  //     },
  //   });

  //   const onSubmit = (data: CreateUserInput) => {
  //     mutate(data);
  //   };

  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Register</h1>
        <input type="email" {...register("email")} />
        <br />
        <input type="text" {...register("name")} />
        <button type="submit">Register</button>
      </form> */}

      <Link href={"/login"}>Login</Link>
    </>
  );
};

export default RegisterPage;
