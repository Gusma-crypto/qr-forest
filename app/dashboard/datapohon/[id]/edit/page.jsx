"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, Save, TreePine } from "lucide-react";
import { toast } from "react-toastify";
import API from "@/lib/api";

const apiOrigin = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/+$/, "");

export default function EditTreePage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    location: "",
    description: "",
    year_planted: "",
    foto_pohon_path: "",
    image: null,
  });

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const res = await API.get(`/trees/${id}`);
        setFormData({
          name: res.data.name || "",
          species: res.data.species || "",
          location: res.data.location || "",
          description: res.data.description || "",
          year_planted: res.data.year_planted || "",
          foto_pohon_path: res.data.foto_pohon_path || "",
          image: null,
        });
      } catch (err) {
        console.error("Gagal memuat data pohon:", err);
        toast.error("Gagal memuat data pohon.");
        router.push("/dashboard/datapohon");
      } finally {
        setLoading(false);
      }
    };

    fetchTree();
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files?.[0];
      setFormData((prev) => ({ ...prev, image: file || null }));

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;

    setSaving(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("species", formData.species);
      data.append("location", formData.location);
      data.append("description", formData.description);
      data.append("year_planted", formData.year_planted);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await API.put(`/trees/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message || "Data pohon berhasil diperbarui.");
      router.push("/dashboard/datapohon");
    } catch (err) {
      console.error("Gagal update pohon:", err);
      const serverMessage = typeof err.response?.data === "string" ? err.response.data : err.response?.data?.message;
      const fallbackMessage = err.response?.status ? `Gagal update data pohon. Status ${err.response.status}.` : "Gagal update data pohon.";
      toast.error(serverMessage || fallbackMessage);
    } finally {
      setSaving(false);
    }
  };

  const currentImage = imagePreview || (formData.foto_pohon_path ? `${apiOrigin}/${formData.foto_pohon_path}` : "");

  if (loading) {
    return <div className="rounded-2xl border border-emerald-100 bg-white p-8 text-center text-slate-600 shadow-xl shadow-emerald-900/5">Memuat data pohon...</div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl shadow-emerald-900/5">
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-700 px-6 py-7 text-white">
        <button onClick={() => router.push("/dashboard/datapohon")} className="mb-4 inline-flex items-center rounded-xl bg-white/12 px-3 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/20">
          <ArrowLeft size={16} className="mr-2" /> Kembali
        </button>
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-medium text-emerald-50 ring-1 ring-white/15">
          <TreePine size={14} /> Edit Data Pohon
        </p>
        <h1 className="text-2xl font-bold">Perbarui Informasi Pohon</h1>
        <p className="mt-1 text-sm text-emerald-50/80">Perubahan data akan memperbarui QR code dan halaman publik pohon.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 p-6 lg:grid-cols-[300px_1fr]" encType="multipart/form-data">
        <aside className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
          <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-lg shadow-emerald-900/10">
            {currentImage ? (
              <img src={currentImage} alt={formData.name || "Foto pohon"} className="h-64 w-full object-cover" />
            ) : (
              <div className="flex h-64 w-full items-center justify-center bg-emerald-100 text-emerald-700">
                <TreePine size={64} />
              </div>
            )}
          </div>

          <label htmlFor="treeImage" className="mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800">
            <Camera size={16} className="mr-2" /> Ganti Foto
          </label>
          <input id="treeImage" type="file" name="image" accept="image/png,image/jpeg,image/jpg" onChange={handleChange} className="hidden" />
          <p className="mt-3 text-xs leading-5 text-slate-500">Format yang didukung: JPG, JPEG, PNG. Maksimal 5MB.</p>
        </aside>

        <section className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Nama Pohon</label>
              <input name="name" value={formData.name} onChange={handleChange} required className="h-11 w-full rounded-xl border border-emerald-100 px-4 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Spesies</label>
              <input name="species" value={formData.species} onChange={handleChange} required className="h-11 w-full rounded-xl border border-emerald-100 px-4 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Lokasi</label>
            <textarea name="location" value={formData.location} onChange={handleChange} required rows={3} className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Deskripsi</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full rounded-xl border border-emerald-100 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Tahun Tanam</label>
            <input type="number" name="year_planted" value={formData.year_planted} onChange={handleChange} min="1900" max={new Date().getFullYear()} required className="h-11 w-full rounded-xl border border-emerald-100 px-4 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100" />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="submit" disabled={saving} className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60">
              <Save size={17} className="mr-2" /> {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            <button type="button" onClick={() => router.push("/dashboard/datapohon")} className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Batal
            </button>
          </div>
        </section>
      </form>
    </motion.div>
  );
}
