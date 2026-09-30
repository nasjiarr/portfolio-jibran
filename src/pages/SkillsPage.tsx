import { Link } from 'react-router-dom';
import { ArrowRight, Code2 } from 'lucide-react';
import Skills from '../components/Skills';
import '../styles/pages.css';

export default function SkillsPage() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="page-header__shell">
          <div className="page-header__eyebrow">
            <Code2 size={14} strokeWidth={2.4} />
            HALAMAN / KEAHLIAN & TEKNOLOGI
          </div>
          <h1 className="page-header__title">
            Teknologi, Alat, & <span>Disiplin Rekayasa</span>
          </h1>
          <p className="page-header__desc">
            Daftar lengkap kemampuan teknis yang saya kuasai, mulai dari arsitektur backend, basis data, antarmuka
            pengguna reaktif, hingga peralatan otomasi dan pengujian sistem.
          </p>
        </div>
      </header>

      <Skills />

      <section className="page-cta-banner">
        <div className="page-cta-banner__shell">
          <div className="page-cta-banner__box">
            <div className="page-cta-banner__content">
              <h3>Ingin Melihat Implementasi Nyata dari Keahlian Ini?</h3>
              <p>
                Kunjungi halaman portofolio proyek untuk melihat bagaimana teknologi di atas diaplikasikan pada sistem nyata.
              </p>
            </div>
            <Link to="/projects" className="page-cta-banner__action">
              <span>Jelajahi Proyek</span>
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
