import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import '../styles/footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-v1">
      <div className="footer-v1__shell">
        <div className="footer-v1__top">
          <div className="footer-v1__brand">
            <Link to="/" className="footer-v1__logo">nasywan.dev</Link>
            <p className="footer-v1__tagline">
              Software Engineer & Web Developer berbasis di D.I. Yogyakarta. Mengembangkan solusi web
              presisi, terukur, dan berpusat pada nilai guna.
            </p>
          </div>

          <div className="footer-v1__nav">
            <div className="footer-v1__links-group">
              <span className="footer-v1__group-title">Navigasi Halaman</span>
              <Link to="/">Beranda</Link>
              <Link to="/about">Tentang</Link>
              <Link to="/skills">Keahlian</Link>
              <Link to="/projects">Proyek</Link>
              <Link to="/experience">Riwayat</Link>
              <Link to="/contact">Kontak</Link>
            </div>

            <div className="footer-v1__links-group">
              <span className="footer-v1__group-title">Tautan</span>
              <a href="https://github.com/nasjiarr" target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/nasywan-jibran-aryadi-7547a8214/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                Curriculum Vitae ↗
              </a>
              <a href="mailto:nasywanji@gmail.com">Email Pribadi ↗</a>
            </div>
          </div>
        </div>

        <div className="footer-v1__bottom">
          <div className="footer-v1__copyright">
            <p>
              &copy; {new Date().getFullYear()} <strong>Nasywan Jibran Aryadi</strong>. All Rights Reserved.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="footer-v1__back-top"
            aria-label="Kembali ke atas"
          >
            <span>Kembali ke atas</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
