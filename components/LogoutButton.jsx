'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import API from '@/lib/api';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        toast.warning('⚠️ Tidak ada token ditemukan di localStorage');
        return;
      }

      await API.post('/auth/logout', { refreshToken });

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
