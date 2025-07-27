# 🌲 QR Code Frontend (Next.js)

Ini adalah frontend untuk aplikasi **Forest QR Management** yang dibangun dengan **Next.js** dan Tailwind CSS. Sistem ini terhubung ke backend Express.js dan digunakan untuk mengelola data pohon, generate QR Code, serta mendownload PDF dengan atau tanpa desain.

---

## 🚀 Fitur

- ✅ Login dan Register dengan JWT
- ✅ Role-based Access (Admin & User)
- ✅ CRUD Data Pohon
- ✅ Generate QR Code tiap pohon
- ✅ Download semua QR Code dalam bentuk PDF (desain & tanpa desain)
- ✅ Halaman detail pohon dengan penjelasan AI (opsional)
- ✅ Responsif dengan Tailwind CSS
- ✅ Proteksi halaman dengan middleware JWT

---

## 🧑‍💻 Tech Stack

- **Frontend:** [Next.js 14](https://nextjs.org/)
- **Style:** [Tailwind CSS](https://tailwindcss.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Form Validation:** react-hook-form + yup
- **State Management:** React hooks + Context API

---

## 🛠️ Instalasi

```bash
git clone https://github.com/username/qr-frontend.git
cd qr-frontend
npm install
```

Buat file `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Lalu jalankan:

```bash
npm run dev
```

---

## 🗂️ Struktur Folder

```
app/
├── login/
│   └── page.jsx           # Halaman Login
├── register/
│   └── page.jsx           # Halaman Register
├── dashboard/
│   ├── layout.jsx         # Layout dashboard
│   └── datapohon/
│       ├── page.jsx       # Halaman utama Data Pohon
│       └── DetailButton.jsx
├── components/
│   └── Navbar.jsx         # Navigasi utama
├── lib/
│   └── api.js             # Axios instance
```

---

## 🧾 Endpoints API (Dari Backend)

| Fungsi                     | Endpoint                              | Method |
|---------------------------|----------------------------------------|--------|
| Login                     | `/api/login`                           | POST   |
| Register                  | `/api/register`                        | POST   |
| Ambil semua pohon         | `/api/trees`                           | GET    |
| Tambah pohon              | `/api/trees`                           | POST   |
| Download PDF (tanpa desain) | `/static/pdf/qr-without-template.pdf` | GET    |
| Download PDF (dengan desain) | `/api/trees/printallPDFDesign`        | POST   |

---

## 🔒 Proteksi Route

Setiap route di dalam `/dashboard/*` hanya dapat diakses jika JWT token valid. Token disimpan di `localStorage`.

---

## 📦 Build untuk Produksi

```bash
npm run build
npm start
```

---

## 📝 Catatan

- Pastikan backend telah berjalan terlebih dahulu (`qr-backend`).
- Folder `pdfs` di backend harus dapat diakses publik jika ingin download tanpa desain.
- Jangan lupa sesuaikan URL `NEXT_PUBLIC_API_URL` di `.env.local`.

---

## 👨‍💻 Kontribusi

Pull request sangat diterima. Untuk masalah besar, silakan buka [Issue](https://github.com/username/qr-frontend/issues) terlebih dahulu.

---

## 📄 Lisensi

MIT License.