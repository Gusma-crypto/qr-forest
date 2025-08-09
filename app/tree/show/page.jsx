"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/lib/api";

export default function TreeShowPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk Tanya AI
  const [question, setQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [isAsking, setIsAsking] = useState(false);

  useEffect(() => {
    if (!q) return;

    const fetchData = async () => {
      try {
        const res = await API.get(`/tree/show?q=${encodeURIComponent(q)}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.data.data) {
          throw new Error(res.data.message || "Gagal memuat data");
        }

        setTree(res.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [q]);

  const handleAskAI = async () => {
    if (!question.trim()) return;
    setIsAsking(true);
    setAiResponse(null);

    // Simulasi respons AI
    setTimeout(() => {
      setAiResponse(`🤖 (Simulasi AI) Jawaban untuk: "${question}"`);
      setIsAsking(false);
    }, 1500);
  };

  if (loading) return <div className="flex items-center justify-center h-screen text-lg font-semibold">Memuat data...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  if (!tree) return <div className="flex items-center justify-center h-screen">Data tidak ditemukan</div>;

  const { qr_code, ...treeWithoutQR } = tree;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-3xl w-full">
        {/* Foto pohon */}
        {treeWithoutQR.foto_pohon_path && (
          <div className="flex justify-center items-center w-full">
            <img src={`${process.env.NEXT_PUBLIC_API_URL}/${treeWithoutQR.foto_pohon_path}`} alt={treeWithoutQR.name} className="w-full max-w-3xl object-contain rounded-lg shadow-lg" />
          </div>
        )}

        {/* Konten */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-green-800 mb-2">{treeWithoutQR.name}</h1>
          <p className="text-lg text-green-600 mb-4 italic">{treeWithoutQR.species}</p>

          <div className="space-y-3 mb-6">
            <p>
              <strong className="text-green-800">📍 Lokasi:</strong> {treeWithoutQR.location}
            </p>
            <p>
              <strong className="text-green-800">📅 Tahun Tanam:</strong> {treeWithoutQR.year_planted}
            </p>
            <p>
              <strong className="text-green-800">📝 Deskripsi:</strong> {treeWithoutQR.description}
            </p>
          </div>

          {/* Tanya AI */}
          <div className="border-t border-green-200 pt-4">
            <h2 className="text-xl font-semibold text-green-700 mb-2">💬 Tanya AI tentang pohon ini</h2>
            <div className="flex gap-2">
              <input type="text" placeholder="Ketik pertanyaanmu..." value={question} onChange={(e) => setQuestion(e.target.value)} className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
              <button onClick={handleAskAI} disabled={isAsking} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50">
                {isAsking ? "Memproses..." : "Tanya"}
              </button>
            </div>
            {aiResponse && <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">{aiResponse}</div>}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-green-700 text-white text-center p-4 text-sm">🌱 Terima kasih telah berkunjung dan peduli lingkungan</div>
      </div>
    </div>
  );
}
