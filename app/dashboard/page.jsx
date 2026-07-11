"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import API from "@/lib/api";
import { ArrowRight, Brush, ClipboardList, LayoutDashboard, Plus, QrCode, ShieldCheck, Sparkles, TreePine, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalTrees: 0,
    totalUsers: 0,
    totalDesigns: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Gagal ambil data dashboard:", err))
      .finally(() => setLoading(false));
  }, []);

  const statCards = useMemo(
    () => [
      {
        title: "Total Pohon",
        value: stats.totalTrees,
        caption: "Data pohon tersimpan",
        icon: TreePine,
        tone: "emerald",
      },
      {
        title: "Total User",
        value: stats.totalUsers,
        caption: "Akun pengelola",
        icon: Users,
        tone: "sky",
      },
      {
        title: "Total Desain",
        value: stats.totalDesigns,
        caption: "Template QR aktif",
        icon: Brush,
        tone: "violet",
      },
    ],
    [stats]
  );

  const quickActions = [
    {
      title: "Tambah Data Pohon",
      desc: "Input pohon baru dan buat QR otomatis.",
      icon: Plus,
      href: "/dashboard/datapohon/create",
      color: "bg-emerald-700",
    },
    {
      title: "Kelola Data Pohon",
      desc: "Lihat, edit, hapus, dan cetak QR.",
      icon: ClipboardList,
      href: "/dashboard/datapohon",
      color: "bg-slate-900",
    },
    {
      title: "Desain QRCode",
      desc: "Atur tampilan QR sebelum dicetak.",
      icon: QrCode,
      href: "/dashboard/treedesign",
      color: "bg-teal-700",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.section initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.35 }} className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-xl shadow-emerald-900/5">
        <div className="grid gap-6 bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-700 p-6 text-white lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-emerald-50 ring-1 ring-white/15">
              <LayoutDashboard size={14} /> Dashboard Admin
            </p>
            <h1 className="text-3xl font-bold tracking-normal sm:text-4xl">Ringkasan QRForest</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50/80">
              Pantau jumlah pohon, pengguna, dan desain QR. Gunakan aksi cepat untuk mengelola inventaris pohon dengan lebih efisien.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => router.push("/dashboard/datapohon/create")} className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-4 text-sm font-semibold text-emerald-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50">
                <Plus size={17} className="mr-2" /> Tambah Pohon
              </button>
              <button onClick={() => router.push("/dashboard/datapohon")} className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15">
                Lihat Data <ArrowRight size={17} className="ml-2" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 self-end">
            <div className="rounded-2xl bg-white/12 p-4 ring-1 ring-white/15">
              <Sparkles className="mb-3 text-emerald-100" size={22} />
              <p className="text-2xl font-bold">{stats.totalTrees + stats.totalDesigns}</p>
              <p className="text-xs text-emerald-50/70">Asset aktif</p>
            </div>
            <div className="rounded-2xl bg-white/12 p-4 ring-1 ring-white/15">
              <ShieldCheck className="mb-3 text-emerald-100" size={22} />
              <p className="text-2xl font-bold">Admin</p>
              <p className="text-xs text-emerald-50/70">Akses dashboard</p>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 md:grid-cols-3">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          const toneClasses = {
            emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
            sky: "bg-sky-50 text-sky-700 ring-sky-100",
            violet: "bg-violet-50 text-violet-700 ring-violet-100",
          }[stat.tone];

          return (
            <motion.div key={stat.title} initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: index * 0.06, duration: 0.35 }} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-xl shadow-emerald-900/5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-950">{loading ? "-" : stat.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{stat.caption}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ring-1 ${toneClasses}`}>
                  <Icon size={24} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-emerald-900/5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-950">Aksi Cepat</h2>
              <p className="mt-1 text-sm text-slate-500">Shortcut untuk pekerjaan admin yang paling sering dipakai.</p>
            </div>
          </div>

          <div className="grid gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button key={action.title} onClick={() => router.push(action.href)} className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left transition hover:-translate-y-0.5 hover:bg-white hover:shadow-lg hover:shadow-emerald-900/5">
                  <div className="flex items-center gap-4">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-white ${action.color}`}>
                      <Icon size={20} />
                    </span>
                    <span>
                      <span className="block font-bold text-slate-900">{action.title}</span>
                      <span className="mt-1 block text-sm text-slate-500">{action.desc}</span>
                    </span>
                  </div>
                  <ArrowRight size={18} className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-700" />
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-emerald-900/5">
          <h2 className="text-xl font-bold text-slate-950">Status Sistem</h2>
          <p className="mt-1 text-sm text-slate-500">Ringkasan kesiapan fitur utama QRForest.</p>

          <div className="mt-6 space-y-4">
            {[
              ["Database pohon", stats.totalTrees > 0 ? "Terisi" : "Belum ada data"],
              ["Desain QR", stats.totalDesigns > 0 ? "Tersedia" : "Belum dibuat"],
              ["Akun admin", stats.totalUsers > 0 ? "Aktif" : "Perlu setup"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between rounded-2xl bg-emerald-50/60 px-4 py-3">
                <span className="text-sm font-semibold text-slate-700">{label}</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-emerald-700 shadow-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
