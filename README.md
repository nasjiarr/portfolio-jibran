# Nasywan Jibran Aryadi — Portfolio Website

Website portofolio pribadi modern untuk menampilkan profil profesional, keahlian teknis, rekam jejak akademik/kerja, dan showcase proyek rekayasa perangkat lunak web.

Dibuat menggunakan arsitektur **React Single Page Application (SPA)** dengan **Vite** dan **TypeScript**, serta mengadopsi standar desain DealTech UI yang bersih, terstruktur, dan responsif.

---

## 🚀 Tech Stack

- **Frontend Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router](https://reactrouter.com/) (Multi-page routing dengan auto-scroll to top)
- **Styling**: CSS Custom Properties (Design Tokens), Flexbox & CSS Grid
- **Icons**: [Lucide React](https://lucide.dev/) & Custom SVG Icons
- **Form Service**: [Formspree](https://formspree.io/) AJAX integration
- **Deployment & Asset Bundling**: Static Build (`dist/`)

---

## ✨ Fitur Utama

1. **Multi-Page Routing**: Pemisahan halaman yang terstruktur dan bersih:
   - `/` — Beranda (Hero dengan giant background watermark typography, terminal typing animation, profile card, quote box, dan marquee ticker keahlian).
   - `/about` — Profil diri, latar belakang akademik (S1 Sistem Informasi), pilar rekayasa, dan unduh CV PDF.
   - `/skills` — Technical skills (Software & Tools visual boxes, tag clouds, dan animasi progress bar coding skills).
   - `/projects` — Showcase proyek unggulan (*Reservasi Ruangan*, *FRC Reporting System*, *Arsip Berkas*).
   - `/experience` — Rekam jejak magang IT perbankan dan riwayat pendidikan.
   - `/contact` — Informasi kontak langsung dan form kirim pesan interaktif.
2. **Dark / Light Theme Toggle**:
   - Dukungan tema gelap dan terang dengan token CSS dinamis (`data-theme="dark"`).
   - Preferensi tersimpan otomatis di `localStorage`.
3. **Contact Form Interaktif**:
   - Terintegrasi langsung dengan Formspree API via AJAX.
   - Status visual: loading spinner, notifikasi sukses kirim, dan error handling otomatis.
4. **Floating Action WhatsApp**:
   - Tombol melayang WhatsApp di pojok kanan bawah dengan animasi pulse dan draf pesan instan.
   - Otomatis adaptif menjadi tombol bulat di layar ponsel.
5. **SEO & Open Graph Ready**:
   - Meta tags lengkap untuk pratinjau kartu saat tautan dibagikan ke WhatsApp, LinkedIn, Telegram, dan Twitter/X.
   - Favicon kustom monogram "N" berlatar biru DealTech.

---

## 📁 Struktur Direktori

```text
portfolio-baru/
├── public/
│   ├── images/              # Asset foto profil dan showcase proyek
│   ├── cv.pdf               # Berkas Curriculum Vitae (PDF)
│   └── favicon.svg          # Favicon monogram
├── src/
│   ├── components/          # Komponen modular (Hero, Navbar, Footer, Skills, dll.)
│   ├── context/             # ThemeContext untuk tema gelap/terang
│   ├── pages/               # Halaman rute (HomePage, AboutPage, ProjectsPage, dll.)
│   ├── styles/              # Stylesheet komponen & dealtech-tokens.css
│   ├── App.tsx              # Router shell & layout wrapper
│   └── main.tsx             # Entry point React
├── index.html               # Dokumen HTML utama & SEO Open Graph tags
└── package.json             # Dependensi & script proyek
```

---

## 🛠️ Cara Menjalankan Secara Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) (versi 18 ke atas)
- [npm](https://www.npmjs.com/)

### Instalasi & Menjalankan Dev Server
```bash
# Masuk ke folder proyek
cd portfolio-baru

# Pasang dependensi
npm install

# Jalankan server pengembangan lokal (HMR)
npm run dev
```
Akses website melalui browser di `http://localhost:5173`.

### Build untuk Produksi
```bash
# Jalankan kompilasi TypeScript dan Vite build
npm run build

# Pratinjau hasil build produksi secara lokal
npm run preview
```
Output produksi siap deploy akan berada di folder `dist/`.

---

## 📬 Kontak & Profil

- **Nama**: Nasywan Jibran Aryadi
- **Email**: [nasywanji@gmail.com](mailto:nasywanji@gmail.com)
- **WhatsApp**: [+62 896-5340-4050](https://wa.me/6289653404050)
- **LinkedIn**: [linkedin.com/in/nasywan-jibran-aryadi-7547a8214](https://www.linkedin.com/in/nasywan-jibran-aryadi-7547a8214/)
- **GitHub**: [github.com/nasjiarr](https://github.com/nasjiarr)

---

&copy; 2026 **Nasywan Jibran Aryadi**. All rights reserved.
