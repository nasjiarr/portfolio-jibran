import { useEffect, useState, useRef, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import '../styles/bloop-preloader.css';

export interface BloopPreloaderProps {
  /** Main brand title (default 'Nasywan Jibran') */
  mainTitle?: string;
  /** Subtitle / designation (default 'Full Stack Web Developer') */
  subTitle?: string;
  /** Background color for preloader stage (default '#030014') */
  backgroundColor?: string;
  /** Color of text content (default '#ffffff') */
  fontColor?: string;
  /** Accent color for dot & highlights (default '#38bdf8') */
  accentColor?: string;
  /** Color or gradient ID for the expanding bloop shape */
  bloopColor?: string;
  /** Optional callback fired when the animation finishes and unmounts */
  onComplete?: () => void;
  /** Whether to show only once per browser session (default false for instant preview) */
  oncePerSession?: boolean;
}

type Stage =
  | 'mount'              // Elements offscreen
  | 'information'        // Title & subtitle slide in
  | 'outputInformation'  // Text fades out
  | 'figureAnimation'    // Small bloop droplet appears
  | 'figureComplete'     // Bloop expands to cover screen
  | 'transparent'        // Whole preloader fades out
  | 'done';              // Completely unmounted

/**
 * Bloop Preloader
 * Direct reproduction of Framer module:
 * https://framer.com/m/Bloop-Preloader-9iJh.js@WpvYgsXMugkgWqZSHTcv
 *
 * Fast, cinematic 2.4s sequence with fail-safe dismissal and zero-stall guarantee.
 */
export default function BloopPreloader({
  mainTitle = 'Nasywan Jibran',
  subTitle = 'Full Stack Web Developer',
  backgroundColor = '#030014',
  fontColor = '#ffffff',
  accentColor = '#38bdf8',
  bloopColor = 'url(#bloop-cosmic-gradient)',
  onComplete,
  oncePerSession = false,
}: BloopPreloaderProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const resolvedBg = backgroundColor !== '#030014' ? backgroundColor : (isLight ? '#f8fafc' : '#030014');
  const resolvedFont = fontColor !== '#ffffff' ? fontColor : (isLight ? '#0f172a' : '#ffffff');
  const resolvedAccent = accentColor !== '#38bdf8' ? accentColor : (isLight ? '#0284c7' : '#38bdf8');

  const [stage, setStage] = useState<Stage>(() => {
    if (typeof window !== 'undefined' && oncePerSession) {
      try {
        if (sessionStorage.getItem('bloop-preloader-completed')) {
          return 'done';
        }
      } catch {
        // ignore
      }
    }
    return 'mount';
  });

  const [progress, setProgress] = useState(0);
  const isDismissedRef = useRef(stage === 'done');
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const dismiss = useCallback(() => {
    if (isDismissedRef.current) return;
    isDismissedRef.current = true;
    setStage('done');
    document.body.style.overflow = '';
    if (oncePerSession) {
      try {
        sessionStorage.setItem('bloop-preloader-completed', 'true');
      } catch {
        // ignore
      }
    }
    onCompleteRef.current?.();
  }, [oncePerSession]);

  useEffect(() => {
    if (isDismissedRef.current) return;

    // Lock body scroll while preloader is visible
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timeouts: number[] = [];
    const schedule = (fn: () => void, delayMs: number) => {
      const id = window.setTimeout(() => {
        if (!isDismissedRef.current) fn();
      }, delayMs);
      timeouts.push(id);
    };

    // Step 1: Slide in text (Information phase)
    schedule(() => {
      setStage('information');
      setProgress(100);
    }, 40);

    // Step 2: Output Information (text fades out)
    schedule(() => {
      setStage('outputInformation');
    }, 750);

    // Step 3: Figure Animation (central droplet appears)
    schedule(() => {
      setStage('figureAnimation');
    }, 1100);

    // Step 4: Figure Animation Complete (explosive bloop expansion)
    schedule(() => {
      setStage('figureComplete');
    }, 1450);

    // Step 5: Transparent (unveil website)
    schedule(() => {
      setStage('transparent');
    }, 1950);

    // Step 6: Final unmount
    schedule(() => {
      dismiss();
    }, 2400);

    // Hard fail-safe: guarantee preloader is gone and scroll restored after 2.8s
    schedule(() => {
      dismiss();
    }, 2800);

    // Keydown / Click to skip
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
  }, [dismiss]);

  if (stage === 'done') {
    return null;
  }

  // Split title if it contains spaces so second word gets radiant accent glow
  const titleParts = mainTitle.split(' ');
  const firstWord = titleParts[0];
  const remainingWords = titleParts.slice(1).join(' ');

  // Compute CSS state modifiers
  const isTextVisible = stage === 'information';
  const isTextExiting =
    stage === 'outputInformation' ||
    stage === 'figureAnimation' ||
    stage === 'figureComplete' ||
    stage === 'transparent';

  let bloopStateClass = '';
  if (stage === 'figureAnimation') {
    bloopStateClass = 'is-droplet';
  } else if (stage === 'figureComplete') {
    bloopStateClass = 'is-expanded';
  } else if (stage === 'transparent') {
    bloopStateClass = 'is-transparent';
  }

  const isBgTransparent = stage === 'figureComplete' || stage === 'transparent';
  const isWrapperTransparent = stage === 'transparent';

  return (
    <aside
      className={`bloop-preloader ${isBgTransparent ? 'bloop-preloader--bg-transparent' : ''} ${isWrapperTransparent ? 'bloop-preloader--transparent' : ''}`}
      style={{
        ['--bloop-bg' as string]: resolvedBg,
        ['--bloop-font-color' as string]: resolvedFont,
      }}
      aria-label="Loading portfolio"
      role="status"
      onClick={dismiss}
      title="Click or press Esc to skip"
    >
      {/* Aurora Ambient Atmosphere */}
      <div className="bloop-preloader__aurora" aria-hidden="true" />

      {/* Main Brand Content */}
      <div className="bloop-preloader__content">
        <div className="bloop-preloader__title-wrap">
          <h1
            className={`bloop-preloader__title ${isTextVisible ? 'is-visible' : ''} ${isTextExiting ? 'is-exiting' : ''}`}
          >
            {firstWord}{' '}
            {remainingWords && (
              <span className="bloop-accent-glow">{remainingWords}</span>
            )}
          </h1>
        </div>

        <div className="bloop-preloader__sub-wrap">
          <p
            className={`bloop-preloader__subtitle ${isTextVisible ? 'is-visible' : ''} ${isTextExiting ? 'is-exiting' : ''}`}
          >
            <span
              className="bloop-preloader__dot"
              style={{ backgroundColor: resolvedAccent }}
            />
            {subTitle}
          </p>
        </div>

        {/* Minimal Progress Line */}
        <div className={`bloop-preloader__bar ${isTextVisible ? 'is-visible' : ''}`}>
          <div
            className="bloop-preloader__bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Transitional Figure (Organic Bloop Morph Shape) */}
      <div className="bloop-preloader__figure-stage" aria-hidden="true">
        <svg
          className={`bloop-preloader__svg ${bloopStateClass}`}
          viewBox="0 0 2022.327 1751.041"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bloop-cosmic-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isLight ? '#0284c7' : '#38bdf8'} />
              <stop offset="45%" stopColor={isLight ? '#2563eb' : '#6366f1'} />
              <stop offset="85%" stopColor={isLight ? '#38bdf8' : '#00f2fe'} />
              <stop offset="100%" stopColor={isLight ? '#0284c7' : '#38bdf8'} />
            </linearGradient>
            <filter id="bloop-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="30" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <path
            d="M 11.605 1198.824 C 117.81 2048.365 715.599 1194.746 966.065 1533.064 C 1216.53 1871.381 1493.524 1794.135 1781.626 1451.023 C 2069.727 1107.911 2087.799 844.701 1896.563 817.836 C 1705.326 790.972 2032.184 57.703 1287.972 4.679 C 543.76 -48.345 -94.6 349.283 11.605 1198.824 Z"
            fill={bloopColor}
            stroke={isLight ? '#0284c7' : '#00f2fe'}
            strokeWidth="3"
            filter="url(#bloop-glow-filter)"
          />
        </svg>
      </div>
    </aside>
  );
}
