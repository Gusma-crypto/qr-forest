'use client';

import { useRouter } from 'next/navigation';

export default function DetailButton({ id }) {
  const router = useRouter();

  const handleDetailOne = async () => {
    try {
      router.push(`/dashboard/datapohon/${id}`);
    } catch (error) {
      console.error('❌ Gagal navigasi:', error);
    }
  };

  return (
    <button
      onClick={handleDetailOne}
      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
    >
      Detail
    </button>
  );
}
