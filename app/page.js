"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Camera, Leaf, QrCode, ShieldCheck, Sparkles, TreePine } from "lucide-react";

const apiOrigin = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001").replace(/\/+$/, "");

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const features = [
  {
    icon: QrCode,
    title: "QR untuk Setiap Pohon",
    desc: "Setiap pohon punya halaman publik yang mudah dibuka dari QR code.",
  },
  {
    icon: Camera,
    title: "Dokumentasi Visual",
    desc: "Simpan foto, lokasi, dan keterangan pohon agar data lebih mudah diverifikasi.",
  },
  {
    icon: ShieldCheck,
    title: "Dashboard Admin",
    desc: "Kelola data, desain QR, profil, dan cetak laporan dari satu ruang kerja.",
  },
];

const steps = ["Input data pohon", "QR otomatis dibuat", "Tempel QR di lokasi", "Pengunjung melihat profil pohon"];

export default function HomePage() {
  return (
    <div className="-mx-6 -my-12 overflow-hidden bg-[linear-gradient(135deg,#f8fafc_0%,#ecfdf5_42%,#eef2ff_100%)] text-slate-900">
      <section className="relative min-h-[calc(100vh-4rem)] px-6 py-10 sm:px-8 lg:px-12">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-emerald-100/70 to-transparent" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55 }} className="pt-8 lg:pt-16">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm backdrop-blur">
              <Sparkles size={16} /> Platform pendataan pohon berbasis QR
            </p>

            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              QRForest membuat data pohon mudah dilihat, dirawat, dan dibagikan.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Buat QR code untuk setiap pohon, tampilkan informasi publik yang rapi, dan kelola inventaris hijau lewat dashboard yang sederhana digunakan.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="inline-flex h-12 items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800">
                Masuk Dashboard <ArrowRight size={17} className="ml-2" />
              </Link>
              <Link href="/about" className="inline-flex h-12 items-center justify-center rounded-xl border border-emerald-200 bg-white/80 px-6 text-sm font-semibold text-emerald-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50">
                Pelajari Sistem
              </Link>
            </div>

            <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
              {[
                ["200+", "QR siap cetak"],
                ["Admin", "akses terkontrol"],
                ["24/7", "data bisa dilihat"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
                  <p className="text-2xl font-bold text-emerald-800">{value}</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="relative">
            <div className="absolute -left-6 top-8 hidden rounded-2xl border border-white/80 bg-white/80 p-4 shadow-xl shadow-emerald-900/10 backdrop-blur sm:block">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <BadgeCheck size={20} />
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-900">Data tervalidasi</p>
                  <p className="text-xs text-slate-500">QR aktif dan siap dipindai</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-2xl shadow-emerald-900/15">
              <div className="relative min-h-[520px] overflow-hidden rounded-[1.5rem] bg-emerald-950">
                <Image src={`${apiOrigin}/uploads/bg.jpg`} alt="Lanskap pohon QRForest" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover opacity-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/45 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="rounded-2xl border border-white/15 bg-white/12 p-5 text-white shadow-2xl backdrop-blur-md">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-emerald-50/75">Profil pohon</p>
                        <h2 className="mt-1 text-2xl font-bold">Pohon Mangga</h2>
                        <p className="mt-1 text-sm italic text-emerald-50/75">Mangifera indica</p>
                      </div>
                      <div className="rounded-2xl bg-white p-3 text-emerald-950">
                        <QrCode size={44} />
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      {["Lokasi tertata", "Foto pohon", "QR publik"].map((item) => (
                        <div key={item} className="rounded-xl bg-white/12 px-3 py-2 text-sm text-emerald-50 ring-1 ring-white/10">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <Leaf size={16} /> Fitur utama
              </p>
              <h2 className="text-3xl font-bold text-slate-950">Dibuat untuk pengelolaan pohon yang praktis.</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-600">
              Tampilan publik ramah pengunjung, sementara dashboard tetap padat dan efisien untuk admin.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} variants={fadeUp} transition={{ delay: index * 0.08, duration: 0.45 }} className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-900/5 transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-900/10">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-950">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-900/5 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <TreePine size={16} /> Alur kerja
              </p>
              <h2 className="text-3xl font-bold text-slate-950">Dari data pohon menjadi QR yang siap dipakai.</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Admin cukup memasukkan data dasar. Sistem membuat link publik dan QR code yang bisa dicetak untuk setiap pohon.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {steps.map((step, index) => (
                <motion.div key={step} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08, duration: 0.35 }} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-sm font-bold text-white">{index + 1}</span>
                  <p className="font-semibold text-slate-800">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
