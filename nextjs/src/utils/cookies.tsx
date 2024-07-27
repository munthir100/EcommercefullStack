'use server'
import { cookies } from "next/headers";

export async function getCookie(name: string) {
    const cookieStore = cookies();
    return cookieStore.get(name)?.value;
}

export async function setHttpOnlyCookie(name: string, value: string) {
    cookies().set({
        name: name,
        value: value,
        httpOnly: true,
        path: "/",
    });
}

export async function deleteCookie(name: string) {
    const cookieStore = cookies();
    cookieStore.delete(name);
}