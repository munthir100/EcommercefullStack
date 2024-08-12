import { PostRequest, fetchApi } from '@/utils/fetchApi';

export async function getCountries() {
    return fetchApi('countries', { withToken: false });
}

export async function getUser() {
    return fetchApi('users/me');
}

export async function getProducts() {
    return fetchApi('admin/products');
}

export async function CreateProduct(data: any) {
    return PostRequest('admin/products', data);
}