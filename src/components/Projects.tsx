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
    title: 'Sistem Reservasi Ruangan',
    category: 'Fullstack Web Application',
    description:
      'Aplikasi reservasi ruang rapat dan aula secara real-time. Memiliki deteksi bentrok jadwal otomatis, persetujuan manajerial berjenjang, dan validasi kehadiran via QR Code.',
    image: '/images/projects/reservasi.svg',
    repoUrl: 'https://github.com/nasjiarr/reservasi-ruangan',
    tags: ['Laravel', 'Inertia.js', 'Vue 3', 'Tailwind CSS', 'MySQL', 'WebSocket'],
    highlights: [
      'Kalender interaktif & validasi jadwal bentrok instan',
      'Pemberitahuan approval real-time via WebSocket',
      'Check-in kehadiran berbasis QR Code',
      'Ekspor rekapan data ke format Excel dan PDF',
    ],
    screenshots: [
      {
        url: '/images/projects/reservasi.svg',
        title: 'Kalender Interaktif & Penjadwalan Ruang',
        description: 'Tampilan antarmuka pemesanan ruang rapat dengan indikator ketersediaan dan validasi bentrok jadwal instan.',
      },
    ],
  },
  {
    title: 'FRC Reporting System',
    category: 'Fullstack Web Application',
    description:
      'Platform terpusat untuk alur penanganan kerusakan fasilitas gedung: pelaporan masalah, penugasan teknisi, verifikasi bukti foto sebelum/sesudah, dan pencatatan konsumsi utilitas.',
    image: '/images/projects/frc.webp',
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
        url: '/images/projects/frc.webp',
        title: 'Dashboard Manajemen Kerusakan Fasilitas',
        description: 'Pemantauan tiket kerusakan aktif, status perbaikan teknisi, dan rekap utilisasi utilitas gedung.',
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
                      <span>{count} Foto</span>
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
