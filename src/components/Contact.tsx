import { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, MessageCircle, Send, FileText, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import '../styles/contact.css';

const services = [
  'Fullstack Web App',
  'Backend & REST API',
  'Pengembangan Laravel',
  'UI Implementation',
  'Database Design',
  'Peluang Karir / Rekrutmen',
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Fullstack Web App',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('contact-v1__visible');
            entry.target.classList.remove('contact-v1__hidden');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    section.querySelectorAll('.contact-v1__reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.service} - dari ${formData.name}`);
    const body = encodeURIComponent(
      `Halo Nasywan,\n\nNama: ${formData.name}\nEmail: ${formData.email}\nTopik: ${formData.service}\n\nPesan:\n${formData.message}\n`
    );
    window.location.href = `mailto:nasywanji@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} id="kontak" className="contact-v1">
      <div className="contact-v1__shell">
        <header className="contact-v1__header contact-v1__reveal contact-v1__hidden">
          <div className="contact-v1__eyebrow">
            <MessageCircle size={15} strokeWidth={2.4} aria-hidden="true" />
            CONTACT / HUBUNGI SAYA
          </div>
          <h2 className="contact-v1__heading">
            Mari Berkolaborasi &{' '}
            <span className="contact-v1__heading-accent">Membangun Solusi</span>
          </h2>
          <p className="contact-v1__description">
            Punya ide proyek, kebutuhan sistem informasi, atau ingin mendiskusikan peluang karir?
            Kirimkan pesan langsung atau hubungi melalui kontak berikut.
          </p>
        </header>

        <div className="contact-v1__panel contact-v1__reveal contact-v1__hidden">
          <form className="contact-v1__form" onSubmit={handleSubmit}>
            <div className="contact-v1__field-row">
              <label className="contact-v1__field">
                <span>Nama Lengkap *</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Budi Santoso"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </label>
              <label className="contact-v1__field">
                <span>Alamat Email *</span>
                <input
                  type="email"
                  required
                  placeholder="budi@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </label>
            </div>

            <fieldset className="contact-v1__services">
              <legend>Topik / Bidang Kebutuhan</legend>
              <div className="contact-v1__options">
                {services.map((item) => (
                  <label key={item} className="contact-v1__radio-label">
                    <input
                      type="radio"
                      name="service"
                      value={item}
                      checked={formData.service === item}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="contact-v1__field">
              <span>Isi Pesan *</span>
              <textarea
                required
                rows={4}
                placeholder="Ceritakan detail proyek atau kebutuhan Anda..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </label>

            <button type="submit" className="contact-v1__submit">
              <span>Kirim Pesan via Email</span>
              <Send size={16} strokeWidth={2.2} />
            </button>

            {submitted && (
              <div className="contact-v1__success">
                <CheckCircle size={16} />
                <span>Klien email Anda telah dibuka. Jika tidak muncul, kirim langsung ke nasywanji@gmail.com</span>
              </div>
            )}
          </form>

          <aside className="contact-v1__details">
            <div className="contact-v1__detail">
              <span className="contact-v1__icon">
                <Mail size={19} strokeWidth={2} />
              </span>
              <div>
                <h3>Surat Elektronik</h3>
                <p>Kirimkan pesan langsung ke email pribadi saya:</p>
                <a href="mailto:nasywanji@gmail.com">nasywanji@gmail.com</a>
              </div>
            </div>

            <div className="contact-v1__detail">
              <span className="contact-v1__icon">
                <MapPin size={19} strokeWidth={2} />
              </span>
              <div>
                <h3>Domisili</h3>
                <p>Berbasis di Kulon Progo, D.I. Yogyakarta</p>
                <span>Indonesia (WIB / UTC+7)</span>
              </div>
            </div>

            <div className="contact-v1__detail">
              <span className="contact-v1__icon">
                <GithubIcon size={19} />
              </span>
              <div>
                <h3>GitHub</h3>
                <p>Lihat kode sumber dan riwayat kontribusi:</p>
                <a href="https://github.com/nasjiarr" target="_blank" rel="noopener noreferrer">
                  github.com/nasjiarr
                </a>
              </div>
            </div>

            <div className="contact-v1__detail">
              <span className="contact-v1__icon">
                <LinkedinIcon size={19} />
              </span>
              <div>
                <h3>LinkedIn</h3>
                <p>Koneksi profesional dan riwayat karir:</p>
                <a
                  href="https://www.linkedin.com/in/nasywan-jibran-aryadi-7547a8214/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nasywan Jibran Aryadi
                </a>
              </div>
            </div>

            <div className="contact-v1__detail">
              <span className="contact-v1__icon">
                <FileText size={19} strokeWidth={2} />
              </span>
              <div>
                <h3>Curriculum Vitae</h3>
                <p>Dokumen resume resmi dalam format PDF:</p>
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                  Unduh CV (PDF) ↗
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
