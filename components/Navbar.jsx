"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, Menu, X, TreePine, Settings, QrCode, User } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUserName(storedUser);

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    router.push("/login");
  };

  const navClass = isScrolled ? "border-emerald-100 bg-white/90 text-emerald-950 shadow-lg shadow-emerald-950/5" : "border-white/10 bg-emerald-950/90 text-white";

  return (
    <nav className={`fixed left-0 top-0 z-50 w-full border-b px-6 py-4 backdrop-blur-xl transition-all duration-300 ${navClass}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2 text-xl font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/25">
            <TreePine className="h-5 w-5" />
          </span>
          QRForest
        </div>

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-2 text-sm md:flex">
          <li className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-emerald-500/10 hover:text-emerald-600" onClick={() => router.push("/dashboard")}>
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </li>
          <li className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-emerald-500/10 hover:text-emerald-600" onClick={() => router.push("/dashboard/datapohon")}>
            <TreePine className="w-4 h-4" /> Data Pohon
          </li>
          <li className="relative group cursor-pointer">
            <div className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-emerald-500/10 hover:text-emerald-600" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="w-4 h-4" /> Settings
            </div>
            {showSettings && (
              <ul className="absolute left-0 top-full z-10 mt-2 w-52 space-y-1 rounded-2xl border border-emerald-100 bg-white p-2 text-emerald-950 shadow-xl shadow-emerald-950/10">
                <li onClick={() => router.push("/dashboard/treedesign")} className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-700">
                  <QrCode className="w-4 h-4" /> Desain QRCode
                </li>
                <li onClick={() => router.push("/dashboard/profile")} className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-emerald-50 hover:text-emerald-700">
                  <User className="w-4 h-4" /> Setting Profile
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* User and Logout - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={handleLogout} className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50">
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 mt-4" : "max-h-0"}`}>
        <ul className="flex flex-col gap-3 rounded-2xl bg-white p-4 text-sm text-emerald-950 shadow-xl">
          <li
            onClick={() => {
              setIsOpen(false);
              router.push("/dashboard");
            }}
          >
            <span className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </span>
          </li>
          <li
            onClick={() => {
              setIsOpen(false);
              router.push("/dashboard/datapohon");
            }}
          >
            <span className="flex items-center gap-2">
              <TreePine className="w-4 h-4" /> Data Pohon
            </span>
          </li>
          <li className="font-semibold">Settings</li>
          <li
            onClick={() => {
              setIsOpen(false);
              router.push("/dashboard/treedesign");
            }}
          >
            <span className="flex items-center gap-2">
              <QrCode className="w-4 h-4" /> Desain QRCode
            </span>
          </li>
          <li
            onClick={() => {
              setIsOpen(false);
              router.push("/dashboard/profile");
            }}
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" /> Setting Profile
            </span>
          </li>
          <li>👋 {userName || "User"}</li>
          <li>
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
            className="rounded-xl bg-emerald-700 px-3 py-2 text-white hover:bg-emerald-800"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
