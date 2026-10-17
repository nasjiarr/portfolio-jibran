import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import About from '../components/About';
import '../styles/pages.css';

export default function AboutPage() {
  return (
    <div className="page-wrapper" style={{ paddingBottom: 0 }}>
      <About />

      <section className="page-cta-banner">
        <div className="page-cta-banner__shell">
          <div className="page-cta-banner__box">
            <div className="page-cta-banner__content">
              <h3>Ingin Melihat Portofolio Proyek?</h3>
              <p>
                Jelajahi karya dan aplikasi web nyata yang telah saya bangun.
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
