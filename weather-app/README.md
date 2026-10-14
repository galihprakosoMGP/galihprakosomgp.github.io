# Cuaca - Weather App

Aplikasi cuaca dengan HTML, CSS, dan JavaScript murni (tanpa framework, build, atau API key).
Data dari [Open-Meteo](https://open-meteo.com/).

## Fitur
- Cari kota dengan saran otomatis, atau tombol lokasi saat ini
- Cuaca sekarang + 7 hari: suhu, kondisi, terasa seperti, kelembapan, angin, tekanan, peluang hujan, UV
- Ikon SVG (cuaca berwarna + ikon antarmuka), tanpa emoji
- Latar artistik yang berubah mengikuti cuaca: cerah, berawan, hujan, badai, salju, kabut, malam
- Responsif: HP, tablet, dan desktop (dua kolom)
- Satuan °C/°F, kota terakhir diingat, status memuat/error ditangani

## Menjalankan
Buka `index.html` di browser (butuh internet). Opsional: ekstensi **Live Server** di VS Code.

## Mode demo (tanpa internet)
Di `js/config.js` ubah `DEMO: false` menjadi `DEMO: true`. Aplikasi memakai data contoh dari `js/demo.js`
(7 kota mewakili 7 tema langit), cocok untuk menguji tampilan.

## Struktur
```
weather-app/
├── index.html        kerangka halaman + elemen latar artistik
├── css/
│   ├── theme.css     warna dasar & 7 tema langit  <- ubah warna di sini
│   ├── scene.css     latar artistik (awan, hujan, salju, bintang, kabut, petir, bukit)
│   └── style.css     komponen & tata letak responsif
└── js/
    ├── config.js     pengaturan (DEMO, kota cepat)
    ├── icons.js      ikon SVG
    ├── codes.js      kode cuaca WMO -> teks, ikon, tema
    ├── demo.js       data contoh (mode demo)
    ├── api.js        pemanggilan API
    ├── ui.js         mengisi tampilan
    └── app.js        event dan alur utama
```
Urutan `<script>` di `index.html` penting.

## Menyesuaikan
- Warna langit: variabel `--a/--b/--c/--orb` per tema di `css/theme.css`
- Ikon: `js/icons.js` (kunci dipilih oleh `describeWeather()` di `codes.js`)
- Kota cepat di halaman awal: `QUICK_CITIES` di `js/config.js`
- Jumlah hari prakiraan: `forecast_days` di `js/api.js`
