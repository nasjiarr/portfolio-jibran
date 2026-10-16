import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import '../styles/pages.css';

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />

      <section className="page-cta-banner">
        <div className="page-cta-banner__shell">
          <div className="page-cta-banner__box">
            <div className="page-cta-banner__content">
              <h3>Tertarik Berdiskusi atau Berkolaborasi?</h3>
              <p>
                Terbuka untuk posisi full-time, kontrak, dan proyek pengembangan sistem web.
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
