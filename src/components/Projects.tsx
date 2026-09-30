import { useEffect, useRef } from 'react';
import { FolderGit2, ExternalLink, Check } from 'lucide-react';
import { GithubIcon } from './Icons';
import '../styles/projects.css';

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  repoUrl: string;
  tags: string[];
  highlights: string[];
}

const projects: Project[] = [
  {
    title: 'Sistem Reservasi Ruangan',
    category: 'Fullstack Web Application',
    description:
      'Sistem reservasi ruang rapat dan aula secara real-time yang memadukan backend tangguh Laravel dengan antarmuka reaktif Vue 3 & Inertia.js. Memiliki pencegah bentrok jadwal otomatis, alur approval manajerial, dan check-in QR Code.',
    image: '/images/projects/reservasi.svg',
    repoUrl: 'https://github.com/nasjiarr/reservasi-ruangan',
    tags: ['Laravel', 'Inertia.js', 'Vue 3', 'Tailwind CSS', 'MySQL', 'WebSocket'],
    highlights: [
      'Kalender interaktif dengan deteksi bentrok jadwal real-time',
      'Persetujuan bertingkat manajer & notifikasi instan via WebSocket',
      'QR Code check-in kehadiran & ekspor laporan Excel/PDF',
      'Manajemen hak akses role & permission via Spatie',
    ],
  },
  {
    title: 'FRC Reporting System',
    category: 'Fullstack Web Application',
    description:
      'Platform internal terpadu untuk siklus perbaikan fasilitas gedung: pelaporan kerusakan oleh staf, penugasan teknisi, verifikasi bukti foto sebelum/sesudah, pencatatan utilitas gedung, dan pelaporan berkala.',
    image: '/images/projects/frc.svg',
    repoUrl: 'https://github.com/nasjiarr/frc-reporting-system',
    tags: ['Laravel', 'Chart.js', 'Tailwind CSS', 'MySQL', 'Role-Based Access'],
    highlights: [
      'Alur kerja 4 peran (Admin, Pelapor, Teknisi, Kepala FRC)',
      'Verifikasi foto sebelum & sesudah perbaikan fasilitas',
      'Pencatatan konsumsi utilitas (listrik, air bersih, air hujan)',
      'Visualisasi tren laporan dengan Chart.js & cetak PDF',
    ],
  },
  {
    title: 'Arsip Berkas & Disposisi',
    category: 'Web Application',
    description:
      'Aplikasi digitalisasi arsip dokumen Surat Keputusan (SK) dan SOP perbankan yang menggantikan pencatatan fisik. Dilengkapi modul disposisi keluar/masuk dengan nomor urut unik, pencarian cepat, dan ekspor spreadsheet.',
    image: '/images/projects/arsip.svg',
    repoUrl: 'https://github.com/nasjiarr/arsipberkas',
    tags: ['PHP', 'MySQL', 'PhpSpreadsheet', 'PDO', 'JavaScript'],
    highlights: [
      'Pencarian multi-parameter SK & SOP berbasis nomor, perihal, atau tanggal',
      'Modul disposisi dokumen masuk dan keluar dengan pencatatan terpisah',
      'Unduhan aman via controller & integrasi berkas jaringan (network share)',
      'Ekspor rekapitulasi data arsip ke spreadsheet via PhpSpreadsheet',
    ],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} id="proyek" className="projects-v1">
      <div className="projects-v1__shell">
        <header className="projects-v1__header projects-v1__reveal projects-v1__hidden">
          <div className="projects-v1__eyebrow">
            <FolderGit2 size={15} strokeWidth={2.4} aria-hidden="true" />
            PROJECTS / PORTOFOLIO
          </div>
          <h2 className="projects-v1__heading">
            Karya Terpilih &{' '}
            <span className="projects-v1__heading-accent">Sistem yang Telah Dibangun</span>
          </h2>
          <p className="projects-v1__description">
            Aplikasi web fungsional yang dirancang untuk memecahkan alur kerja nyata: digitalisasi arsip
            dokumen, penanganan kerusakan fasilitas, hingga pemesanan ruangan terintegrasi.
          </p>
        </header>

        <div className="projects-v1__list">
          {projects.map((project, idx) => (
            <article
              key={project.title}
              className={`projects-v1__item projects-v1__reveal projects-v1__hidden ${
                idx % 2 === 1 ? 'projects-v1__item--reverse' : ''
              }`}
            >
              <div className="projects-v1__visual">
                <div className="projects-v1__img-box">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="projects-v1__img"
                    loading="lazy"
                  />
                  <div className="projects-v1__overlay">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects-v1__overlay-btn"
                    >
                      <GithubIcon size={16} />
                      <span>Lihat Kode di GitHub</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="projects-v1__info">
                <span className="projects-v1__category">{project.category}</span>
                <h3 className="projects-v1__title">{project.title}</h3>
                <p className="projects-v1__text">{project.description}</p>

                <div className="projects-v1__highlights">
                  <span className="projects-v1__highlights-label">Fitur Utama:</span>
                  <ul className="projects-v1__highlights-list">
                    {project.highlights.map((h) => (
                      <li key={h}>
                        <Check size={14} className="projects-v1__check" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="projects-v1__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="projects-v1__tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="projects-v1__actions">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects-v1__btn-primary"
                  >
                    <GithubIcon size={16} />
                    <span>Lihat Repository GitHub</span>
                    <ExternalLink size={14} strokeWidth={2} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
