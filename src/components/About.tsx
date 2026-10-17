import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  ArrowRight,
  User,
  GraduationCap,
  MapPin,
  Clock,
  FolderGit2,
  Code,
} from 'lucide-react';
import '../styles/about.css';

const coreSkills = [
  { name: 'Laravel', color: '#f43f5e' },
  { name: 'PHP', color: '#818cf8' },
  { name: 'MySQL', color: '#0ea5e9' },
  { name: 'Vue.js', color: '#10b981' },
  { name: 'React', color: '#38bdf8' },
  { name: 'Tailwind CSS', color: '#06b6d4' },
  { name: 'RESTful API', color: '#a855f7' },
  { name: 'Docker & Git', color: '#3b82f6' },
];

function getWIBTime() {
  if (typeof window === 'undefined') return '';
  try {
    return new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date());
  } catch {
    return '';
  }
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentTime, setCurrentTime] = useState<string>(getWIBTime);

  // Live WIB Clock
  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(getWIBTime());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Reveal animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about-v1__visible');
            entry.target.classList.remove('about-v1__hidden');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    section.querySelectorAll('.about-v1__reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="tentang" className="about-v1">
      <div className="about-v1__shell">
        {/* Left Column: Narrative & Biography */}
        <div className="about-v1__content">
          <div className="about-v1__eyebrow about-v1__reveal about-v1__hidden">
            <User size={15} strokeWidth={2.4} aria-hidden="true" />
            TENTANG SAYA
          </div>

          <h2 className="about-v1__title about-v1__reveal about-v1__hidden">
            Ringkasan Profil &{' '}
            <span className="about-v1__title-accent">Latar Belakang</span> <span className="sparkle">✦</span>
          </h2>

          <div className="about-v1__narrative about-v1__reveal about-v1__hidden">
            <p>
              Saya merupakan lulusan S1 Sistem Informasi yang memiliki minat pada pengembangan website dan teknologi informasi. Saya mempelajari pengembangan web secara full stack menggunakan Laravel, PHP, MySQL, Blade, Tailwind CSS, dan JavaScript, serta memiliki pemahaman dasar mengenai jaringan komputer.
            </p>
            <p>
              Dalam bekerja, saya terbiasa memahami kebutuhan terlebih dahulu, mengembangkan solusi secara bertahap, dan memastikan hasilnya dapat digunakan dengan baik. Saya mampu bekerja secara mandiri maupun dalam tim serta memiliki semangat untuk terus belajar dan mengembangkan kemampuan di bidang teknologi.
            </p>
          </div>

          <div className="about-v1__actions about-v1__reveal about-v1__hidden">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="about-v1__button about-v1__button--primary"
            >
              <FileText size={16} strokeWidth={2.2} />
              <span>Unduh CV (PDF)</span>
            </a>
            <Link to="/projects" className="about-v1__button about-v1__button--secondary">
              <span>Lihat Proyek</span>
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Bento Grid */}
        <div className="about-v1__bento about-v1__reveal about-v1__hidden">
          {/* Card 1: Status & Lokasi (Span 2) */}
          <div className="about-bento-card about-bento-card--span-2 about-bento-card--status">
            <div className="about-bento-card__badge-row">
              <span className="about-bento-status-pill">
                <span className="about-bento-status-dot" />
                <span>Open for Work & Freelance</span>
              </span>
              {currentTime && (
                <span className="about-bento-time-pill" title="Waktu Lokal (WIB / UTC+7)">
                  <Clock size={12} strokeWidth={2.4} />
                  <span>{currentTime} WIB</span>
                </span>
              )}
            </div>
            <div className="about-bento-card__location">
              <MapPin size={15} strokeWidth={2.2} />
              <span>D.I. Yogyakarta, Indonesia (UTC+7)</span>
            </div>
          </div>

          {/* Card 2: Pendidikan & Universitas */}
          <div className="about-bento-card about-bento-card--edu">
            <div className="about-bento-card__icon about-bento-card__icon--blue">
              <GraduationCap size={20} strokeWidth={2.2} />
            </div>
            <div className="about-bento-card__meta">
              <span className="about-bento-card__label">Pendidikan</span>
              <h4 className="about-bento-card__title">S1 Sistem Informasi</h4>
              <p className="about-bento-card__sub">UPN "Veteran" Yogyakarta</p>
              <span className="about-bento-card__tag">2022 — 2026</span>
            </div>
          </div>

          {/* Card 3: Metrik / Proyek Selesai */}
          <div className="about-bento-card about-bento-card--metrics">
            <div className="about-bento-card__icon about-bento-card__icon--cyan">
              <FolderGit2 size={20} strokeWidth={2.2} />
            </div>
            <div className="about-bento-card__meta">
              <span className="about-bento-card__label">Portfolio Track</span>
              <div className="about-bento-card__stat">
                <span className="about-bento-card__stat-num">10+</span>
                <span className="about-bento-card__stat-plus">Proyek Web</span>
              </div>
              <p className="about-bento-card__sub">Fullstack, API & Basis Data</p>
            </div>
          </div>

          {/* Card 4: Tech Stack Utama (Span 2) */}
          <div className="about-bento-card about-bento-card--span-2 about-bento-card--stack">
            <div className="about-bento-card__stack-head">
              <div className="about-bento-card__icon about-bento-card__icon--indigo">
                <Code size={16} strokeWidth={2.2} />
              </div>
              <span className="about-bento-card__label">Core Tech Stack</span>
            </div>
            <div className="about-bento-stack-pills">
              {coreSkills.map((skill) => (
                <span
                  key={skill.name}
                  className="about-bento-pill"
                  style={{ ['--pill-accent' as string]: skill.color }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
