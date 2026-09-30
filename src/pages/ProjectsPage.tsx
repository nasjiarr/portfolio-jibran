import { Link } from 'react-router-dom';
import { ArrowRight, FolderGit2 } from 'lucide-react';
import Projects from '../components/Projects';
import '../styles/pages.css';

export default function ProjectsPage() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="page-header__shell">
          <div className="page-header__eyebrow">
            <FolderGit2 size={14} strokeWidth={2.4} />
            HALAMAN / PORTOFOLIO PROYEK
          </div>
          <h1 className="page-header__title">
            Karya Terpilih & <span>Aplikasi yang Dibangun</span>
          </h1>
          <p className="page-header__desc">
            Sistem aplikasi fungsional yang telah saya bangun secara mandiri maupun tim, mencakup arsitektur
            backend Laravel, integrasi database, antarmuka interaktif, dan penanganan alur bisnis kompleks.
          </p>
        </div>
      </header>

      <Projects />

      <section className="page-cta-banner">
        <div className="page-cta-banner__shell">
          <div className="page-cta-banner__box">
            <div className="page-cta-banner__content">
              <h3>Ingin Membahas Proyek Tertentu atau Berkolaborasi?</h3>
              <p>
                Saya siap mendiskusikan kebutuhan arsitektur sistem, rancangan basis data, maupun pengembangan web dari awal.
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
