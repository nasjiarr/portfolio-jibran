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
            HUBUNGI SAYA
          </div>
          <h1 className="page-header__title">
            Kontak & <span>Kolaborasi</span>
          </h1>
          <p className="page-header__desc">
            Kirim pesan langsung melalui form email atau tautan media sosial berikut.
          </p>
        </div>
      </header>

      <Contact />
    </div>
  );
}
