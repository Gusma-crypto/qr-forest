'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import Link from 'next/link';
import API from '@/lib/api';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, Leaf, Mail, ShieldPlus, Sparkles, UserRound } from 'lucide-react';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  username: yup.string().required('Username wajib diisi'),
  email: yup.string().email('Format email salah').required('Email wajib diisi'),
  password: yup.string().min(6, 'Minimal 6 karakter').required('Password wajib diisi'),
});

export default function RegisterForm() {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage('');

    try {
      await API.post('/auth/register', data);
      setMessage('Registrasi berhasil');
      toast.success('Registrasi berhasil');
    } catch (error) {
      const msg = error.response?.data?.message || 'Gagal registrasi';
      setMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[radial-gradient(circle_at_82%_16%,rgba(20,184,166,0.18),transparent_28%),linear-gradient(135deg,#f8fffb_0%,#eefaf5_52%,#f7fbff_100%)] px-4 py-10">
      <motion.div
        aria-hidden="true"
        className="absolute right-10 top-12 h-28 w-28 rounded-full border border-emerald-200/70 bg-white/35"
        animate={{ y: [0, 14, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-12 left-8 h-24 w-24 rounded-full border border-teal-200/70 bg-white/30"
        animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.section
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-emerald-100 bg-white/88 shadow-[0_24px_70px_rgba(6,78,59,0.14)] backdrop-blur md:grid-cols-[0.92fr_1fr]"
      >
        <div className="p-6 sm:p-8 md:p-10">
          <div className="mb-8 flex items-center justify-between gap-4 md:hidden">
            <Link href="/" className="inline-flex items-center gap-3 text-lg font-extrabold text-emerald-950">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-600 text-white">
                <Leaf size={22} />
              </span>
              QRForest
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.35 }}>
            <div className="mb-8">
              <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                <ShieldPlus size={25} />
              </div>
              <h2 className="text-3xl font-black tracking-normal text-slate-950">Buat Akun</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Daftarkan akun untuk mengakses ekosistem QRForest.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label htmlFor="username" className="mb-2 block text-sm font-extrabold text-slate-700">
                  Username
                </label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700" size={18} />
                  <input
                    id="username"
                    autoComplete="username"
                    {...register('username')}
                    placeholder="nama pengguna"
                    className="h-12 w-full rounded-2xl border border-emerald-100 bg-white px-12 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
                {errors.username?.message && <p className="mt-2 text-sm font-semibold text-red-600">{errors.username.message}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-extrabold text-slate-700">
                  Email
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700" size={18} />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register('email')}
                    placeholder="nama@email.com"
                    className="h-12 w-full rounded-2xl border border-emerald-100 bg-white px-12 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
                {errors.email?.message && <p className="mt-2 text-sm font-semibold text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-extrabold text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <ShieldPlus className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700" size={18} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    {...register('password')}
                    placeholder="Minimal 6 karakter"
                    className="h-12 w-full rounded-2xl border border-emerald-100 bg-white px-12 pr-14 text-sm text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password?.message && <p className="mt-2 text-sm font-semibold text-red-600">{errors.password.message}</p>}
              </div>

              {message && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                    message.toLowerCase().includes('berhasil')
                      ? 'border-emerald-100 bg-emerald-50 text-emerald-800'
                      : 'border-red-100 bg-red-50 text-red-700'
                  }`}
                >
                  {message}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-5 text-sm font-black text-white shadow-lg shadow-emerald-900/12 transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Memproses...' : 'Daftar'}
                <ArrowRight size={18} />
              </button>

              <p className="text-center text-sm text-slate-500">
                Sudah punya akun?{' '}
                <Link href="/login" className="font-extrabold text-emerald-700 transition hover:text-emerald-900">
                  Login di sini
                </Link>
              </p>
            </form>
          </motion.div>
        </div>

        <div className="relative hidden bg-emerald-950 p-10 text-white md:block">
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(13,148,136,0.94),rgba(6,78,59,0.98))]" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-[radial-gradient(circle_at_72%_55%,rgba(167,243,208,0.30),transparent_36%)]" />
          <div className="relative flex h-full min-h-[560px] flex-col justify-between">
            <Link href="/" className="inline-flex items-center gap-3 font-extrabold">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/14 ring-1 ring-white/20">
                <Leaf size={22} />
              </span>
              <span>QRForest</span>
            </Link>

            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-bold text-emerald-50">
                <Sparkles size={16} />
                Mulai kelola hutan digital
              </div>
              <h1 className="max-w-md text-5xl font-black leading-tight tracking-normal">
                Satu akun untuk data pohon dan QR code.
              </h1>
              <p className="mt-5 max-w-md text-base leading-7 text-emerald-50/82">
                Buat akun agar dapat masuk ke dashboard, mengelola data pohon, dan menyiapkan pengalaman scan QR yang informatif.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-2xl border border-white/14 bg-white/10 p-4">
                <div className="font-black">Data</div>
                <div className="mt-1 text-emerald-50/70">Pohon</div>
              </div>
              <div className="rounded-2xl border border-white/14 bg-white/10 p-4">
                <div className="font-black">QR</div>
                <div className="mt-1 text-emerald-50/70">Publik</div>
              </div>
              <div className="rounded-2xl border border-white/14 bg-white/10 p-4">
                <div className="font-black">Admin</div>
                <div className="mt-1 text-emerald-50/70">Panel</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
