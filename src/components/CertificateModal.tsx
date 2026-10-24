import { useEffect } from 'react';
import { X, Download } from 'lucide-react';
import '../styles/certificate-modal.css';

export interface CertificateData {
  title: string;
  subtitle?: string;
  imageUrl: string;
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificateData | null;
}

export default function CertificateModal({
  isOpen,
  onClose,
  certificate,
}: CertificateModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Keyboard navigation (Escape to close)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !certificate) return null;

  return (
    <div
      className="dt-cert-modal"
      role="dialog"
      aria-modal="true"
      aria-label={certificate.title}
    >
      {/* Backdrop */}
      <div
        className="dt-cert-modal__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Modal Window */}
      <div className="dt-cert-modal__window" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="dt-cert-modal__header">
          <div className="dt-cert-modal__title-box">
            <h3 className="dt-cert-modal__title">{certificate.title}</h3>
            {certificate.subtitle && (
              <span className="dt-cert-modal__sub">{certificate.subtitle}</span>
            )}
          </div>

          <button
            type="button"
            className="dt-cert-modal__close-btn"
            onClick={onClose}
            aria-label="Tutup sertifikat"
            title="Tutup (Esc)"
          >
            <X size={18} strokeWidth={2.4} />
          </button>
        </header>

        {/* Certificate Display Area */}
        <div className="dt-cert-modal__body">
          <div className="dt-cert-modal__frame">
            <img
              src={certificate.imageUrl}
              alt={certificate.title}
              className="dt-cert-modal__image"
              loading="eager"
            />
          </div>
        </div>

        {/* Simple Footer Actions */}
        <footer className="dt-cert-modal__footer">
          <a
            href={certificate.imageUrl}
            download="Sertifikat-Magang-Nasywan-Jibran.jpg"
            className="dt-cert-modal__btn dt-cert-modal__btn--primary"
          >
            <Download size={15} strokeWidth={2.2} />
            <span>Unduh Sertifikat</span>
          </a>
          <button
            type="button"
            className="dt-cert-modal__btn dt-cert-modal__btn--close"
            onClick={onClose}
          >
            <span>Tutup</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
