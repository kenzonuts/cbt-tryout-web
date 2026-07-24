# Phase Plan — cbt-tryout-web

Prototype FE-only (Vite + React) untuk uji deteksi keluar fokus peserta ujian CBT.

**Stack:** Vite + React  
**Penyimpanan:** `localStorage` (belum ada backend)  
**Repo:** `cbt-tryout-web`

---

## Ringkasan keputusan

| Item | Keputusan |
|------|-----------|
| Deteksi | `visibilitychange` + Esc + offline |
| Alur warning | Pop-up 15 detik → Tetap Lanjut / Hentikan Tes |
| Admin | Mini halaman Buka Akses |
| Belum dibuat | API, DB, Excel, 180 soal, survey, role IT |

---

## Status ujian

```text
idle → logged_in → in_exam → warning → blocked
                              ↑               │
                              └── unlocked ───┘
```

## Fase A — Scaffold & fondasi ✅

Tujuan: project jalan, struktur rapi, route siap.

- [x] Buat project Vite + React
- [x] Pasang router: `/login`, `/ujian`, `/admin`
- [x] Setup styling dasar (CSS variables, layout)
- [x] Buat `src/utils/storage.js`
- [x] Buat `src/context/ExamContext.jsx`
- [x] Siapkan struktur folder (components, hooks, pages, data)
- [x] README cara menjalankan

**Selesai jika:** app jalan, 3 route bisa dibuka.

## Fase B — Login & data dummy ✅

Tujuan: masuk sistem dengan akun contoh.

- [x] Halaman LoginPage
- [x] Akun dummy: `peserta` / `1234`
- [x] Redirect ke `/ujian` setelah login
- [x] Siapkan 5 soal di `src/data/dummyQuestions.js`

**Selesai jika:** login berhasil / gagal ditolak dengan benar.

## Fase C — Halaman ujian (tanpa guard) ✅

Tujuan: UI ujian jalan dulu, baru ditambah deteksi.

- [x] ExamHeader (nama + timer sederhana)
- [x] QuestionCard (soal + opsi A–E)
- [x] Navigasi Sebelumnya / Selanjutnya
- [x] QuestionNav (nomor soal; hijau = terjawab)
- [x] Simpan jawaban ke Context + localStorage

**Selesai jika:** bisa jawab & pindah soal; refresh jawaban tetap ada.

## Fase D — Deteksi kecurangan (inti) ✅

Tujuan: uji perilaku “peserta keluar”.

- [x] Hook `useExamGuard`
- [x] Trigger: `visibilitychange`, Esc, offline
- [x] WarningModal countdown 15 detik
- [x] Tetap Lanjut → kembali `in_exam`
- [x] Hentikan Tes / 15 detik habis → `blocked`
- [x] Saat blocked: soal terkunci

**Selesai jika:** skenario laptop & HP lolos checklist uji.

## Fase E — Mini admin ✅

Tujuan: buka blokir peserta untuk demo.

- [x] Halaman `/admin`
- [x] Tampilkan status dari localStorage
- [x] Tombol Buka Akses → status `in_exam`
- [x] Link cepat Login ↔ Admin

**Selesai jika:** setelah blokir, admin unlock, peserta lanjut.

## Fase F — Poles & siap push ✅

Tujuan: rapi, bisa di-demo orang lain.

- [x] Poles UI (spacing, tipografi, modal)
- [x] Guard route: belum login tidak masuk `/ujian`
- [x] Refresh saat blocked → tetap terkunci
- [x] Lengkapi README (cara uji coba)
- [x] Siap push ke GitHub `cbt-tryout-web`

**Selesai jika:** demo berjalan tanpa penjelasan panjang.

## Fase F+ — MVP polish 10/10 ✅

Detail plan: [`PLAN-MVP-10.md`](./PLAN-MVP-10.md)

- [x] Mode Demo / Lab vs mode ujian bersih
- [x] Admin PIN sederhana (`admin` / `admin123`)
- [x] Timer habis → `blocked` (`timeout`)
- [x] Beranda `/` dengan 3 langkah
- [x] Mobile responsive + modal focus trap
- [x] Tips login sekali, banner blocked + CTA
- [x] Favicon, ESLint, version `0.1.0`, README Known limits

**Selesai jika:** clone → demo 5 menit sesuai README tanpa clutter lab.

## Checklist uji coba

### Laptop

- [ ] Pindah tab → warning 15 detik
- [ ] Klik Tetap Lanjut → bisa lanjut
- [ ] Biarkan 15 detik habis → blocked
- [ ] Tekan Esc → warning
- [ ] Refresh saat blocked → tetap locked

### Mobile

- [ ] Ganti app / Home → warning
- [ ] Tetap Lanjut vs habis waktu

### Admin

- [ ] Lihat status blocked
- [ ] Buka Akses → ujian aktif lagi

### Offline (opsional)

- [ ] Matikan WiFi → warning

## Struktur folder target

```text
cbt-tryout-web/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── data/
│   ├── context/
│   ├── utils/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── PHASES.md
└── README.md
```

## Setelah MVP (nanti)

- Backend (auth + status blokir di server)
- Realtime pantau admin
- Bank soal / paket / Excel
- Survey & hasil nilai
