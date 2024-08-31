import { PostRequest, fetchApi } from '@/utils/fetchApi';

export async function getCountries() {
    return await fetchApi('countries', { withToken: false });
}

export async function getUser() {
    return await fetchApi('users/me');
}

export async function getProducts() {
    return await fetchApi('admin/products');
}

export async function CreateProduct(data: any) {
    return await PostRequest('admin/products', data);
}

export async function getProduct(id: Number) {
    return await fetchApi(`admin/products/${id}`);
}
