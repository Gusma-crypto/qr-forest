'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        toast.warning('⚠️ Tidak ada token ditemukan di localStorage');
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(`❌ ${data.message}`);
        return;
      }

      // Hapus token dari localStorage
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
