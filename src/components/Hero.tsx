import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import '../styles/hero.css';

const marqueeItems = [
  'Web Development',
  'Laravel & PHP',
  'MySQL Database',
  'RESTful API',
  'Vue.js & Inertia',
  'Tailwind CSS',
  'Docker & Git',
  'Full Stack Development',
];

const typingWords = [
  'web developer',
  'app developer',
  'problem solver',
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation
  useEffect(() => {
    const currentWord = typingWords[wordIndex];
    let timer: number;

    if (!isDeleting && displayText === currentWord) {
      timer = window.setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % typingWords.length);
      timer = window.setTimeout(() => {}, 400);
    } else {
      const nextLength = isDeleting ? displayText.length - 1 : displayText.length + 1;
      const speed = isDeleting ? 40 : 80;
      timer = window.setTimeout(() => {
        setDisplayText(currentWord.slice(0, nextLength));
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  // Reveal animation
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('hero-main__visible');
            entry.target.classList.remove('hero-main__hidden');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    hero.querySelectorAll('.hero-main__reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section ref={heroRef} id="home" className="hero-main">
        {/* Repeating Giant Background Text */}
        <div className="hero-main__bg-text" aria-hidden="true">
          <div className="hero-main__bg-line">PORTFOLIO</div>
          <div className="hero-main__bg-line">PORTFOLIO</div>
          <div className="hero-main__bg-line">PORTFOLIO</div>
          <div className="hero-main__bg-line">PORTFOLIO</div>
        </div>

        {/* Decorative Stars */}
        <span className="hero-main__star hero-main__star--1" aria-hidden="true">✦</span>
        <span className="hero-main__star hero-main__star--2" aria-hidden="true">✦</span>

        <div className="hero-main__shell">
          <div className="hero-main__grid">
            {/* Left Column: Image Wrapper + Quote Box */}
            <div className="hero-main__left hero-main__reveal hero-main__hidden">
              <div className="hero-main__image-wrapper">
                <div className="hero-main__image-frame" aria-hidden="true"></div>
                <img
                  src="/images/profile-800.webp"
                  alt="Nasywan Jibran Aryadi"
                  className="hero-main__img"
                  width={420}
                  height={420}
                  loading="eager"
                />
                <div className="hero-main__quote">
                  "I love building things that live on the internet. I approach problems in a rational, pragmatic way and build functional, clean, and reliable web applications."
                </div>
              </div>
            </div>

            {/* Right Column: Title, Name, Typing Effect, Socials, CTA */}
            <div className="hero-main__right hero-main__reveal hero-main__hidden">
              <div className="hero-main__eyebrow">
                <span className="hero-main__dot"></span>
                <span>A Computer Enthusiast</span>
              </div>

              <h1 className="hero-main__title">
                <span className="hero-main__title-main">PORTFOLIO</span>
              </h1>

              <div className="hero-main__bio">
                <h2 className="hero-main__name">Nasywan Jibran Aryadi</h2>
                <p className="hero-main__role">
                  Web Developer • S1 Sistem Informasi UPN "Veteran" Yogyakarta • 2022-2026
                </p>

                {/* Terminal Typing Console Box */}
                <div className="hero-main__typing-box" aria-live="polite">
                  <span className="hero-main__typing-prefix">&gt; </span>
                  <span className="hero-main__typing-text">{displayText}</span>
                  <span className="hero-main__typing-cursor"></span>
                </div>
              </div>

              <div className="hero-main__socials">
                <a
                  href="https://github.com/nasjiarr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-main__social-link"
                >
                  <span className="hero-main__social-tag">GH</span>
                  <span className="hero-main__social-text">nasjiarr</span>
                  <ExternalLink size={13} className="hero-main__social-icon" />
                </a>

                <a
                  href="https://www.linkedin.com/in/nasywan-jibran-aryadi-7547a8214/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-main__social-link"
                >
                  <span className="hero-main__social-tag">LI</span>
                  <span className="hero-main__social-text">Nasywan Jibran Aryadi</span>
                  <ExternalLink size={13} className="hero-main__social-icon" />
                </a>

                <a
                  href="mailto:nasywanji@gmail.com"
                  className="hero-main__social-link"
                >
                  <span className="hero-main__social-tag">EM</span>
                  <span className="hero-main__social-text">nasywanji@gmail.com</span>
                </a>

                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-main__social-link"
                >
                  <span className="hero-main__social-tag">CV</span>
                  <span className="hero-main__social-text">Curriculum Vitae (PDF)</span>
                  <ExternalLink size={13} className="hero-main__social-icon" />
                </a>
              </div>

              <div className="hero-main__actions">
                <Link to="/projects" className="hero-main__btn hero-main__btn--primary">
                  <span>Jelajahi Proyek</span>
                  <ArrowRight size={16} strokeWidth={2.2} />
                </Link>
                <Link to="/contact" className="hero-main__btn hero-main__btn--secondary">
                  <span>Hubungi Saya</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker Section */}
      <div className="marquee-section" aria-label="Keahlian Utama">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="marquee-item">
              <span className="marquee-dot">✦</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
