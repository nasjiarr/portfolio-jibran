import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Eye,
} from 'lucide-react';
import CertificateModal, { type CertificateData } from './CertificateModal';
import '../styles/experience.css';

interface TimelineItem {
  id: string;
  type: 'work' | 'education';
  typeLabel: string;
  role: string;
  institution: string;
  period: string;
  location: string;
  badge: string;
  badgeHighlight?: boolean;
  points: string[];
  skills: string[];
  projectLink?: {
    text: string;
    href: string;
  };
  certificate?: CertificateData;
}

const timelineData: TimelineItem[] = [
  {
    id: 'bpr',
    type: 'work',
    typeLabel: 'Pengalaman Praktik Kerja',
    role: 'Staff Teknologi Informasi (IT)',
    institution: 'PT. BPR Bank Kulon Progo',
    period: 'Januari — Februari 2025',
    location: 'Kulon Progo, D.I. Yogyakarta',
    badge: 'Magang Industri',
    badgeHighlight: false,
    points: [
      'Mengembangkan aplikasi web pengelolaan arsip digital SK & SOP serta modul disposisi surat masuk/keluar berbasis database.',
      'Menangani pemeliharaan operasional hardware (PC kantor, printer, scanner) dan troubleshooting stabilitas jaringan LAN.',
      'Mendukung kelancaran dan keamanan data operasional harian kantor perbankan.',
    ],
    skills: ['PHP', 'MySQL', 'PhpSpreadsheet', 'Troubleshooting Hardware', 'Jaringan LAN'],
    projectLink: {
      text: 'Lihat Proyek Arsip Berkas',
      href: '/projects',
    },
    certificate: {
      title: 'Sertifikat Magang',
      subtitle: 'PT. BPR Bank Kulon Progo (Perseroda)',
      imageUrl: '/images/certificates/sertifikat-magang-bpr.jpg',
    },
  },
  {
    id: 'upn',
    type: 'education',
    typeLabel: 'Pendidikan Formal',
    role: 'S1 Sistem Informasi',
    institution: 'Universitas Pembangunan Nasional "Veteran" Yogyakarta',
    period: '2022 — 2026',
    location: 'Sleman, D.I. Yogyakarta',
    badge: 'IPK 3.56 / 4.00 • Sangat Memuaskan',
    badgeHighlight: true,
    points: [
      'Fokus studi pada Rekayasa Perangkat Lunak, Basis Data Relasional, Analisis Sistem, dan Pengembangan Aplikasi Web.',
      'Menyelesaikan studi sarjana dengan predikat kelulusan Sangat Memuaskan (IPK 3.56).',
      'Membangun berbagai proyek aplikasi sistem informasi berbasis web menggunakan stack modern.',
    ],
    skills: ['Rekayasa Perangkat Lunak', 'Basis Data Relasional', 'Sistem Informasi Bisnis', 'Laravel', 'Analisis Sistem'],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<'all' | 'work' | 'education'>('all');
  const [activeCertificate, setActiveCertificate] = useState<CertificateData | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('experience-v1__visible');
            entry.target.classList.remove('experience-v1__hidden');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    section.querySelectorAll('.experience-v1__reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleOpenCertificate = (cert: CertificateData) => {
    setActiveCertificate(cert);
    setIsCertModalOpen(true);
  };

  const handleCloseCertificate = () => {
    setIsCertModalOpen(false);
  };

  const filteredItems = timelineData.filter((item) => {
    if (filter === 'work') return item.type === 'work';
    if (filter === 'education') return item.type === 'education';
    return true;
  });

  return (
    <section ref={sectionRef} id="riwayat" className="experience-v1">
      <div className="experience-v1__shell">
        {/* Header Section */}
        <header className="experience-v1__header experience-v1__reveal experience-v1__hidden">
          <div className="experience-v1__eyebrow">
            <Award size={14} strokeWidth={2.4} aria-hidden="true" />
            <span>REKAM JEJAK</span>
          </div>
          <h2 className="experience-v1__heading">
            Pengalaman &{' '}
            <span className="experience-v1__heading-accent">Pendidikan</span> <span className="sparkle">✦</span>
          </h2>
          <p className="experience-v1__description">
            Alur kronologis perjalanan studi sarjana dan pengalaman kerja praktik di industri IT:
          </p>

          {/* Filter Pills */}
          <div className="timeline-filter-row" role="tablist" aria-label="Filter Riwayat">
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              className={`timeline-filter-btn ${filter === 'all' ? 'is-active' : ''}`}
              onClick={() => setFilter('all')}
            >
              <Sparkles size={13} />
              <span>Semua Riwayat ({timelineData.length})</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'work'}
              className={`timeline-filter-btn ${filter === 'work' ? 'is-active' : ''}`}
              onClick={() => setFilter('work')}
            >
              <Briefcase size={13} />
              <span>Praktik Kerja (1)</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'education'}
              className={`timeline-filter-btn ${filter === 'education' ? 'is-active' : ''}`}
              onClick={() => setFilter('education')}
            >
              <GraduationCap size={14} />
              <span>Pendidikan (1)</span>
            </button>
          </div>
        </header>

        {/* Vertical Connected Timeline Tree */}
        <div className="timeline-container experience-v1__reveal experience-v1__hidden">
          <div className="timeline-tree">
            {filteredItems.map((item) => {
              const isWork = item.type === 'work';
              const Icon = isWork ? Briefcase : GraduationCap;

              return (
                <div key={item.id} className="timeline-node">
                  {/* Timeline Rail & Glowing Node Icon */}
                  <div className="timeline-rail">
                    <div className={`timeline-icon-bubble ${isWork ? 'timeline-icon-bubble--work' : 'timeline-icon-bubble--edu'}`}>
                      <Icon size={18} strokeWidth={2.2} />
                    </div>
                    <div className="timeline-line" />
                  </div>

                  {/* Timeline Card */}
                  <div className="timeline-card">
                    {/* Header Row: Date & Status Badge */}
                    <div className="timeline-card__top">
                      <div className="timeline-card__meta">
                        <span className="timeline-date-chip">
                          <Calendar size={13} />
                          <span>{item.period}</span>
                        </span>
                        <span className="timeline-location-chip">
                          <MapPin size={12} />
                          <span>{item.location}</span>
                        </span>
                      </div>
                      <span
                        className={`timeline-badge ${
                          item.badgeHighlight ? 'timeline-badge--highlight' : 'timeline-badge--normal'
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Role & Institution */}
                    <h3 className="timeline-card__role">{item.role}</h3>
                    <h4 className="timeline-card__institution">{item.institution}</h4>

                    {/* Bullet Points */}
                    <ul className="timeline-card__points">
                      {item.points.map((pt, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={15} className="timeline-point-check" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Contextual Skills Tags */}
                    <div className="timeline-skills-wrap">
                      <span className="timeline-skills-label">Keahlian & Tools:</span>
                      <div className="timeline-skills-list">
                        {item.skills.map((skill) => (
                          <span key={skill} className="timeline-skill-pill">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Simple Certificate Proof Bar */}
                    {item.certificate && (
                      <div className="timeline-cert-simple">
                        <div
                          className="timeline-cert-simple__preview"
                          onClick={() => handleOpenCertificate(item.certificate!)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleOpenCertificate(item.certificate!);
                            }
                          }}
                          aria-label="Lihat Sertifikat Magang"
                        >
                          <img
                            src={item.certificate.imageUrl}
                            alt="Sertifikat Magang"
                            className="timeline-cert-simple__thumb"
                            loading="lazy"
                          />
                          <div className="timeline-cert-simple__info">
                            <span className="timeline-cert-simple__title">Bukti Sertifikat Magang</span>
                            <span className="timeline-cert-simple__sub">PT. BPR Bank Kulon Progo</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="timeline-cert-simple__btn"
                          onClick={() => handleOpenCertificate(item.certificate!)}
                        >
                          <Eye size={13} strokeWidth={2.2} />
                          <span>Lihat Sertifikat</span>
                        </button>
                      </div>
                    )}

                    {/* Direct Project Link if available */}
                    {item.projectLink && (
                      <div className="timeline-card__action">
                        <Link to={item.projectLink.href} className="timeline-btn-project">
                          <span>{item.projectLink.text}</span>
                          <ExternalLink size={13} strokeWidth={2.2} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Simple Certificate Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={handleCloseCertificate}
        certificate={activeCertificate}
      />
    </section>
  );
}
