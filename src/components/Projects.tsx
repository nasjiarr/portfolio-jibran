import { useEffect, useRef, useState } from 'react';
import { FolderGit2, ExternalLink, Check, Images, Maximize2, Code2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import ProjectLightbox, { type ProjectScreenshot } from './ProjectLightbox';
import '../styles/projects.css';

export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  repoUrl: string;
  tags: string[];
  highlights: string[];
  screenshots?: ProjectScreenshot[];
}

const projects: Project[] = [
  {
    title: 'BATHI POS',
    category: 'Cross-Platform POS System',
    description:
      'Sistem kasir dan manajemen bisnis modern offline-first. Terintegrasi antara aplikasi kasir mobile (Flutter) dengan printer thermal bluetooth dan web dashboard owner (Laravel 13 & React) untuk analitik laba bersih.',
    image: '/images/projects/bathi-pos/02-dashboard-analitik.png',
    repoUrl: 'https://github.com/nasjiarr/bathi',
    tags: [
      'Laravel 13',
      'Flutter',
      'React 18',
      'Inertia.js',
      'Tailwind CSS',
      'MySQL',
    ],
    highlights: [
      'Aplikasi kasir mobile offline-first dengan auto-sync',
      'Cetak struk Bluetooth thermal (ESC/POS) & struk WhatsApp',
      'Analitik laba bersih, HPP/COGS, dan rekapan penjualan',
      'Manajemen shift kasir, kas keluar, dan kasbon pelanggan',
      'Manajemen denah meja resto & kustomisasi varian menu',
    ],
    screenshots: [
      {
        url: '/images/projects/bathi-pos/01-login-portal.png',
        title: 'Portal Login & Akses Cepat Akun',
        description:
          'Halaman masuk BATHI POS dengan proteksi kredensial aman, desain clean, dan autentikasi sesi terenkripsi untuk owner toko.',
        platform: 'web',
      },
      {
        url: '/images/projects/bathi-pos/02-dashboard-analitik.png',
        title: 'Dashboard Utama & Analitik Profitabilitas',
        description:
          'Pusat kendali performa bisnis: monitoring live Laba Bersih, Laba Kotor, HPP (COGS), beban kas operasional, tren finansial harian, serta top 5 produk paling menguntungkan.',
        platform: 'web',
      },
      {
        url: '/images/projects/bathi-pos/03-katalog-produk.png',
        title: 'Manajemen Katalog, Stok & Margin HPP',
        description:
          'Daftar inventaris produk lengkap dengan pelacakan stok real-time, alert stok menipis, konfigurasi harga jual vs HPP modal, kode barcode/SKU, dan aksi restock instan.',
        platform: 'web',
      },
      {
        url: '/images/projects/bathi-pos/04-riwayat-transaksi.png',
        title: 'Riwayat Transaksi & Filter Laporan Omzet',
        description:
          'Rekapitulasi seluruh transaksi penjualan kasir: filter periode (Hari ini, 7 hari, bulanan, kustom), metode bayar (Tunai & QRIS), invoice unik, serta ekspor data ke Excel.',
        platform: 'web',
      },
      {
        url: '/images/projects/bathi-pos/05-kas-keluar-operasional.png',
        title: 'Pencatatan Kas Keluar Operasional (Petty Cash)',
        description:
          'Pencatatan pengeluaran operasional toko dari laci kasir (pembelian bahan baku, operasional darurat) dengan tracking pencatat dan sinkronisasi ke laporan shift.',
        platform: 'web',
      },
      {
        url: '/images/projects/bathi-pos/mobile-01-login.png',
        title: 'Portal Login Kasir & Konfigurasi Server',
        description:
          'Otentikasi cepat untuk staf kasir dengan konfigurasi IP server backend fleksibel untuk sinkronisasi data transaksi lokal maupun cloud.',
        platform: 'mobile',
      },
      {
        url: '/images/projects/bathi-pos/mobile-02-pos-katalog.png',
        title: 'Antarmuka Kasir Mobile & Monitoring Kas Laci',
        description:
          'Grid katalog menu interaktif dengan status koneksi printer Bluetooth, indikator meja aktif, filter kategori cepat, dan saldo kas laci shift berjalan.',
        platform: 'mobile',
      },
      {
        url: '/images/projects/bathi-pos/mobile-03-keranjang.png',
        title: 'Keranjang Belanja & Opsi Dine-In / Takeaway',
        description:
          'Kelola item pesanan pelanggan, pemilihan mode Makan di Tempat (Dine-in) atau Bungkus (Takeaway), diskon, serta fitur tahan pesanan sementara.',
        platform: 'mobile',
      },
      {
        url: '/images/projects/bathi-pos/mobile-04-pembayaran.png',
        title: 'Modal Pembayaran Kasir Multimetode',
        description:
          'Dukungan pembayaran Tunai cepat dengan pecahan uang instan dan kalkulasi kembalian otomatis, QRIS dinamis, hingga pencatatan kasbon pelanggan.',
        platform: 'mobile',
      },
      {
        url: '/images/projects/bathi-pos/mobile-05-riwayat.png',
        title: 'Riwayat Transaksi & Rekap Shift Kasir',
        description:
          'Pencatatan riwayat transaksi shift berjalan, filter metode pembayaran (Tunai & QRIS), dan cetak ulang struk via printer thermal bluetooth.',
        platform: 'mobile',
      },
      {
        url: '/images/projects/bathi-pos/mobile-06-shift-kas.png',
        title: 'Manajemen Shift & Rekonsiliasi Kas Laci',
        description:
          'Monitoring uang tunai laci, pembagian omzet per shift (Tunai & QRIS), cetak rekap shift ke printer thermal, dan tutup shift rekonsiliasi kas.',
        platform: 'mobile',
      },
      {
        url: '/images/projects/bathi-pos/mobile-07-pengaturan.png',
        title: 'Pengaturan Hardware Printer & Sinkronisasi Offline',
        description:
          'Konfigurasi printer thermal bluetooth (ESC/POS), tes cetak struk, pemantauan status antrean sinkronisasi offline-first, dan setting URL server backend.',
        platform: 'mobile',
      },
    ],
  },
  {
    title: 'Presensio Sistem Absensi',
    category: 'Enterprise Web Application',
    description:
      'Platform presensi terpadu dan manajemen operasional SDM berbasis Next.js 15. Dilengkapi validasi lokasi GPS (geofencing), verifikasi selfie anti-fraud, manajemen shift dinamis, pengajuan cuti, serta kalkulasi payroll otomatis.',
    image: '/images/projects/sistem-absensi/02-dashboard-admin.png',
    repoUrl: 'https://github.com/nasjiarr/sistem-absensi',
    tags: [
      'Next.js 15',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'Drizzle ORM',
      'Better Auth',
    ],
    highlights: [
      'Presensi real-time via GPS geofencing & kamera selfie anti-fraud',
      'Penguncian perangkat (device binding) & deteksi anomali absensi',
      'Manajemen shift & roster kerja fleksibel per cabang/departemen',
      'Siklus pengajuan & approval cuti/izin terintegrasi saldo kuota',
      'Kalkulasi penggajian otomatis (payroll) & cetak slip gaji bulanan',
      'Panel audit log & rekapitulasi data kehadiran karyawan',
    ],
    screenshots: [
      {
        url: '/images/projects/sistem-absensi/01-login-portal.png',
        title: 'Portal Login & Otentikasi Terintegrasi',
        description:
          'Halaman autentikasi sistem dengan desain split-pane responsif: verifikasi sesi aman, indikator waktu server lokal real-time (WIB), serta informasi proteksi radius geofencing dan enkripsi kredensial.',
      },
      {
        url: '/images/projects/sistem-absensi/02-dashboard-admin.png',
        title: 'Dashboard Administrator & Ringkasan Kehadiran',
        description:
          'Pusat kendali kehadiran dan operasional SDM: metrik live kehadiran tim, status clock-in hari berjalan, monitoring shift kerja aktif, integrasi kebijakan jam kantor, serta akses unduh rekap data.',
      },
      {
        url: '/images/projects/sistem-absensi/03-portal-absensi.png',
        title: 'Portal Absensi Harian & Validasi Radius GPS',
        description:
          'Antarmuka clock-in mandiri pegawai dengan validasi geofencing GPS radius kantor (150m), jam digital presisi, deteksi perangkat terikat (device binding), dan input catatan tugas kerja.',
      },
      {
        url: '/images/projects/sistem-absensi/04-manajemen-cuti.png',
        title: 'Modul Manajemen Saldo Cuti & Riwayat Izin',
        description:
          'Pelacakan kuota cuti tahunan terintegrasi dengan kalkulasi sisa saldo bersih, visualisasi progress bar penggunaan kuota, dan tabel riwayat permohonan lengkap dengan filter status approval.',
      },
      {
        url: '/images/projects/sistem-absensi/05-form-pengajuan-cuti.png',
        title: 'Formulir Interaktif Pengajuan Cuti & Pengecekan Kuota',
        description:
          'Modal dialog pengajuan permohonan (cuti, sakit, izin, dinas luar) yang secara otomatis menghitung durasi kalender, memvalidasi kecukupan sisa kuota secara real-time, serta unggah dokumen bukti pendukung.',
      },
    ],
  },
  {
    title: 'TEPOKIN Booking Lapangan',
    category: 'Real-Time Web Application',
    description:
      'Platform reservasi lapangan badminton real-time dengan tema Athletic High-Contrast, proteksi anti-bentrok jadwal, sinkronisasi slot via WebSocket, sistem loyalitas member, dan simulasi pembayaran terintegrasi.',
    image: '/images/projects/badminton-booking/03-booking-lapangan.png',
    repoUrl: 'https://github.com/nasjiarr/badminton-booking',
    tags: [
      'Laravel 12',
      'Inertia.js v2',
      'Vue 3.5',
      'Tailwind CSS v4',
      'Laravel Reverb',
      'MySQL',
    ],
    highlights: [
      'Proteksi anti-bentrok jadwal dengan DB pessimistic lock',
      'Sinkronisasi ketersediaan slot real-time via WebSocket',
      'Pemesanan rutin mingguan & diskon loyalitas otomatis',
      'Simulasi pembayaran QRIS & VA serta rekapitulasi data',
    ],
    screenshots: [
      {
        url: '/images/projects/badminton-booking/01-login-portal.png',
        title: 'Portal Login & Otentikasi Member',
        description:
          'Antarmuka masuk akun dengan tema Athletic High-Contrast, otentikasi kredensial aman, dan navigasi pendaftaran member baru.',
      },
      {
        url: '/images/projects/badminton-booking/02-dashboard-member.png',
        title: 'Dashboard Member Area & Status Loyalitas',
        description:
          'Pusat kendali akun member: status tingkatan Sobat Tepok, perolehan poin loyalitas, serta menu cepat reservasi dan riwayat booking.',
      },
      {
        url: '/images/projects/badminton-booking/03-booking-lapangan.png',
        title: 'Katalog Reservasi Lapangan & Tarif BWF',
        description:
          'Pilihan 4 lapangan karpet vinyl standar BWF dengan tarif transparan, pemilihan slot real-time, dan proteksi anti-bentrok otomatis.',
      },
      {
        url: '/images/projects/badminton-booking/04-riwayat-booking.png',
        title: 'Riwayat Booking & Status Reservasi',
        description:
          'Pelacakan seluruh status pemesanan (menunggu bayar, dikonfirmasi, selesai, dibatalkan) dengan ringkasan total tagihan dan jadwal sewa.',
      },
      {
        url: '/images/projects/badminton-booking/05-cari-lapangan.png',
        title: 'Athletic Matchday Hub & Sesi Favorit',
        description:
          'Pencarian lapangan cepat dengan horizontal date strip 14 hari, shortcut sesi favorit badminton 1-tap, dan filter durasi main.',
      },
    ],
  },
  {
    title: 'Ruaka (Sistem Reservasi Ruangan)',
    category: 'Fullstack Web Application',
    description:
      'Platform terpadu manajemen dan peminjaman ruang rapat secara real-time. Dilengkapi deteksi bentrok jadwal otomatis, persetujuan manajerial berjenjang, analitik utilisasi fasilitas, dan validasi kehadiran via QR Code.',
    image: '/images/projects/reservasi-ruangan/02-dashboard-admin.png',
    repoUrl: 'https://github.com/nasjiarr/reservasi-ruangan',
    tags: [
      'Laravel 12',
      'Inertia.js',
      'Vue 3',
      'Tailwind CSS',
      'Laravel Reverb',
      'MySQL',
    ],
    highlights: [
      'Kalender interaktif & validasi jadwal bentrok instan',
      'Pemberitahuan approval real-time via WebSocket',
      'Check-in kehadiran mandiri berbasis QR Code',
      'Monitoring status live & analitik utilisasi ruangan',
      'Ekspor rekapan data ke format Excel dan PDF',
    ],
    screenshots: [
      {
        url: '/images/projects/reservasi-ruangan/01-login-portal.png',
        title: 'Portal Login & Akses Cepat Akun Demo',
        description:
          'Halaman masuk Ruaka dengan proteksi kredensial, navigasi modern, dan opsi pengisian 1-klik akun demo untuk role Admin, Manager, dan Staff.',
      },
      {
        url: '/images/projects/reservasi-ruangan/02-dashboard-admin.png',
        title: 'Command Center & Monitoring Ruangan Live',
        description:
          'Dashboard operasional untuk memantau metrik okupansi harian, traffic ruangan, permohonan tertunda, agenda rapat aktif, dan status live ruangan.',
      },
      {
        url: '/images/projects/reservasi-ruangan/03-daftar-reservasi.png',
        title: 'Manajemen Reservasi & Filter Status Terpadu',
        description:
          'Daftar pengajuan peminjaman ruangan dengan tab filter status (Menunggu, Disetujui, Selesai, Dibatalkan), pencarian instan, dan detail kegiatan.',
      },
      {
        url: '/images/projects/reservasi-ruangan/04-kalender-jadwal.png',
        title: 'Kalender Jadwal Interaktif & Deteksi Bentrok',
        description:
          'Visualisasi ketersediaan seluruh ruangan dalam mode kalender (Bulan, Minggu, Hari) dengan pencegahan reservasi bentrok otomatis.',
      },
      {
        url: '/images/projects/reservasi-ruangan/05-analytics-utilisasi.png',
        title: 'Analytics & Utilisasi Fasilitas Rapat',
        description:
          'Grafik analitik tren peminjaman harian, metrik approval rate, rata-rata durasi penggunaan, dan daftar ruangan paling sering digunakan.',
      },
    ],
  },
  {
    title: 'FRC Reporting System',
    category: 'Fullstack Web Application',
    description:
      'Platform terpusat untuk alur penanganan kerusakan fasilitas gedung: pelaporan masalah, penugasan teknisi, verifikasi bukti foto sebelum/sesudah, dan pencatatan konsumsi utilitas.',
    image: '/images/projects/frc/01-dashboard-admin.png',
    repoUrl: 'https://github.com/nasjiarr/frc-reporting-system',
    tags: ['Laravel', 'Chart.js', 'Tailwind CSS', 'MySQL', 'Role-Based Access'],
    highlights: [
      'Alur kerja 4 level peran (Admin, Pelapor, Teknisi, Kepala)',
      'Dokumentasi visual bukti foto perbaikan',
      'Pencatatan konsumsi utilitas listrik dan air',
      'Visualisasi tren laporan kerusakan dengan Chart.js',
    ],
    screenshots: [
      {
        url: '/images/projects/frc/01-dashboard-admin.png',
        title: 'Dashboard Admin & Ringkasan Operasional',
        description:
          'Pusat kendali operasional fasilitas FRC: metrik laporan baru, penugasan aktif, status penyelesaian bulanan, peringatan pencatatan utilitas, dan pintasan aksi cepat.',
      },
      {
        url: '/images/projects/frc/02-manajemen-penugasan.png',
        title: 'Manajemen & Alokasi Penugasan Teknisi',
        description:
          'Panel alokasi tugas teknisi lapangan dengan pelacakan SLA responsivitas (>24 jam), status ketersediaan teknisi siaga, dan verifikasi disposisi tiket kerusakan.',
      },
      {
        url: '/images/projects/frc/03-form-pelaporan.png',
        title: 'Form Pelaporan Kerusakan & Kendala Fasilitas',
        description:
          'Antarmuka pelaporan kerusakan interaktif dengan rekomendasi masalah umum instan, pemilihan lokasi ruangan gedung FRC, unggah foto bukti, dan panduan pelaporan efektif.',
      },
      {
        url: '/images/projects/frc/04-utilitas-gedung.png',
        title: 'Manajemen & Monitoring Utilitas Gedung',
        description:
          'Sistem pemantauan konsumsi energi dan air gedung FRC UGM: pencatatan stand meter berkala untuk listrik MDP, panel distribusi SDP, air bersih PDAM, dan pemanfaatan air hujan.',
      },
      {
        url: '/images/projects/frc/05-detail-grafik-utilitas.png',
        title: 'Analisis Grafik Tren Konsumsi Utilitas',
        description:
          'Visualisasi analitik konsumsi utilitas bulanan berbasis Chart.js dengan indikator nilai akumulasi, rata-rata, puncak konsumsi tertinggi, serta ekspor laporan ke format PDF.',
      },
    ],
  },
  {
    title: 'Arsip Berkas & Disposisi',
    category: 'Web Application',
    description:
      'Sistem digitalisasi arsip dokumen SK dan SOP perbankan. Menggantikan proses fisik dengan modul disposisi masuk/keluar, pencarian cepat, dan ekspor spreadsheet.',
    image: '/images/projects/arsip/02-dashboard.png',
    repoUrl: 'https://github.com/nasjiarr/arsipberkas',
    tags: ['PHP', 'MySQL', 'PhpSpreadsheet', 'PDO', 'JavaScript'],
    highlights: [
      'Pencarian multi-kriteria berdasarkan nomor, perihal, dan tanggal',
      'Modul pencatatan disposisi masuk dan keluar dengan nomor unik',
      'Akses unduhan dokumen terproteksi via controller',
      'Ekspor rekapitulasi data arsip ke file Excel',
    ],
    screenshots: [
      {
        url: '/images/projects/arsip/01-login.png',
        title: 'Halaman Otentikasi & Login Sistem',
        description: 'Sistem Informasi Arsip Berkas PT BPR Bank Kulon Progo — antarmuka otentikasi akun pegawai dan administrator.',
      },
      {
        url: '/images/projects/arsip/02-dashboard.png',
        title: 'Dashboard Administrasi Berkas & Disposisi Surat',
        description: 'Ringkasan statistik pengguna, disposisi surat masuk/keluar, berkas SK & SOP, serta modul upload berkas kredit.',
      },
      {
        url: '/images/projects/arsip/03-sk-database.png',
        title: 'Pangkalan Data Surat Keputusan (SK)',
        description: 'Daftar regulasi resmi perbankan dengan fitur pencarian cepat nomor SK, filter tahun, unduh dokumen, dan upload berkas baru.',
      },
      {
        url: '/images/projects/arsip/04-disposisi-masuk.png',
        title: 'Alur Pencatatan Disposisi Surat Masuk',
        description: 'Tabel registrasi disposisi surat masuk lengkap dengan filter tanggal/kategori, instruksi tindak lanjut pimpinan, dan ekspor ke Excel.',
      },
    ],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [galleryState, setGalleryState] = useState<{
    isOpen: boolean;
    projectTitle: string;
    screenshots: ProjectScreenshot[];
    initialIndex: number;
  }>({
    isOpen: false,
    projectTitle: '',
    screenshots: [],
    initialIndex: 0,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('projects-v1__visible');
            entry.target.classList.remove('projects-v1__hidden');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    section.querySelectorAll('.projects-v1__reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const openGallery = (project: Project, index: number = 0) => {
    const list = project.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : [{ url: project.image, title: project.title, description: project.description }];

    setGalleryState({
      isOpen: true,
      projectTitle: project.title,
      screenshots: list,
      initialIndex: index,
    });
  };

  const closeGallery = () => {
    setGalleryState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <section ref={sectionRef} id="proyek" className="projects-v1">
      <div className="projects-v1__shell">
        <header className="projects-v1__header projects-v1__reveal projects-v1__hidden">
          <div className="projects-v1__eyebrow">
            <FolderGit2 size={15} strokeWidth={2.4} aria-hidden="true" />
            SHOWCASE PROYEK
          </div>
          <h2 className="projects-v1__heading">
            Proyek &{' '}
            <span className="projects-v1__heading-accent">Karya Pilihan</span> <span className="sparkle">✦</span>
          </h2>
          <p className="projects-v1__description">
            Aplikasi web fungsional yang dibangun untuk memecahkan kebutuhan operasional nyata:
          </p>
        </header>

        <div className="projects-v1__list">
          {projects.map((project, idx) => {
            const count = project.screenshots?.length || 1;
            const mobileCount = project.screenshots?.filter((s) => s.platform === 'mobile').length || 0;
            const webCount = project.screenshots?.filter((s) => s.platform !== 'mobile').length || count;
            const hasBothPlatforms = mobileCount > 0 && webCount > 0;
            return (
              <article
                key={project.title}
                className={`projects-v1__item projects-v1__reveal projects-v1__hidden ${
                  idx % 2 === 1 ? 'projects-v1__item--reverse' : ''
                }`}
              >
                <div className="projects-v1__visual">
                  <div
                    className="projects-v1__img-box"
                    onClick={() => openGallery(project, 0)}
                    role="button"
                    tabIndex={0}
                    title="Klik untuk membuka galeri screenshot"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openGallery(project, 0);
                      }
                    }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="projects-v1__img"
                      loading="lazy"
                    />

                    {/* Screenshot Count Badge */}
                    <div className="projects-v1__badge-count" aria-hidden="true">
                      <Images size={12} strokeWidth={2.2} />
                      <span>{hasBothPlatforms ? `${webCount} Web • ${mobileCount} Mobile` : `${count} Foto`}</span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="projects-v1__overlay">
                      <button
                        type="button"
                        className="projects-v1__overlay-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openGallery(project, 0);
                        }}
                      >
                        <Maximize2 size={16} strokeWidth={2.2} />
                        <span>Lihat Screenshot Halaman ({count})</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="projects-v1__info">
                  <span className="projects-v1__category">{project.category}</span>
                  <h3 className="projects-v1__title">{project.title}</h3>
                  <p className="projects-v1__text">{project.description}</p>

                  <div className="projects-v1__highlights">
                    <span className="projects-v1__highlights-label">Fitur Kunci:</span>
                    <ul className="projects-v1__highlights-list">
                      {project.highlights.map((h) => (
                        <li key={h}>
                          <Check size={14} className="projects-v1__check" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="projects-v1__tags-wrap">
                    <span className="projects-v1__tags-label">
                      <Code2 size={13} strokeWidth={2.4} />
                      <span>Teknologi Digunakan:</span>
                    </span>
                    <div className="projects-v1__tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="projects-v1__tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="projects-v1__actions">
                    <button
                      type="button"
                      onClick={() => openGallery(project, 0)}
                      className="projects-v1__btn-gallery"
                      aria-label={`Buka screenshot halaman untuk ${project.title}`}
                    >
                      <Images size={15} strokeWidth={2.2} />
                      <span>Lihat Screenshot ({count})</span>
                    </button>

                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects-v1__btn-github"
                    >
                      <GithubIcon size={15} />
                      <span>GitHub</span>
                      <ExternalLink size={13} strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Lightbox Pop-up Modal */}
      <ProjectLightbox
        isOpen={galleryState.isOpen}
        onClose={closeGallery}
        projectTitle={galleryState.projectTitle}
        screenshots={galleryState.screenshots}
        initialIndex={galleryState.initialIndex}
      />
    </section>
  );
}
