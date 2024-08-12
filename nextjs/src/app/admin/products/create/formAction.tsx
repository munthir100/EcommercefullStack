import { getCookie } from "@/utils/cookies";

export async function formAction(data: any) {
    
    try {
        const response = await fetch('http://localhost:8000/api/admin/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${await getCookie('token')}`,
            },
            body: JSON.stringify(Object.fromEntries(data.entries())),
        });
        const responseData = await response.json();

        if (response.ok && responseData.success) {
            console.log(responseData);
            return responseData;
        } else {
            throw new Error(responseData.message || 'Failed to create product');
        }

    } catch (error: any) {
        throw error;
    }
}
