import { getCookie } from '@/utils/cookies';

export async function GetAllCategories(page?: number) {
    try {
        const apiEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_ADMIN_URL}/categories${page ? `?page=${page}` : ''}`;

        const response = await fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${await getCookie('token')}`
            },
        });
        const responseData = await response.json();
        return responseData;
    } catch (error: any) {
        throw error.message;
    }
};


export async function CreateCategory(data: any, image: File | null) {
    try {
        const formData = new FormData();
        if (image) formData.append('image', image);

        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, String(value)); // Convert value to string  
            }
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_ADMIN_URL}/categories`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${await getCookie('token')}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.log('Error response:', errorResponse);
            throw new Error(errorResponse.message || 'Cannot create category');
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export async function UpdateCategory(id: number, data: any) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_ADMIN_URL}/categories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${await getCookie('token')}`,
            },
            body: JSON.stringify({
                ...data,
            }),
        });


        if (!response.ok) {
            const errorResponse = await response.json();
            console.log('Error response:', errorResponse);
            throw new Error(errorResponse.message || 'Cannot update category');
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export async function UpdateImage(categoryId: number, image: File) {
    try {
        const formData = new FormData();
        if (image) formData.append('image', image);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_ADMIN_URL}/categories/${categoryId}/update/image`, {
            method: 'POST', // or 'PUT' depending on your API
            headers: {
                'accept':'applicaiton/json',
                'Authorization': `Bearer ${await getCookie('token')}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Cannot update main image');
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function GetCategory(id: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_ADMIN_URL}/categories/${id}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${await getCookie('token')}`
            },
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            console.log('Error response:', errorResponse);
            throw new Error(errorResponse.message || 'Cannot delete category');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error: any) {
        throw error.message;
    }
};

export async function DeleteCategory(id: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_ADMIN_URL}/categories/${id}`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${await getCookie('token')}`
            },
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            console.log('Error response:', errorResponse);
            throw new Error(errorResponse.message || 'Cannot delete category');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error: any) {
        throw error.message;
    }
};