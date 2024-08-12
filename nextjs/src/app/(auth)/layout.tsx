"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/utils/cookies';


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    useEffect(() => {
        const checkToken = async () => {
            const token = await getCookie('token');
            if (token) {
                router.push('/');
            }
        };

        checkToken();
    }, []);

    return (
        <div>
            {children}
        </div>
    );
};  
