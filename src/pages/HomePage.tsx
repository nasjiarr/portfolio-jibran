import { Link } from 'react-router-dom';
import { User, Code2, FolderGit2, Briefcase, Mail, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import '../styles/pages.css';

const sectionsOverview = [
  {
    title: 'Tentang & Filosofi',
    description: 'Latar belakang pendidikan S1 Sistem Informasi, mindset problem-first, dan metodologi perancangan aplikasi.',
    icon: User,
    to: '/about',
    ctaText: 'Pelajari Profil',
  },
  {
    title: 'Keahlian & Teknologi',
    description: 'Penguasaan stack Laravel, PHP, MySQL, Vue/Inertia, React, Docker, dan standar rekayasa software teruji.',
    icon: Code2,
    to: '/skills',
    ctaText: 'Lihat Keahlian',
  },
  {
    title: 'Portofolio Proyek',
    description: 'Eksplorasi sistem reservasi ruangan, sistem pelaporan fasilitas FRC, dan digitalisasi arsip perbankan.',
    icon: FolderGit2,
    to: '/projects',
    ctaText: 'Jelajahi Proyek',
  },
  {
    title: 'Pengalaman & Pendidikan',
    description: 'Rekam jejak magang IT di PT. BPR Bank Kulon Progo dan capaian akademik IPK 3.56 di UPN "Veteran" Yogyakarta.',
    icon: Briefcase,
    to: '/experience',
    ctaText: 'Lihat Riwayat',
  },
  {
    title: 'Hubungi & Kolaborasi',
    description: 'Formulir pesan interaktif, kontak email langsung, serta tautan ke profil GitHub dan LinkedIn profesional.',
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
                Saya terbuka untuk peluang kerja sama software engineering, pengembangan sistem informasi web,
                maupun posisi profesional full-time dan kontrak.
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
