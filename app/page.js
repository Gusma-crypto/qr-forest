"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-green-50 text-gray-800">
      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <motion.section initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Selamat datang di QR Code Forest 🌿</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">Platform digital pelacakan pohon berbasis QR Code, untuk pelestarian dan monitoring hutan.</p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link href="/dashboard" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Masuk ke Dashboard
            </Link>
            <Link href="/blog" className="px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-100 transition">
              Baca Blog
            </Link>
          </div>
        </motion.section>

        <section className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "🔍 Pelacakan Pohon",
              desc: "Lacak dan pantau pohon secara realtime dengan QR unik.",
            },
            {
              title: "📸 Dokumentasi Visual",
              desc: "Catat dan unggah kondisi pohon dari waktu ke waktu.",
            },
            {
              title: "📄 Cetak Desain QR",
              desc: "Desain dan cetak QR secara custom, siap untuk dicetak.",
            },
          ].map((feature, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 * i, duration: 0.5 }} className="bg-white shadow-md rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </section>
      </main>
    </div>
  );
}
