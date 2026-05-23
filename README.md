# INVOFEST — Tugas Praktikum WEB

Website frontend untuk festival INVOFEST (Informatics Vocational Festival). Ada bagian publik buat pengunjung, lalu dashboard admin buat ngurus data event.

## Alur aplikasi

### 1. Halaman publik

User buka situs lewat layout utama (header + konten). Dari sini bisa lihat:

| Halaman | Path |
|---------|------|
| Beranda | `/` |
| Competition | `/competition` |
| Seminar | `/seminar` |
| Workshop | `/workshop` |
| Talkshow | `/talkshow` |

Isinya info event, pembicara, FAQ, dan tombol daftar. Belum perlu login.

### 2. Login & register

- **Register** (`/register`) — buat akun baru, datanya disimpan di browser (Zustand + localStorage).
- **Login** (`/login`) — kalau email & password cocok, user masuk ke dashboard.

Akun admin bawaan (buat testing):

- Email: `admin@gmail.com`
- Password: `24090057`

User yang sudah register juga bisa login pakai email & password yang didaftarkan.

### 3. Dashboard (harus login dulu)

Kalau belum login dan buka `/dashboard/*`, otomatis dialihkan ke halaman login.

Setelah masuk, tampilan pakai sidebar:

| Menu | Fungsi |
|------|--------|
| Dashboard | Ringkasan jumlah event, kategori, pembicara |
| Category Event | CRUD kategori |
| Event | CRUD kegiatan festival |
| Pembicara | CRUD data pembicara / seminar |
| Biodata | Lihat & edit biodata mahasiswa (disimpan lokal) |

Data kategori, event, dan pembicara diambil dari **backend REST API** lewat `src/lib/api.ts`. Biodata cuma di frontend, tidak dikirim ke server.

Di mobile, sidebar disembunyikan — buka lewat tombol menu (☰) di atas.

## Struktur folder (singkat)

```
src/
├── page/          # Halaman publik + login/register
├── dashboard/     # Halaman admin
├── layouts/       # MainLayout, AuthLayouts, DashboardLayouts
├── components/    # UI reusable (Button, Input, Card, dll)
├── store/         # State auth & biodata (Zustand)
├── lib/           # Helper API
└── routes/        # ProtectedRoutes (cek login)
```


React + TypeScript, Vite, Tailwind CSS, React Router, React Hook Form + Zod, Zustand.

link yt: https://youtu.be/7a9bBv_-Nmg

