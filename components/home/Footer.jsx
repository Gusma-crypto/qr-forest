"use client";

import Link from "next/link";
import { Mail, MapPin, TreePine } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <TreePine size={22} />
            </span>
            <span className="text-lg font-bold text-emerald-950">QRForest</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            Platform pendataan pohon berbasis QR code untuk membantu dokumentasi, monitoring, dan edukasi lingkungan.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-slate-950">Navigasi</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-600">
            <Link href="/about" className="transition hover:text-emerald-700">Tentang</Link>
            <Link href="/blog" className="transition hover:text-emerald-700">Blog</Link>
            <Link href="/privacy" className="transition hover:text-emerald-700">Privasi</Link>
            <Link href="/contact" className="transition hover:text-emerald-700">Kontak</Link>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-slate-950">Kontak</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p className="flex items-center gap-2">
              <Mail size={15} className="text-emerald-700" /> support@qrforest.local
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={15} className="text-emerald-700" /> Indonesia
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-emerald-100 px-6 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} QRForest. All rights reserved.
      </div>
    </footer>
  );
}
