"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setUser({ name: "User Example" }); // nanti diganti dari backend
    }
  }, []);

  if (!user) return <p className="p-6">Memuat data...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-6 mt-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>

      <p className="text-gray-600 mb-6">
        Selamat datang, <span className="font-semibold">{user.name}</span>!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-4 bg-blue-100 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-blue-800">Statistik</h2>
          <p className="text-sm text-blue-700">Coming soon...</p>
        </div>

        <div className="p-4 bg-green-100 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-green-800">Aktivitas</h2>
          <p className="text-sm text-green-700">Coming soon...</p>
        </div>
      </div>

      <div className="space-y-8">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="p-4 bg-gray-100 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700">Konten Dummy #{i + 1}</h3>
            <p className="text-sm text-gray-600">Ini adalah konten tambahan untuk menguji efek scroll pada navbar. Scroll ke bawah untuk melihat perubahan tampilan navbar.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
