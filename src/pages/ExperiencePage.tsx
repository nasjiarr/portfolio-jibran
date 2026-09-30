import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Experience from '../components/Experience';
import '../styles/pages.css';

export default function ExperiencePage() {
  return (
    <div className="page-wrapper" style={{ paddingBottom: 0 }}>
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
