# cbt-tryout-web

Prototype **uji coba** (FE only) untuk mengecek apakah deteksi “peserta keluar fokus”
di browser **bisa dipakai atau tidak** untuk skenario CBT.

> **Bukan** sistem ujian production.  
> Tidak ada backend, database, API, penilaian resmi, atau keamanan server.  
> Tujuan: validasi teknologi (`visibilitychange`, Esc, offline) + alur warning/blokir.

- **Stack:** Vite + React + React Router  
- **Penyimpanan:** `localStorage`  
- **Repo:** [cbt-tryout-web](https://github.com/kenzonuts/cbt-tryout-web)

## Jalankan

```bash
npm install
npm run dev
```

Buka URL di terminal (biasanya `http://localhost:5173`).

| | |
|---|---|
| **Akun demo** | `peserta` / `1234` |
| `/login` | Login peserta |
| `/ujian` | Ujian + deteksi fokus (wajib login) |
| `/admin` | Buka akses / reset demo |

## Demo cepat (≈5 menit)

1. Login `peserta` / `1234` → masuk `/ujian`.
2. Pindah tab atau tekan **Esc** → warning countdown **15 detik**.
3. Klik **Tetap Lanjut** → ujian aktif lagi.
4. Picu warning lagi → biarkan habis atau **Hentikan Tes** → `blocked`, soal terkunci.
5. **Refresh** → tetap `blocked`.
6. Buka `/admin` → **Buka Akses** → kembali `/ujian`, bisa jawab lagi.

**Mobile:** ganti app / Home saat di `/ujian`, lalu kembali — harus muncul warning.  
**Opsional:** matikan WiFi → warning offline.

## Checklist uji

- [ ] `/ujian` tanpa login → redirect ke login  
- [ ] Pindah tab → warning 15 detik  
- [ ] Esc → warning  
- [ ] Tetap Lanjut → lanjut ujian  
- [ ] Habis 15 detik / Hentikan → blocked  
- [ ] Refresh saat blocked → tetap locked  
- [ ] Admin **Buka Akses** → aktif lagi  
- [ ] Offline (opsional) → warning  

## Catatan

- Proyek ini hanya untuk **test kelayakan teknologi**, bukan untuk ujian nyata.
- “Lolos / tidak lolos” = apakah deteksi & alur warning/blocked berjalan di laptop/HP.
- Status hanya di browser itu (`localStorage`); clear cache / ganti device = data hilang.
- Integrasi BE/DB/API menyusul **setelah** uji ini dianggap layak.

Detail fase pengerjaan: [`PHASES.md`](./PHASES.md).
