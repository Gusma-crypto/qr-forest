"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function ShowTreePage() {
  const searchParams = useSearchParams();
  const [tree, setTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const q = searchParams.get("q"); // 🔍 Ambil parameter terenkripsi

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const res = await API.get(`/trees/show?q=${encodeURIComponent(q)}`);
        setTree(res.data);
      } catch (err) {
        console.error("❌ Gagal fetch data:", err);
        setErrorMsg("Data pohon tidak ditemukan atau link tidak valid.");
      } finally {
        setLoading(false);
      }
    };

    if (q) fetchTree();
    else {
      setLoading(false);
      setErrorMsg("Parameter tidak valid.");
    }
  }, [q]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" /> &nbsp;Memuat...
      </div>
    );
  }

  if (errorMsg) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">❌ {errorMsg}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold text-green-700">🌳 Data Pohon</h1>
      <Image src={tree.foto_url} alt={tree.name} width={800} height={500} className="rounded border" />
      <div className="space-y-1 text-lg">
        <p>
          <strong>Nama:</strong> {tree.name}
        </p>
        <p>
          <strong>Spesies:</strong> {tree.species}
        </p>
        <p>
          <strong>Lokasi:</strong> {tree.location}
        </p>
        <p>
          <strong>Umur:</strong> {tree.age} tahun
        </p>
      </div>
    </div>
  );
}
