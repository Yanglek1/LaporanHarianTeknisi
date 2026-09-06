# WHUSNET INSTALLER — Web App

Aplikasi kerja lapangan untuk teknisi WHUSNET: PSB, form instalasi, dokumentasi
foto, GPS, tanda tangan digital, dan sinkronisasi ke Google Sheets. Dibangun
sebagai **web app mobile-first** (HTML/CSS/JS murni, tanpa build step) yang
bisa dipasang di layar utama Android seperti aplikasi native (PWA).

## Yang sudah berfungsi

- Splash screen → Login (mock, isi apa saja untuk masuk; ketik "admin" di
  kolom username untuk masuk sebagai role Admin)
- Dashboard dengan ringkasan & progress harian
- Daftar PSB dengan pencarian & filter, detail PSB, tombol buka navigasi
  (Google Maps)
- Form instalasi 7 langkah: Pelanggan & GPS → Data Instalasi → Hasil
  Pengukuran (dengan validasi ambang batas real-time) → Checklist → Upload
  Foto (kamera HP langsung) → Konfirmasi pelanggan + tanda tangan digital →
  Review & kirim
- Validasi field wajib sebelum tombol kirim aktif
- Mode offline: data instalasi disimpan di `localStorage` HP (pengganti Room
  DB pada spesifikasi native), berstatus "Menunggu Sinkron"
- Auto-sync ke Google Sheets saat koneksi kembali, retry manual dari Riwayat
- Riwayat, Laporan (statistik + grafik sederhana), Diagnosa jaringan dengan
  rekomendasi otomatis, Profil, Pengaturan (termasuk ambang batas diagnosa
  yang bisa diubah admin), dan panel Admin ringkas
- Nomor laporan otomatis format `WHU-YYYYMMDD-0001`

## Yang perlu Anda lakukan sebelum dipakai sungguhan

Ini prototipe fungsional, bukan produk jadi. Tiga hal yang masih perlu
dikerjakan untuk pemakaian produksi:

1. **Sambungkan ke data PSB nyata.** Saat ini daftar PSB adalah data contoh
   yang dibuat otomatis (`seedIfEmpty()` di `app.js`). Ganti dengan endpoint
   API yang membaca sheet `PSB` sungguhan, atau minta saya buatkan endpoint
   `doGet` tambahan di `google-apps-script.gs` untuk itu.
2. **Autentikasi sungguhan.** Login saat ini menerima username/password apa
   saja (mock). Untuk produksi, perlu backend autentikasi (mis. Apps Script
   dengan tabel teknisi + token, atau Firebase Auth).
3. **Hosting untuk PWA yang benar-benar bisa di-install.** File lokal tidak
   bisa mendaftarkan service worker. Upload folder ini ke hosting HTTPS
   (GitHub Pages, Firebase Hosting, Netlify, dsb.), lalu buka di Chrome
   Android → menu ⋮ → "Tambahkan ke Layar Utama".

## Setup Google Sheets + Apps Script (5 menit)

1. Buat Google Spreadsheet baru, beri nama misalnya "WHUSNET Installer DB".
2. Buka **Extensions ▸ Apps Script**.
3. Hapus isi `Code.gs` bawaan, tempel seluruh isi `google-apps-script.gs`.
4. Jalankan fungsi `setupSheets` sekali (pilih dari dropdown fungsi lalu klik
   ▶ Run) untuk membuat semua tab sheet (PSB, INSTALLATION, TECHNICIANS,
   CUSTOMERS, DOCUMENTATION, SETTINGS, LOG, REPORT) dengan header lengkap.
   Saat pertama kali run, Google akan minta izin akses Sheets & Drive —
   setujui.
5. **Deploy ▸ New deployment ▸ pilih tipe "Web app"**.
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Salin URL yang diakhiri `/exec`.
7. Di aplikasi: Profil ▸ Pengaturan ▸ tempel URL tersebut di kolom
   "URL Google Apps Script Web App" ▸ Simpan.
8. Selesaikan satu instalasi contoh di aplikasi untuk menguji — baris baru
   akan muncul di sheet `INSTALLATION`, dan foto/tanda tangan otomatis
   ter-upload ke folder Drive "WHUSNET Installer - Dokumentasi" dengan link
   ditulis ke kolom `Link Foto` / `Link Tanda Tangan`.

Kredensial Google **tidak pernah** disimpan di sisi klien — aplikasi hanya
menyimpan URL endpoint publik ini; akses ke Sheet/Drive sepenuhnya berjalan
di bawah identitas eksekusi script ("Execute as: Me"), sesuai prinsip
keamanan pada spesifikasi awal.

## Struktur file

```
index.html               shell HTML
styles.css                design system (tema navy/ISP)
app.js                     seluruh logika aplikasi (state, router, layar)
manifest.json              metadata PWA
sw.js                       service worker (app-shell offline caching)
google-apps-script.gs       backend penerima data, ditempel di Apps Script
```

## Menjalankan sekarang

Buka `index.html` langsung di browser HP atau desktop — semua fitur inti
(form, kamera, GPS, tanda tangan, offline queue) berfungsi tanpa server.
Sinkronisasi ke Sheets baru aktif setelah URL Apps Script diisi di
Pengaturan.

## Bagian dari spesifikasi asli yang belum diimplementasikan

Untuk menjaga prototipe ini benar-benar berfungsi (bukan sekadar mockup),
beberapa hal dari brief 36-bagian sengaja belum dibuat dan perlu iterasi
lanjutan bila diperlukan:

- Manajemen teknisi & penugasan PSB oleh admin (tambah/edit/assign) — saat
  ini panel Admin hanya menampilkan ringkasan
- Notifikasi push sungguhan (perlu Firebase Cloud Messaging)
- Autentikasi & role-based access sungguhan (lihat poin di atas)
- OTDR grafis dan integrasi alat ukur fisik — saat ini hanya kolom catatan
  teks
- Ekspor laporan (PDF/Excel) dari dalam aplikasi

Beri tahu saya bagian mana yang paling penting untuk dilanjutkan.
