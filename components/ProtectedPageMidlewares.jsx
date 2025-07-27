'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import API from '@/lib/api';

export default function ProtectedPageMidlewares({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Silakan login terlebih dahulu!');
        return router.push('/login');
      }

      try {
        // Kirim token ke backend untuk verifikasi
        const res = await API.get('/auth/check-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Jika token valid, tidak melakukan apa-apa
      } catch (err) {
        // Token expired atau tidak valid
        toast.error('Sesi Anda telah berakhir. Silakan login ulang.');
        localStorage.removeItem('token');
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      }
    };

    checkToken();
  }, [router]);

  return <>{children}</>;
}
