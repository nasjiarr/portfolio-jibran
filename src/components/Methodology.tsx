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
  points: string[];
}

const steps: Step[] = [
  {
    step: '01 / ANALISIS',
    title: 'Proses Bisnis & Kebutuhan',
    icon: FileSearch,
    points: [
      'Pemetaan alur kerja dan entitas sistem',
      'Matriks hak akses dan otorisasi peran (RBAC)',
      'Eliminasi dependensi atau fitur yang tidak perlu',
    ],
  },
  {
    step: '02 / BASIS DATA',
    title: 'Desain Relasional & Normalisasi',
    icon: Database,
    points: [
      'Normalisasi skema tabel relasional (3NF)',
      'Integritas data dengan foreign key dan indexing',
      'Pencegahan inkonsistensi via transaksi ACID',
    ],
  },
  {
    step: '03 / IMPLEMENTASI',
    title: 'Arsitektur Bersih & Keamanan',
    icon: ShieldCheck,
    points: [
      'Pemisahan logika controller, model, dan view (MVC)',
      'Validasi form request ketat dan sanitasi input',
      'Komponen UI modular, responsif, dan konsisten',
    ],
  },
  {
    step: '04 / PENGUJIAN',
    title: 'Jaminan Kualitas & Deployment',
    icon: CheckCircle2,
    points: [
      'Automated testing (Pest/PHPUnit) pada alur utama',
      'Disiplin commit Git dan dokumentasi ringkas',
      'Environment konsisten dengan Docker',
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
            STANDAR PENGEMBANGAN
          </div>
          <h2 className="methodology-v1__heading">
            Prinsip &{' '}
            <span className="methodology-v1__heading-accent">Metodologi Kerja</span>
          </h2>
          <p className="methodology-v1__description">
            Poin inti standar rekayasa perangkat lunak yang saya terapkan di setiap tahap:
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

        <div className="methodology-v1__highlights methodology-v1__reveal methodology-v1__hidden">
          <div className="methodology-v1__highlight-card">
            <div className="methodology-v1__highlight-icon">
              <Languages size={22} strokeWidth={2.2} />
            </div>
            <div>
              <h4>Bahasa & Komunikasi</h4>
              <p>
                <strong>Indonesia</strong> (Fasih) & <strong>Inggris</strong> (Dokumentasi teknis & komunikasi tertulis).
              </p>
            </div>
          </div>

          <div className="methodology-v1__highlight-card">
            <div className="methodology-v1__highlight-icon">
              <Clock size={22} strokeWidth={2.2} />
            </div>
            <div>
              <h4>Ketersediaan</h4>
              <p>
                Terbuka untuk posisi <strong>Full-time</strong>, <strong>Kontrak</strong>, maupun <strong>Remote</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
