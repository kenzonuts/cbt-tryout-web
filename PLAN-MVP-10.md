# Plan: MVP Tryout 10/10

Scope tetap **FE-only tryout deteksi fokus** (bukan CBT production).  
Target: demo ~5 menit tanpa penjelasan panjang, rasanya “produk jadi”, checklist uji bisa dicentang semua.

Lihat juga: [`README.md`](./README.md) · [`PHASES.md`](./PHASES.md)

---

## Prinsip

- Jangan tambah backend / bank soal besar dulu.
- Poles yang membuat demo gagal atau terlihat setengah jadi.
- Setiap fase punya **kriteria selesai** yang bisa dicek.

---

## Fase 0 — Definisi “10/10”

**Estimasi:** ±30 menit

| Kriteria | Artinya |
|----------|---------|
| Demo | Orang baru bisa selesaikan checklist README tanpa pendampingan |
| UX | Mode ujian terasa “ujian”, mode demo terasa “lab” — dipisah jelas |
| Mobile | Warning + modal + nav soal nyaman di HP |
| Reliability | Refresh / multi-tab / countdown tidak bocor |
| Docs | README = satu-satunya instruksi yang dibutuhkan |

**Selesai jika:** daftar kriteria di atas disepakati (supaya tidak melebar ke backend).

- [ ] Kriteria 10/10 disepakati

---

## Fase 1 — Mode Demo vs Mode Ujian

**Estimasi:** 0.5–1 hari  
**Dampak:** terbesar ke kesan “rapih sekali”

### Masalah sekarang

Di `/ujian` masih ada link Login/Admin + status mentah (`code`) + tombol “simulasi warning” — enak buat developer, kurang 10/10 buat demo.

### Kerjakan

1. Tambah toggle **Mode Demo** (default ON di tryout), disimpan di `localStorage`.
2. Saat Mode Demo OFF (atau query `?demo=0`):
   - Sembunyikan link Admin/Login di footer ujian
   - Sembunyikan status mentah & tombol simulasi
3. Saat Mode Demo ON: tampilkan panel kecil “Lab” (status, simulasi, link admin).
4. Admin: tambah PIN sederhana (mis. `admin` / `admin123`) — cukup untuk demo, bukan keamanan sungguhan.
5. Saat timer ujian habis → auto `blocked` + banner jelas (saat ini timer hanya UI).

### Selesai jika

- [ ] Mode ujian bersih (tanpa clutter lab)
- [ ] Mode demo / lab tersedia dalam 1 klik
- [ ] Admin terlindungi PIN sederhana
- [ ] Timer habis → status `blocked`

---

## Fase 2 — UX & mobile 10/10

**Estimasi:** 0.5–1 hari

### Kerjakan

1. Responsive: `@media` untuk exam layout — nav nomor sticky/scroll horizontal di HP; modal full-width nyaman; tombol min ~44px.
2. Warning modal: fokus trap ringan + Esc **tidak** menutup modal (Esc justru trigger warning — konsisten); fokus ke tombol “Tetap Lanjut”.
3. Banner blocked lebih actionable: copy pendek + CTA “Buka Admin”.
4. QuestionNav: bedakan **aktif / terjawab / kosong** lebih jelas (cek kontras di HP).
5. Login: setelah sukses, hint singkat sekali — “Jangan pindah tab selama ujian”.
6. Favicon + judul tab konsisten; pertahankan `lang="id"`.

### Selesai jika

- [ ] Demo HP (ganti app → warning → lanjut/block) terasa mulus
- [ ] Modal warning nyaman di layar kecil
- [ ] Banner blocked punya CTA jelas

---

## Fase 3 — Reliability & edge cases

**Estimasi:** ±0.5 hari

### Kerjakan

