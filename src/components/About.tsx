import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Target, Layers, Rocket, FileText, ArrowRight, BookOpen } from 'lucide-react';
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
            <BookOpen size={15} strokeWidth={2.4} aria-hidden="true" />
            ABOUT / TENTANG SAYA
          </div>

          <h2 className="about-v1__title about-v1__reveal about-v1__hidden">
            Memahami Kebutuhan Nyata,{' '}
            <span className="about-v1__title-accent">Membangun Solusi Tepat</span>
          </h2>

          <div className="about-v1__narrative about-v1__reveal about-v1__hidden">
            <p>
              Saya merupakan sarjana <strong>Sistem Informasi</strong> dari{' '}
              <strong>UPN "Veteran" Yogyakarta</strong> (IPK 3.56/4.00) dengan ketertarikan kuat pada
              rekayasa perangkat lunak, sistem basis data, dan pengembangan aplikasi web modern.
            </p>
            <p>
              Dalam setiap proyek, saya menerapkan pendekatan analitis: membedah kebutuhan pengguna dan
              alur sistem secara menyeluruh, merancang skema data yang efisien, lalu mengimplementasikan
              solusi berbasis teknologi yang teruji seperti <strong>Laravel</strong>, <strong>PHP</strong>,{' '}
              <strong>MySQL</strong>, <strong>Vue/Inertia</strong>, dan <strong>Tailwind CSS</strong>.
            </p>
            <p>
              Saya memiliki pengalaman langsung mengembangkan sistem arsip digital pada industri perbankan
              (PT. BPR Bank Kulon Progo), sistem pelaporan fasilitas berskala multi-role, hingga sistem reservasi
              real-time berbasis WebSocket.
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
              <span>Unduh CV Lengkap</span>
            </a>
            <Link to="/skills" className="about-v1__button about-v1__button--secondary">
              <span>Eksplorasi Keahlian</span>
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>
          </div>
        </div>

        <div className="about-v1__cards about-v1__reveal about-v1__hidden">
          <div className="about-v1__card">
            <div className="about-v1__card-icon">
              <Target size={22} strokeWidth={2.2} />
            </div>
            <h3>Problem-First Mindset</h3>
            <p>
              Fokus utama selalu pada penyelesaian masalah operasional dan efisiensi pengguna, bukan sekadar menulis kode.
            </p>
          </div>

          <div className="about-v1__card">
            <div className="about-v1__card-icon">
              <Layers size={22} strokeWidth={2.2} />
            </div>
            <h3>Struktur Bersih & Teruji</h3>
            <p>
              Menerapkan pola MVC yang rapi, normalisasi skema basis data, pemisahan tanggung jawab komponen, dan penanganan keamanan.
            </p>
          </div>

          <div className="about-v1__card">
            <div className="about-v1__card-icon">
              <Rocket size={22} strokeWidth={2.2} />
            </div>
            <h3>Cepat Beradaptasi</h3>
            <p>
              Siap mempelajari dan mengintegrasikan pustaka baru, API pihak ketiga, hingga otomasi deployment dan Docker.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
