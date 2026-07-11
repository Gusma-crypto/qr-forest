"use client";

import Link from "next/link";
import { useState } from "react";
import { LayoutDashboard, Menu, TreePine, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
            <TreePine size={22} />
          </span>
          <span className="text-lg font-bold text-emerald-950">QRForest</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className="rounded-xl px-4 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50">
            Login
          </Link>
          <Link href="/dashboard" className="inline-flex h-10 items-center rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-800">
            <LayoutDashboard size={16} className="mr-2" /> Dashboard
          </Link>
        </div>

        <button onClick={() => setIsOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 text-emerald-800 md:hidden" aria-label="Buka menu">
          <Menu size={22} />
        </button>
      </div>

      {isOpen && <button className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)} aria-label="Tutup menu" />}

      <aside className={`fixed right-0 top-0 z-50 h-screen w-80 max-w-[86vw] bg-white p-5 shadow-2xl transition-transform duration-300 md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <TreePine size={22} />
            </span>
            <span className="font-bold text-emerald-950">QRForest</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700" aria-label="Tutup menu">
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800">
              {item.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setIsOpen(false)} className="mt-4 rounded-xl border border-emerald-100 px-4 py-3 text-center text-sm font-semibold text-emerald-800">
            Login
          </Link>
          <Link href="/dashboard" onClick={() => setIsOpen(false)} className="rounded-xl bg-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white">
            Dashboard
          </Link>
        </nav>
      </aside>
    </header>
  );
}
