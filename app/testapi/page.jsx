'use client';
import { useEffect, useState } from 'react';
import API from '@/lib/api';

export default function TestAPI() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const res = await API.get('/test'); // Ganti `/test` dengan endpoint yang ada di backend kamu
        setMessage(res.data.message || 'Sukses terhubung');
        console.log('Sukses terhubung API Backend');
      } catch (err) {
        console.error('Gagal konek:', err);
        setMessage('❌ Gagal koneksi: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Cek Koneksi API</h1>
      {loading ? <p>Memuat...</p> : <p>{message}</p>}
    </div>
  );
}
