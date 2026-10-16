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
            REKAM JEJAK
          </div>
          <h2 className="experience-v1__heading">
            Pengalaman &{' '}
            <span className="experience-v1__heading-accent">Pendidikan</span> <span className="sparkle">✦</span>
          </h2>
          <p className="experience-v1__description">
            Riwayat kerja magang di bidang IT dan pencapaian akademik:
          </p>
        </header>

        <div className="experience-v1__grid experience-v1__reveal experience-v1__hidden">
          {/* Work Experience */}
          <div className="experience-v1__column">
            <div className="experience-v1__column-head">
              <span className="experience-v1__column-icon">
                <Briefcase size={20} strokeWidth={2.2} />
              </span>
              <h3>Pengalaman Praktik Kerja</h3>
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
                  Mengembangkan aplikasi web pengelolaan arsip digital SK dan SOP serta alur disposisi dokumen masuk/keluar.
                </li>
                <li>
                  Menangani pemeliharaan operasional hardware (PC, printer, scanner) dan troubleshooting jaringan LAN.
                </li>
                <li>
                  Mendukung kelancaran dan keamanan alur data operasional perbankan harian.
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
                  Fokus pada Rekayasa Perangkat Lunak, Basis Data Relasional, dan Pengembangan Aplikasi Web.
                </li>
                <li>
                  Lulus dengan predikat sangat memuaskan (IPK 3.56).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
