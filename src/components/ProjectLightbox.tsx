import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Images, Sparkles } from 'lucide-react';
import '../styles/lightbox.css';

export interface ProjectScreenshot {
  url: string;
  title: string;
  description?: string;
}

interface ProjectLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  screenshots: ProjectScreenshot[];
  initialIndex?: number;
}

export default function ProjectLightbox({
  isOpen,
  onClose,
  projectTitle,
  screenshots,
  initialIndex = 0,
}: ProjectLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Sync initialIndex when lightbox opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
  }, [screenshots.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0));
  }, [screenshots.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen || !screenshots.length) return null;

  const currentItem = screenshots[currentIndex] || screenshots[0];
  const hasMultiple = screenshots.length > 1;

  return (
    <div
      className="dt-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Galeri tangkapan layar untuk ${projectTitle}`}
    >
      {/* Backdrop */}
      <div className="dt-lightbox__backdrop" onClick={onClose} aria-hidden="true" />

      {/* Main Container */}
      <div className="dt-lightbox__container">
        {/* Header Bar */}
        <header className="dt-lightbox__header">
          <div className="dt-lightbox__title-meta">
            <span className="dt-lightbox__project-badge">
              <Sparkles size={13} className="dt-lightbox__sparkle" />
              {projectTitle}
            </span>
            <span className="dt-lightbox__counter">
              <Images size={14} />
              <span>{currentIndex + 1} / {screenshots.length}</span>
            </span>
          </div>

          <button
            type="button"
            className="dt-lightbox__close-btn"
            onClick={onClose}
            aria-label="Tutup galeri"
            title="Tutup (Esc)"
          >
            <X size={20} strokeWidth={2.4} />
          </button>
        </header>

        {/* Viewport & Navigation */}
        <div className="dt-lightbox__viewport">
          {hasMultiple && (
            <button
              type="button"
              className="dt-lightbox__nav-btn dt-lightbox__nav-btn--prev"
              onClick={handlePrev}
              aria-label="Screenshot sebelumnya"
              title="Sebelumnya (Panah Kiri)"
            >
              <ChevronLeft size={24} strokeWidth={2.5} />
            </button>
          )}

          <div className="dt-lightbox__image-frame" onClick={(e) => e.stopPropagation()}>
            <img
              key={currentItem.url}
              src={currentItem.url}
              alt={currentItem.title || projectTitle}
              className="dt-lightbox__img"
            />
          </div>

          {hasMultiple && (
            <button
              type="button"
              className="dt-lightbox__nav-btn dt-lightbox__nav-btn--next"
              onClick={handleNext}
              aria-label="Screenshot berikutnya"
              title="Berikutnya (Panah Kanan)"
            >
              <ChevronRight size={24} strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* Caption & Thumbnail Strip */}
        <footer className="dt-lightbox__footer">
          <div className="dt-lightbox__caption">
            <h4 className="dt-lightbox__item-title">{currentItem.title}</h4>
            {currentItem.description && (
              <p className="dt-lightbox__item-desc">{currentItem.description}</p>
            )}
          </div>

          {hasMultiple && (
            <div className="dt-lightbox__thumbnails">
              {screenshots.map((s, idx) => (
                <button
                  key={s.url + idx}
                  type="button"
                  className={`dt-lightbox__thumb-btn ${idx === currentIndex ? 'is-active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Lihat gambar ke-${idx + 1}: ${s.title}`}
                >
                  <img src={s.url} alt="" aria-hidden="true" />
                  <span className="dt-lightbox__thumb-num">{idx + 1}</span>
                </button>
              ))}
            </div>
          )}

          <div className="dt-lightbox__shortcut-hint">
            <span>Tekan <kbd>←</kbd> <kbd>→</kbd> untuk beralih • <kbd>Esc</kbd> untuk keluar</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
