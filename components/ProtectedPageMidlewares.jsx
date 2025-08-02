'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import API from '@/lib/api'; // Axios instance

export default function ProtectedPageMiddleware({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Silakan login terlebih dahulu!');
        return router.replace('/login');
      }

      try {
        await API.get('/auth/check-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Token valid → lanjut
      } catch (err) {
        console.error('Token tidak valid:', err);
        toast.error('Sesi Anda telah berakhir. Silakan login ulang.');
        localStorage.removeItem('token');

        setTimeout(() => {
          router.replace('/login');
        }, 1000);
      }
    };

    checkToken();
  }, [router]);

  return <>{children}</>;
}
