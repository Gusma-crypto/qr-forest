"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, TreePine, Settings, QrCode, User, Home as HomeIcon } from "lucide-react";

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

  const navClass = isScrolled ? "bg-white text-green-800 shadow-md" : "bg-green-800 text-white";

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 backdrop-blur-md ${navClass}`}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">QRForest</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-sm md:text-base items-center">
          <li className="hover:text-green-300 cursor-pointer flex items-center gap-1" onClick={() => router.push("/dashboard")}>
            <HomeIcon className="w-4 h-4" /> Home
          </li>
          <li className="hover:text-green-300 cursor-pointer flex items-center gap-1" onClick={() => router.push("/dashboard/datapohon")}>
            <TreePine className="w-4 h-4" /> Data Pohon
          </li>
          <li className="relative group cursor-pointer">
            <div className="flex items-center gap-1 hover:text-green-300" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="w-4 h-4" /> Settings
            </div>
            {showSettings && (
              <ul className="absolute top-full mt-2 left-0 bg-white text-green-800 border rounded-md shadow-md p-2 space-y-2 w-48 z-10">
                <li onClick={() => router.push("/dashboard/treedesign")} className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
                  <QrCode className="w-4 h-4" /> Desain QRCode
                </li>
                <li onClick={() => router.push("/dashboard/profile")} className="flex items-center gap-2 hover:text-green-600 cursor-pointer">
                  <User className="w-4 h-4" /> Setting Profile
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* User and Logout - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={handleLogout} className="bg-white text-green-700 font-semibold px-3 py-1 rounded-lg hover:bg-green-100 transition">
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 mt-4" : "max-h-0"}`}>
        <ul className="flex flex-col gap-3 text-sm bg-white text-green-800 p-4 rounded-lg shadow-md">
          <li
            onClick={() => {
              setIsOpen(false);
              router.push("/dashboard");
            }}
          >
            <span className="flex items-center gap-2">
              <HomeIcon className="w-4 h-4" /> Home
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
              className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
