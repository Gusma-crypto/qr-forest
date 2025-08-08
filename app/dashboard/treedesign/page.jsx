"use client";

import { useEffect, useState, useRef } from "react";
import API from "@/lib/api";
import Image from "next/image";
import { X, CheckCircle, Circle, Image as ImageIcon, Upload } from "lucide-react";
import { toast } from "react-toastify";

export default function TreeDesignPage() {
  const backgroundRef = useRef(null);
  const boxRef = useRef(null);
  const [designs, setDesigns] = useState([]);
  const [form, setForm] = useState({
    title: "",
    qr_color: "#000000",
    text_color: "#000000",
    show_logo: false,
    global_title: "",
    background_url: null,
    box_background_url: null,
  });

  const [preview, setPreview] = useState({
    background: null,
    box: null,
  });

  const [loading, setLoading] = useState(false);

  const fetchDesigns = async () => {
    try {
      const res = await API.get("/treedesign");
      setDesigns(res.data);
    } catch (err) {
      console.error("Gagal fetch designs", err);
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const file = files[0];
      if (file) {
        setForm((prev) => ({ ...prev, [name]: file }));
        const url = URL.createObjectURL(file);
        setPreview((prev) => ({
          ...prev,
          [name === "background_url" ? "background" : "box"]: url,
        }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    for (const key in form) {
      if (form[key]) formData.append(key, form[key]);
    }

    try {
      await API.post("/treedesign", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Desain berhasil ditambahkan");
      fetchDesigns();
      // Reset form state
      setForm({
        title: "",
        qr_color: "#000000",
        show_logo: false,
        global_title: "",
        background_url: null,
        box_background_url: null,
      });

      // Reset preview
      setPreview({
        background: null,
        box: null,
      });

      // Reset input file secara manual
      if (backgroundRef.current) backgroundRef.current.value = "";
      if (boxRef.current) boxRef.current.value = "";
    } catch (err) {
      toast.error("Gagal menambahkan desain!!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus desain ini?")) return;
    try {
      await API.delete(`/treedesign/${id}`);
      toast.success("🗑️ Desain berhasil dihapus");
      fetchDesigns();
    } catch (err) {
      toast.error("❌ Gagal menghapus desain");
      console.error(err);
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await API.post(`/treedesign/${id}/setdefault`);
      toast.success("Desain default berhasil diatur");
      fetchDesigns();
    } catch (err) {
      toast.error("❌ Gagal set default");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">🎨 Desain QR Pohon</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl shadow-md">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Judul Desain" className="w-full border rounded px-4 py-2" required />

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Warna QR:</label>
          <input type="color" name="qr_color" value={form.qr_color} onChange={handleChange} className="w-12 h-8 border rounded" />
          <span className="text-sm">{form.qr_color}</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Warna Teks All:</label>
          <input type="color" name="text_color" value={form.text_color} onChange={handleChange} className="w-12 h-8 border rounded" />
          <span className="text-sm">{form.text_color}</span>
        </div>

        <input name="global_title" value={form.global_title} onChange={handleChange} placeholder="Judul Global" className="w-full border rounded px-4 py-2" />

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="show_logo" checked={form.show_logo} onChange={handleChange} />
          <span className="text-sm">Tampilkan Logo</span>
        </label>

        <div>
          <label className="text-sm font-medium">Upload Background:</label>
          <div className="flex items-center gap-3 mt-1">
            <button type="button" onClick={() => backgroundRef.current?.click()} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-300" title="Upload Background">
              <Upload className="w-5 h-5" />
            </button>
            {preview.background && <Image src={preview.background} alt="Preview Background" width={80} height={80} className="rounded shadow" />}
          </div>
          <input type="file" name="background_url" onChange={handleChange} ref={backgroundRef} className="hidden" accept="image/*" />
        </div>

        <div>
          <label className="text-sm font-medium">Upload Box Background:</label>
          <div className="flex items-center gap-3 mt-1">
            <button type="button" onClick={() => boxRef.current?.click()} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full border border-gray-300" title="Upload Box Background">
              <Upload className="w-5 h-5" />
            </button>
            {preview.box && <Image src={preview.box} alt="Preview Box" width={80} height={80} className="rounded shadow" />}
          </div>
          <input type="file" name="box_background_url" onChange={handleChange} ref={boxRef} className="hidden" accept="image/*" />
        </div>

        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded font-semibold">
          {loading ? "⏳ Menyimpan..." : "➕ Tambah Desain"}
        </button>
      </form>

      {/* LIST DESAIN */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">📦 Semua Desain</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {designs.map((d) => (
            <div key={d.id} className={`p-4 rounded-xl shadow border bg-white relative transition ${d.is_default ? "border-yellow-400" : "border-gray-200"}`}>
              <button onClick={() => handleDelete(d.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-600">
                <X size={20} />
              </button>

              <p>
                <strong>📌 Judul:</strong> {d.title}
              </p>
              <p>
                <strong>🎨 Warna QR:</strong> {d.qr_color}
                <span className="inline-block w-5 h-5 rounded border" style={{ backgroundColor: d.qr_color }}></span>
              </p>
              <p className="flex items-center gap-2">
                <strong>🎯 Warna Teks All:</strong> {d.text_color}
                <span className="inline-block w-5 h-5 rounded border" style={{ backgroundColor: d.text_color }}></span>
              </p>
              <p>
                <strong>🖼 Tampilkan Logo:</strong> {d.show_logo ? "✅" : "❌"}
              </p>
              <p>
                <strong>📝 Judul Global:</strong> {d.global_title}
              </p>

              {d.background_url && (
                <div className="flex justify-center mt-2">
                  <Image src={`${process.env.NEXT_PUBLIC_API_URL}/${d.background_url}`} alt="Background" width={200} height={120} className="rounded" />
                </div>
              )}
              {d.box_background_url && (
                <div className="flex justify-center mt-2">
                  <Image src={`${process.env.NEXT_PUBLIC_API_URL}/${d.box_background_url}`} alt="Box Background" width={200} height={120} className="rounded" />
                </div>
              )}

              <button
                onClick={() => handleSetDefault(d.id)}
                className={`mt-4 flex items-center gap-2 px-3 py-1 text-sm rounded transition ${d.is_default ? "bg-green-600 text-white border border-yellow-400" : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"}`}
              >
                {d.is_default ? <CheckCircle size={16} /> : <Circle size={16} />}
                {d.is_default ? "Default Aktif" : "Set Default"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
