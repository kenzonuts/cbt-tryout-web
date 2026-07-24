# cbt-tryout-web

Prototype **uji coba** (FE only) untuk mengecek apakah deteksi “peserta keluar fokus”
di browser **bisa dipakai atau tidak** untuk skenario CBT.

> **Bukan** sistem ujian production.  
> Tidak ada backend, database, API, penilaian resmi, atau keamanan server.  
> Tujuan: validasi teknologi (`visibilitychange`, Esc, offline) + alur warning/blokir.

- **Stack:** Vite + React + React Router  
- **Penyimpanan:** `localStorage`  
- **Versi:** 0.1.0 (MVP polish)  
- **Repo:** [cbt-tryout-web](https://github.com/kenzonuts/cbt-tryout-web)

## Jalankan

```bash
npm install
npm run dev
```

Buka URL di terminal (biasanya `http://localhost:5173`).

```bash
npm run build   # production build
npm run lint    # ESLint
```

| | |
|---|---|
| `/` | Beranda — 3 langkah demo |
| **Akun peserta** | `peserta` / `1234` |
| **Akun admin** | `admin` / `admin123` |
| `/login` | Login peserta |
| `/ujian` | Ujian + deteksi fokus (wajib login) |
| `/admin` | Buka akses / reset demo (wajib PIN admin) |

**Lab demo:** di `/ujian`, panel Lab bisa disembunyikan. Paksa OFF dengan `?demo=0`.

## Demo cepat (≈5 menit)

1. Buka `/` → **Mulai demo** (atau login `peserta` / `1234`).
2. Di `/ujian`, baca tips lalu pindah tab atau tekan **Esc** → warning countdown **15 detik**.
3. Klik **Tetap Lanjut** → ujian aktif lagi.
4. Picu warning lagi → biarkan habis atau **Hentikan Tes** → `blocked`, soal terkunci.
5. **Refresh** → tetap `blocked`.
6. Buka `/admin` → login `admin` / `admin123` → **Buka Akses** → kembali `/ujian`, bisa jawab lagi.

**Mobile:** ganti app / Home saat di `/ujian`, lalu kembali — harus muncul warning.  
**Opsional:** matikan WiFi → warning offline.  
**Timer:** jika sisa waktu habis → otomatis `blocked` (alasan `timeout`).

## Checklist uji

| Uji | Laptop | HP |
|-----|:------:|:--:|
| `/` tampil 3 langkah | ☐ | ☐ |
| `/ujian` tanpa login → redirect | ☐ | ☐ |
| Tips “jangan pindah tab” muncul sekali | ☐ | ☐ |
| Pindah tab → warning 15 detik | ☐ | ☐ |
| Esc → warning | ☐ | ☐ |
| Tetap Lanjut → lanjut ujian | ☐ | ☐ |
| Habis 15 detik / Hentikan → blocked | ☐ | ☐ |
| Refresh saat blocked → tetap locked | ☐ | ☐ |
| Admin tanpa PIN ditolak | ☐ | ☐ |
| Admin **Buka Akses** → aktif lagi | ☐ | ☐ |
| Sembunyikan lab → UI ujian bersih | ☐ | ☐ |
| Offline (opsional) → warning | ☐ | ☐ |

## Known limits

- Status hanya di browser itu (`localStorage`); clear cache / ganti device = data hilang.
- Admin PIN hanya proteksi sesi sederhana (`sessionStorage`), **bukan** keamanan production.
- Deteksi fokus berbasis browser event — bisa diloloskan; ini uji kelayakan UX/teknologi, bukan anti-cheat keras.
- Tidak ada backend, penilaian resmi, atau bank soal besar.

## Docs terkait

- [`PHASES.md`](./PHASES.md) — fase pengerjaan A–F + polish  
- [`PLAN-MVP-10.md`](./PLAN-MVP-10.md) — plan MVP 10/10
