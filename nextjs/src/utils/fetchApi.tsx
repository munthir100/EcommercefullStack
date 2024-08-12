import { getCookie } from '@/utils/cookies';

const apiBaseUrl = 'http://localhost:8000/api';

export async function fetchApi(url: string, options?: any) {
    const token = options?.withToken !== false && (await getToken());
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    return fetch(`${apiBaseUrl}/${url}`, { ...options, headers })
        .then(res => res.json())
        .catch(error => { throw new Error(error) });
}

export async function PostRequest(url: string, data: any){
    return await fetchApi(url, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}
async function getToken() {
    return getCookie('token');
}
