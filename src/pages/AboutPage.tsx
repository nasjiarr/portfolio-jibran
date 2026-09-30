import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, User } from 'lucide-react';
import About from '../components/About';
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

      {/* Extra Depth Section */}
      <section className="about-v1" style={{ background: '#ffffff', borderTop: 'none' }}>
        <div className="about-v1__shell">
          <div className="about-v1__content">
            <h2 className="about-v1__title" style={{ fontSize: '1.45rem' }}>
              Metodologi Kerja & Standar Pengembangan
            </h2>
            <div className="about-v1__narrative" style={{ marginTop: '14px' }}>
              <p>
                Bagi saya, kualitas software tidak hanya diukur dari tampilan akhirnya, melainkan dari seberapa
                andal logika bisnis di belakangnya dan seberapa mudah sistem tersebut dipelihara.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '8px 0', display: 'grid', gap: '10px' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--dt-muted)' }}>
                  <CheckCircle2 size={16} color="var(--dt-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Analisis Proses Bisnis:</strong> Memastikan setiap entitas data dan rute memiliki tujuan fungsional yang jelas.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--dt-muted)' }}>
                  <CheckCircle2 size={16} color="var(--dt-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Desain Basis Data Relasional:</strong> Menghindari redundansi melalui normalisasi, integritas foreign key, dan indeks yang tepat.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--dt-muted)' }}>
                  <CheckCircle2 size={16} color="var(--dt-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span><strong>Keamanan & Validasi Berlapis:</strong> Penerapan form request validation, sanitasi input, middleware otorisasi, dan proteksi CSRF.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="about-v1__cards">
            <div className="about-v1__card">
              <h3>Bahasa & Komunikasi</h3>
              <p>
                Bahasa Indonesia (Native/Fasih) & Bahasa Inggris (Kemampuan baca/tulis dokumentasi teknis yang lancar).
              </p>
            </div>
            <div className="about-v1__card">
              <h3>Ketersediaan</h3>
              <p>
                Tersedia untuk kerja penuh waktu (Full-time), kontrak, maupun proyek berbasis kolaborasi di D.I. Yogyakarta maupun Remote.
              </p>
            </div>
          </div>
        </div>
      </section>

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
