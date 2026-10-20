# Lumina AI

Asisten AI berbentuk web app yang bersih, cepat, dan siap pakai — tanpa perlu
API key.

### Buka aplikasinya

**https://yanglek1.github.io/lumina-ai/**

Buka di browser HP, lalu pilih **Add to Home Screen** / **Tambahkan ke Layar
Utama** supaya bisa dibuka seperti aplikasi biasa.

---

## Tentang Lumina

Lumina adalah asisten AI pribadi untuk menemani aktivitas sehari-hari: menulis,
belajar, mengoding, menyusun rencana, atau sekadar berpikir bersama. Tampilannya
dibuat mobile-first, jadi nyaman dipakai dari HP maupun desktop.

Model gratis yang dipakai adalah **GPT-OSS 20B** lewat **Pollinations**. Kamu
tidak perlu mendaftar, membuat API key, atau menyiapkan server sendiri. Kalau
ingin model lain, Lumina juga mendukung **API sendiri** yang kompatibel dengan
format OpenAI.

## Fitur

- **Streaming real-time** — jawaban muncul bertahap, bukan menunggu selesai.
- **Gratis tanpa API key** — langsung bisa dipakai dengan model GPT-OSS 20B.
- **Bisa pakai API sendiri** — OpenAI, Groq, OpenRouter, DeepSeek, dan endpoint
  lain yang kompatibel dengan OpenAI.
- **Lampiran gambar & dokumen** — tempel, seret-lepas, atau pilih file. PDF dan
  DOCX dibaca langsung di browser; gambar bisa dianalisis dengan model vision
  dari API sendiri.
- **Ganti model dari kolom ketik** — pindah antara model gratis dan API sendiri
  tanpa membuka halaman pengaturan.
- **Riwayat percakapan** tersimpan di browser, lengkap dengan pencarian.
- **Markdown + syntax highlighting** dan tombol salin untuk blok kode.
- **Panel “Proses berpikir”** untuk melihat reasoning model bila tersedia.
- **Persona & instruksi sistem** yang bisa diatur, plus pengatur kreativitas.
- **Tema gelap/terang**, responsif untuk HP, dan ekspor chat ke Markdown.
- **Pintasan Ctrl/Cmd + K** untuk memulai chat baru.

## Cara pakai

1. Buka **https://yanglek1.github.io/lumina-ai/**.
2. Langsung ketik pertanyaan di kolom bawah, lalu kirim.
3. Kalau ingin mengubah gaya jawaban, buka **Pengaturan → Persona**.
4. Untuk memakai model/API sendiri:
   - Buka **Pengaturan → API sendiri**.
   - Isi **Base URL**, **API key**, dan **Model**.
   - Contoh: `https://api.openai.com/v1`, model `gpt-4o-mini`.
   - Endpoint harus **HTTPS** dan mengizinkan **CORS**, karena versi ini
     berjalan sepenuhnya di browser.
   - Ollama lokal (`http://127.0.0.1:11434`) tidak bisa dipanggil dari halaman
     GitHub Pages yang HTTPS.

## Privasi

- Riwayat chat, pengaturan, dan API key disimpan di **browser kamu sendiri**
  (`localStorage` dan `IndexedDB`), bukan di server Lumina.
- API key hanya dikirim langsung ke penyedia API yang kamu isi.
- Saat memakai model gratis, percakapan dikirim ke **Pollinations** sebagai
  penyedia model.
- Tidak ada akun, tidak ada database pusat, dan tidak ada pelacakan iklan.

## Teknologi

- HTML, CSS, dan JavaScript murni — seluruh aplikasi ada dalam satu file
  `index.html`.
- Markdown: **marked** + **DOMPurify**.
- Syntax highlighting: **highlight.js**.
- Pembaca PDF/DOCX: **pdf.js** + **mammoth** (dimuat dari CDN).
- Streaming jawaban lewat **Server-Sent Events (SSE)** dari API yang
  kompatibel dengan OpenAI.

## Struktur repo

```text
index.html   # seluruh aplikasi Lumina (HTML + CSS + JS)
README.md    # penjelasan ini
```

---

Dibuat untuk belajar, bereksperimen, dan dipakai sehari-hari. Kalau kamu
menemukan bug atau punya ide fitur, silakan buka **Issues** di repo ini.
