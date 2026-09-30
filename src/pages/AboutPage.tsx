import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import About from '../components/About';
import Methodology from '../components/Methodology';
import '../styles/pages.css';

export default function AboutPage() {
  return (
    <div className="page-wrapper" style={{ paddingBottom: 0 }}>
      <About />
      <Methodology />

      <section className="page-cta-banner">
        <div className="page-cta-banner__shell">
          <div className="page-cta-banner__box">
            <div className="page-cta-banner__content">
              <h3>Ingin Melihat Keahlian Teknis?</h3>
              <p>
                Pelajari rincian teknologi dan tools yang saya kuasai.
              </p>
            </div>
            <Link to="/skills" className="page-cta-banner__action">
              <span>Lihat Keahlian</span>
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
