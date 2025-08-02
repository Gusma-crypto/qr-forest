'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import API from '@/lib/api';

const schema = yup.object().shape({
  email: yup.string().email('Format email salah').required('Email wajib diisi'),
  password: yup.string().required('Password wajib diisi'),
});

export default function LoginForm() {
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await API.post('/auth/login', data);

      const accessToken = res.data.accessToken || res.data.token;
      const refreshToken = res.data.refreshToken;

      if (!accessToken || !refreshToken) {
        setErrorMsg('Token tidak lengkap dari server');
        return;
      }

      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      toast.success('Login berhasil!');
      router.push('/dashboard');
    } catch (error) {
      const msg = error.response?.data?.message || 'Gagal login';
      setErrorMsg(msg);
      toast.error(msg);
      console.error('Login error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl text-gray-800 font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('email')}
          placeholder="Email"
          className="w-full text-gray-600 placeholder-gray-400 border p-2 rounded"
        />
        <p className="text-red-500">{errors.email?.message}</p>

        <input
          type="password"
          {...register('password')}
          placeholder="Password"
          className="text-gray-600 placeholder-gray-400 w-full border p-2 rounded"
        />
        <p className="text-red-500">{errors.password?.message}</p>

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Login
        </button>

        {errorMsg && <p className="text-center text-sm mt-2 text-red-500">{errorMsg}</p>}

        <p className="text-sm text-center text-gray-400">
          Belum punya akun?{' '}
          <Link href="/signup" className="text-green-600 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </form>
    </div>
  );
}
