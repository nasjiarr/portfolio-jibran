import { useState, useEffect, useRef } from 'react';
import { Mail, MapPin, FileText, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import '../styles/contact.css';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/mgavdbzl', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Inquiry dari Portfolio',
          message: formData.message,
          _subject: `[Portfolio Inquiry] ${formData.subject || 'Pesan Baru'} dari ${formData.name}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json().catch(() => null);
        if (data && data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors.map((err: { message: string }) => err.message).join(', '));
        } else {
          setErrorMessage('Gagal mengirim pesan. Silakan coba lagi atau hubungi via email langsung.');
        }
        setStatus('error');
      }
    } catch {
      setErrorMessage('Terjadi kendala jaringan saat mengirim. Silakan kirim langsung ke nasywanji@gmail.com');
      setStatus('error');
    }
  };

  return (
    <section ref={sectionRef} id="kontak" className="contact-section">
      <div className="contact-section__shell">
        <div className="contact-grid">
          {/* Left Column */}
          <div className="contact-left contact-v1__reveal contact-v1__hidden">
            <span className="contact-eyebrow">✦ GET IN TOUCH</span>
            <h2 className="contact-title">
              Let's build<br />
              something great<br />
              together <span className="sparkle">✦</span>
            </h2>
            <p className="contact-desc">
              Punya project atau ide yang ingin diwujudkan? Jangan ragu untuk menghubungi saya.
              Saya siap membantu mewujudkan website dan aplikasi impian kamu!
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <Mail size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>nasywanji@gmail.com</p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-detail-icon">
                  <MapPin size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Kulon Progo, D.I. Yogyakarta, Indonesia</p>
                </div>
              </div>

              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-detail-item contact-detail-link"
              >
                <div className="contact-detail-icon">
                  <FileText size={18} strokeWidth={2.2} />
                </div>
                <div>
                  <h4>Curriculum Vitae</h4>
                  <p>Unduh Resume (PDF) ↗</p>
                </div>
              </a>
            </div>

            <div className="social-row">
              <a
                href="https://github.com/nasjiarr"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle"
                aria-label="GitHub"
                title="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/nasywan-jibran-aryadi-7547a8214/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-circle"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="mailto:nasywanji@gmail.com"
                className="social-circle"
                aria-label="Email"
                title="Email Langsung"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <form className="contact-form contact-v1__reveal contact-v1__hidden" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="form-group">
              <textarea
                placeholder="Tell me about your project..."
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="btn-send"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={17} className="spinner" />
                  <span>Mengirim...</span>
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle2 size={17} />
                  <span>Pesan Terkirim!</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <ArrowRight size={17} strokeWidth={2.4} />
                </>
              )}
            </button>

            {status === 'success' && (
              <div className="form-status">
                <CheckCircle2 size={16} />
                <span>Terima kasih! Pesan Anda telah berhasil dikirim dan akan segera saya balas.</span>
              </div>
            )}

            {status === 'error' && (
              <div className="form-status form-status--error">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
