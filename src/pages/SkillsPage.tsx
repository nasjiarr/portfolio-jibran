import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Skills from '../components/Skills';
import '../styles/pages.css';

export default function SkillsPage() {
  return (
    <div className="page-wrapper" style={{ paddingBottom: 0 }}>
      <Skills />

      <section className="page-cta-banner">
        <div className="page-cta-banner__shell">
          <div className="page-cta-banner__box">
            <div className="page-cta-banner__content">
              <h3>Lihat Implementasi Nyata</h3>
              <p>
                Kunjungi halaman proyek untuk melihat hasil penerapan teknologi di atas.
              </p>
            </div>
            <Link to="/projects" className="page-cta-banner__action">
              <span>Buka Halaman Proyek</span>
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
