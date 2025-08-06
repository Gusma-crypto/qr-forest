"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/lib/api";

export default function TreeDetailPage() {
  const params = useParams();
  const treeId = decodeURIComponent(params.id);
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const res = await API.get(`/trees/${treeId}`);
        setTree(res.data);
      } catch (err) {
        console.error("❌ Gagal mengambil data:", err);
        setError("Tidak dapat memuat data pohon.");
      } finally {
        setLoading(false);
      }
    };

    fetchTree();
  }, [treeId]);

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
  const imageUrl = tree?.foto_pohon_path ? `${baseURL}/${tree.foto_pohon_path}` : null;

  const handleAskAI = async () => {
    if (!aiQuestion.trim()) return;
    setAiResponse("⏳ Menjawab...");

    try {
      // Ganti dengan request ke endpoint AI milikmu nanti
      const res = await API.post("/ask-ai", {
        question: aiQuestion,
        context: tree,
      });
      setAiResponse(res.data.answer);
    } catch (err) {
      console.error(err);
      setAiResponse("❌ Gagal mendapatkan jawaban.");
    }
  };

  if (loading) return <div className="p-4 text-center">⏳ Memuat data pohon...</div>;
  if (error || !tree) return <div className="p-4 text-center text-red-500">{error || "Data pohon tidak ditemukan."}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-10 px-4">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Kiri: Detail pohon */}
        <div>
          <h1 className="text-3xl font-bold text-green-700 mb-4">Detail Pohon {tree.name}</h1>

          {imageUrl && (
            <div className="mb-4">
              <h2 className="font-semibold mb-1">📷 Gambar Pohon</h2>
              <img src={imageUrl} alt="Foto Pohon" className="rounded-xl w-full h-auto object-cover border shadow" />
            </div>
          )}

          {tree.qr_code && (
            <div className="mb-4">
              <h2 className="font-semibold mb-1">🔳 QR Code</h2>
              <img src={tree.qr_code} alt="QR Code" className="w-32 h-32 border rounded shadow" />
              <a href={tree.qr_code} download={`qr_${tree.id}.png`} className="block mt-2 text-blue-600 underline hover:text-blue-800">
                ⬇️ Unduh QR Code
              </a>
            </div>
          )}

          <div className="space-y-2 text-gray-800 text-base">
            <p>
              <strong>🌳 Nama:</strong> {tree.name}
            </p>
            <p>
              <strong>🧬 Spesies:</strong> {tree.species}
            </p>
            <p>
              <strong>📍 Lokasi:</strong> {tree.location}
            </p>
            <p>
              <strong>📅 Umur:</strong> {tree.age} tahun
            </p>
            {tree.created_at && (
              <p>
                <strong>⏱ Dibuat:</strong> {new Date(tree.created_at).toLocaleString()}
              </p>
            )}
          </div>

          <div className="mt-6">
            <a href="/dashboard/datapohon" className="text-green-600 hover:underline font-medium">
              ← Kembali ke daftar pohon
            </a>
          </div>
        </div>

        {/* Kanan: Tanya AI */}
        <div className="bg-green-50 p-6 rounded-xl shadow-inner flex flex-col">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">🤖 Tanya AI tentang pohon ini</h2>

          <textarea
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            rows={5}
            placeholder="Tanya AI tentang pohon ini..."
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
          />

          <button onClick={handleAskAI} className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded">
            Kirim Pertanyaan
          </button>

          {aiResponse && (
            <div className="mt-4 p-4 bg-white border rounded-lg text-gray-700 whitespace-pre-wrap">
              <strong>Jawaban AI:</strong> <br />
              {aiResponse}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
