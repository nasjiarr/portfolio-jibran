import { useEffect, useState, useRef, useCallback } from 'react';
import { usePreloader } from '../context/PreloaderContext';
import '../styles/shutter-preloader.css';

export interface ShutterPreloaderProps {
  /** Optional callback fired when preloader finishes */
  onComplete?: () => void;
  /** Whether to show only once per browser session (default false for testing) */
  oncePerSession?: boolean;
}

/**
 * ShutterPreloader (Option 2)
 * Minimalist Dual-Shutter Reveal splash screen (Linear / Apple / Vercel style).
 * Snappy 0.9s - 1.1s sequence with dual curtain panels splitting vertically.
 */
export default function ShutterPreloader({
  onComplete,
  oncePerSession = false,
}: ShutterPreloaderProps) {
  const { triggerReady } = usePreloader();

  const [isDismissed, setIsDismissed] = useState(() => {
    if (typeof window !== 'undefined' && oncePerSession) {
      try {
        if (sessionStorage.getItem('shutter-preloader-completed')) {
          return true;
        }
      } catch {
        // ignore
      }
    }
    return false;
  });

  const [centerState, setCenterState] = useState<'hidden' | 'visible' | 'fading'>('hidden');
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const isDismissedRef = useRef(isDismissed);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // If already dismissed from sessionStorage
  useEffect(() => {
    if (isDismissed) {
      triggerReady();
    }
  }, [isDismissed, triggerReady]);

  const dismiss = useCallback(() => {
    if (isDismissedRef.current) return;
    isDismissedRef.current = true;
    triggerReady();
    document.body.style.overflow = '';

    if (oncePerSession) {
      try {
        sessionStorage.setItem('shutter-preloader-completed', 'true');
      } catch {
        // ignore
      }
    }

    setIsExiting(true);
    setCenterState('fading');

    window.setTimeout(() => {
      setIsDismissed(true);
      onCompleteRef.current?.();
    }, 450);
  }, [oncePerSession, triggerReady]);

  useEffect(() => {
    if (isDismissedRef.current) return;

    // Lock body scroll while splash screen is active
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timeouts: number[] = [];
    const schedule = (fn: () => void, delayMs: number) => {
      const id = window.setTimeout(() => {
        if (!isDismissedRef.current) fn();
      }, delayMs);
      timeouts.push(id);
    };

    // Step 1: Reveal brand monogram & heading
    schedule(() => {
      setCenterState('visible');
      setProgress(100);
    }, 30);

    // Step 2: Fade out center elements smoothly
    schedule(() => {
      setCenterState('fading');
    }, 720);

    // Step 3: Shutter split begins & triggers Hero entrance
    schedule(() => {
      setIsExiting(true);
      triggerReady();
    }, 860);

    // Step 4: Final unmount
    schedule(() => {
      dismiss();
    }, 1320);

    // Fail-safe timeout
    schedule(() => {
      dismiss();
    }, 1800);

    // Keyboard shortcut to skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        dismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      timeouts.forEach((id) => clearTimeout(id));
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [dismiss, triggerReady]);

  if (isDismissed) {
    return null;
  }

  let centerClass = '';
  if (centerState === 'visible') centerClass = 'is-visible';
  if (centerState === 'fading') centerClass = 'is-fading';

  return (
    <aside
      className={`shutter-preloader ${isExiting ? 'is-exiting' : ''}`}
      aria-label="Loading Experience"
      role="status"
      onClick={dismiss}
      title="Click or press ESC to skip"
    >
      {/* Top Half Shutter Curtain */}
      <div className="shutter-preloader__curtain shutter-preloader__curtain--top" aria-hidden="true" />

      {/* Bottom Half Shutter Curtain */}
      <div className="shutter-preloader__curtain shutter-preloader__curtain--bottom" aria-hidden="true" />

      {/* Center Brand Identity */}
      <div className={`shutter-preloader__center ${centerClass}`}>
        {/* Monogram Badge */}
        <div className="shutter-preloader__monogram">
          <span>NJ</span>
          <span className="shutter-preloader__monogram-dot" />
        </div>

        {/* Title */}
        <h1 className="shutter-preloader__title">
          NASYWAN <span>JIBRAN</span>
        </h1>

        {/* Subtitle Eyebrow */}
        <div className="shutter-preloader__sub">
          <span className="shutter-preloader__sub-dot" />
          <span>Full Stack Web Developer</span>
        </div>

        {/* Precision Progress Line */}
        <div className="shutter-preloader__track">
          <div
            className="shutter-preloader__bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Subtle Skip Hint */}
      <span className="shutter-preloader__hint">
        [ Tap anywhere or press ESC to skip ]
      </span>
    </aside>
  );
}

