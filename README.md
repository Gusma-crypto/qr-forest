# QRForest Frontend

Frontend Next.js untuk aplikasi QRForest. Aplikasi ini terhubung ke backend `forest-management` untuk login admin, mengelola data pohon, melihat dashboard, mengatur desain QR code, dan menampilkan halaman publik hasil scan QR.

## Fitur

- Landing/home page QRForest.
- Login dan register.
- Dashboard admin.
- CRUD data pohon.
- Edit data pohon dan foto pohon.
- Cetak QR code.
- Desain QR code.
- Profile admin.
- Halaman publik hasil scan QR.
- Axios client dengan `x-api-key` dan JWT bearer token.
- UI responsif dengan animasi.

## Tech Stack

- Next.js 15
- React 19
- Tailwind CSS
- Axios
- react-hook-form
- yup
- framer-motion
- lucide-react
- react-toastify

## Instalasi Lokal

```bash
cd qr-forest
npm install
```

Buat file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_KEY=isi_sama_dengan_API_ACCESS_KEY_backend
```

Catatan:

- `NEXT_PUBLIC_API_URL` memakai origin backend, bukan `/api`.
- Axios otomatis menambahkan `/api`.
- `NEXT_PUBLIC_API_KEY` akan terlihat di browser. Ini hanya filter tambahan, bukan secret utama.

## Menjalankan Frontend

Pastikan backend sudah berjalan:

```bash
cd ../forest-management
npm run start
```

Jalankan frontend:

```bash
cd ../qr-forest
npm run dev
```

Frontend berjalan di:

```text
http://localhost:3000
```

## Dokumentasi Backend

Saat backend berjalan, buka:

- `http://localhost:3001/` -> overview backend.
- `http://localhost:3001/frontend-docs` -> panduan koneksi frontend.
- `http://localhost:3001/api-docs` -> Swagger UI.
- `http://localhost:3001/health` -> health check.

## Alur Auth

1. Frontend kirim login ke `/api/auth/login`.
2. Header wajib:
   - `x-api-key`
   - `Content-Type: application/json`
3. Backend mengembalikan `accessToken` dan `refreshToken`.
4. Frontend menyimpan token di `localStorage`.
5. Request dashboard/admin berikutnya memakai:
   - `x-api-key`
   - `Authorization: Bearer <accessToken>`

## Endpoint yang Dipakai

| Fitur | Endpoint Backend |
| --- | --- |
| Login | `POST /api/auth/login` |
| Register | `POST /api/auth/register` |
| Data pohon | `GET /api/trees` |
| Tambah pohon | `POST /api/trees` |
| Detail pohon | `GET /api/trees/:id` |
| Edit pohon | `PUT /api/trees/:id` |
| Hapus pohon | `DELETE /api/trees/:id` |
| Halaman scan QR | `GET /api/tree/show?q=...` |
| Dashboard | `GET /api/dashboard` |
| Profile | `/api/profile` |
| Desain QR | `/api/treedesign` |

## Struktur Penting

```text
qr-forest/
├── app/
│   ├── page.js
│   ├── login/
│   ├── signup/
│   ├── dashboard/
│   │   ├── page.jsx
│   │   ├── datapohon/
│   │   ├── profile/
│   │   └── treedesign/
│   └── tree/show/
├── components/
├── lib/
│   └── api.js
├── public/
├── .env.local
└── .env.production.example
```

## Build Production

```bash
npm run build
npm run start
```

Template env production:

```text
qr-forest/.env.production.example
../PRODUCTION_TEMPLATE.md
```

Contoh production env:

```env
NEXT_PUBLIC_API_URL=https://api.domain-kamu.com
NEXT_PUBLIC_API_KEY=isi_sama_dengan_API_ACCESS_KEY_backend
```

## Catatan Production

- Pastikan `NEXT_PUBLIC_API_URL` memakai HTTPS.
- Pastikan backend `CORS_ORIGIN` berisi domain frontend production.
- Jangan mengandalkan `NEXT_PUBLIC_API_KEY` sebagai secret.
- Gunakan domain berbeda atau subdomain:
  - Frontend: `https://domain-kamu.com`
  - Backend: `https://api.domain-kamu.com`

## Troubleshooting

Jika login gagal `401 API key tidak valid`:

- Cek `NEXT_PUBLIC_API_KEY` frontend.
- Pastikan nilainya sama dengan `API_ACCESS_KEY` backend.
- Restart dev server frontend setelah mengubah `.env.local`.

Jika CORS error:

- Cek `CORS_ORIGIN` di backend.
- Untuk lokal, isi:

```env
CORS_ORIGIN=http://localhost:3000
```

Jika API URL salah:

- `NEXT_PUBLIC_API_URL` harus `http://localhost:3001`, bukan `http://localhost:3001/api`.

## Developer

Dibuat untuk QRForest / Forest Management.
