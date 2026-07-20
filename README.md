# cbt-tryout-web

Prototype FE-only (Vite + React) untuk **uji deteksi keluar fokus** peserta ujian CBT.

- **Stack:** Vite + React + React Router  
- **Penyimpanan:** `localStorage` (belum ada backend)  
- **Repo:** [cbt-tryout-web](https://github.com/kenzonuts/cbt-tryout-web)

## Cara menjalankan

```bash
npm install
npm run dev
```

Buka URL di terminal (biasanya `http://localhost:5173`).

| Route | Halaman |
|-------|---------|
| `/login` | Login (`peserta` / `1234`) |
| `/ujian` | Ujian + deteksi fokus (wajib login) |
| `/admin` | Buka akses / reset demo |

## Cara uji coba (demo)

1. Login dengan `peserta` / `1234` → masuk `/ujian`.
2. **Laptop:** pindah tab atau tekan **Esc** → pop-up warning 15 detik.
3. Klik **Tetap Lanjut** → ujian aktif lagi.
4. Picu warning lagi, biarkan 15 detik habis (atau **Hentikan Tes**) → status `blocked`, soal terkunci.
5. **Refresh** halaman → tetap `blocked`.
6. Buka `/admin` → **Buka Akses** → kembali ke `/ujian`, bisa jawab lagi.
7. (Opsional) matikan WiFi → warning offline.

### Mobile

- Ganti app / tekan Home saat di `/ujian` → warning muncul saat kembali.
- Uji **Tetap Lanjut** vs biarkan countdown habis.

## Checklist

- [ ] Pindah tab → warning 15 detik  
- [ ] Tetap Lanjut → lanjut ujian  
- [ ] Habis 15 detik / Hentikan → blocked  
- [ ] Esc → warning  
- [ ] Refresh saat blocked → tetap locked  
- [ ] Admin Buka Akses → aktif lagi  
- [ ] Offline (opsional) → warning  
- [ ] `/ujian` tanpa login → redirect ke login  

## Status fase

| Fase | Isi | Status |
|------|-----|--------|
| A | Scaffold, router, storage, ExamContext | ✅ |
| B | Login + soal dummy | ✅ |
| C | UI ujian | ✅ |
| D | Deteksi fokus (`useExamGuard`) | ✅ |
| E | Mini admin unlock | ✅ |
| F | Poles + README uji coba | ✅ |

Detail: [`PHASES.md`](./PHASES.md).

## Catatan

Sandbox uji **teknologi deteksi fokus** di browser saja. Belum ada API, database, atau auth server. Status hanya di perangkat/browser yang sama (`localStorage`).
