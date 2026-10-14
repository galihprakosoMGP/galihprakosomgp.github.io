# MGP Family Fashion — Toko Baju Online

Toko baju online untuk anak, remaja, dan dewasa. Tanpa framework dan tanpa instalasi:
buka `index.html` di browser dan toko langsung berjalan.

## Struktur proyek

```
mgp-family-fashion/
├── index.html            Kerangka halaman (header, slideshow, katalog, footer)
├── css/                  Gaya tampilan (urutan pemuatan ada di index.html)
│   ├── variables.css     Warna & tema terang/gelap  <- ubah warna di sini
│   ├── base.css          Reset, latar halaman, form, footer
│   ├── buttons.css       Tombol (.pri oranye, .blu biru, .gry abu, .dng merah)
│   ├── header.css        Logo, wordmark, tagline, pencarian
│   ├── slider.css        Slideshow beranda
│   ├── products.css      Kategori, kartu produk, halaman detail
│   ├── modal.css         Popup keranjang, checkout, owner, notifikasi
│   ├── interactions.css  Efek hover, tekan, fokus, animasi
│   └── responsive.css    Tablet & HP (selalu paling akhir)
├── js/                   Logika (urutan pemuatan penting, lihat index.html)
│   ├── utils.js          Fungsi bantu ($, rupiah, escape HTML, toast)
│   ├── config.js         PIN owner, rekening, kurir, pembayaran, produk awal, slide
│   ├── store.js          State aplikasi + penyimpanan localStorage
│   ├── products.js       Katalog & tambah cepat ke keranjang
│   ├── modal.js          Buka/tutup popup
│   ├── cart.js           Keranjang
│   ├── checkout.js       Alamat, kurir, pembayaran, buat pesanan
│   ├── detail.js         Detail produk, masukkan keranjang, beli langsung
│   ├── admin.js          Dashboard owner (produk & pesanan)
│   ├── slider.js         Slideshow
│   └── app.js            Titik masuk + tombol owner tersembunyi
└── assets/
    ├── icons/            Ikon produk: {jenis}-{warna}.svg + favicon.svg
    └── images/           logo.svg dan slide-1..4.svg
```

## Tampilan & font
- Warna, font, bayangan: `css/variables.css` (palet dari logo: biru tua, biru muda, oranye). Font diganti lewat `--font`
  dan tautan Google Fonts di `index.html`.
- Warna slide & latar kartu kategori: `js/config.js` (`SL`, `COL`). Ikon produk: `assets/icons/` (anak = biru, remaja = navy, dewasa = abu).

## Yang paling sering diubah

| Ingin mengubah | Buka file |
|---|---|
| Warna tema | `css/variables.css` |
| PIN owner, rekening, nomor e-wallet | `js/config.js` (`PIN`, `STORE`) |
| Kurir & ongkir, metode pembayaran | `js/config.js` (`SHIP`, `PAYS`) |
| Produk awal | `js/config.js` (`SEED`) |
| Teks & gambar slideshow | `js/config.js` (`SL`) dan `assets/images/slide-*.svg` |
| Logo & tagline | `assets/images/logo.svg` dan `index.html` (bagian `<header>`) |
| Deskripsi bawaan per kategori | `js/config.js` (`DESC`) |

## Menambah jenis ikon atau warna

- **Jenis baru** (mis. jaket): buat `jaket-blue.svg`, `jaket-navy.svg`, `jaket-slate.svg`
  di `assets/icons/`, daftarkan di `ICONS` (`js/config.js`), lalu tambahkan kata kunci
  nama produk di fungsi `ic()` (`js/products.js`).
- **Kategori baru**: tambahkan di `CATS` dan `COL` (warna latar), `TONE` (warna ikon),
  serta `DESC` pada `js/config.js`.

## Cara kerja & batasan

- Data produk, keranjang, dan pesanan disimpan di **localStorage** browser, bukan di server.
  Perubahan owner hanya terlihat di browser yang sama.
- Tombol **Owner** tersembunyi. Munculkan dengan mengetuk logo 5 kali (atau alamat `index.html#owner`).
  PIN bawaan `1234` hanya pengaman tampilan, bukan keamanan sungguhan.
- Font Plus Jakarta Sans dari Google Fonts; tanpa internet tampilan memakai font bawaan perangkat.
- Untuk toko sungguhan, siapkan server + database (login owner, pesanan, stok) dan payment gateway.

## Memasang di internet

Unggah seluruh folder ke hosting statis (Netlify, Vercel, GitHub Pages, dll.) dengan `index.html` di root.
