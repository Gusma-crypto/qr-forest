'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUserName(storedUser);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    router.push('/login');
  };

  const navClass = isScrolled
    ? 'bg-white text-green-800 shadow-md'
    : 'bg-green-800 text-white';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-300 backdrop-blur-md ${navClass}`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">QRForest</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-sm md:text-base">
          <li className="hover:text-green-300 cursor-pointer" onClick={() => router.push('/dashboard')}>Home</li>
          <li className="hover:text-green-300 cursor-pointer" onClick={() => router.push('/dashboard/datapohon')}>Data Pohon</li>
          <li className="hover:text-green-300 cursor-pointer" onClick={() => router.push('/dashboard/cetakqr')}>Cetak QRCode</li>
        </ul>

        {/* User and Logout - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <span className="text-sm">👋 {userName || 'User'}</span>
          <button
            onClick={handleLogout}
            className="bg-white text-green-700 font-semibold px-3 py-1 rounded-lg hover:bg-green-100 transition"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-60 mt-4' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col gap-3 text-sm bg-white text-green-800 p-4 rounded-lg shadow-md">
          <li onClick={() => { setIsOpen(false); router.push('/dashboard'); }}>Home</li>
          <li onClick={() => { setIsOpen(false); router.push('/dashboard/datapohon'); }}>Data Pohon</li>
          <li onClick={() => { setIsOpen(false); router.push('/dashboard/cetakqr'); }}>Cetak QRCode</li>
          <li>
            👋 {userName || 'User'}
          </li>
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