1. Timer ujian: sync `examEndsAt`; saat `remaining === 0` → `blockExam` + reason `timeout`.
2. Warning refresh: `normalizeState` sudah bagus — verifikasi manual; opsional unit test kecil untuk `normalizeState` / countdown.
3. Saat `warning`: pastikan tidak double-trigger aneh dari visibility / Esc / offline.
4. `RequireAuth` (atau PIN) di `/admin`.
5. Logout / Reset Demo: pastikan state bersih tanpa sisa `examEndsAt`.
6. Bersihkan CSS duplikat (mis. `.admin-quick`); pecah CSS jadi `base` / `exam` / `admin` **jika** perlu — opsional.

### Selesai jika

- [ ] Checklist laptop di `PHASES.md` / README lolos
- [ ] Checklist mobile lolos
- [ ] Checklist admin + unlock lolos
- [ ] Offline (opsional) lolos

---

## Fase 4 — Quality bar (repo “produk”)

**Estimasi:** ±0.5 hari

### Kerjakan

1. ESLint + Prettier (Vite React) + script `lint`.
2. `npm run build` harus hijau; cantumkan di README.
3. Version → `0.1.0` (MVP).
4. README: checklist “lulus / tidak” + kolom perangkat; section **Known limits** (localStorage, bukan anti-cheat sungguhan).
5. `PHASES.md`: catat fase polish 10/10 (F+).
6. Pastikan tidak ada artefak lokal yang ikut commit; `.gitignore` sudah OK.

### Selesai jika

- [ ] Clone fresh → `npm i` → `npm run dev` → demo 5 menit sesuai README
- [ ] `npm run build` sukses
- [ ] `npm run lint` (jika ditambah) sukses

---

## Fase 5 — Demo pack (kesan 10/10)

**Estimasi:** ±0.5 hari

### Kerjakan

1. Halaman `/` singkat: 3 langkah “Login → Ujian → Admin” + CTA (bukan redirect langsung ke login) — opsional tapi kuat untuk first impression.
2. 5 soal dummy tetap; pastikan ada 1 soal teks panjang untuk uji wrap UI.
3. (Opsional) Deploy preview: Vercel/Netlify + URL di README.
4. (Opsional) Screencast / GIF ~20 detik di README.

### Selesai jika

- [ ] Link repo saja cukup untuk stakeholder mengerti dalam ±1 menit
- [ ] (Bonus) URL preview live

---

## Urutan & estimasi

| Fase | Fokus | Estimasi |
|------|--------|----------|
| 0 | Sepakati kriteria | ±30 menit |
| 1 | Mode demo + admin PIN + timeout | 0.5–1 hari |
| 2 | Mobile + modal UX | 0.5–1 hari |
| 3 | Edge cases reliability | ±0.5 hari |
| 4 | Lint / build / docs | ±0.5 hari |
| 5 | Landing + deploy | ±0.5 hari |

**Total kasar:** 2–4 hari kerja (1 orang).

**Urutan eksekusi disarankan:** Fase 1 dulu (dampak terbesar), lalu 2 → 3 → 4 → 5.

---

## Sengaja tidak masuk MVP 10/10

Supaya scope tidak drift:

- Backend, database, JWT, realtime admin
- 180 soal / import Excel
- Penilaian resmi & ranking
- Anti-cheat keras (fullscreen wajib, webcam, dsb.)

Itu bisa jadi fase **setelah** tryout dinyatakan layak.

---

## Definition of Done (MVP = 10/10)

- [ ] Checklist README / PHASES semua dicentang di laptop + minimal 1 HP
- [ ] Mode ujian bersih (tanpa clutter lab) + mode demo tersedia
- [ ] Admin tidak terbuka lebar tanpa PIN
- [ ] Timer habis → `blocked`
- [ ] `build` sukses; README cukup untuk orang baru
- [ ] (Bonus) URL preview live

---

## Catatan status

| Item | Status |
|------|--------|
| Plan ini | Draft siap dieksekusi |
| Implementasi Fase 0–5 | Belum |
| Repo saat ini | Prototype fase A–F di `PHASES.md` sudah selesai (~8/10) |
