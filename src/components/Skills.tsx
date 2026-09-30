import { useEffect, useRef, useState } from 'react';
import {
  Code2,
  Terminal,
  Cpu,
  Layers,
  Database,
  Globe,
  GitBranch,
  Box,
  Send,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import '../styles/skills.css';

interface CodingSkill {
  name: string;
  percent: number;
  highlight?: boolean;
}

interface ToolItem {
  name: string;
  category: string;
  icon: typeof Terminal;
  badge?: string;
}

const codingSkills: CodingSkill[] = [
  { name: 'PHP & Laravel', percent: 90, highlight: true },
  { name: 'MySQL & Database Relasional', percent: 88, highlight: true },
  { name: 'JavaScript (ES6+)', percent: 85 },
  { name: 'Tailwind CSS & Responsive UI', percent: 90 },
  { name: 'Vue.js & Inertia.js', percent: 82 },
  { name: 'HTML5 & Semantic CSS', percent: 92 },
  { name: 'RESTful API & Backend Architecture', percent: 86 },
  { name: 'React & TypeScript', percent: 80 },
];

const softwareTools: ToolItem[] = [
  { name: 'VS Code', category: 'Code Editor', icon: Terminal },
  { name: 'Git & GitHub', category: 'Version Control', icon: GitBranch },
  { name: 'Laragon Server', category: 'Local Stack (Apache/Nginx)', icon: Globe },
  { name: 'Docker', category: 'Containerization', icon: Box },
  { name: 'Postman', category: 'API Testing & Docs', icon: Send },
  { name: 'MySQL Workbench', category: 'Database Management', icon: Database },
  { name: 'Vite & Composer', category: 'Build & Package Manager', icon: Layers },
  { name: 'Linux Terminal', category: 'Shell & Server Admin', icon: Cpu },
];

const softSkills = [
  '#ProblemSolving',
  '#AnalyticalThinking',
  '#DetailOriented',
  '#CleanArchitecture',
  '#TeamCollaboration',
  '#Adaptability',
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('skills-v1__visible');
            entry.target.classList.remove('skills-v1__hidden');
            setInView(true);
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
            TECHNICAL SKILLS
          </div>
          <h2 className="skills-v1__heading">
            Technical Skills &{' '}
            <span className="skills-v1__heading-accent">Kompetensi</span>
          </h2>
          <p className="skills-v1__description">
            Tools dan teknologi yang saya kuasai untuk pengembangan perangkat lunak:
          </p>
        </header>

        <div className="skills-grid skills-v1__reveal skills-v1__hidden">
          {/* Software & Tools Column */}
          <div className="skills-col">
            <div className="skills-col__head">
              <span className="skills-col__icon">
                <Wrench size={19} strokeWidth={2.2} />
              </span>
              <h3>Software & Tools</h3>
            </div>

            <div className="tools-grid">
              {softwareTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <div key={tool.name} className="tool-card">
                    <div className="tool-card__icon-box">
                      <Icon size={18} strokeWidth={2.2} />
                    </div>
                    <div className="tool-card__info">
                      <span className="tool-card__name">{tool.name}</span>
                      <span className="tool-card__desc">{tool.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Soft Skills Tags */}
            <div className="soft-skills-box">
              <h4 className="soft-skills-title">
                <CheckCircle2 size={15} className="text-primary" />
                <span>Core Competencies & Soft Skills</span>
              </h4>
              <div className="soft-skills-tags">
                {softSkills.map((tag) => (
                  <span key={tag} className="soft-skill-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Coding Skills Progress Bars Column */}
          <div className="skills-col">
            <div className="skills-col__head">
              <span className="skills-col__icon">
                <Code2 size={19} strokeWidth={2.2} />
              </span>
              <h3>Coding Skills</h3>
            </div>

            <div className="coding-list">
              {codingSkills.map((skill) => (
                <div key={skill.name} className="coding-item">
                  <div className="coding-header">
                    <span className="coding-label">
                      {skill.name}
                      {skill.highlight && <span className="coding-badge">Fokus Utama</span>}
                    </span>
                    <span className="coding-percent">{skill.percent}%</span>
                  </div>
                  <div className="coding-bar-track">
                    <div
                      className={`coding-bar-fill ${skill.highlight ? 'coding-bar-fill--accent' : ''}`}
                      style={{
                        width: inView ? `${skill.percent}%` : '0%',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
