// formAction.tsx
export async function formAction(data: any) {
    try {
        const response = await fetch('http://localhost:8000/api/admin/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (response.ok && responseData.success) {
            console.log(responseData);
            return responseData;
        } else {
            throw new Error(responseData.message || 'Failed to register');
        }

    } catch (error: any) {
        throw error;
    }
}
