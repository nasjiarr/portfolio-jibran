import { useEffect, useRef } from 'react';
import {
  Server,
  Database,
  Layout,
  Cpu,
  Radio,
  ShieldCheck,
  Code2,
} from 'lucide-react';
import '../styles/skills.css';

interface SkillCategory {
  title: string;
  icon: typeof Server;
  description: string;
  items: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Backend Engineering',
    icon: Server,
    description: 'Arsitektur server-side tangguh dengan performa dan struktur terstandar.',
    items: ['Laravel (MVC)', 'PHP 8+', 'RESTful API', 'Eloquent ORM', 'RBAC & Middleware', 'Authentication'],
  },
  {
    title: 'Database & Data Storage',
    icon: Database,
    description: 'Perancangan basis data relasional yang efisien, konsisten, dan terstruktur.',
    items: ['MySQL & MariaDB', 'Database Schema & ERD', 'Indexing & Queries', 'ACID Transactions', 'Data Export / Import'],
  },
  {
    title: 'Frontend & UI Engineering',
    icon: Layout,
    description: 'Antarmuka responsif, modern, dan interaktif dengan pengalaman pengguna optimal.',
    items: ['Blade Components', 'Inertia.js', 'Vue 3 & Svelte', 'React & TypeScript', 'Tailwind CSS', 'Responsive Layout'],
  },
  {
    title: 'DevOps & Development Tools',
    icon: Cpu,
    description: 'Lingkungan pengembangan dan versioning kolaboratif yang teratur.',
    items: ['Git & GitHub', 'Docker Containers', 'Laragon Local Server', 'Composer & NPM', 'Vite Bundler', 'Linux Shell'],
  },
  {
    title: 'Integrations & Real-Time',
    icon: Radio,
    description: 'Penyambungan layanan eksternal, visualisasi, dan komunikasi real-time.',
    items: ['WebSocket (Reverb)', 'Chart.js Visuals', 'PhpSpreadsheet / Excel', 'PDF Generation', 'QR Code Engine'],
  },
  {
    title: 'Engineering Practices',
    icon: ShieldCheck,
    description: 'Standar kualitas kode tinggi untuk kemudahan pemeliharaan jangka panjang.',
    items: ['Clean Code Principles', 'Automated Testing (Pest)', 'Security Best Practices', 'API Documentation', 'Version Control'],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('skills-v1__visible');
            entry.target.classList.remove('skills-v1__hidden');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    section.querySelectorAll('.skills-v1__reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="keahlian" className="skills-v1">
      <div className="skills-v1__shell">
        <header className="skills-v1__header skills-v1__reveal skills-v1__hidden">
          <div className="skills-v1__eyebrow">
            <Code2 size={15} strokeWidth={2.4} aria-hidden="true" />
            SKILLS / KOMPETENSI
          </div>
          <h2 className="skills-v1__heading">
            Keahlian & Disiplin{' '}
            <span className="skills-v1__heading-accent">Teknologi Modern</span>
          </h2>
          <p className="skills-v1__description">
            Peralatan, kerangka kerja, dan standar rekayasa perangkat lunak yang saya terapkan dalam setiap
            tahap siklus pengembangan aplikasi.
          </p>
        </header>

        <div className="skills-v1__grid skills-v1__reveal skills-v1__hidden">
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <article key={cat.title} className="skills-v1__card">
                <div className="skills-v1__card-head">
                  <span className="skills-v1__icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={2.2} />
                  </span>
                  <h3 className="skills-v1__card-title">{cat.title}</h3>
                </div>
                <p className="skills-v1__card-desc">{cat.description}</p>
                <div className="skills-v1__tags">
                  {cat.items.map((item) => (
                    <span key={item} className="skills-v1__tag">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
