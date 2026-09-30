import { Link } from 'react-router-dom';
import { ArrowRight, User } from 'lucide-react';
import About from '../components/About';
import Methodology from '../components/Methodology';
import '../styles/pages.css';

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="page-header__shell">
          <div className="page-header__eyebrow">
            <User size={14} strokeWidth={2.4} />
            HALAMAN / TENTANG SAYA
          </div>
          <h1 className="page-header__title">
            Profil, Filosofi, & <span>Latar Belakang</span>
          </h1>
          <p className="page-header__desc">
            Mengenal lebih dekat Nasywan Jibran Aryadi — cara berpikir, pendekatan rekayasa sistem, dan prinsip
            profesional dalam membangun produk perangkat lunak.
          </p>
        </div>
      </header>

      <About />

      {/* Structured DealTech Methodology Section */}
      <Methodology />

      <section className="page-cta-banner">
        <div className="page-cta-banner__shell">
          <div className="page-cta-banner__box">
            <div className="page-cta-banner__content">
              <h3>Ingin Mengetahui Keahlian Teknis Saya?</h3>
              <p>
                Lihat rincian teknologi dan peralatan yang biasa saya gunakan dalam membangun sistem web.
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
