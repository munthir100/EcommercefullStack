"use client"
import { useRouter } from 'next/navigation';
import { deleteCookie } from '@/utils/cookies';

export default function Admin() {
  const router = useRouter();
  async function logout() {
    await deleteCookie('token');
    router.push('/');
  }


  return (
    <>
      <div>Admin</div>
      <button onClick={logout}>Logout</button>
    </>
  );
}
