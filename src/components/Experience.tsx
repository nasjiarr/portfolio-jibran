import { useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import '../styles/experience.css';

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    section.querySelectorAll('.experience-v1__reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="riwayat" className="experience-v1">
      <div className="experience-v1__shell">
        <header className="experience-v1__header experience-v1__reveal experience-v1__hidden">
          <div className="experience-v1__eyebrow">
            <Award size={15} strokeWidth={2.4} aria-hidden="true" />
            EXPERIENCE / RIWAYAT
          </div>
          <h2 className="experience-v1__heading">
            Pengalaman Praktis &{' '}
            <span className="experience-v1__heading-accent">Riwayat Pendidikan</span>
          </h2>
          <p className="experience-v1__description">
            Kombinasi latar belakang akademis Sistem Informasi yang kuat serta pengalaman langsung
            membangun sistem di instansi operasional.
          </p>
        </header>

        <div className="experience-v1__grid experience-v1__reveal experience-v1__hidden">
          {/* Work Experience */}
          <div className="experience-v1__column">
            <div className="experience-v1__column-head">
              <span className="experience-v1__column-icon">
                <Briefcase size={20} strokeWidth={2.2} />
              </span>
              <h3>Pengalaman Kerja & Magang</h3>
            </div>

            <div className="experience-v1__card">
              <div className="experience-v1__meta">
                <span className="experience-v1__date">
                  <Calendar size={13} /> Jan — Feb 2025
                </span>
                <span className="experience-v1__badge">Magang Industri</span>
              </div>
              <h4 className="experience-v1__role">Staff Teknologi Informasi (IT)</h4>
              <p className="experience-v1__company">PT. BPR Bank Kulon Progo</p>
              <p className="experience-v1__location">
                <MapPin size={13} /> Kulon Progo, D.I. Yogyakarta
              </p>

              <ul className="experience-v1__points">
                <li>
                  Mengembangkan aplikasi web manajemen arsip berkas SK & SOP serta modul disposisi untuk
                  efisiensi digitalisasi dokumen operasional perbankan.
                </li>
                <li>
                  Melakukan pemeliharaan infrastruktur TI harian, instalasi sistem, perbaikan perangkat keras
                  (PC, printer, scanner), dan penanganan kendala jaringan lokal.
                </li>
                <li>
                  Mendukung integritas data dan kelancaran alur operasional perbankan harian.
                </li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div className="experience-v1__column">
            <div className="experience-v1__column-head">
              <span className="experience-v1__column-icon">
                <GraduationCap size={20} strokeWidth={2.2} />
              </span>
              <h3>Pendidikan Formal</h3>
            </div>

            <div className="experience-v1__card">
              <div className="experience-v1__meta">
                <span className="experience-v1__date">
                  <Calendar size={13} /> 2022 — 2026
                </span>
                <span className="experience-v1__badge-highlight">IPK 3.56 / 4.00</span>
              </div>
              <h4 className="experience-v1__role">S1 Sistem Informasi</h4>
              <p className="experience-v1__company">
                Universitas Pembangunan Nasional "Veteran" Yogyakarta
              </p>
              <p className="experience-v1__location">
                <MapPin size={13} /> Sleman, D.I. Yogyakarta
              </p>

              <ul className="experience-v1__points">
                <li>
                  Fokus pada Rekayasa Perangkat Lunak, Perancangan Basis Data Relasional, Analisis Proses Bisnis,
                  dan Pengembangan Aplikasi Berbasis Web.
                </li>
                <li>
                  Mengembangkan berbagai proyek berbasis Laravel, RESTful API, dan antarmuka interaktif
                  sebagai implementasi tugas besar dan riset aplikasi.
                </li>
                <li>
                  Aktif mendalami arsitektur modern (Inertia, Docker, Svelte/React, Tailwind) serta metodologi agile.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
