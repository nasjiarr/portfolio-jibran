import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Projects from '../components/Projects';
import '../styles/pages.css';

export default function ProjectsPage() {
  return (
    <div className="page-wrapper" style={{ paddingBottom: 0 }}>
      <Projects />

      <section className="page-cta-banner">
        <div className="page-cta-banner__shell">
          <div className="page-cta-banner__box">
            <div className="page-cta-banner__content">
              <h3>Ingin Membahas Proyek Baru?</h3>
              <p>
                Saya siap mendiskusikan kebutuhan arsitektur sistem dan aplikasi web Anda.
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
