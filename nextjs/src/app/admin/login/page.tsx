"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationSchema } from "./validation-schema";
import Form from "./form";
import { formAction } from "./formAction";
import Link from "next/link";
export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string[]>([]); // State for error messages

    const {
        register,
        handleSubmit,
        formState: { errors }, // Extract form-level errors
    } = useForm({
        resolver: zodResolver(validationSchema),
    });

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const response = await formAction(data);
            console.log(response); // Log successful response
        } catch (error: any) {
            console.error(error); // Log the full error object

            setError(error.message);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Form register={register} errors={errors} />


                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                </form>
            </div>
            <Link href="/admin/register">Register</Link>
        </>
    );
}
