'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token'); // access token
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken && token) {
        // Kirim permintaan ke backend untuk hapus token di DB
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Tambahkan header Authorization
          },
          body: JSON.stringify({ refreshToken }),
        });
      }

      // Bersihkan localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');

      toast.success('✅ Logout berhasil');
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('❌ Gagal logout. Silakan coba lagi.');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}
