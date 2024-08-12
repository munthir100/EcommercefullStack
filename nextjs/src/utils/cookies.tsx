'use server'
import { cookies } from "next/headers";


export async function getCookie(name: string): Promise<string | null> {
    const cookieStore = cookies();
    const cookie = cookieStore.get(name);

    console.log('cookie');
    if (cookie) {
        return cookie.value;
    }

    return null;
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