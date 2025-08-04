'use client';
import { useState } from 'react';
import API from '@/lib/api';


export default function CreateTreeForm() {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    location: '',
    age: '',
    foto: null,
  });

  const [loading, setLoading] = useState(false);
  const [qrPreview, setQrPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto') {
      setFormData({ ...formData, foto: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setQrPreview(null);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('species', formData.species);
      data.append('location', formData.location);
      data.append('age', formData.age);
      if (formData.foto) {
        data.append('foto', formData.foto);
      }

      const res = await API.post(
        '/trees',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setMessage(res.data.message);
      setQrPreview(res.data.data.qrCodeDataUrl);
    } catch (err) {
      console.error(err);
      setMessage('❌ Gagal menyimpan data pohon.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Form Input Pohon</h1>

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Nama Pohon"
          className="w-full border px-3 py-2"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="species"
          placeholder="Spesies"
          className="w-full border px-3 py-2"
          onChange={handleChange}
          required
        />
        <textarea
          name="location"
          placeholder="Lokasi (Koordinat atau deskripsi)"
          className="w-full border px-3 py-2"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Umur (Tahun)"
          className="w-full border px-3 py-2"
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="foto"
          accept="image/*"
          className="w-full"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan & Buat QR'}
        </button>
      </form>

      {message && <p className="mt-4 text-blue-700">{message}</p>}

      {qrPreview && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Preview QR Code:</h2>
          <img src={qrPreview} alt="QR Code Pohon" className="border w-64" />
        </div>
      )}
    </div>
  );
}
