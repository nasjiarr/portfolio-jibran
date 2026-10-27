import { useEffect, useState, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Images, Sparkles, Info } from 'lucide-react';
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
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isCaptionOpen, setIsCaptionOpen] = useState(false);
  const [tapFeedback, setTapFeedback] = useState<'prev' | 'next' | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number>(0);
  const hasMoved = useRef<boolean>(false);
  const feedbackTimeout = useRef<number | null>(null);

  // Sync initialIndex when lightbox opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setSwipeOffset(0);
      setIsSwiping(false);
      setIsCaptionOpen(false);
      setTapFeedback(null);
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

  const triggerFeedback = useCallback((dir: 'prev' | 'next') => {
    if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);
    setTapFeedback(dir);
    feedbackTimeout.current = window.setTimeout(() => {
      setTapFeedback(null);
    }, 280);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : screenshots.length - 1));
    triggerFeedback('prev');
  }, [screenshots.length, triggerFeedback]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < screenshots.length - 1 ? prev + 1 : 0));
    triggerFeedback('next');
  }, [screenshots.length, triggerFeedback]);

  // Touch swipe & tap handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (screenshots.length <= 1) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    hasMoved.current = false;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - touchStartY.current;

    if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
      hasMoved.current = true;
    }

    // Detect intentional horizontal swipe vs vertical scroll
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
      // Dampen swipe drag for natural tactile rubber-band feel
      setSwipeOffset(deltaX * 0.45);
    }
  };

  const handleTouchEnd = () => {
    const elapsed = Date.now() - touchStartTime.current;
    const startX = touchStartX.current;

    // Detect quick tap (Story Tap Mode) when user didn't drag
    if (!hasMoved.current && elapsed < 320 && startX !== null && screenshots.length > 1) {
      const screenWidth = window.innerWidth;
      if (startX < screenWidth * 0.35) {
        handlePrev();
      } else {
        handleNext();
      }
    } else if (hasMoved.current) {
      const threshold = 40; // minimum swipe distance in px
      if (swipeOffset < -threshold) {
        handleNext();
      } else if (swipeOffset > threshold) {
        handlePrev();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    hasMoved.current = false;
    setSwipeOffset(0);
    setIsSwiping(false);
  };

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
      className="dt-lightbox dt-lightbox--story-mode"
      role="dialog"
      aria-modal="true"
      aria-label={`Galeri tangkapan layar untuk ${projectTitle}`}
    >
      {/* Backdrop with click to dismiss */}
      <div className="dt-lightbox__backdrop" onClick={onClose} aria-hidden="true" />

      {/* Main Container */}
      <div className="dt-lightbox__container">
        {/* Top Story Progress Bars (Instagram / Reels Style) */}
        {hasMultiple && (
          <div className="dt-lightbox__story-bars" aria-label="Progress slide cerita">
            {screenshots.map((s, idx) => (
              <button
                key={`story-bar-${s.url}-${idx}`}
                type="button"
                className={`dt-lightbox__story-bar ${
                  idx < currentIndex
                    ? 'is-completed'
                    : idx === currentIndex
                    ? 'is-active'
                    : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                aria-label={`Buka slide ${idx + 1}: ${s.title}`}
              >
                <span className="dt-lightbox__story-bar-fill" />
              </button>
            ))}
          </div>
        )}

        {/* Minimal Header Bar */}
        <header className="dt-lightbox__header">
          <div className="dt-lightbox__title-meta">
            <span className="dt-lightbox__project-badge" title={projectTitle}>
              <Sparkles size={13} className="dt-lightbox__sparkle" />
              <span className="dt-lightbox__project-text">{projectTitle}</span>
            </span>
            <span className="dt-lightbox__counter">
              <Images size={14} />
              <span>{currentIndex + 1} / {screenshots.length}</span>
            </span>
          </div>

          <div className="dt-lightbox__header-actions">
            {currentItem.description && (
              <button
                type="button"
                className={`dt-lightbox__info-toggle ${isCaptionOpen ? 'is-active' : ''}`}
                onClick={() => setIsCaptionOpen((prev) => !prev)}
                aria-label={isCaptionOpen ? 'Sembunyikan deskripsi' : 'Tampilkan deskripsi'}
                title="Detail Deskripsi"
              >
                <Info size={17} strokeWidth={2.2} />
              </button>
            )}

            <button
              type="button"
              className="dt-lightbox__close-btn"
              onClick={onClose}
              aria-label="Tutup galeri"
              title="Tutup (Esc)"
            >
              <X size={20} strokeWidth={2.4} />
            </button>
          </div>
        </header>

        {/* Viewport Area with Tap Zones & Gestures */}
        <div
          className="dt-lightbox__viewport"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          {/* Left/Right Story Tap Zones (Mobile 1-Thumb Tap Navigation) */}
          {hasMultiple && (
            <>
              <div
                className="dt-lightbox__tap-zone dt-lightbox__tap-zone--left"
                onClick={handlePrev}
                title="Ketuk area kiri untuk foto sebelumnya"
                aria-label="Foto sebelumnya"
              />
              <div
                className="dt-lightbox__tap-zone dt-lightbox__tap-zone--right"
                onClick={handleNext}
                title="Ketuk area kanan untuk foto berikutnya"
                aria-label="Foto berikutnya"
              />
            </>
          )}

          {/* Tap Feedback Flash */}
          {tapFeedback === 'prev' && (
            <div className="dt-lightbox__tap-indicator dt-lightbox__tap-indicator--left" aria-hidden="true">
              <ChevronLeft size={36} strokeWidth={2.6} />
            </div>
          )}
          {tapFeedback === 'next' && (
            <div className="dt-lightbox__tap-indicator dt-lightbox__tap-indicator--right" aria-hidden="true">
              <ChevronRight size={36} strokeWidth={2.6} />
            </div>
          )}

          {/* Desktop Nav Chevrons */}
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

          {/* Centered Image Frame */}
          <div
            className="dt-lightbox__image-frame"
            style={{
              transform: `translateX(${swipeOffset}px)`,
              transition: isSwiping ? 'none' : 'transform 0.24s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={currentItem.url}
              src={currentItem.url}
              alt={currentItem.title || projectTitle}
              className="dt-lightbox__img"
              draggable={false}
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

          {/* Story Tap Hint Indicator on Mobile */}
          {hasMultiple && (
            <div className="dt-lightbox__story-hint" aria-hidden="true">
              <span>Ketuk kiri ‹ atau kanan › untuk beralih</span>
            </div>
          )}
        </div>

        {/* Floating Glassmorphic Caption Capsule (Pinned Bottom) */}
        <div
          className={`dt-lightbox__caption-capsule ${isCaptionOpen ? 'is-expanded' : ''}`}
          onClick={() => {
            if (currentItem.description) setIsCaptionOpen((prev) => !prev);
          }}
          role="region"
          aria-label="Keterangan screenshot"
        >
          <div className="dt-lightbox__capsule-header">
            <div className="dt-lightbox__capsule-info">
              <h4 className="dt-lightbox__capsule-title">{currentItem.title}</h4>
              {!isCaptionOpen && currentItem.description && (
                <span className="dt-lightbox__capsule-subtext">Ketuk untuk detail selengkapnya</span>
              )}
            </div>

            {currentItem.description && (
              <button
                type="button"
                className="dt-lightbox__capsule-chevron"
                aria-label={isCaptionOpen ? 'Tutup detail' : 'Buka detail'}
              >
                {isCaptionOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </button>
            )}
          </div>

          {currentItem.description && (
            <div className="dt-lightbox__capsule-body">
              <p className="dt-lightbox__item-desc">{currentItem.description}</p>
            </div>
          )}
        </div>

        {/* Desktop Thumbnail Bar (Visible on desktop/larger screens) */}
        {hasMultiple && (
          <div className="dt-lightbox__desktop-strip">
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

            <div className="dt-lightbox__shortcut-hint">
              <span>Tekan <kbd>←</kbd> <kbd>→</kbd> untuk beralih • <kbd>Esc</kbd> untuk keluar</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
