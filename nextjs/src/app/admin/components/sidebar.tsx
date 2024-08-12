"use client"
import Link from "next/link"
export default function Sidebar() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link href={'/admin'}>Home</Link>
                        <br />
                        <Link href={'/admin/products'}>Products</Link>
                        <br />
                        <Link href={'/admin'}>Categories</Link>
                        <br />
                    </li>
                </ul>
            </nav>
        </>
    )
}
