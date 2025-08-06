"use client";
import { useState } from "react";
import API from "@/lib/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CreateTreeForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    location: "",
    age: "",
    foto: null,
  });

  const [loading, setLoading] = useState(false);
  const [qrPreview, setQrPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      const file = files[0];
      setFormData({ ...formData, foto: file });

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      species: "",
      location: "",
      age: "",
      foto: null,
    });
    setImagePreview(null);
    setQrPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || qrPreview) return;
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("species", formData.species);
      data.append("location", formData.location);
      data.append("age", formData.age);
      if (formData.foto) {
        data.append("image", formData.foto);
      }

      const res = await API.post("/trees", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success(res.data.message || "✅ Pohon berhasil ditambahkan!");
      setQrPreview(res.data.data.qrCodeDataUrl);
    } catch (err) {
      console.error(err);
      if (err.response) {
        if (err.response.status === 409) {
          toast.error("❗Pohon dengan nama dan spesies yang sama sudah ada di database.");
        } else {
          toast.error(`❌ Gagal menyimpan data: ${err.response.data.message || "Terjadi kesalahan."}`);
        }
      } else {
        toast.error("❌ Gagal menyimpan data pohon. Tidak terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQR = () => {
    const link = document.createElement("a");
    link.href = qrPreview;
    link.download = `${formData.name || "qr-code"}.png`;
    link.click();
  };

  const handleDataPohon = () => {
    try {
      router.push("/dashboard/datapohon");
    } catch (err) {
      toast.error("❌ gagal navigasi ke halaman datapohon");
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto px-4 py-6 bg-white shadow-lg rounded-xl relative">
      {/* Tombol Close & Add New */}
      {qrPreview && (
        <div className="absolute top-2 left-4 right-4 flex flex-col sm:flex-row justify-between gap-2">
          <button onClick={resetForm} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200 w-full sm:w-auto" title="Tambah data pohon lagi">
            ➕ Add New
          </button>

          <button onClick={handleDataPohon} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200 w-full sm:w-auto" title="Tutup">
            ✖ Close
          </button>
        </div>
      )}

      <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mb-6 text-center mt-8 sm:mt-0">🌳 Form Input Data Pohon</h1>

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input type="text" name="name" value={formData.name} placeholder="Nama Pohon" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring text-sm" onChange={handleChange} required />
        <input type="text" name="species" value={formData.species} placeholder="Spesies" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" onChange={handleChange} required />
        <textarea name="location" value={formData.location} placeholder="Lokasi (Koordinat atau deskripsi)" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" onChange={handleChange} required />
        <input type="number" name="age" value={formData.age} placeholder="Umur (Tahun)" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" onChange={handleChange} required />
        <input type="file" name="foto" accept="image/*" className="w-full border border-gray-300 rounded px-4 py-2 text-sm" onChange={handleChange} />

        {imagePreview && (
          <div className="mt-4">
            <p className="font-semibold text-sm">Preview Gambar:</p>
            <img src={imagePreview} alt="Preview Pohon" className="w-full max-w-xs h-auto rounded border mt-2" />
          </div>
        )}

        {!qrPreview && (
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded w-full text-sm" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan & Buat QR"}
          </button>
        )}
      </form>

      {qrPreview && (
        <div className="mt-8 border-t pt-6 flex flex-col items-center">
          <h2 className="text-lg sm:text-xl font-bold mb-2 text-center">✅ QR Code Berhasil Dibuat</h2>
          <img src={qrPreview} alt="QR Code Pohon" className="w-64 border rounded mb-4" />
          <button onClick={handleDownloadQR} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full sm:w-auto text-sm">
            ⬇ Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}
