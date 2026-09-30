import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, GraduationCap, CheckCircle2, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import '../styles/hero.css';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hero-v2__visible');
            entry.target.classList.remove('hero-v2__hidden');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    section.querySelectorAll('.hero-v2__reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="hero-v2">
      <div className="hero-v2__shell">
        <div className="hero-v2__content">
          <div className="hero-v2__eyebrow hero-v2__reveal hero-v2__hidden">
            <span className="hero-v2__status-dot"></span>
            A Computer Enthusiast
          </div>

          <p className="hero-v2__description hero-v2__reveal hero-v2__hidden">
            Software Engineer & Web Developer (S1 Sistem Informasi, IPK 3.56). Fokus pada pengembangan aplikasi web berbasis <strong>Laravel</strong>, <strong>PHP</strong>, <strong>MySQL</strong>, dan <strong>Vue/React</strong>.
          </p>

          <div className="hero-v2__actions hero-v2__reveal hero-v2__hidden">
            <Link className="hero-v2__button hero-v2__button--primary" to="/projects">
              <span>Jelajahi Proyek</span>
              <ArrowRight size={17} strokeWidth={2.2} />
            </Link>
            <Link className="hero-v2__button hero-v2__button--secondary" to="/contact">
              <span>Hubungi Saya</span>
            </Link>
          </div>

          <div className="hero-v2__trust hero-v2__reveal hero-v2__hidden">
            <div className="hero-v2__trust-item">
              <GraduationCap size={16} strokeWidth={2.2} className="text-primary" />
              <span>S1 Sistem Informasi (IPK 3.56)</span>
            </div>
            <div className="hero-v2__trust-item">
              <CheckCircle2 size={16} strokeWidth={2.2} className="text-primary" />
              <span>Fullstack Web Developer</span>
            </div>
            <div className="hero-v2__trust-item">
              <MapPin size={16} strokeWidth={2.2} className="text-primary" />
              <span>Kulon Progo, D.I. Yogyakarta</span>
            </div>
          </div>
        </div>

        <div className="hero-v2__visual hero-v2__reveal hero-v2__hidden">
          <div className="hero-v2__profile-card">
            <div className="hero-v2__avatar-wrapper">
              <img
                src="/images/profile-800.webp"
                alt="Nasywan Jibran Aryadi"
                className="hero-v2__avatar-img"
                width={400}
                height={400}
                loading="eager"
              />
              <div className="hero-v2__avatar-badge">
                <span className="hero-v2__pulse"></span>
                <span>Open for Work</span>
              </div>
            </div>

            <div className="hero-v2__card-info">
              <h1 className="hero-v2__name">Nasywan Jibran Aryadi</h1>
              <p className="hero-v2__role">Software Engineer & Web Developer</p>
              
              <div className="hero-v2__tags">
                <span className="hero-v2__tag">Laravel</span>
                <span className="hero-v2__tag">PHP</span>
                <span className="hero-v2__tag">MySQL</span>
                <span className="hero-v2__tag">Vue 3</span>
                <span className="hero-v2__tag">Tailwind</span>
                <span className="hero-v2__tag">React</span>
              </div>

              <div className="hero-v2__socials">
                <a
                  href="https://github.com/nasjiarr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hero-v2__social-link"
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/nasywan-jibran-aryadi-7547a8214/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hero-v2__social-link"
                >
                  <LinkedinIcon size={16} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:nasywanji@gmail.com"
                  aria-label="Email"
                  className="hero-v2__social-link"
                >
                  <Mail size={16} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
