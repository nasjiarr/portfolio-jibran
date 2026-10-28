import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AmbientGlow from './AmbientGlow';
import FloatingParticlesBackground from './FloatingParticlesBackground';
import FluidTypography from './FluidTypography';
import TerminalConsole from './TerminalConsole';
import '../styles/hero.css';

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
    <section ref={heroRef} id="home" className="hero-main">
        {/* Ambient Aurora Glow & Mesh Gradient Background (Linear & Vercel Aesthetic) */}
        <AmbientGlow />

        {/* Floating Dust / Stardust Particles Background (Framer Module) */}
        <FloatingParticlesBackground
          particleCount={65}
          particleSize={2.6}
          particleOpacity={0.72}
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
            {/* Left Column: Profile Photo Card (Gaya Pop-out / 3D Silhouette Bento) */}
            <div className="hero-main__left hero-main__reveal hero-main__hidden">
              <div className="hero-main__popout-wrapper">
                {/* Ambient backlighting aura */}
                <div className="hero-main__popout-glow" aria-hidden="true"></div>

                {/* The Bento Architectural Backdrop Card */}
                <div className="hero-main__popout-card">
                  <div className="hero-main__popout-arch" aria-hidden="true"></div>
                  <div className="hero-main__popout-grid-lines" aria-hidden="true"></div>
                </div>

                {/* The 3D Pop-Out Cutout Figure (Head breaks top boundary) */}
                <div className="hero-main__popout-figure">
                  <img
                    src="/images/profile-transparent-800.webp"
                    alt="Nasywan Jibran Aryadi"
                    className="hero-main__popout-img"
                    width={420}
                    height={420}
                    loading="eager"
                  />
                </div>

                {/* Anchored Status Pill */}
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
  );
}
