import { useEffect, useRef, useState } from 'react';
import { Code2, Wrench, CheckCircle2 } from 'lucide-react';
import '../styles/skills.css';

interface CodingSkill {
  name: string;
  percent: number;
  highlight?: boolean;
}

interface ToolBox {
  name: string;
  abbr: string;
  colorClass: string;
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

const toolBoxes: ToolBox[] = [
  { name: 'VS Code', abbr: 'VS', colorClass: 'tool-box--dark' },
  { name: 'Docker', abbr: '🐳', colorClass: 'tool-box--blue' },
  { name: 'Figma', abbr: 'Fi', colorClass: 'tool-box--purple' },
  { name: 'Postman', abbr: 'Pm', colorClass: 'tool-box--orange' },
  { name: 'Git', abbr: 'Git', colorClass: 'tool-box--green' },
  { name: 'Vercel', abbr: '▲', colorClass: 'tool-box--cyan' },
];

const toolTags = [
  'VS Code',
  'Docker',
  'Figma',
  'Postman',
  'Git & GitHub',
  'Vercel',
  'Firebase',
  'Linux Terminal',
];

const softSkills = [
  '#Creativity',
  '#Communication',
  '#Detail-oriented',
  '#Adaptability',
  '#Problem Solving',
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

            <div className="tool-boxes-grid">
              {toolBoxes.map((tool) => (
                <div
                  key={tool.name}
                  className={`tool-icon-box ${tool.colorClass}`}
                  title={tool.name}
                >
                  {tool.abbr}
                </div>
              ))}
            </div>

            <div className="tool-tags-cloud">
              {toolTags.map((tag) => (
                <span key={tag} className="tool-tag-item">
                  {tag}
                </span>
              ))}
            </div>

            {/* Soft Skills Tags */}
            <div className="soft-skills-box">
              <h4 className="soft-skills-title">
                <CheckCircle2 size={15} className="text-primary" />
                <span>Soft Skills</span>
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
