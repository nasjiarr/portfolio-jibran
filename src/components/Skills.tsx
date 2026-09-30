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
    description: 'Arsitektur MVC, RESTful API, dan sistem otentikasi/otorisasi.',
    items: ['Laravel', 'PHP 8+', 'RESTful API', 'Eloquent ORM', 'RBAC & Middleware', 'Authentication'],
  },
  {
    title: 'Database & Data Storage',
    icon: Database,
    description: 'Perancangan skema relasional, normalisasi 3NF, dan indexing.',
    items: ['MySQL', 'MariaDB', 'Schema ERD', 'Indexing & Queries', 'ACID Transactions', 'Data Export / Import'],
  },
  {
    title: 'Frontend & UI',
    icon: Layout,
    description: 'Antarmuka reaktif, terstruktur, responsif, dan mobile-first.',
    items: ['Blade', 'Inertia.js', 'Vue 3', 'React & TypeScript', 'Tailwind CSS', 'Responsive Layout'],
  },
  {
    title: 'DevOps & Tooling',
    icon: Cpu,
    description: 'Alur kerja version control dan containerization.',
    items: ['Git & GitHub', 'Docker Containers', 'Laragon Local Server', 'Composer & NPM', 'Vite', 'Linux Shell'],
  },
  {
    title: 'Integrasi & Real-Time',
    icon: Radio,
    description: 'Koneksi data real-time, laporan file, dan visualisasi.',
    items: ['WebSocket (Reverb)', 'Chart.js', 'PhpSpreadsheet / Excel', 'PDF Generation', 'QR Code Engine'],
  },
  {
    title: 'Standar Kualitas',
    icon: ShieldCheck,
    description: 'Pengujian otomatis dan sanitasi keamanan data.',
    items: ['Automated Testing (Pest)', 'Security Best Practices', 'Clean Code', 'API Documentation'],
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
            KOMPETENSI TEKNIS
          </div>
          <h2 className="skills-v1__heading">
            Keahlian &{' '}
            <span className="skills-v1__heading-accent">Teknologi</span>
          </h2>
          <p className="skills-v1__description">
            Peralatan dan teknologi yang saya gunakan dalam pengembangan perangkat lunak:
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
