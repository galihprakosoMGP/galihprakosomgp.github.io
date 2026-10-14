# Spendly - Expense Tracker

Aplikasi pencatat pengeluaran sederhana (HTML + CSS + JavaScript, tanpa build).

## Struktur
```
spendly/
├── index.html      # kerangka halaman (HTML + class Tailwind)
├── css/style.css   # CSS tambahan (safe-area HP, aturan cetak)
├── js/app.js       # seluruh logika aplikasi
└── README.md
```

## Cara menjalankan
Buka `index.html` di browser (klik dua kali). Butuh internet karena Tailwind dimuat lewat CDN.
Opsional: pakai ekstensi **Live Server** di VS Code agar halaman otomatis refresh.

## Cara menyesuaikan
- **Mata uang:** ubah `CURRENCY` di bagian Config `js/app.js` (mis. `'IDR'`).
- **Kategori:** tambah satu baris di objek `CATS` (emoji + warna).
- **Tampilan:** ubah class Tailwind di `index.html`.

## Cara kerja singkat
Data transaksi ada di array `tx`. Setiap perubahan: ubah `tx` -> `save()` (ke localStorage) -> `render()` (gambar ulang tampilan).

## Catatan
- Data tersimpan di browser yang dipakai; membuka di browser/perangkat lain berarti data kosong.
- Tombol Export membuka tabel laporan; gunakan Print / Save as PDF untuk mencetak.
