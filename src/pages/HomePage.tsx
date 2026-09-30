import { Link } from 'react-router-dom';
import { User, Code2, FolderGit2, Briefcase, Mail, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import '../styles/pages.css';

const sectionsOverview = [
  {
    title: 'Tentang',
    description: 'Profil, filosofi rekayasa, dan pendekatan penyelesaian masalah.',
    icon: User,
    to: '/about',
    ctaText: 'Buka Profil',
  },
  {
    title: 'Keahlian',
    description: 'Stack backend Laravel, database MySQL, frontend, dan tooling.',
    icon: Code2,
    to: '/skills',
    ctaText: 'Buka Keahlian',
  },
  {
    title: 'Proyek',
    description: 'Sistem reservasi ruangan, pelaporan FRC, dan sistem arsip dokumen.',
    icon: FolderGit2,
    to: '/projects',
    ctaText: 'Buka Proyek',
  },
  {
    title: 'Riwayat',
    description: 'Pengalaman magang IT di perbankan dan riwayat akademik S1 Sistem Informasi.',
    icon: Briefcase,
    to: '/experience',
    ctaText: 'Buka Riwayat',
  },
  {
    title: 'Kontak',
    description: 'Kirim pesan via form email langsung atau terhubung di media sosial.',
    icon: Mail,
    to: '/contact',
    ctaText: 'Kirim Pesan',
  },
];

export default function HomePage() {
  return (
    <div className="home-page">
      <Hero />

      <section className="home-teasers">
        <div className="home-teasers__shell">
          <div className="home-teasers__grid">
            {sectionsOverview.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="home-teaser-card">
                  <div className="home-teaser-card__icon">
                    <Icon size={22} strokeWidth={2.2} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link to={item.to} className="home-teaser-card__link">
                    <span>{item.ctaText}</span>
                    <ArrowRight size={15} strokeWidth={2.2} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
