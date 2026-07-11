"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { motion } from "framer-motion";
import { Camera, Mail, MapPin, Phone, Save, User, UserRound } from "lucide-react";

const apiOrigin = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/+$/, "");

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
      .catch((err) => {
        setMessage({ type: "error", text: err.response?.data?.message || "Gagal memuat profil" });
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

  const photoSrc = preview || (formData.photo_url ? `${apiOrigin}${formData.photo_url}` : "");

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="h-80 animate-pulse rounded-2xl border border-emerald-100 bg-white/70 shadow-xl shadow-emerald-900/5" />
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl shadow-emerald-900/5">
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-700 px-6 py-7 text-white">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-medium text-emerald-50 ring-1 ring-white/15">
          <UserRound size={14} /> Akun QRForest
        </p>
        <h1 className="text-2xl font-bold">Profil Saya</h1>
        <p className="mt-1 text-sm text-emerald-50/80">Kelola identitas, kontak, dan foto profil administrator.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 p-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 text-center">
          <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg shadow-emerald-900/10">
            {photoSrc ? (
              <img src={photoSrc} alt="Foto Profil" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-emerald-100 text-emerald-700">
                <User size={54} />
              </div>
            )}
          </div>

          <label htmlFor="photoUpload" className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800">
            <Camera size={16} className="mr-2" /> Pilih Foto
          </label>
          <input id="photoUpload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

          <div className="mt-5 space-y-2 text-left text-sm text-slate-600">
            <p className="flex items-center gap-2 rounded-xl bg-white px-3 py-2">
              <User size={15} className="text-emerald-700" /> {formData.username || "-"}
            </p>
            <p className="flex items-center gap-2 rounded-xl bg-white px-3 py-2">
              <Mail size={15} className="text-emerald-700" /> {formData.email || "-"}
            </p>
          </div>
        </aside>

        <section className="space-y-5">
          {message && <p className={`rounded-xl px-4 py-3 text-sm font-medium ${message.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>{message.text}</p>}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Username</label>
              <input type="text" name="username" value={formData.username || ""} readOnly className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600 outline-none" />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
              <input type="email" name="email" value={formData.email || ""} readOnly className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600 outline-none" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Nama Lengkap</label>
            <input type="text" name="full_name" value={formData.full_name || ""} onChange={handleChange} className="h-11 w-full rounded-xl border border-emerald-100 px-4 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Phone size={15} /> Telepon
              </label>
              <input type="text" name="phone" value={formData.phone || ""} onChange={handleChange} className="h-11 w-full rounded-xl border border-emerald-100 px-4 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <MapPin size={15} /> Alamat
              </label>
              <input type="text" name="address" value={formData.address || ""} onChange={handleChange} className="h-11 w-full rounded-xl border border-emerald-100 px-4 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Bio</label>
            <textarea name="bio" value={formData.bio || ""} onChange={handleChange} rows={5} className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
          </div>

          <button type="submit" className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800 md:w-auto">
            <Save size={17} className="mr-2" /> Simpan Profil
          </button>
        </section>
      </form>
    </motion.div>
  );
}
