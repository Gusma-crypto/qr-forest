"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12 py-6 px-6 text-sm text-center text-gray-500">
      © {new Date().getFullYear()} QR Code Forest. Dibuat dengan 🌿 oleh Tim Pelestari.
      <div className="mt-2">
        <Link href="/about" className="hover:underline">
          Tentang Kami
        </Link>{" "}
        •
        <Link href="/privacy" className="hover:underline ml-2">
          Privasi
        </Link>{" "}
        •
        <Link href="/contact" className="hover:underline ml-2">
          Kontak
        </Link>
      </div>
    </footer>
  );
}
