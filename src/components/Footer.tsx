import { Link } from 'react-router-dom';
import { ArrowUp, Mail, FileText, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './Icons';
import '../styles/footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const waUrl =
    'https://wa.me/6289653404050?text=' +
    encodeURIComponent('Halo Nasywan, saya tertarik untuk berdiskusi mengenai proyek / peluang kerja sama.');

  return (
    <footer className="footer-v3" role="contentinfo">
      <div className="footer-v3__shell">
        {/* Micro-Dock Island */}
        <div className="footer-v3__dock" aria-label="Footer micro-dock">
          {/* Identity */}
          <div className="footer-v3__identity">
            <Link to="/" className="footer-v3__brand-link" aria-label="Ke beranda nasywan.dev">
              <span className="footer-v3__avatar">
                <img src="/logo.png?v=3" alt="Logo" className="footer-v3__avatar-img" />
              </span>
              <span className="footer-v3__brand-name">nasywan.dev</span>
            </Link>
          </div>

          <div className="footer-v3__sep" aria-hidden="true" />

          {/* Quick Nav Items */}
          <nav className="footer-v3__nav" aria-label="Navigasi cepat dock">
            <Link to="/" className="footer-v3__nav-btn">Beranda</Link>
            <Link to="/about" className="footer-v3__nav-btn">Tentang</Link>
            <Link to="/projects" className="footer-v3__nav-btn">Proyek</Link>
            <Link to="/experience" className="footer-v3__nav-btn">Riwayat</Link>
            <Link to="/contact" className="footer-v3__nav-btn">Kontak</Link>
          </nav>

          <div className="footer-v3__sep" aria-hidden="true" />

          {/* Social Channels */}
          <div className="footer-v3__social" aria-label="Tautan media sosial">
            <a
              href="https://github.com/nasjiarr"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-v3__icon-btn"
              aria-label="GitHub @nasjiarr"
              title="GitHub"
            >
              <GithubIcon size={15} />
            </a>

            <a
              href="https://www.linkedin.com/in/nasywan-jibran-aryadi-7547a8214/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-v3__icon-btn"
              aria-label="LinkedIn Nasywan"
              title="LinkedIn"
            >
              <LinkedinIcon size={15} />
            </a>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-v3__icon-btn"
              aria-label="WhatsApp Nasywan"
              title="WhatsApp"
            >
              <WhatsAppIcon size={15} />
            </a>

            <a
              href="mailto:nasywanji@gmail.com"
              className="footer-v3__icon-btn"
              aria-label="Email Nasywan"
              title="Email"
            >
              <Mail size={15} />
            </a>

            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-v3__cv-btn"
              aria-label="Unduh Resume PDF"
              title="Resume (PDF)"
            >
              <FileText size={13} />
              <span>CV</span>
              <ExternalLink size={10} className="footer-v3__cv-arrow" />
            </a>
          </div>

          <div className="footer-v3__sep" aria-hidden="true" />

          {/* Smooth Scroll-to-Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="footer-v3__top-btn"
            aria-label="Kembali ke atas"
            title="Ke atas"
          >
            <ArrowUp size={14} strokeWidth={2.4} />
          </button>
        </div>

        {/* Minimalist Baseline Copyright & Tag */}
        <div className="footer-v3__baseline">
          <p className="footer-v3__copyright">
            &copy; {new Date().getFullYear()} <strong>Nasywan Jibran Aryadi</strong>
          </p>
          <span className="footer-v3__dot" aria-hidden="true">•</span>
          <span className="footer-v3__location">Kulon Progo, D.I. Yogyakarta</span>
          <span className="footer-v3__dot" aria-hidden="true">•</span>
          <span className="footer-v3__rights">All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}
