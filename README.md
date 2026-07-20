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

Buka URL yang muncul di terminal (biasanya `http://localhost:5173`).

| Route | Halaman |
|-------|---------|
| `/login` | Login peserta (`peserta` / `1234`) |
| `/ujian` | Halaman ujian |
| `/admin` | Mini admin (buka akses) |

## Status pengembangan

| Fase | Isi | Status |
|------|-----|--------|
| A | Scaffold, router, storage, ExamContext | ✅ |
| B | Login + soal dummy | ✅ |
| C | UI ujian | ✅ |
| D | Deteksi fokus (`useExamGuard`) | ✅ |
| E | Mini admin unlock | ⏳ |
| F | Poles + README uji coba | ⏳ |

Detail fase ada di [`PHASES.md`](./PHASES.md).

## Catatan

Ini sandbox uji **teknologi deteksi fokus** di browser. Belum ada API, database, atau auth server.
