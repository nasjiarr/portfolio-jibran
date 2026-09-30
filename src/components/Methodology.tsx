import { useEffect, useRef } from 'react';
import {
  FileSearch,
  Database,
  ShieldCheck,
  CheckCircle2,
  Languages,
  Clock,
  Sparkles,
} from 'lucide-react';
import '../styles/methodology.css';

interface Step {
  step: string;
  title: string;
  icon: typeof FileSearch;
  description: string;
  points: string[];
}

const steps: Step[] = [
  {
    step: 'TAHAP 01 / ANALISIS',
    title: 'Analisis Kebutuhan & Proses Bisnis',
    icon: FileSearch,
    description:
      'Membedah alur operasional nyata sebelum menyentuh baris kode. Memastikan setiap rute, peran pengguna, dan proses memiliki tujuan fungsional yang terukur.',
    points: [
      'Identifikasi stakeholder dan matriks hak akses',
      'Pemetaan workflow data dari input hingga laporan',
      'Eliminasi fitur redundan (YAGNI & Lean principle)',
    ],
  },
  {
    step: 'TAHAP 02 / ARSITEKTUR DATA',
    title: 'Desain Basis Data & Normalisasi',
    icon: Database,
    description:
      'Merancang skema database relasional yang bersih, konsisten, dan siap menangani pertumbuhan volume data tanpa mengorbankan integritas.',
    points: [
      'Normalisasi tabel hingga 3NF mencegah duplikasi',
      'Integritas referensial foreign key & constraint',
      'Penerapan transaksi ACID untuk alur finansial/stok',
    ],
  },
  {
    step: 'TAHAP 03 / IMPLEMENTASI',
    title: 'Arsitektur Bersih & Validasi Berlapis',
    icon: ShieldCheck,
    description:
      'Membangun sistem dengan struktur kode modular, separation of concerns (MVC), serta perlindungan keamanan pada setiap titik kontak input.',
    points: [
      'Validasi form request ketat dan sanitasi input',
      'Otorisasi peran berbasis RBAC (Role-Based Access)',
      'Komponen UI modular yang responsif dan reusable',
    ],
  },
  {
    step: 'TAHAP 04 / JAMINAN KUALITAS',
    title: 'Pengujian, Dokumentasi, & Standar',
    icon: CheckCircle2,
    description:
      'Memastikan aplikasi dapat diandalkan saat beroperasi penuh dan mudah dirawat atau dikembangkan kembali oleh pengembang lain di masa depan.',
    points: [
      'Automated testing (Pest/PHPUnit) pada alur kritis',
      'Struktur repositori git dan commit yang teratur',
      'Pemanfaatan Docker untuk keseragaman environment',
    ],
  },
];

export default function Methodology() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('methodology-v1__visible');
            entry.target.classList.remove('methodology-v1__hidden');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    section.querySelectorAll('.methodology-v1__reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="methodology-v1">
      <div className="methodology-v1__shell">
        <header className="methodology-v1__header methodology-v1__reveal methodology-v1__hidden">
          <div className="methodology-v1__eyebrow">
            <Sparkles size={15} strokeWidth={2.4} aria-hidden="true" />
            METHODOLOGY / STANDAR REKAYASA
          </div>
          <h2 className="methodology-v1__heading">
            Metodologi Kerja &{' '}
            <span className="methodology-v1__heading-accent">Standar Pengembangan</span>
          </h2>
          <p className="methodology-v1__description">
            Bagi saya, kualitas software tidak hanya diukur dari tampilan akhirnya, melainkan dari seberapa
            andal logika bisnis di belakangnya, keamanan data pengguna, dan kemudahan pemeliharaannya.
          </p>
        </header>

        <div className="methodology-v1__grid methodology-v1__reveal methodology-v1__hidden">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="methodology-v1__card">
                <div className="methodology-v1__card-top">
                  <span className="methodology-v1__step-badge">{item.step}</span>
                  <div className="methodology-v1__icon">
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                </div>

                <h3 className="methodology-v1__title">{item.title}</h3>
                <p className="methodology-v1__text">{item.description}</p>

                <ul className="methodology-v1__points">
                  {item.points.map((pt) => (
                    <li key={pt}>
                      <span className="methodology-v1__bullet">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* Secondary Info Highlights */}
        <div className="methodology-v1__highlights methodology-v1__reveal methodology-v1__hidden">
          <div className="methodology-v1__highlight-card">
            <div className="methodology-v1__highlight-icon">
              <Languages size={22} strokeWidth={2.2} />
            </div>
            <div>
              <h4>Bahasa & Komunikasi Teknis</h4>
              <p>
                <strong>Bahasa Indonesia</strong> (Fasih / Native) & <strong>Bahasa Inggris</strong> (Kemampuan membaca, menelaah dokumentasi teknis, dan komunikasi tertulis secara lancar).
              </p>
            </div>
          </div>

          <div className="methodology-v1__highlight-card">
            <div className="methodology-v1__highlight-icon">
              <Clock size={22} strokeWidth={2.2} />
            </div>
            <div>
              <h4>Ketersediaan & Fleksibilitas</h4>
              <p>
                Siap berkontribusi untuk posisi <strong>Full-time</strong>, <strong>Kontrak</strong>, maupun proyek kolaborasi sistem informasi web di wilayah D.I. Yogyakarta maupun <strong>Remote</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
