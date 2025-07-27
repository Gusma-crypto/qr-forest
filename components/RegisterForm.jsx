'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';

const schema = yup.object().shape({
  username: yup.string().required('Username wajib diisi'),
  email: yup.string().email('Format email salah').required('Email wajib diisi'),
  password: yup.string().min(6, 'Minimal 6 karakter').required('Password wajib diisi'),
});

export default function RegisterForm() {
  const [message, setMessage] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/api/register', data);
      setMessage('Registrasi berhasil');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Gagal registrasi');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl text-gray-800 font-bold mb-4">Daftar</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register('username')} placeholder="Username" className="w-full border placeholder-gray-400 p-2 rounded" />
        <p className="text-red-500">{errors.username?.message}</p>

        <input {...register('email')} placeholder="Email" className="w-full border  placeholder-gray-400 p-2 rounded" />
        <p className="text-red-500">{errors.email?.message}</p>

        <input type="password" {...register('password')} placeholder="Password" className="w-full placeholder-gray-400 border p-2 rounded" />
        <p className="text-red-500">{errors.password?.message}</p>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Daftar
        </button>

        {message && <p className="text-center text-sm mt-2 text-gray-700">{message}</p>}

        <p className="text-sm text-center text-gray-400">
          sudah punya akun?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            login disini
          </Link>
        </p>
      </form>
    </div>
  );
}
