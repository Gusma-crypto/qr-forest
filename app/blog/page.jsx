"use client";

import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Pentingnya Digitalisasi Hutan",
    summary: "Pelajari mengapa sistem pelacakan digital sangat penting dalam pelestarian hutan.",
    date: "2025-08-01",
  },
  {
    id: 2,
    title: "Fitur Baru: Desain QR Code Custom",
    summary: "Kami baru saja merilis fitur desain QR kustom dengan pilihan warna dan logo!",
    date: "2025-07-29",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen px-6 py-12 bg-white text-gray-800">
      <h1 className="text-4xl font-bold mb-8 text-center">📝 Blog & Update</h1>

      <div className="grid gap-8 max-w-3xl mx-auto">
        {blogPosts.map((post) => (
          <div key={post.id} className="border rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{new Date(post.date).toLocaleDateString()}</p>
            <p className="mb-4">{post.summary}</p>
            <Link href="#" className="text-green-600 hover:underline">
              Baca selengkapnya →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
