import { useState } from 'react';
import { Mail, MapPin, FileText, ArrowRight, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './Icons';
import '../styles/contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/mgavdbzl', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Pesan dari Portfolio',
          message: formData.message,
          _subject: `[Portfolio] ${formData.subject || 'Pesan Baru'} dari ${formData.name}`,
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
          setErrorMessage('Gagal mengirim pesan. Silakan coba lagi.');
        }
        setStatus('error');
      }
    } catch {
      setErrorMessage('Terjadi kendala jaringan. Silakan hubungi nasywanji@gmail.com');
      setStatus('error');
    }
  };

  return (
    <section id="kontak" className="contact-section">
      <div className="contact-shell">
        <div className="contact-grid">
          {/* Kolom Kiri: Informasi Kontak Langsung */}
          <div className="contact-left">
            <span className="contact-eyebrow">KONTAK</span>
            <h2 className="contact-title">Hubungi Saya</h2>
            <p className="contact-desc">
              Punya pertanyaan, tawaran proyek, atau sekadar ingin berdiskusi? 
              Silakan isi formulir atau hubungi saya langsung melalui kontak di bawah ini.
            </p>

            <div className="contact-list">
              <a href="mailto:nasywanji@gmail.com" className="contact-item">
                <div className="contact-icon">
                  <Mail size={18} />
                </div>
                <div className="contact-info">
                  <span className="contact-label">Email</span>
                  <p className="contact-value">nasywanji@gmail.com</p>
                </div>
              </a>

              <div className="contact-item">
                <div className="contact-icon">
                  <MapPin size={18} />
                </div>
                <div className="contact-info">
                  <span className="contact-label">Lokasi</span>
                  <p className="contact-value">Kulon Progo, D.I. Yogyakarta</p>
                </div>
              </div>

              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
              >
                <div className="contact-icon">
                  <FileText size={18} />
                </div>
                <div className="contact-info">
                  <span className="contact-label">Resume / CV</span>
                  <p className="contact-value">Unduh CV (PDF) ↗</p>
                </div>
              </a>
            </div>

            <div className="contact-socials">
              <a
                href="https://github.com/nasjiarr"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-btn"
                aria-label="GitHub"
                title="GitHub"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/nasywan-jibran-aryadi-7547a8214/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-btn"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
              <a
                href="https://wa.me/6289653404050"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-btn"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <WhatsAppIcon size={18} />
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Form Bersih & Simpel */}
          <div className="contact-right">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name">Nama Lengkap</label>
                <input
                  id="contact-name"
                  type="text"
                  placeholder="Nama Anda"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Alamat Email</label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="email@contoh.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-subject">Subjek (Opsional)</label>
                <input
                  id="contact-subject"
                  type="text"
                  placeholder="Subjek pesan"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Pesan</label>
                <textarea
                  id="contact-message"
                  placeholder="Tulis pesan Anda di sini..."
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {status === 'success' && (
                <div className="contact-alert contact-alert--success">
                  <CheckCircle2 size={18} />
                  <span>Pesan berhasil dikirim! Terima kasih, saya akan segera membalasnya.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="contact-alert contact-alert--error">
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                className="contact-submit-btn"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={16} className="contact-spinner" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <span>Kirim Pesan</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
