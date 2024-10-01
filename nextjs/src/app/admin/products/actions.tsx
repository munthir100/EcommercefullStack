import { getCookie } from '@/utils/cookies';

export async function GetAllProducts(page = 1, search?: string) {
    try {
        const apiEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_ADMIN_URL}/products?page=${page}${search ? `&search=${search}` : ''}`;

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


export async function CreateProduct(data: any, image: File | null) {
    try {
        const formData = new FormData();
        if (image) formData.append('main_image', image);

        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, String(value)); // Convert value to string  
            }
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_ADMIN_URL}/products`, {
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
            throw new Error(errorResponse.message || 'Cannot create product');
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export async function UpdateProduct(id: number, data: any) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_ADMIN_URL}/products/${id}`, {
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
            throw new Error(errorResponse.message || 'Cannot update product');
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export async function UpdateMainImage(productId: number, image: File) {
    try {
        const formData = new FormData();
        if (image) formData.append('main_image', image);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_ADMIN_URL}/products/${productId}/update/image`, {
            method: 'POST', // or 'PUT' depending on your API
            headers: {
                'accept': 'applicaiton/json',
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

export async function GetProduct(id: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_ADMIN_URL}/products/${id}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${await getCookie('token')}`
            },
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            console.log('Error response:', errorResponse);
            throw new Error(errorResponse.message || 'Cannot delete product');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error: any) {
        throw error.message;
    }
};

export async function DeleteProduct(id: number) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_ADMIN_URL}/products/${id}`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${await getCookie('token')}`
            },
        });
        if (!response.ok) {
            const errorResponse = await response.json();
            console.log('Error response:', errorResponse);
            throw new Error(errorResponse.message || 'Cannot delete product');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error: any) {
        throw error.message;
    }
};