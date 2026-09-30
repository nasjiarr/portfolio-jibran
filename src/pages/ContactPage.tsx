import { Mail } from 'lucide-react';
import Contact from '../components/Contact';
import '../styles/pages.css';

export default function ContactPage() {
  return (
    <div className="page-wrapper">
      <header className="page-header">
        <div className="page-header__shell">
          <div className="page-header__eyebrow">
            <Mail size={14} strokeWidth={2.4} />
            HALAMAN / HUBUNGI SAYA
          </div>
          <h1 className="page-header__title">
            Mari Berdiskusi & <span>Mulai Kolaborasi</span>
          </h1>
          <p className="page-header__desc">
            Silakan kirimkan pesan melalui formulir di bawah ini atau hubungi langsung melalui email dan kanal
            media sosial saya. Saya akan merespons secepat mungkin.
          </p>
        </div>
      </header>

      <Contact />
    </div>
  );
}
