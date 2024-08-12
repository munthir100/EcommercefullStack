"use client"
import Link from "next/link"
import Form from "./form"

export default function Register() {
    return (
        <>
            <div>Register Page</div>
            <Form />
            <Link href="/login">Login</Link>
        </>
    )
}