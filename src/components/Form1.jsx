import { DevTool } from "@hookform/devtools";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

function Form1() {
  //   const form = useForm({
  //     defaultValues: {
  //       username: "admin",
  //       email: "admin@gmail.com",
  //       chanel: "user",
  //       address: {
  //         street: "",
  //         suite: "",
  //         city: "",
  //         zipcode: "",
  //       },
  //     },
  //   });

  const form = useForm({
    defaultValues: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users/3");
      const data = await res.json();
      return {
        username: data.username,
        email: data.email,
        chanel: data.website,
        number: ["9033611999", "9376979721"],
        address: {
          street: data.address.street,
          suite: data.address.suite,
          city: data.address.city,
          zipcode: data.address.zipcode,
        },
        phNumbers: [
          {
            number: "",
          },
        ],
      };
    },
  });

  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  console.log(errors);

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control: control,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

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

        <label htmlFor="city">City</label>
        <input type="text" id="city" {...register("address.city")} />

        <label htmlFor="street">Street</label>
        <input type="text" id="street" {...register("address.street")} />

        <label htmlFor="suite">Suite</label>
        <input type="text" id="suite" {...register("address.suite")} />

        <label htmlFor="zipcode">Zipcode</label>
        <input type="text" id="zipcode" {...register("address.zipcode")} />

        <label htmlFor="primary">Primary Number</label>
        <input type="text" id="primary" {...register("number.0")} />

        <label htmlFor="secondary">Secondary Number</label>
        <input type="text" id="secondary" {...register("number.1")} />

        <div>
          <label>List of phone numbers</label>
          <div>
            {fields.map((fields, index) => {
              return (
                <div key={fields.id}>
                  <input
                    type="text"
                    {...register(`phNumbers.${index}.number`, {
                      required: {
                        value: true,
                        message: "Please enter the phone number",
                      },
                      minLength: {
                        value: 10,
                        message: "number is invalid",
                      },
                      maxLength: {
                        value: 10,
                        message: "number is invalid",
                      },
                    })}
                  />
                  {index > 0 ? (
                    <button onClick={() => remove(index)}>Remove</button>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}

            <button type="button" onClick={() => append({ number: "" })}>
              Add phone number
            </button>
          </div>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default Form1;
