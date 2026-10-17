import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AmbientGlow from './AmbientGlow';
import FloatingParticlesBackground from './FloatingParticlesBackground';
import FluidTypography from './FluidTypography';
import TerminalConsole from './TerminalConsole';
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

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

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
        {/* Ambient Aurora Glow & Mesh Gradient Background (Linear & Vercel Aesthetic) */}
        <AmbientGlow />

        {/* Floating Dust / Stardust Particles Background (Framer Module) */}
        <FloatingParticlesBackground
          particleCount={60}
          particleSize={2.4}
          particleOpacity={0.65}
          glowIntensity={12}
          glowAnimation="spring"
          movementSpeed={0.5}
          mouseInfluence={135}
          mouseGravity="attract"
          gravityStrength={60}
          particleInteraction={true}
          interactionType="bounce"
        />

        {/* Decorative Stars */}
        <span className="hero-main__star hero-main__star--1" aria-hidden="true">✦</span>
        <span className="hero-main__star hero-main__star--2" aria-hidden="true">✦</span>

        <div className="hero-main__shell">
          <div className="hero-main__grid">
            {/* Left Column: Profile Photo Card */}
            <div className="hero-main__left hero-main__reveal hero-main__hidden">
              <div className="hero-main__image-wrapper">
                <div className="hero-main__image-glow" aria-hidden="true"></div>
                <div className="hero-main__image-frame" aria-hidden="true"></div>
                <img
                  src="/images/profile-800.webp"
                  alt="Nasywan Jibran Aryadi"
                  className="hero-main__img"
                  width={420}
                  height={420}
                  loading="eager"
                />
                <div className="hero-main__photo-badge">
                  <span className="hero-main__badge-dot"></span>
                  <span>Terbuka untuk Kolaborasi & Kerja</span>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Name, Typing Effect, Socials, CTA */}
            <div className="hero-main__right hero-main__reveal hero-main__hidden">
              <div className="hero-main__eyebrow">
                <span className="hero-main__dot"></span>
                <span>A Computer Enthusiast</span>
              </div>

              <div className="hero-main__heading-group">
                <FluidTypography
                  text="PORTFOLIO"
                  as="span"
                  className="hero-main__title-portfolio"
                  influenceRadius={140}
                  maxLift={14}
                  maxScale={0.18}
                />
                <FluidTypography
                  text="NASYWAN JIBRAN ARYADI"
                  as="h1"
                  className="hero-main__name"
                  influenceRadius={150}
                  maxLift={11}
                  maxScale={0.15}
                />
              </div>

              <div className="hero-main__bio">
                <p className="hero-main__role">
                  Fullstack Developer • S1 Sistem Informasi UPN "Veteran" Yogyakarta • 2022-2026
                </p>

                {/* Sleek macOS Terminal Console Box */}
                <TerminalConsole />
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
