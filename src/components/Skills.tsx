import { useEffect, useRef } from 'react';
import { Code2, Database, Layout, Terminal, Server } from 'lucide-react';
import {
  LaravelIcon,
  PhpIcon,
  MysqlIcon,
  VueIcon,
  ReactIcon,
  TailwindIcon,
  JavascriptIcon,
  DockerIcon,
  GitIcon,
  PostmanIcon,
  FigmaIcon,
  TerminalIcon,
} from './Icons';
import '../styles/skills.css';

interface SkillItem {
  name: string;
  role: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: string;
}

interface SkillGroup {
  id: string;
  title: string;
  badge?: string;
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  items: SkillItem[];
}

const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    title: 'Backend & Database',
    badge: 'Fokus Utama',
    icon: Database,
    items: [
      { name: 'Laravel', role: 'PHP MVC Framework', icon: LaravelIcon, accentColor: '#FF2D20' },
      { name: 'PHP 8+', role: 'Server Language & OOP', icon: PhpIcon, accentColor: '#777BB4' },
      { name: 'MySQL', role: 'Relational Database', icon: MysqlIcon, accentColor: '#00758F' },
      { name: 'RESTful API', role: 'Web Architecture & JSON', icon: Server, accentColor: '#0284c7' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend & UI',
    badge: 'Reaktif & Modern',
    icon: Layout,
    items: [
      { name: 'Vue.js 3', role: 'Reactive SPA Framework', icon: VueIcon, accentColor: '#41B883' },
      { name: 'Tailwind CSS', role: 'Utility-First Styling', icon: TailwindIcon, accentColor: '#38BDF8' },
      { name: 'JavaScript', role: 'Modern ES6+ Syntax', icon: JavascriptIcon, accentColor: '#F7DF1E' },
      { name: 'React', role: 'Component UI Library', icon: ReactIcon, accentColor: '#61DAFB' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & DevOps',
    badge: 'Workflow Disiplin',
    icon: Terminal,
    items: [
      { name: 'Git & GitHub', role: 'Version Control & Collab', icon: GitIcon, accentColor: '#F05032' },
      { name: 'Docker', role: 'Containerization Basics', icon: DockerIcon, accentColor: '#2496ED' },
      { name: 'Postman', role: 'API Testing & Endpoint Docs', icon: PostmanIcon, accentColor: '#FF6C37' },
      { name: 'Linux / CLI', role: 'Terminal & Command Line', icon: TerminalIcon, accentColor: '#4EAA25' },
      { name: 'Figma', role: 'UI/UX Design Translation', icon: FigmaIcon, accentColor: '#A259FF' },
    ],
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    section.querySelectorAll('.skills-v1__reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="keahlian" className="skills-v1">
      <div className="skills-v1__shell">
        {/* Header Section */}
        <header className="skills-v1__header skills-v1__reveal skills-v1__hidden">
          <div className="skills-v1__eyebrow">
            <Code2 size={15} strokeWidth={2.4} aria-hidden="true" />
            KEAHLIAN & TEKNOLOGI
          </div>
          <h2 className="skills-v1__heading">
            Stack Teknologi &{' '}
            <span className="skills-v1__heading-accent">Kompetensi</span> <span className="sparkle">✦</span>
          </h2>
          <p className="skills-v1__description">
            Alat, bahasa, dan ekosistem modern yang saya gunakan untuk merancang dan membangun sistem web fungsional yang andal:
          </p>
        </header>

        {/* 3 Clean Categorized Bento Panels */}
        <div className="skills-v1__groups skills-v1__reveal skills-v1__hidden">
          {skillGroups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div key={group.id} className="skills-group">
                <div className="skills-group__top">
                  <div className="skills-group__title-row">
                    <span className="skills-group__icon">
                      <GroupIcon size={18} strokeWidth={2.2} />
                    </span>
                    <h3 className="skills-group__title">{group.title}</h3>
                  </div>
                  {group.badge && (
                    <span
                      className={`skills-group__badge ${
                        group.id === 'backend' ? 'skills-group__badge--highlight' : ''
                      }`}
                    >
                      {group.badge}
                    </span>
                  )}
                </div>

                <div className="skills-group__items">
                  {group.items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={item.name} className="skills-pill">
                        <div
                          className="skills-pill__icon"
                          style={{ borderColor: item.accentColor }}
                        >
                          <ItemIcon size={20} />
                        </div>
                        <div className="skills-pill__content">
                          <span className="skills-pill__name">{item.name}</span>
                          <span className="skills-pill__role">{item.role}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
