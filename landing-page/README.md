# Spendly - Landing Page

Landing page satu halaman (HTML + Tailwind CSS via CDN, tanpa build dan tanpa JavaScript aplikasi).

## Struktur
```
spendly-landing/
├── index.html              # isi halaman: 9 bagian berurutan
├── css/style.css           # warna (token), tombol, kartu, aturan khusus
├── js/tailwind-config.js   # konfigurasi Tailwind (nama warna + font)
└── README.md
```

## Cara menjalankan
Buka `index.html` di browser. Butuh internet (Tailwind dan font Google dimuat dari CDN).
Opsional: ekstensi **Live Server** di VS Code.

## Urutan bagian di index.html
1. Nav · 2. Hero · 3. Logo pelanggan · 4. Fitur · 5. Cara kerja · 6. Testimoni · 7. Harga · 8. CTA akhir · 9. Footer

Setiap bagian diberi komentar `<!-- N. NAMA -->`, jadi cari komentar itu untuk menemukan bagiannya.

## Yang WAJIB diganti sebelum dipublikasikan
- Semua `href="#"` (Sign In, Get Started, Start Free Trial, link footer) -> isi URL asli.
- Logo pelanggan (Northwind, Lumina, ...), klaim "2,000+ teams", nama dan kutipan testimoni, serta harga: semuanya **contoh**.
- Tombol "Watch 1-min demo" saat ini mengarah ke bagian `#how`.

## Cara menyesuaikan
- **Warna aksen:** ubah `--acc` (dan `--acct` untuk teks aksen) di `css/style.css`.
- **Mode gelap:** token di blok `prefers-color-scheme: dark` pada `css/style.css`.
- **Teks dan urutan konten:** edit langsung di `index.html`.
- **Font:** ganti tautan Google Fonts di `<head>` dan `fontFamily` di `js/tailwind-config.js`.
- Beberapa warna sekunder di mockup hero (biru muda/abu-abu pada grafik) masih ditulis langsung di `index.html`.
