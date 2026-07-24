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

## Fase 0 — Definisi “10/10” ✅

**Estimasi:** ±30 menit

| Kriteria | Artinya |
|----------|---------|
| Demo | Orang baru bisa selesaikan checklist README tanpa pendampingan |
| UX | Mode ujian terasa “ujian”, mode demo terasa “lab” — dipisah jelas |
| Mobile | Warning + modal + nav soal nyaman di HP |
| Reliability | Refresh / multi-tab / countdown tidak bocor |
| Docs | README = satu-satunya instruksi yang dibutuhkan |

**Selesai jika:** daftar kriteria di atas disepakati (supaya tidak melebar ke backend).

- [x] Kriteria 10/10 disepakati

---

## Fase 1 — Mode Demo vs Mode Ujian ✅

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
4. Admin: tambah PIN sederhana (`admin` / `admin123`) — cukup untuk demo, bukan keamanan sungguhan.
5. Saat timer ujian habis → auto `blocked` + banner jelas.

### Selesai jika

- [x] Mode ujian bersih (tanpa clutter lab)
- [x] Mode demo / lab tersedia dalam 1 klik
- [x] Admin terlindungi PIN sederhana
- [x] Timer habis → status `blocked`

---

## Fase 2 — UX & mobile 10/10 ✅

**Estimasi:** 0.5–1 hari

### Kerjakan

1. Responsive: `@media` untuk exam layout — nav nomor scroll horizontal di HP; modal full-width nyaman; tombol min ~44px.
2. Warning modal: fokus trap ringan + Esc **tidak** menutup modal; fokus ke tombol “Tetap Lanjut”.
3. Banner blocked lebih actionable: copy pendek + CTA “Buka Admin”.
4. QuestionNav: bedakan **aktif / terjawab / kosong** lebih jelas.
5. Tips singkat sekali — “Jangan pindah tab selama ujian”.
6. Favicon + judul tab konsisten; `lang="id"`.

### Selesai jika

- [x] Demo HP (ganti app → warning → lanjut/block) terasa mulus
- [x] Modal warning nyaman di layar kecil
- [x] Banner blocked punya CTA jelas

---

## Fase 3 — Reliability & edge cases ✅

**Estimasi:** ±0.5 hari

### Kerjakan

1. Timer ujian: sync `examEndsAt`; saat habis → `blockExam('timeout')`.
2. Warning / timer refresh lewat `normalizeState`.
3. Saat `warning`: tidak double-trigger (status bukan `in_exam`).
4. PIN admin di `/admin` (sessionStorage).
5. Unlock setelah timeout memberi sisa 5 menit; Reset Demo membersihkan state.
6. CSS duplikat `.admin-quick` dibersihkan; responsive ditambah.

### Selesai jika

- [x] Checklist reliability diimplementasi di kode
- [ ] Checklist manual laptop / mobile / admin dicentang saat uji (lihat README)

---

## Fase 4 — Quality bar (repo “produk”) ✅

**Estimasi:** ±0.5 hari

### Kerjakan

1. ESLint (Vite React) + script `lint`.
2. `npm run build` harus hijau.
3. Version → `0.1.0` (MVP).
4. README: checklist + **Known limits**.
5. `PHASES.md`: fase F+ polish 10/10.
6. `.gitignore` sudah OK.

### Selesai jika

- [x] Docs & tooling siap
- [x] Version `0.1.0`

---

## Fase 5 — Demo pack (kesan 10/10) ✅

**Estimasi:** ±0.5 hari

### Kerjakan

1. Halaman `/` singkat: 3 langkah “Login → Ujian → Admin” + CTA.
2. Soal #5 teks panjang untuk uji wrap UI.
3. (Opsional) Deploy preview — belum; bisa menyusul.
4. (Opsional) Screencast / GIF — belum; bisa menyusul.

### Selesai jika

- [x] Beranda 3 langkah
- [x] Soal panjang di bank dummy
- [ ] (Bonus) URL preview live
- [ ] (Bonus) GIF README

---

## Urutan & estimasi

| Fase | Fokus | Estimasi | Status |
|------|--------|----------|--------|
| 0 | Sepakati kriteria | ±30 menit | ✅ |
| 1 | Mode demo + admin PIN + timeout | 0.5–1 hari | ✅ |
| 2 | Mobile + modal UX | 0.5–1 hari | ✅ |
| 3 | Edge cases reliability | ±0.5 hari | ✅ |
| 4 | Lint / build / docs | ±0.5 hari | ✅ |
| 5 | Landing + deploy | ±0.5 hari | ✅ (tanpa deploy) |

---

## Sengaja tidak masuk MVP 10/10

- Backend, database, JWT, realtime admin
- 180 soal / import Excel
- Penilaian resmi & ranking
- Anti-cheat keras (fullscreen wajib, webcam, dsb.)

---

## Definition of Done (MVP = 10/10)

- [ ] Checklist README / PHASES dicentang di laptop + minimal 1 HP (uji manual)
- [x] Mode ujian bersih + mode demo tersedia
- [x] Admin tidak terbuka lebar tanpa PIN
- [x] Timer habis → `blocked`
- [x] Docs & `build`/`lint` siap
- [ ] (Bonus) URL preview live

---

## Catatan status

| Item | Status |
|------|--------|
| Plan ini | Dieksekusi |
| Implementasi Fase 0–5 | Selesai (deploy opsional belum) |
| Repo | MVP polish 0.1.0 |
