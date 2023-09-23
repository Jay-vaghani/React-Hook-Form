import { DevTool } from "@hookform/devtools";
import React from "react";
import { useForm } from "react-hook-form";

function Form1() {
    const form = useForm({
      defaultValues: {
        username: "admin",
        email: "admin@gmail.com",
        chanel: "user",
      },
    });

//   const form = useForm({
//     defaultValues: async () => {
//       const res = await fetch("https://jsonplaceholder.typicode.com/users/3");
//       const data = await res.json();
//       return {
//         username: data.username,
//         email: data.email,
//         chanel: data.website,
//       };
//     },
//   });

  const { register, control, handleSubmit, formState } = form;

  const onSubmit = (data) => {
    console.log(data);
  };

  const { errors } = formState;

  return (
    <div>
      <h1>YouTube Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
        />
        <p className="error">{errors.username?.message}</p>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid Email",
            },
            required: {
              value: true,
              message: "Email is required",
            },
            // validate: (felidValue) => {
            //   return (
            //     felidValue !== "admin@gmail.com" || "Enter different email"
            //   );
            // },

            validate: {
              notAdmin: (felidValue) => {
                return (
                  felidValue !== "admin@gmail.com" || "Enter different email"
                );
              },

              notBlackListed: (felidValue) => {
                return (
                  !felidValue.endsWith("blacklisted.com") ||
                  "This domain is black listed"
                );
              },
            },
          })}
        />
        <p className="error">{errors.email?.message}</p>
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("chanel", {
            required: "Chanel name is required",
          })}
        />
        <p className="error">{errors.chanel?.message}</p>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default Form1;
