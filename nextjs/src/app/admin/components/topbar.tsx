"use client"
import { useState, useEffect } from 'react';
import { deleteCookie, getCookie } from '@/utils/cookies';
import { getUser } from '@/data/api';

export default function Topbar() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUser();
                setUsername(response.data.user.name);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <div className="topbar">
                <div className="topbar-left">
                    <span>Admin Panel</span>
                </div>
                <div className="topbar-right">
                    <span>Welcome, {username}</span>
                    <button>Logout</button>
                </div>
            </div>
        </>
    );
}