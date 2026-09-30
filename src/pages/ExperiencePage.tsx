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
            RIWAYAT
          </div>
          <h1 className="page-header__title">
            Pengalaman & <span>Pendidikan</span>
          </h1>
          <p className="page-header__desc">
            Riwayat kerja magang di IT perbankan dan jenjang pendidikan formal.
          </p>
        </div>
      </header>

      <Experience />

      <section className="page-cta-banner">
        <div className="page-cta-banner__shell">
          <div className="page-cta-banner__box">
            <div className="page-cta-banner__content">
              <h3>Tertarik Merekrut atau Berkolaborasi?</h3>
              <p>
                Silakan hubungi untuk wawancara kerja maupun konsultasi teknis proyek.
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
