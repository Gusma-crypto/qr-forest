'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function TreeDetailPage() {
  const { id } = useParams();
  const [tree, setTree] = useState(null);
  const [aiExplanation, setAiExplanation] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/trees/${id}`); // ganti dengan endpoint backend kamu
        const data = await res.json();
        setTree(data);

        const explainRes = await fetch('/api/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            species: data.species,
          }),
        });

        const explainData = await explainRes.json();
        setAiExplanation(explainData.explanation);
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTree();
  }, [id]);

  if (loading) return <div className="p-4">Memuat data pohon...</div>;
  if (!tree) return <div className="p-4">Data pohon tidak ditemukan.</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Detail Pohon</h1>
      <p><strong>Nama:</strong> {tree.name}</p>
      <p><strong>Spesies:</strong> {tree.species}</p>
      <p><strong>Lokasi:</strong> {tree.location}</p>
      <p><strong>Tanggal Tanam:</strong> {tree.planted_date}</p>
      <p><strong>Deskripsi:</strong> {tree.description}</p>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Penjelasan AI:</h2>
        <p className="text-gray-700">{aiExplanation}</p>
      </div>

      <div className="mt-6">
        <a href="/dashboard/datapohon" className="text-blue-600 hover:underline">← Kembali ke daftar pohon</a>
      </div>
    </div>
  );
}
