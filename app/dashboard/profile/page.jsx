"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    full_name: "",
    phone: "",
    address: "",
    bio: "",
    photo_url: "",
    photo: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // Ambil data profil
  useEffect(() => {
    API.get("/profile")
      .then((res) => {
        setFormData({ ...res.data, photo: null });
        setPreview(null);
        setLoading(false);
      })
      .catch(() => {
        setMessage({ type: "error", text: "Gagal memuat profil" });
        setLoading(false);
      });
  }, []);

  // Handle input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload + preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPreview(URL.createObjectURL(file)); // tampilkan preview
    }
  };

  // Submit update profil
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      const form = new FormData();
      form.append("full_name", formData.full_name);
      form.append("phone", formData.phone);
      form.append("address", formData.address);
      form.append("bio", formData.bio);
      if (formData.photo) {
        form.append("photo", formData.photo);
      }

      await API.put("/profile", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage({ type: "success", text: "Profil berhasil diperbarui" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Gagal update profil",
      });
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-4">Profil Saya</h1>

      {message && <p className={`mb-4 p-2 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{message.text}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Foto Profil */}
        <div className="flex flex-col items-center">
          {/* Foto Profil */}
          <img src={preview ? preview : formData.photo_url ? `${process.env.NEXT_PUBLIC_API_URL}${formData.photo_url}` : "/default-avatar.png"} alt="Foto Profil" className="w-32 h-32 rounded-full object-cover border" />

          {/* Tombol Pilih File */}
          <label htmlFor="photoUpload" className="mt-3 px-4 py-2 bg-gray-300 text-black rounded cursor-pointer hover:bg-gray-400 transition">
            Pilih Foto
          </label>
          <input id="photoUpload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>

        {/* Username (readonly) */}
        <div>
          <label className="block font-medium">Username</label>
          <input type="text" name="username" value={formData.username || ""} readOnly className="w-full border p-2 rounded bg-gray-100" />
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="block font-medium">Email</label>
          <input type="email" name="email" value={formData.email || ""} readOnly className="w-full border p-2 rounded bg-gray-100" />
        </div>

        {/* Nama Lengkap */}
        <div>
          <label className="block font-medium">Nama Lengkap</label>
          <input type="text" name="full_name" value={formData.full_name || ""} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        {/* Telepon */}
        <div>
          <label className="block font-medium">Telepon</label>
          <input type="text" name="phone" value={formData.phone || ""} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        {/* Alamat */}
        <div>
          <label className="block font-medium">Alamat</label>
          <textarea name="address" value={formData.address || ""} onChange={handleChange} className="w-full border p-2 rounded"></textarea>
        </div>

        {/* Bio */}
        <div>
          <label className="block font-medium">Bio</label>
          <textarea name="bio" value={formData.bio || ""} onChange={handleChange} className="w-full border p-2 rounded"></textarea>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Update Profil
        </button>
      </form>
    </div>
  );
}
