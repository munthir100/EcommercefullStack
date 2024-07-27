import { setHttpOnlyCookie } from "@/utils/cookies";
import { cookies } from "next/headers";

export async function formAction(data: any) {
  try {
    const response = await fetch('http://localhost:8000/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.success) {
      await setHttpOnlyCookie('token', responseData.token);
    } else {
      throw new Error(responseData.message);
    }
  }
  catch (error) {
    throw error;
  }
}
