"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import { Plus, Printer, Trash2, Download, Info, Search, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import DetailButton from "@/components/DetailButton";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DataPohonTable() {
  const [trees, setTrees] = useState([]);
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPrintOptions, setShowPrintOptions] = useState(false);
  const itemsPerPage = 5;
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

  const totalPages = Math.ceil(filteredTrees.length / itemsPerPage);
  const currentItems = filteredTrees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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

  const handleShow = (qrcodeUrl) => {
    router.push(qrcodeUrl);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Data Pohon</h2>

        <div className="flex flex-col sm:flex-row sm:space-x-2 gap-y-2">
          <button onClick={handleTambahData} className="flex items-center justify-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 w-full sm:w-auto">
            <Plus size={18} className="mr-2" /> Tambah Data
          </button>

          <button onClick={handlePrintAll} className="flex items-center justify-center bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 w-full sm:w-auto">
            <Printer size={18} className="mr-2" /> Cetak QR Semua
          </button>

          <button onClick={handleDeleteSelected} className="flex items-center justify-center bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 w-full sm:w-auto">
            <Trash2 size={18} className="mr-2" /> Hapus Terpilih
          </button>
        </div>

        {/* ✅ Popup Card Pilihan Cetak */}
        {showPrintOptions && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-[320px] text-center space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Pilih Opsi Cetak</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Bagaimana kamu ingin mencetak semua QR code?</p>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    downloadPDF("with-template");
                    setShowPrintOptions(false);
                  }}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Dengan Desain
                </button>
                <button
                  onClick={() => {
                    downloadPDF("without-template");
                    setShowPrintOptions(false);
                  }}
                  className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
                >
                  Tanpa Desain
                </button>
                <button onClick={() => router.push("/dashboard/datapohon")} className="text-red-500 hover:underline mt-2">
                  Batal
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Input pencarian dengan icon search dan border hijau */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Cari pohon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 border-gray-300"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-sm rounded overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-center">
                <input type="checkbox" onChange={handleSelectAll} checked={selected.length === currentItems.length && currentItems.length > 0} />
              </th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Spesies</th>
              <th className="p-3 text-left">Lokasi</th>
              <th className="p-3 text-left">Usia</th>
              <th className="p-3 text-center">QR Code</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((tree) => (
              <tr key={tree.id} className="border-t hover:bg-gray-50">
                <td className="p-3 text-center">
                  <input type="checkbox" checked={selected.includes(tree.id)} onChange={() => handleCheckbox(tree.id)} />
                </td>
                <td className="p-3 text-gray-600">{tree.name}</td>
                <td className="p-3 text-gray-600">{tree.species}</td>
                <td className="p-3 text-gray-600">{tree.location}</td>
                <td className="p-3 text-gray-600">{tree.age} tahun</td>
                <td className="p-3 text-center">{tree.qr_code ? <img src={tree.qr_code} alt="QR" className="w-16 h-16 object-contain mx-auto" /> : <span className="text-gray-400">Tidak ada</span>}</td>
                <td className="p-3 text-center space-x-2">
                  {/* Tombol Unduh */}
                  <a href={tree.qr_code} download={`qr_${tree.id}.png`} className="inline-flex items-center text-green-600 hover:underline">
                    <Download size={16} className="mr-1" />
                    Unduh
                  </a>

                  {/* Icon Detail (Search) */}
                  <button onClick={() => handleDetailOne(tree.id)} className="inline-flex items-center text-blue-600 hover:underline" title="Lihat Detail">
                    <Search size={16} className="mr-1" />
                    Detail
                  </button>

                  <button onClick={() => handleShow(tree.qrcodeurl)} className="inline-flex items-center text-blue-600 hover:underline mr-3">
                    <Eye size={16} className="mr-1" />
                    Show
                  </button>

                  {/* Tombol Hapus */}
                  <button onClick={() => handleDeleteOne(tree.id)} className="inline-flex items-center text-red-600 hover:underline">
                    <Trash2 size={16} className="mr-1" />
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 p-4">
                  Tidak ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 text-gray-700">
        <p>
          Halaman {currentPage} dari {totalPages}
        </p>
        <p>Total: {trees.length} data</p>
        <div className="space-x-2">
          <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            Prev
          </button>
          <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
