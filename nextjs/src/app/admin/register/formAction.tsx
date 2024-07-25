// formAction.tsx
export async function formAction(data: any) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };

        const response = await fetch('http://localhost:8000/api/admin/register', requestOptions);
        const responseData = await response.json();

        if (response.ok && responseData.success) {
            return responseData;
        } else {
            throw new Error(responseData.message || 'Failed to register');
        }

    } catch (error: any) {
        console.error('There was an error registering the user!', error);
        throw error;
    }
}