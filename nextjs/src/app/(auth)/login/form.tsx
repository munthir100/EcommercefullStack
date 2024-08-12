"use client";

import { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface FormProps {
  register: UseFormRegister<FieldValues>;
  errors: any;
}

const Form: FC<FormProps> = ({ register, errors }) => {
  return (
    <div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
          username
        </label>
        <input
          type="text"
          id="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-red-500 text-xs italic">{errors.username.message}</p>
        )}
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">{errors.password.message}</p>
        )}
      </div>
    </div>
  );
};

export default Form;
