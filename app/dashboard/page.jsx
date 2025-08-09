"use client";

import React, { useEffect, useState } from "react";
import API from "@/lib/api";
import { Users, TreePine, Brush, Activity } from "lucide-react"; // Icon lucide-react

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTrees: 0,
    totalUsers: 0,
    totalDesigns: 0,
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Ambil statistik
    API.get("/dashboard")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Gagal ambil data dashboard:", err);
      });

    // Dummy aktivitas user
    setActivities([
      { id: 1, message: "Menanam pohon baru", date: "2025-08-09" },
      { id: 2, message: "Membuat desain pohon", date: "2025-08-08" },
      { id: 3, message: "Bergabung sebagai anggota baru", date: "2025-08-07" },
    ]);
  }, []);

  const statCards = [
    {
      title: "Total Pohon",
      value: stats.totalTrees,
      icon: <TreePine className="w-8 h-8 text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Total User",
      value: stats.totalUsers,
      icon: <Users className="w-8 h-8 text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Total Desain",
      value: stats.totalDesigns,
      icon: <Brush className="w-8 h-8 text-pink-600" />,
      bg: "bg-pink-100",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statCards.map((stat, idx) => (
          <div key={idx} className={`p-6 rounded-xl shadow-sm flex items-center gap-4 ${stat.bg}`}>
            <div className="p-3 bg-white rounded-full shadow">{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <h2 className="text-2xl font-bold text-gray-800">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Aktivitas User */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-purple-600" /> Aktivitas Terbaru
        </h2>
        {activities.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada aktivitas</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {activities.map((act) => (
              <li key={act.id} className="py-3 flex justify-between">
                <span className="text-gray-700">{act.message}</span>
                <span className="text-sm text-gray-500">{act.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
