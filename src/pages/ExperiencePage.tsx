import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase } from 'lucide-react';
import Experience from '../components/Experience';
import '../styles/pages.css';

export default function ExperiencePage() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="page-header__shell">
          <div className="page-header__eyebrow">
            <Briefcase size={14} strokeWidth={2.4} />
            HALAMAN / RIWAYAT KERJA & KULIAH
          </div>
          <h1 className="page-header__title">
            Rekam Jejak Profesional & <span>Pendidikan</span>
          </h1>
          <p className="page-header__desc">
            Riwayat pengalaman kerja magang di sektor perbankan dan capaian akademis selama menempuh studi
            S1 Sistem Informasi di UPN "Veteran" Yogyakarta.
          </p>
        </div>
      </header>

      <Experience />

      <section className="page-cta-banner">
        <div className="page-cta-banner__shell">
          <div className="page-cta-banner__box">
            <div className="page-cta-banner__content">
              <h3>Ingin Mengetahui Lebih Banyak atau Mengundang Wawancara?</h3>
              <p>
                Saya siap dihubungi untuk pembahasan peluang karir, rekrutmen, maupun proyek konsultasi sistem.
              </p>
            </div>
            <Link to="/contact" className="page-cta-banner__action">
              <span>Hubungi Saya</span>
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
