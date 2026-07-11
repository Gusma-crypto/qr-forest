"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import { Plus, Printer, Trash2, Download, Search, Eye, QrCode, Trees, X, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const apiOrigin = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/+$/, "");

function getTreeAge(tree) {
  if (tree.year_planted) {
    return `${new Date().getFullYear() - Number(tree.year_planted)} tahun`;
  }

  if (tree.age !== null && tree.age !== undefined) {
    return `${tree.age} tahun`;
  }

  return "-";
}

function getQrSrc(tree) {
  if (tree.qr_code && tree.qr_code.startsWith("data:image") && !tree.qr_code.includes("...")) {
    return tree.qr_code;
  }

  return `${apiOrigin}/qrcodes/qrcode-tree-${tree.id}.png`;
}

function QRPreview({ tree }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-700">
        <QrCode size={26} />
      </div>
    );
  }

  return <img src={getQrSrc(tree)} alt={`QR ${tree.name}`} className="mx-auto h-16 w-16 rounded-lg border border-emerald-100 bg-white object-contain p-1 shadow-sm" onError={() => setFailed(true)} />;
}

export default function DataPohonTable() {
  const [trees, setTrees] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [showPrintOptions, setShowPrintOptions] = useState(false);
  const router = useRouter();

  const fetchTrees = async () => {
    try {
      const res = await API.get("/trees");
      setTrees(res.data);
    } catch (err) {
      console.error("Gagal fetch data pohon:", err);
    }
  };

  useEffect(() => {
    fetchTrees();
  }, []);

  const filteredTrees = trees.filter((tree) => tree.name.toLowerCase().includes(search.toLowerCase()) || tree.species.toLowerCase().includes(search.toLowerCase()));
  const currentItems = filteredTrees;

  const handleCheckbox = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleSelectAll = () => {
    if (selected.length === currentItems.length) {
      setSelected([]);
    } else {
      setSelected(currentItems.map((tree) => tree.id));
    }
  };

  const handleDeleteOne = async (id) => {
    if (confirm("Yakin hapus data ini?")) {
      try {
        // console.log(`🗑️ Menghapus data pohon dengan ID: ${id}...`);
        const response = await API.delete(`/trees/${id}`);
        toast.success("Berhasil Hapus data p");
        // console.log("✅ Data berhasil dihapus:", response.data);
        fetchTrees(); // Refresh data pohon
      } catch (error) {
        console.error("❌ Gagal menghapus data pohon:", error.response?.data || error.message);
      }
    } else {
      console.log("❎ Penghapusan dibatalkan oleh pengguna.");
    }
  };

  const handleDeleteSelected = async () => {
    if (selected.length === 0) {
      toast.warning("Pilih data terlebih dahulu.");
      return;
    }

    const confirmDelete = confirm(`Yakin hapus ${selected.length} data?`);
    if (!confirmDelete) return;

    try {
      console.log("Menghapus ID:", selected); // log ke console
      await API.post("/trees/deleteAllCheck", { ids: selected });
      fetchTrees(); // refresh data setelah hapus
      setSelected([]); // kosongkan checkbox
      toast.success(" Berhasil menghapus data terpilih.");
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      toast.error("❌ Gagal menghapus data terpilih.");
    }
  };

  const handlePrintAll = () => {
    setShowPrintOptions(true); // tampilkan piliha
  };
  //download
  const downloadPDF = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await API.post(
        "/trees/printallPDFDesign",
        {}, // body kosong karena kamu hanya butuh POST tanpa data
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // 👈 untuk terima file blob
        }
      );

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-cetak-dengan-desain-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("❌ Error saat download:", err);
      alert("Gagal download. Coba lagi nanti.");
    }
  };

  const handleTambahData = () => {
    try {
      // Navigasi ke halaman detail berdasarkan ID
      router.push("/dashboard/datapohon/create");
    } catch (error) {
      console.error("❌ Gagal navigasi ke halaman create:", error);
    }
  };

  const handleDetailOne = async (id) => {
    try {
      // Navigasi ke halaman detail berdasarkan ID
      router.push(`/dashboard/datapohon/${id}`);
    } catch (error) {
      console.error("❌ Gagal navigasi ke halaman detail:", error);
    }
  };

  const handleEditOne = (id) => {
    router.push(`/dashboard/datapohon/${id}/edit`);
  };

  const handleShow = (qrcodeUrl) => {
    if (!qrcodeUrl) return toast.warning("Link QR belum tersedia.");

    try {
      const url = new URL(qrcodeUrl);
      router.push(`/tree/show${url.search}`);
    } catch {
      router.push(qrcodeUrl);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl shadow-emerald-900/5">
      <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-700 px-6 py-6 text-white">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-medium text-emerald-50 ring-1 ring-white/15">
              <Trees size={14} /> Inventaris QRForest
            </p>
            <h2 className="text-2xl font-bold">Data Pohon</h2>
            <p className="mt-1 text-sm text-emerald-50/80">Kelola data pohon, QR code, dan halaman publik dari satu tempat.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-xl bg-white/12 px-4 py-3 ring-1 ring-white/15">
              <p className="text-emerald-50/70">Total</p>
              <p className="text-xl font-semibold">{trees.length}</p>
            </div>
            <div className="rounded-xl bg-white/12 px-4 py-3 ring-1 ring-white/15">
              <p className="text-emerald-50/70">Tampil</p>
              <p className="text-xl font-semibold">{filteredTrees.length}</p>
            </div>
            <div className="rounded-xl bg-white/12 px-4 py-3 ring-1 ring-white/15">
              <p className="text-emerald-50/70">Dipilih</p>
              <p className="text-xl font-semibold">{selected.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700/50" size={18} />
            <input
              type="text"
              placeholder="Cari nama atau spesies pohon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 w-full rounded-xl border border-emerald-100 bg-emerald-50/60 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
          <button onClick={handleTambahData} className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800">
            <Plus size={17} className="mr-2" /> Tambah Data
          </button>

          <button onClick={handlePrintAll} className="inline-flex h-11 items-center justify-center rounded-xl bg-teal-600 px-4 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition hover:-translate-y-0.5 hover:bg-teal-700">
            <Printer size={17} className="mr-2" /> Cetak QR
          </button>

          <button onClick={handleDeleteSelected} className="inline-flex h-11 items-center justify-center rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition hover:-translate-y-0.5 hover:bg-rose-700">
            <Trash2 size={17} className="mr-2" /> Hapus
          </button>
        </div>
        </div>

        {/* ✅ Popup Card Pilihan Cetak */}
        <AnimatePresence>
          {showPrintOptions && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }}>
            <Card className="w-[340px] space-y-4 rounded-2xl border-emerald-100 bg-white p-5 text-center shadow-2xl">
              <button onClick={() => setShowPrintOptions(false)} className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100">
                <X size={16} />
              </button>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Printer size={24} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Pilih Opsi Cetak</h3>
              <p className="text-sm text-slate-500">Tentukan format QR code yang ingin diunduh.</p>
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    downloadPDF("with-template");
                    setShowPrintOptions(false);
                  }}
                  className="w-full rounded-xl bg-emerald-700 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  Dengan Desain
                </button>
                <button
                  onClick={() => {
                    downloadPDF("without-template");
                    setShowPrintOptions(false);
                  }}
                  className="w-full rounded-xl bg-slate-800 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-900"
                >
                  Tanpa Desain
                </button>
              </div>
            </Card>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>

      <div className="overflow-hidden rounded-2xl border border-slate-100">
        <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="p-4 text-center">
                <input type="checkbox" onChange={handleSelectAll} checked={selected.length === currentItems.length && currentItems.length > 0} />
              </th>
              <th className="p-4 text-left">Nama</th>
              <th className="p-4 text-left">Spesies</th>
              <th className="p-4 text-left">Lokasi</th>
              <th className="p-4 text-left">Usia</th>
              <th className="p-4 text-center">QR Code</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentItems.map((tree) => (
              <motion.tr key={tree.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="transition hover:bg-emerald-50/50">
                <td className="p-4 text-center">
                  <input type="checkbox" checked={selected.includes(tree.id)} onChange={() => handleCheckbox(tree.id)} />
                </td>
                <td className="p-4">
                  <p className="font-semibold capitalize text-slate-900">{tree.name}</p>
                  <p className="mt-1 max-w-[220px] truncate text-xs text-slate-500">{tree.description || "Belum ada deskripsi"}</p>
                </td>
                <td className="p-4 italic text-slate-600">{tree.species}</td>
                <td className="p-4 text-slate-600">{tree.location}</td>
                <td className="p-4 text-slate-700">{getTreeAge(tree)}</td>
                <td className="p-4 text-center"><QRPreview tree={tree} /></td>
                <td className="p-4">
                  <div className="flex flex-wrap justify-end gap-2">
                  {/* Tombol Unduh */}
                  <a href={getQrSrc(tree)} download={`qr_${tree.id}.png`} className="inline-flex h-9 items-center rounded-lg bg-emerald-50 px-3 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100">
                    <Download size={14} className="mr-1.5" />
                    Unduh
                  </a>

                  {/* Icon Detail (Search) */}
                  <button onClick={() => handleDetailOne(tree.id)} className="inline-flex h-9 items-center rounded-lg bg-sky-50 px-3 text-xs font-semibold text-sky-700 transition hover:bg-sky-100" title="Lihat Detail">
                    <Search size={14} className="mr-1.5" />
                    Detail
                  </button>

                  <button onClick={() => handleEditOne(tree.id)} className="inline-flex h-9 items-center rounded-lg bg-amber-50 px-3 text-xs font-semibold text-amber-700 transition hover:bg-amber-100" title="Edit Data">
                    <Pencil size={14} className="mr-1.5" />
                    Edit
                  </button>

                  <button onClick={() => handleShow(tree.qrcodeurl)} className="inline-flex h-9 items-center rounded-lg bg-indigo-50 px-3 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100">
                    <Eye size={14} className="mr-1.5" />
                    Show
                  </button>

                  {/* Tombol Hapus */}
                  <button onClick={() => handleDeleteOne(tree.id)} className="inline-flex h-9 items-center rounded-lg bg-rose-50 px-3 text-xs font-semibold text-rose-700 transition hover:bg-rose-100">
                    <Trash2 size={14} className="mr-1.5" />
                    Hapus
                  </button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="7" className="p-12 text-center text-slate-500">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <QrCode size={28} />
                  </div>
                  Tidak ada data pohon yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium">
          Menampilkan {filteredTrees.length} dari {trees.length} data
        </p>
        <p>Total: {trees.length} data</p>
      </div>
      </div>
    </motion.div>
  );
}
