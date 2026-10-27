import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Download } from 'lucide-react';
import '../styles/navbar.css';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/about' },
  { label: 'Proyek', href: '/projects' },
  { label: 'Riwayat', href: '/experience' },
  { label: 'Kontak', href: '/contact' },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={`dt-navbar ${scrolled ? 'dt-navbar--scrolled' : ''}`}
      >
        <div className="dt-navbar__inner">
          <Link to="/" className="dt-navbar__brand">
            <span className="dt-navbar__logo-box">
              <img src="/logo.png?v=3" alt="Logo Nasywan" className="dt-navbar__logo-img" />
            </span>
            <span className="dt-navbar__brand-text">
              <strong>nasywan</strong>.dev
            </span>
          </Link>

          <nav className="dt-navbar__nav" aria-label="Menu Utama">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                className={({ isActive }) =>
                  `dt-navbar__nav-link ${isActive ? 'is-active' : ''}`
                }
                end={item.href === '/'}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="dt-navbar__actions">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="dt-navbar__btn-outline"
              title="Unduh CV (PDF)"
            >
              <Download size={15} strokeWidth={2.2} />
              <span>CV</span>
            </a>
          </div>

          <div className="dt-navbar__mobile-right">
            <button
              type="button"
              className="dt-navbar__menu-btn"
              onClick={() => setDrawerOpen(!drawerOpen)}
              aria-label={drawerOpen ? 'Tutup Menu' : 'Buka Menu'}
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`dt-drawer__overlay ${drawerOpen ? 'is-open' : ''}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside className={`dt-drawer ${drawerOpen ? 'is-open' : ''}`}>
        <div className="dt-drawer__head">
          <div className="dt-navbar__brand">
            <span className="dt-navbar__logo-box">
              <img src="/logo.png?v=3" alt="Logo Nasywan" className="dt-navbar__logo-img" />
            </span>
            <span className="dt-navbar__brand-text">
              <strong>nasywan</strong>.dev
            </span>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Tutup Menu"
            className="dt-drawer__close"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="dt-drawer__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              className={({ isActive }) =>
                `dt-drawer__link ${isActive ? 'is-active' : ''}`
              }
              end={item.href === '/'}
              onClick={() => setDrawerOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="dt-drawer__actions">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="dt-navbar__btn-outline w-full"
            onClick={() => setDrawerOpen(false)}
          >
            <Download size={16} />
            <span>Unduh CV (PDF)</span>
          </a>
          <Link
            to="/contact"
            className="dt-navbar__btn-primary w-full"
            onClick={() => setDrawerOpen(false)}
          >
            <span>Hubungi Saya</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </aside>
    </>
  );
}
