import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Target, Layers, ShieldCheck, FileText, ArrowRight, User } from 'lucide-react';
import '../styles/about.css';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about-v1__visible');
            entry.target.classList.remove('about-v1__hidden');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    section.querySelectorAll('.about-v1__reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="tentang" className="about-v1">
      <div className="about-v1__shell">
        <div className="about-v1__content">
          <div className="about-v1__eyebrow about-v1__reveal about-v1__hidden">
            <User size={15} strokeWidth={2.4} aria-hidden="true" />
            TENTANG SAYA
          </div>

          <h2 className="about-v1__title about-v1__reveal about-v1__hidden">
            Ringkasan Profil &{' '}
            <span className="about-v1__title-accent">Latar Belakang</span> <span className="sparkle">✦</span>
          </h2>

          <div className="about-v1__narrative about-v1__reveal about-v1__hidden">
            <p>
              Saya merupakan lulusan S1 Sistem Informasi yang memiliki minat pada pengembangan website dan teknologi informasi. Saya mempelajari pengembangan web secara full stack menggunakan Laravel, PHP, MySQL, Blade, Tailwind CSS, dan JavaScript, serta memiliki pemahaman dasar mengenai jaringan komputer.
            </p>
            <p>
              Dalam bekerja, saya terbiasa memahami kebutuhan terlebih dahulu, mengembangkan solusi secara bertahap, dan memastikan hasilnya dapat digunakan dengan baik. Saya mampu bekerja secara mandiri maupun dalam tim serta memiliki semangat untuk terus belajar dan mengembangkan kemampuan di bidang teknologi.
            </p>
          </div>

          <div className="about-v1__actions about-v1__reveal about-v1__hidden">
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="about-v1__button about-v1__button--primary"
            >
              <FileText size={16} strokeWidth={2.2} />
              <span>Unduh CV (PDF)</span>
            </a>
            <Link to="/skills" className="about-v1__button about-v1__button--secondary">
              <span>Lihat Keahlian</span>
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>
          </div>
        </div>

        <div className="about-v1__cards about-v1__reveal about-v1__hidden">
          <div className="about-v1__card">
            <div className="about-v1__card-icon">
              <Target size={22} strokeWidth={2.2} />
            </div>
            <h3>Fokus Solusi Nyata</h3>
            <p>
              Mengutamakan efisiensi alur kerja operasional pengguna di atas penulisan kode berlebih.
            </p>
          </div>

          <div className="about-v1__card">
            <div className="about-v1__card-icon">
              <Layers size={22} strokeWidth={2.2} />
            </div>
            <h3>Struktur Terstandar</h3>
            <p>
              Arsitektur MVC rapi, relasi basis data ternormalisasi, dan validasi data berlapis.
            </p>
          </div>

          <div className="about-v1__card">
            <div className="about-v1__card-icon">
              <ShieldCheck size={22} strokeWidth={2.2} />
            </div>
            <h3>Disiplin Rekayasa</h3>
            <p>
              Version control git konsisten, automated testing, dan containerization via Docker.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
