// === components/Navbar.jsx ===
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Periksa preferensi tema tersimpan
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDark = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/privacy", label: "Privacy" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">🌳 QR Code Forest</h1>

        {/* Menu toggle */}
        <div className="flex items-center gap-4">
          <button onClick={toggleDark} className="text-green-700 dark:text-green-300 md:hidden">
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          <button className="md:hidden text-2xl text-green-700 dark:text-green-300 focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex space-x-6 text-sm md:text-base">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-green-600 dark:hover:text-green-300">
              {item.label}
            </Link>
          ))}

          <button onClick={toggleDark} className="ml-4 text-green-700 dark:text-green-300 hidden md:block">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </div>

      {/* Backdrop blur */}
      {isOpen && <div className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden z-40" onClick={toggleMenu}></div>}

      {/* Mobile slide menu */}
      <div className={`md:hidden fixed top-0 right-0 w-2/3 max-w-xs h-full bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <X size={28} className="text-green-700 dark:text-green-300" />
          </button>
        </div>
        <nav className="flex flex-col space-y-4 px-6">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-300" onClick={toggleMenu}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
